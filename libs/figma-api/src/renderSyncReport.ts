import fs from 'node:fs';
import path from 'node:path';

import {
  hasChanges,
  isBreaking,
  type RejectedAsset,
  type RejectedCategory,
  type SyncChanges,
  type SyncReport,
} from './syncReport';

/**
 * Renders the report written by the sync scripts for the sync workflows: the version plan, the
 * pull request description, the link that opens it, and the Slack message that ends every run.
 */

const MAX_COMPARE_URL_LENGTH = 6000;
const MAX_FAILURE_LINES = 6;
/** A Slack user group id, like S05HRM5A309. */
const SLACK_GROUP_ID = /^S[A-Z0-9]+$/;
/** Slack cuts a long message off, which would lose the lines after the list. */
const MAX_REJECTED_PER_CATEGORY = 5;
const MAX_REASON_CHARS = 100;
const shorten = (text: string) =>
  text.length > MAX_REASON_CHARS ? `${text.slice(0, MAX_REASON_CHARS)}…` : text;
const MAX_FAILURE_CHARS = 700;
const FAILURE_LINE = /error|failed|❌|not clean|cannot|denied|forbidden|\b40[0-9]\b|\b50[0-9]\b/i;
// eslint-disable-next-line no-control-regex
const ANSI = /\u001b\[[0-9;]*m/g;

/** Asset names and messages come from Figma, so keep them from breaking out of their formatting. */
const plain = (text: string) => text.replace(/[`\r\n]+/g, ' ').trim();

const escapeSlack = (text: string) =>
  plain(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** The note that tells a reviewer a rename is only a change of capitalization. */
const renameLabel = ({ name, oldName }: { name: string; oldName: string }) =>
  `${oldName} → ${name}${oldName.toLowerCase() === name.toLowerCase() ? ' (capitalization only)' : ''}`;

const countSummary = (changes: SyncChanges) => {
  const { added, updated, renamed, deleted } = changes;
  return hasChanges(changes)
    ? `${added.length} new, ${updated.length} updated, ${deleted.length} deleted, ${renamed.length} renamed`
    : 'no asset changed, only recorded Figma dates or generated files';
};

type Entry = { group?: string; label: string };

const capitalize = (text: string) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

const byGroupOrder = (order: string[]) => (a: string, b: string) => {
  const aIndex = order.indexOf(a);
  const bIndex = order.indexOf(b);
  if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
  if (aIndex !== -1) return -1;
  if (bIndex !== -1) return 1;
  return a.localeCompare(b);
};

/**
 * Headings rather than bold labels because `nx release` strips the blank lines out of a plan body
 * when it nests it under the changelog entry, and only a heading still breaks the paragraph. Grouped
 * entries get a sub-heading per group, sorted; ungrouped ones keep the order they were given.
 */
const planSection = (heading: string, entries: Entry[], groupOrder: string[]) => {
  if (!entries.length) return '';
  if (entries.every(({ group }) => group === undefined)) {
    return `##### ${heading} (${entries.length})\n\n- ${entries.map(({ label }) => label).join('\n- ')}`;
  }

  const byGroup = new Map<string, string[]>();
  entries.forEach(({ group = '', label }) => {
    byGroup.set(group, [...(byGroup.get(group) ?? []), label]);
  });
  const groups = [...byGroup.keys()].sort(byGroupOrder(groupOrder)).map((group) => {
    const labels = [...(byGroup.get(group) ?? [])].sort((a, b) => a.localeCompare(b));
    return `###### ${capitalize(group)} (${labels.length})\n\n- ${labels.join('\n- ')}`;
  });
  return [`##### ${heading} (${entries.length})`, ...groups].join('\n\n');
};

/**
 * The `nx release` version plan for a sync. `nx release` consumes it to derive both the version
 * bump and the changelog entry.
 */
export const renderVersionPlan = (report: SyncReport, date: string) => {
  const { added, updated, renamed, deleted } = report.changes;
  const groupOrder = report.groupOrder ?? [];
  const sections = [
    planSection(
      '⭐️ Added',
      added.map(({ group, name }) => ({ group, label: name })),
      groupOrder,
    ),
    planSection(
      '⭐️ Updated',
      updated.map(({ group, name }) => ({ group, label: name })),
      groupOrder,
    ),
    planSection(
      '☠️ Renamed',
      renamed.map(({ group, name, oldName }) => ({ group, label: renameLabel({ name, oldName }) })),
      groupOrder,
    ),
    planSection(
      '☠️ Deleted',
      deleted.map(({ group, name }) => ({ group, label: name })),
      groupOrder,
    ),
  ].filter(Boolean);

  return `---
${report.target}: ${report.bump}
---

Publish ${report.label ?? report.target} ${date}

${sections.join('\n\n')}
`;
};

/** Where `nx release` reads the pending version plans from. */
export const versionPlansDirectory = (repoRoot: string) =>
  path.join(repoRoot, '.nx', 'version-plans');

/**
 * Saves the version plan for a sync that changed assets as `<target>-<date>.md` and returns its
 * path. The date is `SYNC_DATE`, which the workflow also uses in the branch name, or today for a
 * local run. A sync that changed nothing needs no release, so it writes nothing.
 */
export const writeVersionPlan = (
  report: SyncReport,
  directory: string,
  date = process.env.SYNC_DATE ?? new Date().toISOString().slice(0, 10),
) => {
  if (!hasChanges(report.changes)) return undefined;
  const planPath = path.join(directory, `${report.target}-${date}.md`);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(planPath, renderVersionPlan(report, date));
  return planPath;
};

/** How each category reads in the report, in the order the groups are listed. */
const REJECTED_CATEGORIES: Record<RejectedCategory | 'other', { label: string; hint: string }> = {
  'duplicate-name': {
    label: 'Duplicate name',
    hint: 'two assets share a name; rename one of each pair',
  },
  'invalid-name': {
    label: 'Invalid name',
    hint: 'the name breaks the naming rule; rename it',
  },
  'invalid-variant': {
    label: 'Invalid variants',
    hint: 'a variant is missing or has a wrong property; fix it',
  },
  'invalid-asset': {
    label: 'Failed validation',
    hint: 'the artwork could not be converted or failed a check; fix it',
  },
  other: { label: 'Other', hint: 'see the reason' },
};

const groupRejected = (rejected: RejectedAsset[]) =>
  (Object.keys(REJECTED_CATEGORIES) as (RejectedCategory | 'other')[])
    .map((category) => ({
      ...REJECTED_CATEGORIES[category],
      assets: rejected.filter((asset) => (asset.category ?? 'other') === category),
    }))
    .filter(({ assets }) => assets.length > 0);

/** The rejected assets as markdown, grouped by category, for the pull request and the job summary. */
export const renderRejections = (report: SyncReport) =>
  groupRejected(report.rejected)
    .map(({ label, hint, assets }) =>
      [
        `**${label} (${assets.length})**: ${hint}.`,
        ...assets.map(({ name, message, url, duplicateOf }) => {
          const links = duplicateOf
            ? `[Figma](${url}), [the other one](${duplicateOf.url})`
            : `[Figma](${url})`;
          return `- \`${plain(name)}\`: ${plain(message)} (${links})`;
        }),
      ].join('\n'),
    )
    .join('\n\n');

export const renderPullRequestBody = (report: SyncReport) => {
  const sections = [
    '## What changed? Why?',
    `Automated ${report.target} sync from Figma: ${countSummary(report.changes)}. Generated by the Sync Figma Assets workflow; review it like any other PR.`,
  ];

  sections.push(
    isBreaking(report.changes)
      ? `**Breaking changes:** assets were renamed or deleted. This needs a major version bump, a migration guide and a migrator script. This PR has the version plan but is not released: once those are ready, run \`yarn release --projects=${report.target}\` on this branch and push.`
      : '**Released:** this PR includes the version bump and changelog, so merging it publishes the package to npm.',
  );

  if (report.rejected.length > 0) {
    sections.push(
      `### Skipped, needs a fix in Figma\n\nThese were not synced. Designers have been notified, and they are picked up again on the next sync once fixed.\n\n${renderRejections(report)}`,
    );
  }

  sections.push(
    '## Testing',
    '### Testing instructions\n\nReview the generated assets and the visreg run on this PR. Nothing is merged automatically.',
    '## Illustrations/Icons Checklist',
    [
      '- [ ] verified visreg changes with Terran (include link to visreg run/approval)',
      '- [ ] all illustration/icons names have been reviewed by Dom and/or Terran',
    ].join('\n'),
    '## Change management',
    ['type=routine', 'risk=low', 'impact=sev5', '', 'automerge=false'].join('\n'),
  );

  return `${sections.join('\n\n')}\n`;
};

export type CompareUrlOptions = {
  serverUrl: string;
  repository: string;
  branch: string;
  title: string;
  base?: string;
};

/**
 * A link that opens the pull request form for the pushed branch with the title and description
 * filled in, for repositories where Actions are not allowed to create pull requests.
 */
export const renderCompareUrl = (
  report: SyncReport,
  { serverUrl, repository, branch, title, base = 'master' }: CompareUrlOptions,
) => {
  const encodedBranch = branch.split('/').map(encodeURIComponent).join('/');
  const compare = `${serverUrl}/${repository}/compare/${base}...${encodedBranch}`;
  const withBody = `${compare}?${new URLSearchParams({
    expand: '1',
    title,
    body: renderPullRequestBody(report),
  })}`;
  // A very long link is rejected, so a long list of rejected assets falls back to the title alone.
  return withBody.length <= MAX_COMPARE_URL_LENGTH
    ? withBody
    : `${compare}?${new URLSearchParams({ expand: '1', title })}`;
};

/** The lines of a sync log that say why it failed, falling back to its last lines. */
export const failureExcerpt = (log: string) => {
  const lines = log
    .replace(ANSI, '')
    .split('\n')
    .map((line) => plain(line).replace(/\s{2,}/g, ' '))
    .filter(Boolean);
  const failures = lines.filter((line) => FAILURE_LINE.test(line));
  const text = (failures.length > 0 ? failures : lines).slice(-MAX_FAILURE_LINES).join('\n');
  return text.length > MAX_FAILURE_CHARS ? `${text.slice(0, MAX_FAILURE_CHARS)}…` : text;
};

export type SummaryContext = {
  target: string;
  jobStatus?: string;
  syncOutcome?: string;
  skipped?: boolean;
  pushed?: boolean;
  /** The branch the workflow pushed. */
  branch?: string;
  compareUrl?: string;
  openPullRequestUrl?: string;
  failureLog?: string;
  failedStep?: string;
  runUrl?: string;
  /** Slack user group ids to ping when a branch was pushed, the sync failed or assets were skipped. */
  notify?: string[];
};

export type SummaryOutcome = 'failed' | 'skipped' | 'branch' | 'nothing';

/** How a run ended: it failed, was skipped, pushed a branch, or found nothing new in Figma. */
export const summaryOutcome = (
  report: SyncReport | undefined,
  { skipped, jobStatus, syncOutcome, pushed }: SummaryContext,
): SummaryOutcome => {
  if (skipped) return 'skipped';
  if (jobStatus === 'failure' || (syncOutcome === 'failure' && !report)) return 'failed';
  return pushed ? 'branch' : 'nothing';
};

const failureReason = ({ failureLog, failedStep }: SummaryContext) => {
  if (failedStep) return `The step "${escapeSlack(failedStep)}" failed.`;
  if (failureLog) return failureExcerpt(failureLog);
  return 'See the run log for the failing step.';
};

const summaryHeadline = (
  outcome: SummaryOutcome,
  report: SyncReport | undefined,
  context: SummaryContext,
): string[] => {
  const { target, branch = '', compareUrl, openPullRequestUrl } = context;
  const nothingNew = `:white_check_mark: The ${target} Figma sync ran. Nothing new in Figma.`;
  const failed = [
    `:red_circle: The ${target} Figma sync failed. Nothing was published.`,
    `\`\`\`${failureReason(context)}\`\`\``,
  ];

  switch (outcome) {
    case 'failed':
      return failed;
    case 'skipped':
      return [
        `:information_source: The ${target} Figma sync did not run: a sync pull request is already open (<${openPullRequestUrl}|open it>).`,
      ];
    case 'branch': {
      if (!report) return failed;
      const lines = [
        `:package: The ${target} Figma sync pushed branch \`${escapeSlack(branch)}\`.`,
        `:sparkles: *${countSummary(report.changes)}*`,
      ];
      if (isBreaking(report.changes)) {
        lines.push(
          `:rotating_light: It renames or deletes assets, so it needs a ${report.bump} version bump.`,
        );
      }
      lines.push(`<${compareUrl}|Open the pull request for ${escapeSlack(branch)}>`);
      return lines;
    }
    case 'nothing':
      return [nothingNew];
  }
};

/**
 * The Slack message that ends every run. `report` is missing when the sync crashed before writing
 * one. It always lists the assets design has to fix, because those are skipped on every run until
 * they are fixed in Figma.
 */
export const renderSummary = (report: SyncReport | undefined, context: SummaryContext) => {
  const outcome = summaryOutcome(report, context);
  const lines = summaryHeadline(outcome, report, context);

  const rejected = report?.rejected ?? [];
  if (rejected.length > 0) {
    let hidden = 0;
    lines.push(
      `:warning: ${rejected.length} ${rejected.length === 1 ? 'asset needs' : 'assets need'} a fix in Figma, and ${rejected.length === 1 ? 'was' : 'were'} skipped:`,
    );
    for (const { label, hint, assets } of groupRejected(rejected)) {
      lines.push(`*${label} (${assets.length})*: ${hint}.`);
      for (const { name, message, url, duplicateOf, category } of assets.slice(
        0,
        MAX_REJECTED_PER_CATEGORY,
      )) {
        const links = duplicateOf
          ? `<${url}|Open in Figma>, <${duplicateOf.url}|the other one>`
          : `<${url}|Open in Figma>`;
        const reason =
          category === 'duplicate-name' || category === 'invalid-name'
            ? ''
            : `: ${shorten(escapeSlack(message))}`;
        lines.push(`• \`${escapeSlack(name)}\`${reason} (${links})`);
      }
      const more = assets.length - MAX_REJECTED_PER_CATEGORY;
      if (more > 0) {
        hidden += more;
        lines.push(`…and ${more} more.`);
      }
    }
    if (hidden > 0 && context.runUrl) {
      lines.push(`Every skipped asset is listed in the <${context.runUrl}|job summary>.`);
    }
    lines.push('Fix them in Figma and publish the library; the next sync picks them up.');
  }

  if (context.runUrl) lines.push(`<${context.runUrl}|Sync run>`);

  const needsAttention = outcome === 'branch' || outcome === 'failed' || rejected.length > 0;
  const groups = (context.notify ?? []).filter((id) => SLACK_GROUP_ID.test(id));
  if (needsAttention && groups.length > 0) {
    lines.push(`cc: ${groups.map((id) => `<!subteam^${id}>`).join(' ')}`);
  }
  return { text: lines.join('\n') };
};

/** Whether the sync found anything to write, for the workflow's commit title. */
export const commitTitle = (report: SyncReport, date: string) =>
  hasChanges(report.changes)
    ? `feat: Publish ${report.label ?? report.target} ${date}`
    : `chore: Sync ${report.label ?? report.target} generated files`;
