import type { IconName, ThemeVars } from '..';

import { gutter } from './sizing';

export const mediaSize = 32;

// Height of the inner cell without padding
export const imageSize = 48;

export const pictogramScaleMultiplier = 1;

export const listHeight = 80;

export const compactListHeight = 40;

/** Spacing configs for Cells to be parsed in [web/mobile]/hooks/useCellSpacing */

/** Default spacing config */
export const defaultSpacingConfig = {
  innerSpacing: {
    paddingX: 2,
    paddingY: 1,
    marginX: -2,
  },
  outerSpacing: {
    paddingX: gutter,
    paddingY: 1,
    marginX: 0,
  },
} as const;

export const selectOptionHeight = 56;

export const cellPriorities = ['start', 'middle', 'end'] as const;

export const cellHelperTextVariants: Record<
  'information' | 'warning' | 'error',
  {
    iconName: IconName;
    color: ThemeVars.Color;
  }
> = {
  information: {
    iconName: 'info',
    color: 'fgMuted',
  },
  warning: {
    iconName: 'warning',
    color: 'fgWarning',
  },
  error: {
    iconName: 'error',
    color: 'fgNegative',
  },
};
