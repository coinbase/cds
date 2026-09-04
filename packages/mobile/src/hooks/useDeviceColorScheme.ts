import { useEffect, useState } from 'react';
import { Appearance, Platform, useColorScheme } from 'react-native';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';

import { useAppState } from './useAppState';

/** Update device preference on app state change for Android. React Native's useColorScheme does not seem to fire on Android on App State change - this fixes that. */
export const useDeviceColorScheme = (): ColorScheme => {
  const appState = useAppState();
  const colorSchemeSubscription = useColorScheme();
  const [devicePreference, setDevicePreference] = useState(colorSchemeSubscription);

  const isAndroid = Platform.OS === 'android';

  useEffect(() => {
    // There is a bug with the useColorScheme on RN 0.65.2 that fires dark once the app becomes inactive
    // we only want to set the device preference when the app is active.

    if (appState === 'active') {
      if (isAndroid) {
        const colorScheme = Appearance.getColorScheme();
        setDevicePreference(colorScheme);
        return;
      }

      setDevicePreference(colorSchemeSubscription);
    }
  }, [colorSchemeSubscription, appState, isAndroid]);

  return devicePreference ?? 'light';
};
