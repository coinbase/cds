// A preset cant extend another preset, so we need to import and inherit the RN config
// https://github.com/facebook/react-native/blob/main/jest-preset.js
const rnPreset = require('react-native/jest-preset');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  ...rnPreset,
  maxWorkers: 1,
  testRunner: 'jest-circus/runner',
  testTimeout: 120000,
  testRegex: '\\.e2e\\.ts$',
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
  transform: {
    ...rnPreset.transform,
    // Required to find the root babel config when jest is ran in sub-folders
    '^.+\\.(js|ts|tsx)$': ['babel-jest', { rootMode: 'upward' }],
  },
  setupFilesAfterEnv: ['./setup.ts'],
  testEnvironment: './environment.js',
  verbose: true,
};
