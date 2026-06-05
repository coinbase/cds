import type { PositionStyles } from "@coinbase/cds-web/styles/styleProps";
import type { SharedProps } from '@coinbase/cds-common/types';

type DimensionValue = string | number | 'auto';

/**
 * Composite props: `SharedProps` stays on common; `PositionStyles` + `DimensionValue` migrate
 * (overlay-style layout props).
 */
export type ModalLikeProps = SharedProps & {
  position?: PositionStyles;
  width?: DimensionValue;
};
