// https://docs.swmansion.com/react-native-reanimated/docs/guides/testing/
const {
  setUpTests,
  configureReanimatedLogger,
  ReanimatedLogLevel,
} = require('react-native-reanimated');

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
