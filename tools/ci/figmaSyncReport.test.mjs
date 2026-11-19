import { describe, expect, it } from '@jest/globals';

import {
  renderCompareUrl,
  renderPullRequestBody,
  renderReadyPayload,
  renderRejections,
  renderSlackPayload,
  rejectionFingerprint,
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
    expect(body).toContain('2 added, 1 updated');
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
    expect(renderPullRequestBody(report({ counts }))).toContain('no asset changes');
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

describe('renderSlackPayload', () => {
  it('lists each asset with its reason and a link, and how to fix it', () => {
    const { text } = renderSlackPayload(report({ rejected }), { runUrl: 'https://run' });
    expect(text).toContain('skipped 1 asset. It needs a fix in Figma:');
    expect(text).toContain('`add`');
    expect(text).toContain('<https://www.figma.com/design/FILE?node-id=1-2|Open in Figma>');
    expect(text).toContain('<https://run|Sync run>');
  });

  it('escapes the characters Slack treats as markup', () => {
    const { text } = renderSlackPayload(
      report({ rejected: [{ ...rejected[0], message: 'Use <ui/name> & rename' }] }),
    );
    expect(text).toContain('Use &lt;ui/name&gt; &amp; rename');
  });

  it('pluralizes the count', () => {
    const { text } = renderSlackPayload(report({ rejected: [...rejected, ...rejected] }));
    expect(text).toContain('skipped 2 assets. They need a fix in Figma:');
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

describe('renderReadyPayload', () => {
  const compareUrl = 'https://github.com/coinbase/cds/compare/master...icons/2026-11-19';

  it('links to the pull request form and summarizes the changes', () => {
    const { text } = renderReadyPayload(report(), { compareUrl, runUrl: 'https://run' });
    expect(text).toContain('pushed `icons/2026-11-19`: 2 added, 1 updated');
    expect(text).toContain(`<${compareUrl}|Open the pull request>`);
    expect(text).toContain('<https://run|Sync run>');
  });

  it('mentions breaking changes and skipped assets only when there are some', () => {
    const plainText = renderReadyPayload(report(), { compareUrl }).text;
    expect(plainText).not.toContain('major version bump');
    expect(plainText).not.toContain('skipped');
    const { text } = renderReadyPayload(report({ breaking: true, rejected }), { compareUrl });
    expect(text).toContain('major version bump');
    expect(text).toContain('1 asset was skipped');
  });
});

describe('rejectionFingerprint', () => {
  it('is the same for the same problems in any order and changes when they change', () => {
    const other = { ...rejected[0], name: 'remove', message: 'something else' };
    const a = rejectionFingerprint(report({ rejected: [rejected[0], other] }));
    expect(rejectionFingerprint(report({ rejected: [other, rejected[0]] }))).toBe(a);
    expect(rejectionFingerprint(report({ rejected: [rejected[0]] }))).not.toBe(a);
  });
});
