/** @type {import('@jest/types').Config.InitialOptions} */
export default {
  preset: '../../jest.preset.js',
  displayName: 'eslint-plugin-internal',
  testEnvironment: 'node',
  testMatch: ['**/*.test.js', '**/*.test.mjs'],
  transform: {
    '^.+\\.(js|mjs)$': ['babel-jest', { presets: ['@babel/preset-env'] }],
  },
  moduleFileExtensions: ['js', 'mjs'],
};
