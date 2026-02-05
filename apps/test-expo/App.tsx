import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import {
  SourceCodePro_400Regular,
  SourceCodePro_600SemiBold,
} from '@expo-google-fonts/source-code-pro';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '@coinbase/cds-mobile/system/ThemeProvider';
import { defaultTheme } from '@coinbase/cds-mobile/themes/defaultTheme';

import { HomeScreen } from './screens/HomeScreen';
import { RandomNumberDemoScreen } from './screens/RandomNumberDemoScreen';
import { ModalDemoScreen } from './screens/ModalDemoScreen';

export type RootStackParamList = {
  Home: undefined;
  RandomNumberDemo: undefined;
  ModalDemo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    SourceCodePro_400Regular,
    SourceCodePro_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'CDS Demo' }}
              />
              <Stack.Screen
                name="RandomNumberDemo"
                component={RandomNumberDemoScreen}
                options={{ title: 'Rolling Number' }}
              />
              <Stack.Screen
                name="ModalDemo"
                component={ModalDemoScreen}
                options={{ title: 'Modal' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
