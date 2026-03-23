import { withParser } from 'jscodeshift';

import transformer from '../migrate-use-merge-refs';

const DEPRECATED = '@coinbase/cds-common/hooks/useMergeRefs';
const TARGET = '@coinbase/cds-common/utils/mergeRefs';

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function runTransform(source: string): string | null {
  const jscodeshift = withParser('tsx');
  return transformer(
    { path: 'test.tsx', source },
    {
      jscodeshift,
      j: jscodeshift,
      stats: () => {},
      report: () => {},
    } as Parameters<typeof transformer>[1],
    {},
  );
}

describe('migrate-use-merge-refs', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('rewrites deprecated import path and renames binding at import and call sites', () => {
    const input = `
import { useMergeRefs } from '${DEPRECATED}';

export const X = () => {
  const ref = useMergeRefs(a, b);
  return ref;
};
`;
    const out = runTransform(input);
    expect(out).not.toBeNull();
    expect(out).toContain(TARGET);
    expect(out).not.toContain(DEPRECATED);
    expect(out).toMatch(/\bmergeRefs\s*\(/);
    expect(out).not.toMatch(/\buseMergeRefs\b/);
  });

  it('preserves import alias: useMergeRefs as x → mergeRefs as x', () => {
    const input = `
import { useMergeRefs as combineRefs } from '${DEPRECATED}';
combineRefs(r1, r2);
`;
    const out = runTransform(input);
    expect(out).not.toBeNull();
    expect(out).toContain(TARGET);
    expect(out).toMatch(/import\s*\{\s*mergeRefs\s+as\s+combineRefs\s*\}/);
    expect(out).toMatch(/\bcombineRefs\s*\(/);
    expect(out).not.toContain('useMergeRefs');
  });

  it('updates jest.mock module string and binding', () => {
    const input = `
jest.mock('${DEPRECATED}');
import { useMergeRefs } from '${DEPRECATED}';
useMergeRefs(x);
`;
    const out = runTransform(input);
    expect(out).not.toBeNull();
    expect(out).not.toContain(DEPRECATED);
    expect(out).toMatch(new RegExp(`jest\\.mock\\(["']${escapeRe(TARGET)}["']\\)`));
  });

  it('updates re-export from deprecated path', () => {
    const input = `export { useMergeRefs } from '${DEPRECATED}';`;
    const out = runTransform(input);
    expect(out).not.toBeNull();
    expect(out).toMatch(
      new RegExp(`^export\\s*\\{\\s*mergeRefs\\s*\\}\\s*from\\s*["']${escapeRe(TARGET)}["'];?$`),
    );
  });

  it('merges duplicate imports from utils/mergeRefs after rewrite', () => {
    const input = `
import { mergeRefs } from '${TARGET}';
import { useMergeRefs } from '${DEPRECATED}';

const cb = mergeRefs(useMergeRefs(a));
`;
    const out = runTransform(input);
    expect(out).not.toBeNull();
    expect(out).not.toContain(DEPRECATED);
    const importLines = out!.split('\n').filter((l) => l.includes(TARGET) && l.includes('from'));
    expect(importLines.length).toBe(1);
    expect(out).toContain(`from '${TARGET}'`);
  });

  it('does not rename useMergeRefs as a non-shorthand object literal key', () => {
    const input = `
import { useMergeRefs } from '${DEPRECATED}';
const o = { useMergeRefs: 1 };
useMergeRefs(r);
`;
    const out = runTransform(input);
    expect(out).not.toBeNull();
    expect(out).toMatch(/\{\s*useMergeRefs:\s*1\s*\}/);
    expect(out).toMatch(/\bmergeRefs\s*\(\s*r\s*\)/);
  });

  it('does not rename useMergeRefs imported from another package', () => {
    const input = `
import { useMergeRefs } from 'some-other-library';

export function f() {
  return useMergeRefs(a, b);
}
`;
    const out = runTransform(input);
    expect(out).toBeNull();
  });

  it('is idempotent: second run returns null', () => {
    const input = `
import { useMergeRefs } from '${DEPRECATED}';
useMergeRefs(x);
`;
    const once = runTransform(input);
    expect(once).not.toBeNull();
    const twice = runTransform(once!);
    expect(twice).toBeNull();
  });

  it('returns null when there is nothing to migrate', () => {
    const input = `
import React from 'react';
export const x = 1;
`;
    expect(runTransform(input)).toBeNull();
  });
});
