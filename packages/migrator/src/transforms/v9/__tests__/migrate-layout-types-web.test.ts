import { runInlineTest, runTest } from 'jscodeshift/src/testUtils';

import { tsxTestOptions } from '../../../test-utils/codemodTestUtils';
import transform from '../migrate-layout-types-web';

const FIXTURE_SUITE = 'migrate-layout-types-web';
const TRANSFORM_NAME = 'migrate-layout-types-web';

/**
 * Behavioral tests are **inline**. One paired golden covers composite overlay-style props
 * (`SharedProps` + `PositionStyles` + `DimensionValue` from common).
 */

const LAYOUT_TYPES_INPUT = `
import type { DimensionValue, LottieStatusAnimationType, PositionStyles } from '@coinbase/cds-common/types';

export const w: DimensionValue = 10;
export const x: DimensionValue = 1;
export type P = PositionStyles;
`;

const LAYOUT_TYPES_OUTPUT = `
import type { PositionStyles } from "@coinbase/cds-web/styles/styleProps";
import type { LottieStatusAnimationType } from '@coinbase/cds-common/types';

type DimensionValue = string | number | 'auto';

export const w: DimensionValue = 10;
export const x: DimensionValue = 1;
export type P = PositionStyles;
`;

const E2E_PAIRED_PREFIXES = [`${FIXTURE_SUITE}/modal-like-props-from-common`] as const;

describe('migrate-layout-types-web', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('migrates DimensionValue, PositionStyles, and remaining common type imports', () => {
    runInlineTest(
      transform,
      {},
      { path: 'layout-types.tsx', source: LAYOUT_TYPES_INPUT },
      LAYOUT_TYPES_OUTPUT,
      tsxTestOptions,
    );
  });

  it('makes no changes when a local DimensionValue exists and common DimensionValue is imported under an alias', () => {
    const input = `
type DimensionValue = string;

import type { DimensionValue as CdsDimensionValue } from '@coinbase/cds-common';

export const w: DimensionValue = 'x';
export const x: CdsDimensionValue = 'y';
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
type DimensionValue = string | number | 'auto';

export const w: DimensionValue = 10;
`;
    runInlineTest(transform, {}, { path: 'idem.tsx', source: transformed }, '', tsxTestOptions);
  });

  it.each(E2E_PAIRED_PREFIXES)('%s', (prefix) => {
    runTest(__dirname, TRANSFORM_NAME, {}, prefix, tsxTestOptions);
  });
});
