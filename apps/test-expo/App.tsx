import React, { memo, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { PortalProvider } from '@coinbase/cds-mobile/overlays/PortalProvider';
import { StatusBar } from '@coinbase/cds-mobile/system/StatusBar';
import { ThemeProvider } from '@coinbase/cds-mobile/system/ThemeProvider';
import { defaultTheme } from '@coinbase/cds-mobile/themes/defaultTheme';
import { ChartBridgeProvider } from '@coinbase/cds-mobile-visualization';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';

import { useFonts } from './src/hooks/useFonts';
import { Playground } from './src/playground';
import { routes as codegenRoutes } from './src/routes';

const linking = {
  prefixes: [Linking.createURL('/')],
  getStateFromPath: (path: string) => ({
    routes: [{ name: path.replace(/^\//, '') }],
  }),
  // Reset the navigation stack on every deep link so that any modals or overlays
  // open on the previous screen are fully unmounted before the new route mounts.
  // Without this, React Navigation's default getActionFromState dispatches a
  // `navigate` (push) action, leaving the previous screen mounted and its modal
  // state intact.
  // The home screen (DebugExamples) is always prepended so there is always a
  // route to go back to, keeping the back button visible.
  getActionFromState: (state: { routes: { name: string }[] }) =>
    CommonActions.reset({ index: 1, routes: [{ name: 'DebugExamples' }, ...state.routes] }),
};

if (Platform.OS === 'android') {
  require('intl');
  require('intl/locale-data/jsonp/en-US');
}

const gestureHandlerStyle = { flex: 1 };

const CdsSafeAreaProvider: React.FC<React.PropsWithChildren<unknown>> = memo(({ children }) => {
  const theme = useTheme();
  const style = useMemo(() => ({ backgroundColor: theme.color.bg }), [theme.color.bg]);
  return <SafeAreaProvider style={style}>{children}</SafeAreaProvider>;
});

const App = memo(() => {
  const [fontsLoaded] = useFonts();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={gestureHandlerStyle}>
      <ChartBridgeProvider>
        <ThemeProvider activeColorScheme={colorScheme} theme={defaultTheme}>
          <CdsSafeAreaProvider>
            <PortalProvider>
              <StatusBar hidden={!__DEV__} />
              <NavigationContainer linking={linking}>
                <Playground routes={codegenRoutes} setColorScheme={setColorScheme} />
              </NavigationContainer>
            </PortalProvider>
          </CdsSafeAreaProvider>
        </ThemeProvider>
      </ChartBridgeProvider>
    </GestureHandlerRootView>
  );
});

export default App;
