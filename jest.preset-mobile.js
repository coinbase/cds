// A preset cant extend another preset, so we need to import and inherit the RN config
// https://github.com/facebook/react-native/blob/main/jest-preset.js
const reactNativePreset = require('react-native/jest-preset');

const esModules = [
  'jest-react-native',
  'react-native',
  '@react-native',
  '@react-native-community',
  '@cbhq/cds-mobile',
  'react-native-webview',
  '@bugsnag/react-native',
];

const config = {
  ...reactNativePreset,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif)$': 'identity-obj-proxy',
  },
  setupFiles: [...reactNativePreset.setupFiles],
  setupFilesAfterEnv: ['jest-extended', '@testing-library/jest-native/extend-expect'],
  testMatch: ['**/*.test.[jt]s?(x)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/cjs/',
    '/dts/',
    '/esm/',
    '/lib/',
    '/mjs/',
    '/__fixtures__/',
    '.*\\.d\\.ts',
  ],
  testRunner: 'jest-circus/runner',
  transform: {
    ...reactNativePreset.transform,
    // Required to find the root babel config when jest is ran in sub-folders
    '^.+\\.(js|ts|tsx)$': ['babel-jest', { rootMode: 'upward' }],
  },
  transformIgnorePatterns: [`node_modules/(?!(${esModules.join('|')}))`],
  cacheDirectory: '.nx/cache/tools/jestTransforms',
  coverageThreshold: {
    global: {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5,
    },
  },
};

module.exports = config;
