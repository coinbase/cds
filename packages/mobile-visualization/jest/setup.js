jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.makeMutable = Reanimated.useSharedValue;

  return Reanimated;
});
