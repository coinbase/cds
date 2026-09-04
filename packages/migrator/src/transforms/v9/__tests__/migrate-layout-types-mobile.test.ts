import { runInlineTest, runTest } from 'jscodeshift/src/testUtils';

import { tsxTestOptions } from '../../../test-utils/codemodTestUtils';
import transform from '../migrate-layout-types-mobile';

const FIXTURE_SUITE = 'migrate-layout-types-mobile';
const TRANSFORM_NAME = 'migrate-layout-types-mobile';

/**
 * Behavioral tests are **inline**. One paired golden covers composite sheet-style props mixing
 * `SharedProps` with layout types from common (`@coinbase`).
 */

const E2E_PAIRED_PREFIXES = [`${FIXTURE_SUITE}/sheet-layout-props-from-common`] as const;

describe('migrate-layout-types-mobile', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('migrates DimensionValue, PositionStyles, and remaining common type imports', () => {
    const input = `
import type { DimensionValue, LottieStatusAnimationType, PositionStyles } from '@coinbase/cds-common/types';

export const w: DimensionValue = 10;
export const x: DimensionValue = 1;
export type P = PositionStyles;
`;

    const output = `
import type { DimensionValue } from "react-native";
import type { PositionStyles } from "@coinbase/cds-mobile/styles/styleProps";
import type { LottieStatusAnimationType } from '@coinbase/cds-common/types';

export const w: DimensionValue = 10;
export const x: DimensionValue = 1;
export type P = PositionStyles;
`;

    runInlineTest(
      transform,
      {},
      { path: 'layout-types.tsx', source: input },
      output,
      tsxTestOptions,
    );
  });

  it('makes no changes when a local DimensionValue exists and common DimensionValue is imported under an alias', () => {
    const input = `
type DimensionValue = number;

import type { DimensionValue as CdsDimensionValue } from '@coinbase/cds-common';

export const w: DimensionValue = 1;
export const x: CdsDimensionValue = 2;
`;
    runInlineTest(transform, {}, { path: 'local.tsx', source: input }, '', tsxTestOptions);
  });

  it('makes no changes when there are no cds-common layout type imports', () => {
    const input = `
import React from 'react';

export const App = () => <span>Hi</span>;
`;
    runInlineTest(transform, {}, { path: 'no-cds-common.tsx', source: input }, '', tsxTestOptions);
  });

  it('is idempotent on DimensionValue migration output', () => {
    const transformed = `
import type { DimensionValue } from "react-native";

export const w: DimensionValue = 10;
`;
    runInlineTest(transform, {}, { path: 'idem.tsx', source: transformed }, '', tsxTestOptions);
  });

  it.each(E2E_PAIRED_PREFIXES)('%s', (prefix) => {
    runTest(__dirname, TRANSFORM_NAME, {}, prefix, tsxTestOptions);
  });
});
