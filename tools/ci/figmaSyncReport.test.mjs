import { describe, expect, it } from '@jest/globals';

import {
  failureExcerpt,
  renderCompareUrl,
  renderPullRequestBody,
  renderRejections,
  renderSummaryPayload,
  summaryOutcome,
} from './figmaSyncReport.mjs';

const report = (overrides = {}) => ({
  target: 'icons',
  branch: 'icons/2026-11-19',
  breaking: false,
  counts: { added: 2, updated: 1, renamed: 0, deleted: 0 },
  rejected: [],
  ...overrides,
});

const rejected = [
  {
    name: 'add',
    nodeId: '1:2',
    url: 'https://www.figma.com/design/FILE?node-id=1-2',
    message: '"size=large" in icon set "add" has a "size" that is not a number.',
  },
];

describe('renderPullRequestBody', () => {
  it('summarizes the changes and keeps the required checklist unchecked for the reviewer', () => {
    const body = renderPullRequestBody(report());
    expect(body).toContain('2 new, 1 updated');
    expect(body).toContain('- [ ] verified visreg changes with Terran');
    expect(body).toContain(
      '- [ ] all illustration/icons names have been reviewed by Dom and/or Terran',
    );
    expect(body).toContain('automerge=false');
    expect(body).not.toContain('[x]');
  });

  it('says a non-breaking sync is released, so merging publishes it', () => {
    const body = renderPullRequestBody(report());
    expect(body).toContain('merging it publishes the package to npm');
    expect(body).not.toContain('Breaking changes');
  });

  it('warns that a breaking sync is not released and how to release it', () => {
    const body = renderPullRequestBody(report({ breaking: true }));
    expect(body).toContain('Breaking changes');
    expect(body).toContain('yarn release --projects=icons');
    expect(body).not.toContain('merging it publishes');
  });

  it('lists rejected assets with their Figma links', () => {
    const body = renderPullRequestBody(report({ rejected }));
    expect(body).toContain('Skipped, needs a fix in Figma');
    expect(body).toContain('[Figma](https://www.figma.com/design/FILE?node-id=1-2)');
    expect(renderPullRequestBody(report())).not.toContain('Skipped');
  });

  it('says so when nothing changed', () => {
    const counts = { added: 0, updated: 0, renamed: 0, deleted: 0 };
    expect(renderPullRequestBody(report({ counts }))).toContain(
      '0 new, 0 updated, 0 deleted, 0 renamed',
    );
  });
});

describe('renderRejections', () => {
  it('keeps asset names from breaking out of their formatting', () => {
    const list = renderRejections(
      report({ rejected: [{ ...rejected[0], name: 'a`b\nc', message: 'line one\nline two' }] }),
    );
    expect(list).toBe(`- \`a b c\`: line one line two ([Figma](${rejected[0].url}))`);
  });
});

describe('renderCompareUrl', () => {
  const url = new URL(
    renderCompareUrl(report({ rejected }), {
      serverUrl: 'https://github.com',
      repository: 'coinbase/cds',
      title: 'feat: Publish icons 2026-11-19',
    }),
  );

  it('opens the pull request form for the branch against master', () => {
    expect(url.origin + url.pathname).toBe(
      'https://github.com/coinbase/cds/compare/master...icons/2026-11-19',
    );
    expect(url.searchParams.get('expand')).toBe('1');
  });

  it('fills in the title and the same description the workflow would have used', () => {
    expect(url.searchParams.get('title')).toBe('feat: Publish icons 2026-11-19');
    expect(url.searchParams.get('body')).toBe(renderPullRequestBody(report({ rejected })));
  });
});

describe('renderCompareUrl with many rejected assets', () => {
  it('drops the description rather than exceed the URL length GitHub accepts', () => {
    const many = Array.from({ length: 60 }, (_, index) => ({
      ...rejected[0],
      name: `icon${index}`,
      message: 'x'.repeat(80),
    }));
    const url = renderCompareUrl(report({ rejected: many }), {
      serverUrl: 'https://github.com',
      repository: 'coinbase/cds',
      title: 'feat: Publish icons',
    });
    expect(url.length).toBeLessThan(6000);
    expect(new URL(url).searchParams.get('title')).toBe('feat: Publish icons');
    expect(new URL(url).searchParams.has('body')).toBe(false);
  });
});

describe('summaryOutcome', () => {
  const base = { jobStatus: 'success', syncOutcome: 'success', report: report(), pushed: false };

  it('says skipped before anything else', () => {
    expect(summaryOutcome({ ...base, skipped: true, jobStatus: 'failure' })).toBe('skipped');
  });

  it('says failed when the job failed or the sync crashed without a report', () => {
    expect(summaryOutcome({ ...base, jobStatus: 'failure' })).toBe('failed');
    expect(summaryOutcome({ ...base, syncOutcome: 'failure', report: undefined })).toBe('failed');
  });

  it('keeps a sync that exited non-zero but wrote a report, such as one with rejected assets', () => {
    expect(summaryOutcome({ ...base, syncOutcome: 'failure', pushed: true })).toBe('branch');
  });

  it('says branch when one was pushed and nothing when none was', () => {
    expect(summaryOutcome({ ...base, pushed: true })).toBe('branch');
    expect(summaryOutcome(base)).toBe('nothing');
  });
});

describe('renderSummaryPayload', () => {
  const compareUrl = 'https://github.com/coinbase/cds/compare/master...icons/2026-11-19';
  const run = {
    target: 'icons',
    jobStatus: 'success',
    syncOutcome: 'success',
    runUrl: 'https://run',
  };

  it('names the branch, counts new, updated, deleted and renamed, and links to open the pull request', () => {
    const { text } = renderSummaryPayload(report(), { ...run, pushed: true, compareUrl });
    expect(text).toContain(
      'pushed branch `icons/2026-11-19`: 2 new, 1 updated, 0 deleted, 0 renamed.',
    );
    expect(text).toContain(`<${compareUrl}|Open the pull request for \`icons/2026-11-19\`>`);
    expect(text).toContain('<https://run|Sync run>');
  });

  it('links to the pull request when the workflow opened one', () => {
    const { text } = renderSummaryPayload(report(), {
      ...run,
      pushed: true,
      pullRequestUrl: 'https://github.com/coinbase/cds/pull/1',
    });
    expect(text).toContain('<https://github.com/coinbase/cds/pull/1|Pull request>');
  });

  it('warns that renames and deletes need a major version bump', () => {
    const { text } = renderSummaryPayload(report({ breaking: true }), {
      ...run,
      pushed: true,
      compareUrl,
    });
    expect(text).toContain('major version bump');
  });

  it('says there is nothing new when the sync pushed no branch', () => {
    const { text } = renderSummaryPayload(report(), run);
    expect(text).toContain('The icons Figma sync ran. Nothing new in Figma.');
    expect(text).not.toContain('pushed branch');
  });

  it('says the sync was skipped while a sync pull request is open', () => {
    const { text } = renderSummaryPayload(undefined, {
      ...run,
      skipped: true,
      openPullRequestUrl: 'https://github.com/coinbase/cds/pull/2',
    });
    expect(text).toContain('did not run: a sync pull request is already open');
    expect(text).toContain('https://github.com/coinbase/cds/pull/2');
  });

  it('says why a crashed sync failed, from its log, the failed step or a pointer to the run', () => {
    const crashed = { ...run, jobStatus: 'failure', syncOutcome: 'failure' };
    const fromLog = renderSummaryPayload(undefined, {
      ...crashed,
      failureLog: 'Starting\nERROR: The "cds" repo is not clean\n',
    }).text;
    expect(fromLog).toContain('The icons Figma sync failed. Nothing was published.');
    expect(fromLog).toContain('ERROR: The "cds" repo is not clean');
    expect(
      renderSummaryPayload(undefined, { ...crashed, failedStep: 'Release the package' }).text,
    ).toContain('The step "Release the package" failed.');
    expect(renderSummaryPayload(undefined, crashed).text).toContain('See the run log');
  });

  it('lists the assets design has to fix with a link and the reason, on every outcome', () => {
    const withRejected = report({ rejected });
    for (const extra of [{}, { pushed: true, compareUrl }]) {
      const { text } = renderSummaryPayload(withRejected, { ...run, ...extra });
      expect(text).toContain('1 asset needs a fix in Figma, and was skipped:');
      expect(text).toContain('`add`');
      expect(text).toContain('<https://www.figma.com/design/FILE?node-id=1-2|Open in Figma>');
    }
  });

  it('escapes the characters Slack treats as markup and pluralizes the count', () => {
    const { text } = renderSummaryPayload(
      report({
        rejected: [{ ...rejected[0], message: 'Use <ui/name> & rename' }, rejected[0]],
      }),
      run,
    );
    expect(text).toContain('Use &lt;ui/name&gt; &amp; rename');
    expect(text).toContain('2 assets need a fix in Figma, and were skipped:');
  });
});

describe('failureExcerpt', () => {
  it('keeps the lines that explain the failure and drops colors and backticks', () => {
    const log = ['Starting', '\u001b[31mERROR: the `cds` repo is not clean\u001b[0m', 'Done'].join(
      '\n',
    );
    expect(failureExcerpt(log)).toBe('ERROR: the cds repo is not clean');
  });

  it('falls back to the last lines when none look like an error', () => {
    const log = Array.from({ length: 10 }, (_, index) => `line ${index + 1}`).join('\n');
    expect(failureExcerpt(log).split('\n')).toEqual(
      ['line 5', 'line 6', 'line 7', 'line 8', 'line 9', 'line 10'].slice(0),
    );
  });

  it('is capped so one long log cannot flood the channel', () => {
    expect(failureExcerpt(`error ${'x'.repeat(5000)}`).length).toBeLessThanOrEqual(701);
  });
});
