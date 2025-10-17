/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { createContext, memo, useContext, useMemo } from 'react';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';

import { createThemeCssVars } from '../core/createThemeCssVars';
import type { Theme, ThemeConfig, ThemeCSSVars } from '../core/theme';
import { cx } from '../cx';

import { FramerMotionProvider, type FramerMotionProviderProps } from './FramerMotionProvider';

/* Augments csstype's Properties by adding all our theme CSS variable names. Effectively adds all theme CSS variable names as valid keys to React.CSSProperties. */
declare module 'csstype' {
  // eslint-disable-next-line no-restricted-syntax
  interface Properties extends Partial<ThemeCSSVars> {}
}

export type ThemeContextValue = Theme;

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeManagerProps = {
  display?: React.CSSProperties['display'];
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  theme: Partial<Theme>;
};

export const useThemeProviderStyles = (theme: Partial<Theme>) => {
  const style = useMemo(() => createThemeCssVars(theme), [theme]);
  return style;
};

/** Injects theme CSS variables into the DOM by calling `createThemeCssVars` via `useThemeProviderStyles`. */
const ThemeManager = memo(({ display, className, style, children, theme }: ThemeManagerProps) => {
  const themeStyles = useThemeProviderStyles(theme);
  const styles = useMemo(
    () => ({ ...themeStyles, display, ...style }),
    [themeStyles, display, style],
  );
  return (
    <div className={cx(theme.id, theme.activeColorScheme, className)} style={styles}>
      {children}
    </div>
  );
});

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

export type ThemeProviderProps = Pick<ThemeManagerProps, 'display' | 'className' | 'style'> &
  Pick<FramerMotionProviderProps, 'motionFeatures'> & {
    theme: ThemeConfig;
    activeColorScheme: ColorScheme;
    children?: React.ReactNode;
  };

export const ThemeProvider = memo(
  ({
    theme,
    activeColorScheme,
    children,
    className,
    display,
    style,
    motionFeatures,
  }: ThemeProviderProps) => {
    const themeApi = useMemo(() => {
      const activeSpectrumKey = activeColorScheme === 'dark' ? 'darkSpectrum' : 'lightSpectrum';
      const activeColorKey = activeColorScheme === 'dark' ? 'darkColor' : 'lightColor';
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

      return {
        ...theme,
        activeColorScheme: activeColorScheme,
        spectrum: theme[activeSpectrumKey],
        color: theme[activeColorKey],
      };
    }, [theme, activeColorScheme]);

    const parentTheme = useContext(ThemeContext);

    const partialTheme = useMemo(() => diffThemes(themeApi, parentTheme), [themeApi, parentTheme]);

    return (
      <FramerMotionProvider motionFeatures={motionFeatures}>
        <ThemeContext.Provider value={themeApi}>
          <ThemeManager className={className} display={display} style={style} theme={partialTheme}>
            {children}
          </ThemeManager>
        </ThemeContext.Provider>
      </FramerMotionProvider>
    );
  },
);

export type InvertedThemeProviderProps = Pick<
  ThemeManagerProps,
  'display' | 'className' | 'style'
> & {
  children?: React.ReactNode;
};

/** Falls back to the currently active colorScheme if the inverse colors are not defined in the theme.  */
export const InvertedThemeProvider = memo(
  ({ children, display, className, style }: InvertedThemeProviderProps) => {
    const context = useContext(ThemeContext);
    if (!context) throw Error('InvertedThemeProvider must be used within a ThemeProvider');
    const inverseColorScheme = context.activeColorScheme === 'dark' ? 'light' : 'dark';
    const inverseColorKey = context.activeColorScheme === 'dark' ? 'lightColor' : 'darkColor';
    const newColorScheme = context[inverseColorKey]
      ? inverseColorScheme
      : context.activeColorScheme;

    return (
      <ThemeProvider
        activeColorScheme={newColorScheme}
        className={className}
        display={display}
        style={style}
        theme={context}
      >
        {children}
      </ThemeProvider>
    );
  },
);
