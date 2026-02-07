// Mock react-native-worklets before any reanimated imports
// The built-in mock at lib/module/mock is not available until later versions: 0.7.X
jest.mock('react-native-worklets', () => require('./workletsMock'));
