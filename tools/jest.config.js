/** @type {import('jest').Config} */
const config = {
  displayName: 'tools',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.mjs', '**/*.test.mjs'],
  transform: {
    '^.+\\.(js|mjs|ts)$': [
      'babel-jest',
      {
        presets: ['@babel/preset-env', '@babel/preset-typescript'],
        plugins: ['babel-plugin-transform-import-meta'],
      },
    ],
  },
  moduleFileExtensions: ['mjs', 'js', 'ts'],
  passWithNoTests: true,
  cacheDirectory: '../.nx/cache/tools/jestTransforms',
};

module.exports = config;
