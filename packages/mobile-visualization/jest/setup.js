jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.makeMutable = Reanimated.useSharedValue;

  // Add useEvent mock for react-native-gesture-handler v2.24+
  Reanimated.useEvent = (handler, eventNames, rebuild) => {
    return {
      workletEventHandler: () => {},
    };
  };

  return Reanimated;
});
