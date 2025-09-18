/**
 * NOTE: If you add imports here that extend Jest, such as extending `expect` with new
 * functions like `.toBeAccessible()`, you must also update `packages/mobile/src/jest.d.ts`
 */
import 'react-native-gesture-handler/jestSetup';
import 'react-native-accessibility-engine';
import '@testing-library/jest-native/extend-expect';

import { setUpTests } from 'react-native-reanimated/src/jestUtils';

import { mockStatusBarHeight } from '../src/hooks/__tests__/constants';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  RN.PixelRatio.get = jest.fn(() => 1);
  RN.PixelRatio.roundToNearestPixel = jest.fn((layoutSize) => {
    const ratio = 1;
    return Math.round(layoutSize * ratio) / ratio;
  });
  RN.PixelRatio.getFontScale = jest.fn(() => 1);
  RN.PixelRatio.getPixelSizeForLayoutSize = jest.fn((layoutSize) => Math.round(layoutSize * 1));
  RN.PixelRatio.startDetecting = jest.fn();

  RN.NativeModules.StatusBarManager = {
    getHeight: jest.fn((cb) => cb({ height: mockStatusBarHeight })),
  };

  RN.Animated.loop = jest.fn(() => {
    return {
      start: jest.fn(),
      stop: jest.fn(),
    };
  });

  RN.Animated.timing = jest.fn((value, config) => {
    return {
      start: jest.fn().mockImplementation((callback) => {
        return setTimeout(() => {
          value.setValue(config.toValue);
          callback?.({ finished: true });
        }, 0);
      }),
      stop: jest.fn(),
    };
  });

  RN.Animated.parallel = () => {
    return {
      start: jest.fn((callback) => {
        callback?.({ finished: true });
      }),
    };
  };

  RN.Animated.createAnimatedComponent = (component) => component;

  RN.AccessibilityInfo.isScreenReaderEnabled = jest.fn();
  RN.AccessibilityInfo.addEventListener = jest.fn();

  return RN;
});

setUpTests();
