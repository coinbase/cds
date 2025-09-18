import { type ThemeConfig } from '../core/theme';
import { light } from '../styles/spectrum';
import * as vars from '../styles/vars';

import { lightColorTheme } from './subthemes/color/light';
import { normalDensityTheme } from './subthemes/density/normal';
import { lightIllustrationColorTheme } from './subthemes/illustrationColor/light';

export const lightTheme = {
  spectrum: light,
  ...lightColorTheme,
  ...lightIllustrationColorTheme,
  ...normalDensityTheme,
  borderWidth: vars.borderWidth,
  borderRadius: vars.borderRadius,
  fontFamily: vars.fontFamily,
  fontSize: vars.fontSize,
  fontWeight: vars.fontWeight,
  lineHeight: vars.lineHeight,
  shadow: vars.shadow,
  zIndex: vars.zIndex,
} as const satisfies ThemeConfig;
