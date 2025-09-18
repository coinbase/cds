import { useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules, Platform, StatusBar } from 'react-native';
import type { NativeModule } from 'react-native';

const { StatusBarManager } = NativeModules;

type StatusBarNativeModule = {
  getHeight: (arg1: ({ height }: { height: number }) => void) => void;
} & NativeModule;

/**
 * StatusBar api returns weird incorrect values for iOS.
 * This implementation is based off of the implementation identified in this article. https://blog.expo.dev/the-status-bar-manager-in-react-native-6226058ecba
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
