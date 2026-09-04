// Theme variable arrays for the StickerSheet component
// These define the available values in the theme configuration

import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { BannerVariant, ButtonVariant, TagColorScheme } from '@coinbase/cds-common/types';

// From ThemeVarsDefault.Space: 0, 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10
export const space: ThemeVars.Space[] = [0, 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// From ThemeVarsDefault.IconSize: xs, s, m, l
export const iconSizes: ThemeVars.IconSize[] = ['xs', 's', 'm', 'l'];

// From ThemeVarsDefault.AvatarSize: s, m, l, xl, xxl, xxxl
export const avatarSizes: ThemeVars.AvatarSize[] = ['s', 'm', 'l', 'xl', 'xxl', 'xxxl'];

// From ThemeVarsDefault.BorderRadius: 0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000
export const borderRadii: ThemeVars.BorderRadius[] = [
  0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
];

export const borderWidths: ThemeVars.BorderWidth[] = [0, 100, 200, 300, 400, 500];

export const buttonVariants: ButtonVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'positive',
  'negative',
  'foregroundMuted',
];

export const tagColorSchemes: TagColorScheme[] = [
  'blue',
  'green',
  'yellow',
  'purple',
  'red',
  'gray',
];

export const bannerVariants: BannerVariant[] = ['informational', 'promotional', 'warning', 'error'];

export const spectrumHues: ThemeVars.SpectrumHue[] = [
  'blue',
  'green',
  'orange',
  'yellow',
  'gray',
  'indigo',
  'pink',
  'purple',
  'red',
  'teal',
  'chartreuse',
];

export const spectrumHueSteps: ThemeVars.SpectrumHueStep[] = [
  0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100,
];
