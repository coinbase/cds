import type { ThemeConfig } from '@coinbase/cds-web/core/theme';
import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';

export const DESKTOP_BREAKPOINT = 1280;

export const docsTheme = {
  ...defaultTheme,
  lightColor: {
    ...defaultTheme.lightColor,
    bgAlternate: `rgb(${defaultTheme.lightSpectrum.gray5})`, // instead of gray10
  },
  darkColor: {
    ...defaultTheme.darkColor,
    bg: `rgb(${defaultTheme.darkSpectrum.gray10})`, // instead of gray0
    bgSecondary: `rgb(${defaultTheme.darkSpectrum.gray20})`, // instead of gray15
  },
} as const satisfies ThemeConfig;
