import { runInlineTest, runTest } from 'jscodeshift/src/testUtils';

import { tsxTestOptions } from '../../../test-utils/codemodTestUtils';
import transform from '../migrate-use-merge-refs';

const FIXTURE_SUITE = 'migrate-use-merge-refs';
const TRANSFORM_NAME = 'migrate-use-merge-refs';

/**
 * Behavioral cases are **inline** below. Two larger paired examples: forwardRef + merged refs, and a
 * hook that merges caller + internal refs (fictional names; structure only).
 */

/** Non-@coinbase scope (used only for --package-scope inline tests). */
const ALTERNATE_SCOPE_SOURCE = `
import { useMergeRefs } from '@example/cds-common/hooks/useMergeRefs';

export const X = () => {
  const ref = useMergeRefs(a, b);
  return ref;
};
`;

const ALTERNATE_SCOPE_EXPECTED = `
import { mergeRefs } from "@example/cds-common/utils/mergeRefs";

export const X = () => {
  const ref = mergeRefs(a, b);
  return ref;
};
`;

const BASIC_TRANSFORMED_OUTPUT = `
import { mergeRefs } from "@coinbase/cds-common/utils/mergeRefs";

export const X = () => {
  const ref = mergeRefs(a, b);
  return ref;
};
`;

const E2E_PAIRED_PREFIXES = [
  `${FIXTURE_SUITE}/cds-web-link-forwardref`,
  `${FIXTURE_SUITE}/cds-mobile-scroll-to-hook`,
] as const;

describe('migrate-use-merge-refs', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('migrates default import from hooks/useMergeRefs to utils/mergeRefs', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'basic.tsx',
        source: `
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';

export const X = () => {
  const ref = useMergeRefs(a, b);
  return ref;
};
`,
      },
      BASIC_TRANSFORMED_OUTPUT,
      tsxTestOptions,
    );
  });

  it('preserves import aliases when migrating', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'alias.tsx',
        source: `
import { useMergeRefs as combineRefs } from '@coinbase/cds-common/hooks/useMergeRefs';
combineRefs(r1, r2);
`,
      },
      `
import { mergeRefs as combineRefs } from "@coinbase/cds-common/utils/mergeRefs";
combineRefs(r1, r2);
`,
      tsxTestOptions,
    );
  });

  it('dedupes when mergeRefs and useMergeRefs were both imported', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'dup.tsx',
        source: `
import { mergeRefs } from '@coinbase/cds-common/utils/mergeRefs';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';

const cb = mergeRefs(useMergeRefs(a));
`,
      },
      `
import { mergeRefs } from '@coinbase/cds-common/utils/mergeRefs';

const cb = mergeRefs(mergeRefs(a));
`,
      tsxTestOptions,
    );
  });

  it('migrates re-exports and call sites but skips object literal shorthand keys', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'reexport.tsx',
        source: `
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';

export { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';

const o = { useMergeRefs: 1 };
useMergeRefs(r);
`,
      },
      `
import { mergeRefs } from "@coinbase/cds-common/utils/mergeRefs";

export { mergeRefs } from "@coinbase/cds-common/utils/mergeRefs";

const o = { useMergeRefs: 1 };
mergeRefs(r);
`,
      tsxTestOptions,
    );
  });

  it('rewrites jest.mock path and import when targeting the hooks entry', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'jest.tsx',
        source: `
jest.mock('@coinbase/cds-common/hooks/useMergeRefs');
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';
useMergeRefs(x);
`,
      },
      `
jest.mock("@coinbase/cds-common/utils/mergeRefs");
import { mergeRefs } from "@coinbase/cds-common/utils/mergeRefs";
mergeRefs(x);
`,
      tsxTestOptions,
    );
  });

  it('does not modify third-party useMergeRefs import', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'third-party.tsx',
        source: `
import { useMergeRefs } from 'some-other-library';

export function f() {
  return useMergeRefs(a, b);
}
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('does not migrate alternate scope when --package-scope is @coinbase', () => {
    runInlineTest(
      transform,
      { packageScope: '@coinbase' },
      { path: 'scope.tsx', source: ALTERNATE_SCOPE_SOURCE },
      '',
      tsxTestOptions,
    );
  });

  it('migrates alternate scope when --package-scope matches', () => {
    runInlineTest(
      transform,
      { packageScope: '@example' },
      { path: 'scope.tsx', source: ALTERNATE_SCOPE_SOURCE },
      ALTERNATE_SCOPE_EXPECTED,
      tsxTestOptions,
    );
  });

  it('makes no changes when there is nothing to migrate', () => {
    runInlineTest(
      transform,
      {},
      {
        path: 'noop.tsx',
        source: `
import React from 'react';
export const x = 1;
`,
      },
      '',
      tsxTestOptions,
    );
  });

  it('is idempotent: second run on transformed output makes no changes', () => {
    runInlineTest(
      transform,
      {},
      { path: 'idempotent.tsx', source: BASIC_TRANSFORMED_OUTPUT },
      '',
      tsxTestOptions,
    );
  });

  it.each(E2E_PAIRED_PREFIXES)('%s', (prefix) => {
    runTest(__dirname, TRANSFORM_NAME, {}, prefix, tsxTestOptions);
  });
});
