import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {
  commitTitle,
  failureExcerpt,
  renderCompareUrl,
  renderPullRequestBody,
  renderRejections,
  renderSummary,
  renderVersionPlan,
  summaryOutcome,
  writeVersionPlan,
} from '../renderSyncReport';
import { emptyChanges, type SyncChanges, type SyncReport } from '../syncReport';

const changes = (overrides: Partial<SyncChanges> = {}): SyncChanges => ({
  ...emptyChanges(),
  ...overrides,
});

const report = (overrides: Partial<SyncReport> = {}): SyncReport => ({
  target: 'icons',
  bump: 'minor',
  changes: changes({
    added: [{ name: 'wallet' }, { name: 'send' }],
    updated: [{ name: 'cash' }],
  }),
  rejected: [],
  ...overrides,
});

const breakingReport = () =>
  report({ bump: 'major', changes: changes({ deleted: [{ name: 'legacy' }] }) });

const rejected = [
  {
    name: 'add',
    nodeId: '1:2',
    url: 'https://www.figma.com/design/FILE?node-id=1-2',
    message: '"size=large" in icon set "add" has a "size" that is not a number.',
  },
];

const date = '2026-08-28';

describe('writeVersionPlan', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'version-plans-'));

  afterAll(() => fs.rmSync(directory, { recursive: true, force: true }));

  it('saves the plan as <target>-<date>.md and returns its path', () => {
    const planPath = writeVersionPlan(
      report({ changes: changes({ added: [{ name: 'compose' }] }) }),
      directory,
      date,
    );
    expect(planPath).toBe(path.join(directory, 'icons-2026-08-28.md'));
    expect(fs.readFileSync(planPath as string, 'utf-8')).toContain('icons: minor');
  });

  it('uses SYNC_DATE when no date is passed, so the plan matches the branch name', () => {
    process.env.SYNC_DATE = '2026-01-02';
    try {
      const planPath = writeVersionPlan(
        report({ changes: changes({ added: [{ name: 'compose' }] }) }),
        directory,
      );
      expect(planPath).toBe(path.join(directory, 'icons-2026-01-02.md'));
    } finally {
      delete process.env.SYNC_DATE;
    }
  });

  it('marks a rename that only changes capitalization in the plan', () => {
    const planPath = writeVersionPlan(
      report({ changes: changes({ renamed: [{ name: 'qrcode', oldName: 'qrCode' }] }) }),
      directory,
      '2026-01-02',
    );
    expect(fs.readFileSync(planPath as string, 'utf-8')).toContain(
      'qrCode → qrcode (capitalization only)',
    );
  });

  it('writes nothing when no asset changed', () => {
    const unchanged = report({ changes: emptyChanges() });
    expect(writeVersionPlan(unchanged, path.join(directory, 'none'), date)).toBeUndefined();
    expect(fs.existsSync(path.join(directory, 'none'))).toBe(false);
  });
});

describe('renderVersionPlan', () => {
  const bumpOf = (plan: string) => plan.match(/^---\nicons: (\w+)\n---/)?.[1];

  it('asks for the bump the report names', () => {
    expect(bumpOf(renderVersionPlan(report(), date))).toBe('minor');
    expect(bumpOf(renderVersionPlan(breakingReport(), date))).toBe('major');
  });

  it('renders every populated section with its count, and omits empty ones', () => {
    const plan = renderVersionPlan(
      report({
        bump: 'major',
        changes: changes({
          added: [{ name: 'wallet' }, { name: 'send' }],
          renamed: [{ name: 'walletNew', oldName: 'walletOld' }],
        }),
      }),
      date,
    );

    expect(plan).toBe(`---
icons: major
---

Publish icons 2026-08-28

##### ⭐️ Added (2)

- wallet
- send

##### ☠️ Renamed (1)

- walletOld → walletNew
`);
  });

  describe('with groups', () => {
    const grouped = (overrides: Partial<SyncReport> = {}) =>
      report({
        target: 'illustrations',
        groupOrder: ['pictogram', 'heroSquare', 'spotIcon', 'spotRectangle', 'spotSquare'],
        ...overrides,
      });

    it('sorts the names and renders a sub-heading per group', () => {
      const plan = renderVersionPlan(
        grouped({
          bump: 'major',
          changes: changes({
            added: [
              { name: 'usdTrade', group: 'pictogram' },
              { name: 'eurTrade', group: 'pictogram' },
            ],
            renamed: [{ name: 'newName', oldName: 'oldName', group: 'pictogram' }],
          }),
        }),
        '2026-09-02',
      );

      expect(plan).toBe(`---
illustrations: major
---

Publish illustrations 2026-09-02

##### ⭐️ Added (2)

###### Pictogram (2)

- eurTrade
- usdTrade

##### ☠️ Renamed (1)

###### Pictogram (1)

- oldName → newName
`);
    });

    it('orders the groups as the report says', () => {
      const plan = renderVersionPlan(
        grouped({
          changes: changes({
            added: [
              { name: 'spotOne', group: 'spotSquare' },
              { name: 'heroOne', group: 'heroSquare' },
              { name: 'pictoOne', group: 'pictogram' },
            ],
          }),
        }),
        date,
      );

      expect(plan).toContain(`##### ⭐️ Added (3)

###### Pictogram (1)

- pictoOne

###### HeroSquare (1)

- heroOne

###### SpotSquare (1)

- spotOne`);
    });

    it('still renders a group the report does not list, after the listed ones', () => {
      const plan = renderVersionPlan(
        grouped({
          changes: changes({
            added: [
              { name: 'brandNew', group: 'someNewType' },
              { name: 'pictoOne', group: 'pictogram' },
            ],
          }),
        }),
        date,
      );

      expect(plan.indexOf('###### Pictogram')).toBeLessThan(plan.indexOf('###### SomeNewType'));
      expect(plan).toContain('- brandNew');
    });
  });
});

describe('label', () => {
  it('names the target in the plan and the commit title when it differs from the package', () => {
    const labeled = report({ target: 'retail-icons', label: 'retail icons', bump: 'patch' });
    expect(renderVersionPlan(labeled, date)).toContain('retail-icons: patch');
    expect(renderVersionPlan(labeled, date)).toContain('Publish retail icons 2026-08-28');
    expect(commitTitle(labeled, date)).toBe('feat: Publish retail icons 2026-08-28');
  });
});

describe('commitTitle', () => {
  it('publishes the target when assets changed and says generated files when none did', () => {
    expect(commitTitle(report(), date)).toBe('feat: Publish icons 2026-08-28');
    expect(commitTitle(report({ changes: changes() }), date)).toBe(
      'chore: Sync icons generated files',
    );
  });
});

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
    const body = renderPullRequestBody(breakingReport());
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
    expect(renderPullRequestBody(report({ changes: changes() }))).toContain(
      'no asset changed, only recorded Figma dates or generated files',
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
  const options = {
    serverUrl: 'https://github.com',
    repository: 'coinbase/cds',
    branch: 'icons/2026-11-19',
    title: 'feat: Publish icons 2026-11-19',
  };
  const url = new URL(renderCompareUrl(report({ rejected }), options));

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

  it('drops the description rather than exceed the URL length GitHub accepts', () => {
    const many = Array.from({ length: 60 }, (_, index) => ({
      ...rejected[0],
      name: `icon${index}`,
      message: 'x'.repeat(80),
    }));
    const long = renderCompareUrl(report({ rejected: many }), options);
    expect(long.length).toBeLessThan(6000);
    expect(new URL(long).searchParams.get('title')).toBe(options.title);
    expect(new URL(long).searchParams.has('body')).toBe(false);
  });
});

describe('summaryOutcome', () => {
  const base = { target: 'icons', jobStatus: 'success', syncOutcome: 'success', pushed: false };

  it('says skipped before anything else', () => {
    expect(summaryOutcome(report(), { ...base, skipped: true, jobStatus: 'failure' })).toBe(
      'skipped',
    );
  });

  it('says failed when the job failed or the sync crashed without a report', () => {
    expect(summaryOutcome(report(), { ...base, jobStatus: 'failure' })).toBe('failed');
    expect(summaryOutcome(undefined, { ...base, syncOutcome: 'failure' })).toBe('failed');
  });

  it('keeps a sync that exited non-zero but wrote a report, such as one with rejected assets', () => {
    expect(summaryOutcome(report(), { ...base, syncOutcome: 'failure', pushed: true })).toBe(
      'branch',
    );
  });

  it('says branch when one was pushed and nothing when none was', () => {
    expect(summaryOutcome(report(), { ...base, pushed: true })).toBe('branch');
    expect(summaryOutcome(report(), base)).toBe('nothing');
  });
});

describe('renderSummary', () => {
  const compareUrl = 'https://github.com/coinbase/cds/compare/master...icons/2026-11-19';
  const run = {
    target: 'icons',
    jobStatus: 'success',
    syncOutcome: 'success',
    runUrl: 'https://run',
  };
  const pushed = { ...run, pushed: true, branch: 'icons/2026-11-19', compareUrl };

  it('says no asset changed when a branch only records Figma dates or generated files', () => {
    const { text } = renderSummary(report({ changes: emptyChanges() }), pushed);
    expect(text).toContain('no asset changed, only recorded Figma dates or generated files');
    expect(text).not.toContain('0 new');
  });

  it('names the branch, counts new, updated, deleted and renamed, and links to open the pull request', () => {
    const { text } = renderSummary(report(), pushed);
    expect(text).toContain(
      'pushed branch `icons/2026-11-19`: 2 new, 1 updated, 0 deleted, 0 renamed.',
    );
    expect(text).toContain(`<${compareUrl}|Open the pull request for icons/2026-11-19>`);
    expect(text).toContain('<https://run|Sync run>');
  });

  it('warns that renames and deletes need a major version bump', () => {
    expect(renderSummary(breakingReport(), pushed).text).toContain('major version bump');
  });

  it('says there is nothing new when the sync pushed no branch', () => {
    const { text } = renderSummary(report(), run);
    expect(text).toContain('The icons Figma sync ran. Nothing new in Figma.');
    expect(text).not.toContain('pushed branch');
  });

  it('says the sync was skipped while a sync pull request is open', () => {
    const { text } = renderSummary(undefined, {
      ...run,
      skipped: true,
      openPullRequestUrl: 'https://github.com/coinbase/cds/pull/2',
    });
    expect(text).toContain('did not run: a sync pull request is already open');
    expect(text).toContain('https://github.com/coinbase/cds/pull/2');
  });

  it('says why a crashed sync failed, from its log, the failed step or a pointer to the run', () => {
    const crashed = { ...run, jobStatus: 'failure', syncOutcome: 'failure' };
    const fromLog = renderSummary(undefined, {
      ...crashed,
      failureLog: 'Starting\nERROR: The "cds" repo is not clean\n',
    }).text;
    expect(fromLog).toContain('The icons Figma sync failed. Nothing was published.');
    expect(fromLog).toContain('ERROR: The "cds" repo is not clean');
    expect(
      renderSummary(undefined, { ...crashed, failedStep: 'Release the package' }).text,
    ).toContain('The step "Release the package" failed.');
    const afterSync = renderSummary(report(), {
      ...run,
      jobStatus: 'failure',
      failedStep: 'Release the package',
      failureLog: 'Dropping icon set "x": error in name\n',
    }).text;
    expect(afterSync).toContain('The step "Release the package" failed.');
    expect(afterSync).not.toContain('Dropping icon set');
    expect(renderSummary(undefined, crashed).text).toContain('See the run log');
  });

  it('escapes Slack control characters in asset names', () => {
    const { text } = renderSummary(
      report({ rejected: [{ ...rejected[0], name: '<!channel>' }] }),
      run,
    );
    expect(text).toContain('`&lt;!channel&gt;`');
    expect(text).not.toContain('<!channel>');
  });

  it('lists the assets design has to fix with a link and the reason, on every outcome', () => {
    const withRejected = report({ rejected });
    for (const context of [run, pushed]) {
      const { text } = renderSummary(withRejected, context);
      expect(text).toContain('1 asset needs a fix in Figma, and was skipped:');
      expect(text).toContain('`add`');
      expect(text).toContain('<https://www.figma.com/design/FILE?node-id=1-2|Open in Figma>');
    }
  });

  it('points to the asset a name clashes with', () => {
    const clash = {
      ...rejected[0],
      duplicateOf: { url: 'https://www.figma.com/design/FILE?node-id=9-9' },
    };
    const { text } = renderSummary(report({ rejected: [clash] }), run);
    expect(text).toContain(
      '(<https://www.figma.com/design/FILE?node-id=1-2|Open in Figma>, <https://www.figma.com/design/FILE?node-id=9-9|the other one>)',
    );
    expect(renderRejections(report({ rejected: [clash] }))).toContain(
      '[the other one](https://www.figma.com/design/FILE?node-id=9-9)',
    );
  });

  it('lists only the first skipped assets so the message is not cut off, and points to the run', () => {
    const many = Array.from({ length: 12 }, (_, index) => ({
      ...rejected[0],
      name: `asset${index}`,
    }));
    const { text } = renderSummary(report({ rejected: many }), run);
    expect(text).toContain('12 assets need a fix in Figma');
    expect(text).toContain('`asset7`');
    expect(text).not.toContain('`asset8`');
    expect(text).toContain('…and 4 more, all listed in the <https://run|job summary>.');
    expect(text.endsWith('<https://run|Sync run>')).toBe(true);
  });

  it('escapes the characters Slack treats as markup and pluralizes the count', () => {
    const { text } = renderSummary(
      report({ rejected: [{ ...rejected[0], message: 'Use <ui/name> & rename' }, rejected[0]] }),
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
    expect(failureExcerpt(log).split('\n')).toEqual([
      'line 5',
      'line 6',
      'line 7',
      'line 8',
      'line 9',
      'line 10',
    ]);
  });

  it('is capped so one long log cannot flood the channel', () => {
    expect(failureExcerpt(`error ${'x'.repeat(5000)}`).length).toBeLessThanOrEqual(701);
  });
});
