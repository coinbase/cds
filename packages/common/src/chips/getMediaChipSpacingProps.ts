import type { ThemeVars } from '@coinbase/cds-common/core/theme';

export type ChipSizeCommon = 'xs' | 's';

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
}: GetMediaChipSpacingPropsParams): {
  paddingX?: ThemeVars.Space;
  paddingY?: ThemeVars.Space;
  padding?: ThemeVars.Space;
  paddingStart?: ThemeVars.Space;
  paddingEnd?: ThemeVars.Space;
  paddingTop?: ThemeVars.Space;
  paddingBottom?: ThemeVars.Space;
  gap?: ThemeVars.Space;
} => {
  const resolvedSize = size ?? (compact ? 'xs' : 's'); // size wins; compact is the fallback
  const isXs = resolvedSize === 'xs';

  if (!start && children && !end) {
    // children (label) only
    return isXs
      ? {
          paddingX: 1.5,
          paddingY: 0.75,
        }
      : {
          paddingX: 2,
          paddingY: 1,
        };
  }
  if (start && !children && !end) {
    // start (media) only
    return { paddingY: 1, paddingX: 1 };
  }
  if (start && !children && end) {
    // start (media) and end (icon) only
    return {
      paddingStart: 1,
      paddingY: 1,
      paddingEnd: 1.5,
      gap: 0.75,
    };
  }
  if (start && children && !end) {
    // start (media) and children (label) only
    return isXs
      ? {
          paddingStart: 1,
          paddingY: 0.75,
          paddingEnd: 1.5,
          gap: 0.75,
        }
      : {
          paddingStart: 1,
          paddingY: 1,
          paddingEnd: 2,
          gap: 0.75,
        };
  }
  if (!start && children && end) {
    // children (label) and end (icon) only
    return isXs
      ? {
          paddingStart: 1.5,
          paddingY: 0.75,
          paddingEnd: 1.5,
          gap: 0.75,
        }
      : {
          paddingStart: 2,
          paddingY: 1,
          paddingEnd: 1.5,
          gap: 0.75,
        };
  }
  if (start && children && end) {
    // start (media) and children (label) and end (icon) only
    return isXs
      ? {
          paddingStart: 1,
          paddingY: 0.75,
          paddingEnd: 1.5,
          gap: 0.75,
        }
      : {
          paddingStart: 1,
          paddingY: 1,
          paddingEnd: 1.5,
          gap: 0.75,
        };
  }
  return {};
};
