import React from 'react';
import type { ColorScheme } from '@cbhq/cds-common/core/theme';

import type { ThemeConfig } from '../core/theme';
import { ThemeProvider } from '../system/ThemeProvider';
import { defaultTheme } from '../themes/defaultTheme';

export const SAFE_AREA_METRICS = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

type DefaultThemeProviderProps = {
  children?: React.ReactNode;
  theme?: ThemeConfig;
  activeColorScheme?: ColorScheme;
};

export const theme = defaultTheme;

export const DefaultThemeProvider = ({
  children,
  theme = defaultTheme,
  activeColorScheme = 'light',
}: DefaultThemeProviderProps) => {
  return (
    <ThemeProvider activeColorScheme={activeColorScheme} theme={theme}>
      {children}
    </ThemeProvider>
  );
};
