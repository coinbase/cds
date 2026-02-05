import React, { memo, useState } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';
import { PortalProvider } from '@coinbase/cds-mobile/overlays/PortalProvider';
import { ChartBridgeProvider } from '@coinbase/cds-mobile-visualization';
import { StatusBar } from '@coinbase/cds-mobile/system/StatusBar';
import { ThemeProvider } from '@coinbase/cds-mobile/system/ThemeProvider';
import { defaultTheme } from '@coinbase/cds-mobile/themes/defaultTheme';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';

import { useFonts } from './src/hooks/useFonts';
import { Playground } from './src/playground';
import { routes as codegenRoutes } from './src/routes';

const linking = {
  prefixes: [Linking.createURL('/')],
};

if (Platform.OS === 'android') {
  require('intl');
  require('intl/locale-data/jsonp/en-US');
}

const gestureHandlerStyle = { flex: 1 };

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
          <SafeAreaProvider>
            <PortalProvider>
              <StatusBar hidden={!__DEV__} />
              <NavigationContainer linking={linking}>
                <Playground routes={codegenRoutes} setColorScheme={setColorScheme} />
              </NavigationContainer>
            </PortalProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </ChartBridgeProvider>
    </GestureHandlerRootView>
  );
});

export default App;
