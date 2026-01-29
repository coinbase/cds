const CONSOLE_FAIL_TYPES = ['error', 'warn'];

// Messages to ignore when checking for console errors/warnings.
// react-native-accessibility-engine depends on react-test-renderer, which is deprecated
// in React 19 and emits a warning on import. This can be removed once the library
// updates to no longer depend on react-test-renderer.
// See: https://github.com/aryella-lacerda/react-native-accessibility-engine
const IGNORED_MESSAGES = ['react-test-renderer is deprecated'];

// Throw errors when a `console.error` or `console.warn` happens
// by overriding the functions
CONSOLE_FAIL_TYPES.forEach((type) => {
  console[type] = (message) => {
    const shouldIgnore = IGNORED_MESSAGES.some((ignored) =>
      String(message).includes(ignored)
    );
    if (shouldIgnore) {
      return;
    }
    throw new Error(`Failing due to console.${type} while running test!\n\n${message}`);
  };
});
