/**
 * NOTE: If you add imports here that extend Jest, such as extending `expect` with new
 * functions like `.toBeAccessible()`, you must also update `packages/mobile/src/jest.d.ts`
 */
import './accessibility';

// https://docs.swmansion.com/react-native-reanimated/docs/guides/testing/
const {
  setUpTests,
  configureReanimatedLogger,
  ReanimatedLogLevel,
} = require('react-native-reanimated');

// Must mock NativeEventEmitter at the internal module path not in main RN mock below
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter', () => {
  const MockNativeEventEmitter = class MockNativeEventEmitter {
    addListener = jest.fn(() => ({ remove: jest.fn() }));
    removeListener = jest.fn();
    removeAllListeners = jest.fn();
  };
  // Export as both default and the class itself for different import styles
  MockNativeEventEmitter.default = MockNativeEventEmitter;
  return MockNativeEventEmitter;
});

jest.mock('react-native/src/private/animated/NativeAnimatedHelper');

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

/*
  React Reanimated 4.x setup: 
*/

// Disable strict mode to prevent warnings about writing to shared values during render
// This is needed because some components (e.g., TabsActiveIndicator) use patterns that
// trigger warnings in reanimated 4.x strict mode but still work correctly
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

setUpTests();
