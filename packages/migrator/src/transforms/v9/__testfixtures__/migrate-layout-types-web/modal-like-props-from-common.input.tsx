import type { DimensionValue, PositionStyles, SharedProps } from '@coinbase/cds-common/types';

/**
 * Composite props: `SharedProps` stays on common; `PositionStyles` + `DimensionValue` migrate
 * (overlay-style layout props).
 */
export type ModalLikeProps = SharedProps & {
  position?: PositionStyles;
  width?: DimensionValue;
};
