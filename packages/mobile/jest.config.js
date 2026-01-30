import os from 'os';

const d3 = ['d3', 'd3-.+', 'internmap'];

const reactNative = [
  'jest-react-native',
  'react-native',
  '@react-native',
  '@react-native-community',
  'react-native-webview',
  '@bugsnag/react-native',
];

const esModules = ['@coinbase', ...reactNative, ...d3];

const isCI = process.env.CI === 'true' || process.env.BUILDKITE === 'true';

/** @type {import('jest').Config} */
const config = {
  preset: '../../jest.preset-mobile.js',
  displayName: 'cds-mobile',
  // Mock react-test-renderer to work around React 19 incompatibility.
  //
  // We upgraded react-test-renderer from v18 to v19 to stay in sync with our React version.
  // However, react-native-accessibility-engine depends on an older react-test-renderer API.
  //
  // react-native-accessibility-engine hasn't released an update to address this, so we
  // provide a mock that satisfies its react-test-renderer initialization requirements.
  // See: https://github.com/aryella-lacerda/react-native-accessibility-engine
  // See: https://react.dev/warnings/react-test-renderer
  moduleNameMapper: {
    '^react-test-renderer$': '<rootDir>/jest/__mocks__/react-test-renderer.js',
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/illustrations/images',
    '.stories.tsx',
    '__stories__',
    '.perf-test',
  ],
  coverageReporters: ['json', 'text-summary', 'text', 'json-summary'],
  // https://docs.swmansion.com/react-native-gesture-handler/docs/guides/testing
  // https://docs.swmansion.com/react-native-worklets/docs/guides/testing/
  setupFiles: [
    '<rootDir>/../../node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/jest/setupWorkletsMock.js',
    '<rootDir>/jest/jestThrowOnErrorAndWarning.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
  testMatch: ['**//**/*.test.(ts|tsx)'],
  // https://github.com/facebook/jest/blob/main/docs/Configuration.md#faketimers-object
  fakeTimers: {
    enableGlobally: true,
  },
  transformIgnorePatterns: [`node_modules/(?!(${esModules.join('|')}))`],
};

if (isCI) config.maxWorkers = Math.floor(os.availableParallelism() / 2);

export default config;
