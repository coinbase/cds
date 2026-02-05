import { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import {
  SourceCodePro_400Regular,
  SourceCodePro_600SemiBold,
} from '@expo-google-fonts/source-code-pro';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@coinbase/cds-mobile/system/ThemeProvider';
import { defaultTheme } from '@coinbase/cds-mobile/themes/defaultTheme';
import { Text } from '@coinbase/cds-mobile/typography';
import { VStack } from '@coinbase/cds-mobile/layout';
import { Button } from '@coinbase/cds-mobile/buttons';
import { RollingNumber } from '@coinbase/cds-mobile/numbers';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    SourceCodePro_400Regular,
    SourceCodePro_600SemiBold,
  });

  const [number, setNumber] = useState(1000);

  const handlePress = useCallback(() => {
    setNumber(Math.floor(Math.random() * 10000));
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <VStack
              gap={4}
              padding={4}
              alignItems="center"
              justifyContent="center"
              style={{ flex: 1 }}
            >
              <Text font="display1">CDS Demo</Text>
              <RollingNumber value={number} font="title1" />
              <Button onPress={handlePress}>Generate Number</Button>
            </VStack>
            <StatusBar style="auto" />
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
