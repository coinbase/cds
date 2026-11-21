import {
  type ChipSizeCommon,
  MEDIA_CHIP_SPACING,
  type MediaChipSpacing,
} from '../tokens/chip';

export type { ChipSizeCommon };

type GetMediaChipSpacingPropsParams = {
  start?: boolean;
  end?: boolean;
  children?: boolean;
  /**
   * Retained for backward compatibility; when `size` is omitted it is derived from `compact`.
   * @deprecated Pass `size` instead. This will be removed in a future major release.
   * @deprecationExpectedRemoval v11
   */
  compact?: boolean;
  size?: ChipSizeCommon;
};

export const getMediaChipSpacingProps = ({
  compact,
  size,
  start,
  end,
  children,
}: GetMediaChipSpacingPropsParams): MediaChipSpacing => {
  const resolvedSize: ChipSizeCommon = size ?? (compact ? 'xs' : 's'); // size wins; compact is the fallback
  const spacing = MEDIA_CHIP_SPACING[resolvedSize];

  if (!start && children && !end) return spacing.labelOnly;
  if (start && !children && !end) return spacing.startOnly;
  if (start && !children && end) return spacing.startAndEnd;
  if (start && children && !end) return spacing.startAndLabel;
  if (!start && children && end) return spacing.labelAndEnd;
  if (start && children && end) return spacing.all;
  return {};
};
