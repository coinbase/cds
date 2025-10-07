/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { createContext, useContext, useMemo } from 'react';
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
  theme: Theme;
};

export const useThemeProviderStyles = (theme: Theme) => {
  const style = useMemo(() => createThemeCssVars(theme), [theme]);
  return style;
};

const ThemeManager = ({ display, className, style, children, theme }: ThemeManagerProps) => {
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
};

export type ThemeProviderProps = Pick<ThemeManagerProps, 'display' | 'className' | 'style'> &
  Pick<FramerMotionProviderProps, 'motionFeatures'> & {
    theme: ThemeConfig;
    activeColorScheme: ColorScheme;
    children?: React.ReactNode;
  };

export const ThemeProvider = ({
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

    // TO DO: Link to color / theme docs in these error messages
    if (!theme[activeColorKey])
      throw Error(
        `ThemeProvider activeColorScheme is ${activeColorScheme} but no ${activeColorScheme} colors are defined for the theme`,
      );

    if (!theme[activeSpectrumKey])
      throw Error(
        `ThemeProvider activeColorScheme is ${activeColorScheme} but no ${activeSpectrumKey} values are defined for the theme`,
      );

    if (theme[inverseSpectrumKey] && !theme[inverseColorKey])
      throw Error(
        `ThemeProvider theme has ${inverseSpectrumKey} values defined but no ${inverseColorKey} colors are defined for the theme`,
      );

    if (theme[inverseColorKey] && !theme[inverseSpectrumKey])
      throw Error(
        `ThemeProvider theme has ${inverseColorKey} colors defined but no ${inverseSpectrumKey} values are defined for the theme`,
      );

    return {
      ...theme,
      activeColorScheme: activeColorScheme,
      spectrum: theme[activeSpectrumKey],
      color: theme[activeColorKey],
    };
  }, [theme, activeColorScheme]);

  return (
    <FramerMotionProvider motionFeatures={motionFeatures}>
      <ThemeContext.Provider value={themeApi}>
        <ThemeManager className={className} display={display} style={style} theme={themeApi}>
          {children}
        </ThemeManager>
      </ThemeContext.Provider>
    </FramerMotionProvider>
  );
};

export type InvertedThemeProviderProps = Pick<
  ThemeManagerProps,
  'display' | 'className' | 'style'
> & {
  children?: React.ReactNode;
};

/** Falls back to the currently active colorScheme if the inverse colors are not defined in the theme.  */
export const InvertedThemeProvider = ({
  children,
  display,
  className,
  style,
}: InvertedThemeProviderProps) => {
  const context = useContext(ThemeContext);
  if (!context) throw Error('InvertedThemeProvider must be used within a ThemeProvider');
  const inverseColorScheme = context.activeColorScheme === 'dark' ? 'light' : 'dark';
  const inverseColorKey = context.activeColorScheme === 'dark' ? 'lightColor' : 'darkColor';
  const newColorScheme = context[inverseColorKey] ? inverseColorScheme : context.activeColorScheme;

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
};
