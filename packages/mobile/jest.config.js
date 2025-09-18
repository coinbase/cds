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

const esModules = ['@cbhq', ...reactNative, ...d3];

const isCI = process.env.CI === 'true' || process.env.BUILDKITE === 'true';

/** @type {import('jest').Config} */
const config = {
  preset: '../../jest.preset-mobile.js',
  displayName: 'cds-mobile',
  coveragePathIgnorePatterns: [
    '<rootDir>/src/illustrations/images',
    '.stories.tsx',
    '__stories__',
    '.perf-test',
  ],
  coverageReporters: ['json', 'text-summary', 'text', 'json-summary'],
  // https://docs.swmansion.com/react-native-gesture-handler/docs/guides/testing
  setupFiles: [
    '<rootDir>/../../node_modules/react-native-gesture-handler/jestSetup.js',
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
