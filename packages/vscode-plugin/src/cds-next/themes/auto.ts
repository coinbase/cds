import { type ThemeConfig } from '../core/theme';
import { dark } from '../styles/spectrum';

import { darkColorTheme } from './subthemes/color/dark';
import { darkIllustrationColorTheme } from './subthemes/illustrationColor/dark';
import { lightTheme } from './light';

// '@media (prefers-contrast: more)'
// '@media (prefers-contrast: more) and (prefers-color-scheme: dark)'

export const autoTheme = {
  ...lightTheme,
  '@media (prefers-color-scheme: dark)': {
    spectrum: dark,
    ...darkColorTheme,
    ...darkIllustrationColorTheme,
  },
} as const satisfies ThemeConfig;
