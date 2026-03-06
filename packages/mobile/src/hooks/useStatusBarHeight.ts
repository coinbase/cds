import { useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules, Platform, StatusBar } from 'react-native';
import type { NativeModule } from 'react-native';

const { StatusBarManager } = NativeModules;

type StatusBarNativeModule = {
  getHeight: (arg1: ({ height }: { height: number }) => void) => void;
} & NativeModule;

/**
 * @deprecated Use `useSafeAreaInsets().top` from `react-native-safe-area-context` instead.
 * This approach is recommended by Expo and provides more reliable values across platforms.
 * @see https://docs.expo.dev/versions/latest/sdk/safe-area-context/
 *
 * @example
 * // Before (deprecated)
 * const statusBarHeight = useStatusBarHeight();
 *
 * // After (recommended)
 * import { useSafeAreaInsets } from 'react-native-safe-area-context';
 * const insets = useSafeAreaInsets();
 * const statusBarHeight = insets.top;
 */
export const useStatusBarHeight = () => {
  const [statusBarHeight, setStatusBarHeight] = useState<number>();

  useEffect(() => {
    if (Platform.OS === 'ios' && StatusBarManager !== undefined) {
      const statusBarManager = StatusBarManager as StatusBarNativeModule;
      const emitter = new NativeEventEmitter(statusBarManager);

      statusBarManager.getHeight(({ height }: { height: number }) => setStatusBarHeight(height));

      const subscription = emitter.addListener(
        'statusBarFrameWillChange',
        ({ frame: { height } }: { frame: { height: number } }) => {
          setStatusBarHeight(height);
        },
      );

      return () => subscription.remove();
    }
    setStatusBarHeight(StatusBar.currentHeight);
    return () => {};
  }, []);

  return statusBarHeight;
};
