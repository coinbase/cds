// Mock react-native-worklets before any reanimated imports
// See: https://docs.swmansion.com/react-native-worklets/docs/guides/testing/
jest.mock('react-native-worklets', () => require('react-native-worklets/lib/module/mock'));
