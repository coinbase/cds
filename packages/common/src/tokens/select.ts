import type { CellSpacingConfig } from '../types/CellBaseProps';
import type { InputVariant } from '../types/InputBaseProps';

import { gutter } from './sizing';

export const labelTextColor: InputVariant = 'foreground';

/** Spacing config for Select Option (web) */
export const selectCellSpacingConfig: CellSpacingConfig = {
  outerSpacing: { paddingX: 0, paddingY: 0 },
  innerSpacing: { marginX: 0, paddingX: 3 },
};

/** Spacing config for Select Option (mobile) */
export const selectCellMobileSpacingConfig: CellSpacingConfig = {
  outerSpacing: { paddingX: 0, paddingY: 0 },
  innerSpacing: { marginX: 0, paddingX: gutter },
};
