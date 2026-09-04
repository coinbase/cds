import { NativeModules } from 'react-native';

const noop = (...args: any[]) => {};

// Only implemented on Android -- it's a noop on iOS
const CustomTabsHelper = (NativeModules.CustomTabsHelperModule || {
  preventRedirectionIntoApp: noop,
}) as {
  preventRedirectionIntoApp: () => void;
};

export { CustomTabsHelper };
