import 'react-native-gesture-handler';
import './src/polyfills/intl';

import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';

import App from './src/App';

// It is recommended to call this in global scope without awaiting, rather than inside React components or hooks,
// because otherwise this might be called too late, when the splash screen is already hidden.
SplashScreen.preventAutoHideAsync();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
