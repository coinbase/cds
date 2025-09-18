import type { CellSpacingConfig, InputVariant } from '../types';

import { gutter } from './sizing';

export const labelTextColor: InputVariant = 'foreground';

/** Spacing config for Select Option (web) */
export const selectCellSpacingConfig: CellSpacingConfig = {
  outerSpacing: { paddingX: 0, paddingY: 0 },
  innerSpacing: { marginX: 0, paddingX: 2 },
};

/** Spacing config for Select Option (mobile) */
export const selectCellMobileSpacingConfig: CellSpacingConfig = {
  outerSpacing: { paddingX: 0, paddingY: 0 },
  innerSpacing: { marginX: 0, paddingX: gutter },
};
