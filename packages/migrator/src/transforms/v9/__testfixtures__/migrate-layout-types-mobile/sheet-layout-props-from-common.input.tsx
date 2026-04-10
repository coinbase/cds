import type { DimensionValue, PositionStyles, SharedProps } from '@coinbase/cds-common/types';

/** Composite sheet-style props mixing `SharedProps` with layout types from common (`@coinbase`). */
export type BottomSheetLayoutProps = SharedProps & {
  maxHeight?: DimensionValue;
  contentInset?: PositionStyles;
};
