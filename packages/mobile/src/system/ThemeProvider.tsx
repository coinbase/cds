import React, { createContext, memo, useContext, useMemo } from 'react';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';

import type { Theme, ThemeConfig } from '../core/theme';
import { defaultTheme } from '../themes/defaultTheme';

export type ThemeContextValue = Theme;

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Not used for any theme optimizations in the mobile ThemeProvider, but exported for feature-parity with cds-web
/**
 * Diff two themes and return a new partial theme with only the differences.
 */
export const diffThemes = (theme: Theme, parentTheme?: Theme) => {
  if (!parentTheme) return theme;
  const themeDiff = {
    id: theme.id,
    activeColorScheme: theme.activeColorScheme,
  } as Record<keyof Theme, any>;
  (Object.keys(theme) as (keyof Theme)[]).forEach((key) => {
    if (key === 'id' || key === 'activeColorScheme') return;
    themeDiff[key] = {};
    Object.keys(theme[key] ?? {}).forEach((value) => {
      if ((theme[key] as any)?.[value] !== (parentTheme[key] as any)?.[value]) {
        themeDiff[key][value] = (theme[key] as any)[value];
      }
    });
  });
  return themeDiff as Partial<Theme>;
};

export type ThemeProviderProps = {
  theme: ThemeConfig;
  activeColorScheme: ColorScheme;
  children?: React.ReactNode;
};

export const ThemeProvider = memo(({ theme, activeColorScheme, children }: ThemeProviderProps) => {
  const themeApi = useMemo(() => {
    const activeSpectrumKey = activeColorScheme === 'dark' ? 'darkSpectrum' : 'lightSpectrum';
    const activeColorKey = activeColorScheme === 'dark' ? 'darkColor' : 'lightColor';
    const activeIllustrationKey =
      activeColorScheme === 'dark' ? 'darkIllustrationColor' : 'lightIllustrationColor';
    const inverseSpectrumKey = activeColorScheme === 'dark' ? 'lightSpectrum' : 'darkSpectrum';
    const inverseColorKey = activeColorScheme === 'dark' ? 'lightColor' : 'darkColor';

    if (!theme[activeColorKey])
      throw Error(
        `ThemeProvider activeColorScheme is ${activeColorScheme} but no ${activeColorScheme} colors are defined for the theme. See the docs https://cds.coinbase.com/getting-started/theming`,
      );

    if (!theme[activeSpectrumKey])
      throw Error(
        `ThemeProvider activeColorScheme is ${activeColorScheme} but no ${activeSpectrumKey} values are defined for the theme. See the docs https://cds.coinbase.com/getting-started/theming`,
      );

    if (theme[inverseSpectrumKey] && !theme[inverseColorKey])
      throw Error(
        `ThemeProvider theme has ${inverseSpectrumKey} values defined but no ${inverseColorKey} colors are defined for the theme. See the docs https://cds.coinbase.com/getting-started/theming`,
      );

    if (theme[inverseColorKey] && !theme[inverseSpectrumKey])
      throw Error(
        `ThemeProvider theme has ${inverseColorKey} colors defined but no ${inverseSpectrumKey} values are defined for the theme. See the docs https://cds.coinbase.com/getting-started/theming`,
      );

    // All illustration tokens are optional; fill in any omitted tokens from defaultTheme.
    const consumerIllustrationColor = theme[activeIllustrationKey];
    const illustrationColor = consumerIllustrationColor
      ? { ...defaultTheme[activeIllustrationKey], ...consumerIllustrationColor }
      : undefined;

    return {
      ...theme,
      activeColorScheme: activeColorScheme,
      spectrum: theme[activeSpectrumKey],
      color: theme[activeColorKey],
      illustrationColor,
    };
  }, [theme, activeColorScheme]);

  return <ThemeContext.Provider value={themeApi}>{children}</ThemeContext.Provider>;
});

export type InvertedThemeProviderProps = {
  children?: React.ReactNode;
};

/** Falls back to the currently active colorScheme if the inverse colors are not defined in the theme.  */
export const InvertedThemeProvider = memo(({ children }: InvertedThemeProviderProps) => {
  const context = useContext(ThemeContext);
  if (!context) throw Error('InvertedThemeProvider must be used within a ThemeProvider');
  const inverseColorScheme = context.activeColorScheme === 'dark' ? 'light' : 'dark';
  const inverseColorKey = context.activeColorScheme === 'dark' ? 'lightColor' : 'darkColor';
  const newColorScheme = context[inverseColorKey] ? inverseColorScheme : context.activeColorScheme;

  return (
    <ThemeProvider activeColorScheme={newColorScheme} theme={context}>
      {children}
    </ThemeProvider>
  );
});
