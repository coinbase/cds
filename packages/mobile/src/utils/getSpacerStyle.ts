import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import type { SpacerBaseProps } from '../layout/Spacer';

export const getSpacerStyle = ({
  flexGrow,
  flexShrink,
  flexBasis,
  horizontal,
  vertical,
  maxHorizontal,
  maxVertical,
  minHorizontal,
  minVertical,
  spacingScaleValues,
}: SpacerBaseProps & {
  spacingScaleValues: Record<Exclude<ThemeVars.Space, 0>, string | number>;
}) => {
  const isFixedSize = horizontal !== undefined || vertical !== undefined;

  return {
    // fixed size spacer by default should not grow or shrink.
    flexBasis: flexBasis ?? (isFixedSize ? undefined : 1),
    flexGrow: flexGrow ?? (isFixedSize ? 0 : 1),
    flexShrink: flexShrink ?? (isFixedSize ? 0 : 1),
    width: horizontal && spacingScaleValues[horizontal],
    height: vertical && spacingScaleValues[vertical],
    maxWidth: maxHorizontal && spacingScaleValues[maxHorizontal],
    maxHeight: maxVertical && spacingScaleValues[maxVertical],
    minWidth: minHorizontal && spacingScaleValues[minHorizontal],
    minHeight: minVertical && spacingScaleValues[minVertical],
  };
};
