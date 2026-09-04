import { memo, useCallback, useLayoutEffect, useRef } from 'react';
import { Platform } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { colorToHex } from '@coinbase/cds-common/color/colorToHex';

import type { Theme } from '../core/theme';
import { useTheme } from '../hooks/useTheme';

import { useStatusBarStyle } from './StatusBar';

export type AndroidNavigationBarProps = {
  theme?: Theme;
};

export const useAndroidNavigationBarUpdater = ({
  theme,
}: AndroidNavigationBarProps | undefined = {}) => {
  const statusBarStyle = useStatusBarStyle({ theme });
  const contextTheme = useTheme();
  const { bg } = theme?.color ?? contextTheme.color;
  return useCallback(() => {
    // Don't change the navigation bar color on Android 7 (API 25) or lower.
    // On these versions, Android doesn't support changing the color of the navigation bar icons, meaning
    // we risk having a light colored navigation bar with the default white icons.
    if (Platform.OS === 'android' && Platform.Version > 25) {
      return changeNavigationBarColor(
        // All palette values are in rgba and color has to be converted to hex.
        colorToHex(bg),
        // dark-content means light background
        statusBarStyle === 'dark-content',
        true,
      );
    }
    return undefined;
  }, [bg, statusBarStyle]);
};

/**
 * Updates the **Android system navigation bar** (bottom bar) colors to match the active CDS theme.
 *
 * This component is **side-effect only** (renders `null`). When mounted, it sets:
 * - **navigation bar background color** to the theme background (`theme.color.bg`)
 * - **navigation bar icon brightness** (light/dark) based on the computed status bar style
 *
 * ### When to use
 * - Your app wants the Android navigation bar to visually match the CDS theme (light/dark)
 * - You intentionally want an opaque navigation bar that matches your app background (non edge-to-edge look).
 *
 * ### When NOT to use
 * - Your app already manages system bars via another library/app-level integration.
 * - You intentionally want to keep the OS default navigation bar styling.
 * - You are using Android edge-to-edge defaults (transparent system bars / scrims) and want the platform to
 *   manage navigation bar transparency + contrast automatically.
 */
export const AndroidNavigationBar = memo((props: AndroidNavigationBarProps) => {
  const updateAndroidNavigationBar = useAndroidNavigationBarUpdater(props);
  const hasRun = useRef(false);
  useLayoutEffect(() => {
    if (hasRun.current || Platform.OS === 'ios') return;
    updateAndroidNavigationBar();
  }, [updateAndroidNavigationBar]);

  return null;
});

AndroidNavigationBar.displayName = 'AndroidNavigationBar';
