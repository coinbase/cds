import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ColorScheme, ThemeVars } from '@coinbase/cds-common/core/theme';
import type { ThemeConfig } from '@coinbase/cds-web/core/theme';
import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';
import { useColorMode } from '@docusaurus/theme-common';
import { docsTheme } from '@site/src/constants';
import type { Property } from 'csstype';
import { themes as prismThemes } from 'prism-react-renderer';

export type ThemeOption = {
  id: string;
  label: string;
  light: { [key in ThemeVars.Color]?: Property.Color };
  dark: { [key in ThemeVars.Color]?: Property.Color };
};

export type UnifiedThemeContextValue = {
  /** The activeColorScheme for the docs ThemeProvider */
  docsColorScheme: ColorScheme;
  /** Set the activeColorScheme for the docs ThemeProvider */
  setDocsColorScheme: (scheme: ColorScheme) => void;
  /** The theme for the docs ThemeProvider */
  docsTheme: ThemeConfig;
  /** The activeColorScheme for the code playground ThemeProvider */
  playgroundColorScheme: ColorScheme;
  /** Set the activeColorScheme for the code playground ThemeProvider */
  setPlaygroundColorScheme: (scheme: ColorScheme) => void;
  /** The theme for the code playground ThemeProvider */
  playgroundTheme: ThemeConfig;
  /** Set the activeColorScheme for both the docs ThemeProvider and the code playground ThemeProvider */
  setUnifiedColorScheme: (scheme: ColorScheme) => void;
  /** The themeOption for the code playground ThemeProvider */
  themeOption: ThemeOption;
  /** Set the themeOption for the code playground ThemeProvider */
  setThemeOption: (option: ThemeOption) => void;
};

export const themeOptions: ThemeOption[] = [
  {
    id: 'blue',
    label: 'Blue theme',
    light: {
      bgPrimary: `rgb(${defaultTheme.lightSpectrum.blue50})`,
      bgPrimaryWash: defaultTheme.lightColor.accentSubtleBlue,
      fgPrimary: `rgb(${defaultTheme.lightSpectrum.blue50})`,
    },
    dark: {
      bgPrimary: `rgb(${defaultTheme.darkSpectrum.blue70})`,
      bgPrimaryWash: defaultTheme.darkColor.accentSubtleBlue,
      fgPrimary: `rgb(${defaultTheme.darkSpectrum.blue70})`,
    },
  },
  {
    id: 'green',
    label: 'Green theme',
    light: {
      bgPrimary: `rgb(${defaultTheme.lightSpectrum.green50})`,
      bgPrimaryWash: defaultTheme.lightColor.accentSubtleGreen,
      fgPrimary: `rgb(${defaultTheme.lightSpectrum.green50})`,
    },
    dark: {
      bgPrimary: `rgb(${defaultTheme.darkSpectrum.green60})`,
      bgPrimaryWash: defaultTheme.darkColor.accentSubtleGreen,
      fgPrimary: `rgb(${defaultTheme.darkSpectrum.green60})`,
    },
  },
  {
    id: 'red',
    label: 'Red theme',
    light: {
      bgPrimary: `rgb(${defaultTheme.lightSpectrum.red50})`,
      bgPrimaryWash: defaultTheme.lightColor.accentSubtleRed,
      fgPrimary: `rgb(${defaultTheme.lightSpectrum.red50})`,
    },
    dark: {
      bgPrimary: `rgb(${defaultTheme.darkSpectrum.red60})`,
      bgPrimaryWash: defaultTheme.darkColor.accentSubtleRed,
      fgPrimary: `rgb(${defaultTheme.darkSpectrum.red60})`,
    },
  },
  {
    id: 'purple',
    label: 'Purple theme',
    light: {
      bgPrimary: `rgb(${defaultTheme.lightSpectrum.purple50})`,
      bgPrimaryWash: defaultTheme.lightColor.accentSubtlePurple,
      fgPrimary: `rgb(${defaultTheme.lightSpectrum.purple50})`,
    },
    dark: {
      bgPrimary: `rgb(${defaultTheme.darkSpectrum.purple60})`,
      bgPrimaryWash: defaultTheme.darkColor.accentSubtlePurple,
      fgPrimary: `rgb(${defaultTheme.darkSpectrum.purple60})`,
    },
  },
] as const;

const UnifiedThemeContext = createContext<UnifiedThemeContextValue | undefined>(undefined);

export const useUnifiedTheme = () => {
  const context = useContext(UnifiedThemeContext);
  if (!context) throw Error('useUnifiedTheme must be used within a UnifiedThemeProvider');
  return context;
};

export const useDocsTheme = () => {
  const { docsColorScheme, setDocsColorScheme, docsTheme } = useUnifiedTheme();
  return {
    colorScheme: docsColorScheme,
    setColorScheme: setDocsColorScheme,
    theme: docsTheme,
  };
};

export const usePlaygroundTheme = () => {
  const { playgroundColorScheme, setPlaygroundColorScheme, playgroundTheme } = useUnifiedTheme();
  const prismTheme = playgroundColorScheme === 'dark' ? prismThemes.nightOwl : prismThemes.github;
  return {
    colorScheme: playgroundColorScheme,
    setColorScheme: setPlaygroundColorScheme,
    theme: playgroundTheme,
    prismTheme,
  };
};

type UnifiedThemeProviderProps = {
  children: React.ReactNode;
  baseDocsTheme?: ThemeConfig;
  basePlaygroundTheme?: ThemeConfig;
};

const colorSchemeStorageKey = 'cdsColorScheme';
const defaultColorScheme = 'dark';

export const UnifiedThemeProvider = ({
  children,
  baseDocsTheme = docsTheme,
  basePlaygroundTheme = defaultTheme,
}: UnifiedThemeProviderProps) => {
  const { setColorMode } = useColorMode();
  const [docsColorScheme, setDocsColorScheme] = useState<ColorScheme>(defaultColorScheme);
  const [themeOption, setThemeOption] = useState<ThemeOption>(themeOptions[0]);
  const [playgroundColorScheme, setPlaygroundColorScheme] = useState<ColorScheme>(docsColorScheme);

  const docsThemeWithOption: ThemeConfig = useMemo(() => {
    return {
      ...baseDocsTheme,
      lightColor: {
        ...defaultTheme.lightColor,
        ...baseDocsTheme.lightColor,
        ...themeOption.light,
      },
      darkColor: {
        ...defaultTheme.darkColor,
        ...baseDocsTheme.darkColor,
        ...themeOption.dark,
      },
    } satisfies ThemeConfig;
  }, [baseDocsTheme, themeOption]);

  const playgroundThemeWithOption: ThemeConfig = useMemo(() => {
    return {
      ...basePlaygroundTheme,
      lightColor: {
        ...defaultTheme.lightColor,
        ...basePlaygroundTheme.lightColor,
        ...themeOption.light,
      },
      darkColor: {
        ...defaultTheme.darkColor,
        ...basePlaygroundTheme.darkColor,
        ...themeOption.dark,
      },
    } satisfies ThemeConfig;
  }, [basePlaygroundTheme, themeOption]);

  /** Sets the docsColorScheme and saves the value to localStorage */
  const updateDocsColorScheme = useCallback(
    (colorScheme: ColorScheme) => {
      localStorage.setItem(colorSchemeStorageKey, colorScheme);
      setDocsColorScheme(colorScheme);
      // Keep Docusaurus' colorMode in sync with the colorScheme, this affects
      // whether Docusaurus default styles are in light or dark mode.
      setColorMode(colorScheme);
    },
    [setDocsColorScheme, setColorMode],
  );

  /** Sets the docsColorScheme and saves the value to localStorage, then sets the playgroundColorScheme */
  const updateUnifiedColorScheme = useCallback(
    (colorScheme: ColorScheme) => {
      updateDocsColorScheme(colorScheme);
      setPlaygroundColorScheme(colorScheme);
    },
    [updateDocsColorScheme],
  );

  /** Sets the docsColorScheme and the playgroundColorScheme, without saving to localStorage */
  const updateInitialColorScheme = useCallback(
    (colorScheme: ColorScheme) => {
      setDocsColorScheme(colorScheme);
      // Keep Docusaurus' colorMode in sync with the colorScheme, this affects
      // whether Docusaurus default styles are in light or dark mode.
      setColorMode(colorScheme);
      setPlaygroundColorScheme(colorScheme);
    },
    [setColorMode],
  );

  /** Ensures the docsColorScheme matches the colorScheme preference from localStorage */
  useEffect(() => {
    const localColorScheme = localStorage.getItem(colorSchemeStorageKey) ?? defaultColorScheme;
    updateInitialColorScheme(localColorScheme as ColorScheme);
  }, [updateInitialColorScheme]);

  const api = useMemo<UnifiedThemeContextValue>(
    () => ({
      docsColorScheme,
      setDocsColorScheme: updateDocsColorScheme,
      docsTheme: docsThemeWithOption,
      playgroundColorScheme,
      setPlaygroundColorScheme,
      playgroundTheme: playgroundThemeWithOption,
      setUnifiedColorScheme: updateUnifiedColorScheme,
      themeOption,
      setThemeOption,
    }),
    [
      docsColorScheme,
      updateDocsColorScheme,
      docsThemeWithOption,
      playgroundColorScheme,
      playgroundThemeWithOption,
      updateUnifiedColorScheme,
      themeOption,
    ],
  );

  return <UnifiedThemeContext.Provider value={api}>{children}</UnifiedThemeContext.Provider>;
};
