import { type ThemeConfig } from '../core/theme';
import { dark } from '../styles/spectrum';
import * as vars from '../styles/vars';

import { darkColorTheme } from './subthemes/color/dark';
import { normalDensityTheme } from './subthemes/density/normal';
import { darkIllustrationColorTheme } from './subthemes/illustrationColor/dark';

export const darkTheme = {
  spectrum: dark,
  ...darkColorTheme,
  ...darkIllustrationColorTheme,
  ...normalDensityTheme,
  borderWidth: vars.borderWidth,
  borderRadius: vars.borderRadius,
  shadow: vars.shadow,
  zIndex: vars.zIndex,
} as const satisfies ThemeConfig;
