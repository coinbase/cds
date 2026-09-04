import { useMemo } from 'react';
import { defaultSpacingConfig } from '@coinbase/cds-common/tokens/cell';

import type { CellSpacing } from '../cells/Cell';

export const innerDefaults = defaultSpacingConfig.innerSpacing;
export const outerDefaults = defaultSpacingConfig.outerSpacing;

export type UseCellSpacingParams = {
  innerSpacing?: CellSpacing;
  outerSpacing?: CellSpacing;
};
/**
 * Takes the inner and outerSpacing props from the Cell component and merges with their default values.
 */
export function useCellSpacing({
  innerSpacing,
  outerSpacing,
}: UseCellSpacingParams | undefined = {}) {
  return useMemo(
    () =>
      ({
        inner: {
          ...innerDefaults,
          paddingX: innerSpacing?.padding ?? innerDefaults.paddingX,
          paddingY: innerSpacing?.padding ?? innerDefaults.paddingY,
          ...innerSpacing,
        },
        outer: {
          ...outerDefaults,
          paddingX: outerSpacing?.padding ?? outerDefaults.paddingX,
          paddingY: outerSpacing?.padding ?? outerDefaults.paddingY,
          ...outerSpacing,
        },
      }) as const,
    [innerSpacing, outerSpacing],
  );
}
