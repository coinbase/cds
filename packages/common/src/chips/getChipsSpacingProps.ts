import type { ThemeVars } from '@coinbase/cds-common/core/theme';

type GetChipsSpacingPropsParams = {
  start?: boolean;
  end?: boolean;
  children?: boolean;
  compact?: boolean;
};

export const getChipsSpacingProps = ({
  compact,
  start,
  end,
  children,
}: GetChipsSpacingPropsParams): {
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
    return { padding: 1 };
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
