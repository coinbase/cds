import React, { memo, useCallback, useMemo } from 'react';
import { Platform, StatusBar as RNStatusBar } from 'react-native';
import type { StatusBarProps as RNStatusBarProps } from 'react-native';
import { isLightOrDarkColor } from '@coinbase/cds-common/color/isLightOrDarkColor';

import type { Theme } from '../core/theme';
import { useTheme } from '../hooks/useTheme';

export type StatusBarProps = RNStatusBarProps & {
  theme?: Theme;
};

/**
 * If bar-style is 'dark-content' that means app has a light background with dark text and icons.
 * If bar-style is 'light-content' that means app has a dark background with light text and icons.
 */
export const useStatusBarStyle = ({ theme }: StatusBarProps | undefined = {}) => {
  const contextTheme = useTheme();
  const { bg } = theme?.color ?? contextTheme.color;
  return useMemo(() => {
    const luminosity = isLightOrDarkColor(bg);
    return luminosity === 'light' ? 'dark-content' : 'light-content';
  }, [bg]);
};

// Imperative way to update StatusBar styles
export const useStatusBarUpdater = ({ theme }: StatusBarProps | undefined = {}) => {
  const barStyle = useStatusBarStyle({ theme });
  return useCallback(() => {
    // Second argument is to ensure StatusBar style animates in
    RNStatusBar.setBarStyle(barStyle, true);
    if (Platform.OS === 'android') {
      RNStatusBar.setBackgroundColor('transparent');
      RNStatusBar.setTranslucent(true);
    }
  }, [barStyle]);
};

export const StatusBar = memo(
  ({
    animated,
    backgroundColor,
    barStyle,
    hidden,
    networkActivityIndicatorVisible,
    theme,
    showHideTransition,
    translucent,
  }: StatusBarProps) => {
    const defaultBarStyle = useStatusBarStyle({ theme });
    return (
      <RNStatusBar
        animated={animated ?? true}
        backgroundColor={backgroundColor ?? 'transparent'}
        barStyle={barStyle ?? defaultBarStyle}
        hidden={hidden}
        networkActivityIndicatorVisible={networkActivityIndicatorVisible}
        showHideTransition={showHideTransition}
        translucent={translucent ?? true}
      />
    );
  },
);

StatusBar.displayName = 'StatusBar';
