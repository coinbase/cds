import type { ThemeVars } from '@coinbase/cds-common/core/theme';

type GetMediaChipSpacingPropsParams = {
  start?: boolean;
  end?: boolean;
  children?: boolean;
  compact?: boolean;
};

export const getMediaChipSpacingProps = ({
  compact,
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
  if (!start && children && !end) {
    // children (label) only
    return compact
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
    return compact
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
    return compact
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
    return compact
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
