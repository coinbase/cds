// @ts-check
const isTestEnv = process.env.NODE_ENV === 'test';
const isDetoxEnv = process.env.DETOX_TEST === 'true';

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: [
    ['@babel/preset-env', { modules: isTestEnv ? 'commonjs' : false, loose: true }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
    // Use babel-preset-expo for test/detox environments. This preset wraps @react-native/babel-preset
    // which includes babel-plugin-syntax-hermes-parser for parsing Flow files with 'as' syntax.
    // See: https://docs.expo.dev/versions/latest/config/babel/
    ...(isTestEnv || isDetoxEnv ? ['babel-preset-expo'] : []),
  ],
  plugins: isTestEnv || isDetoxEnv ? ['react-native-worklets/plugin'] : [],
  ignore:
    isTestEnv || isDetoxEnv
      ? []
      : // TO DO: The expo-app release builds break if we ignore stories
        [
          // '**/__stories__/**',
          '**/__tests__/**',
          '**/__mocks__/**',
          '**/__fixtures__/**',
          '**/__figma__/**',
          // '**/*.stories.*',
          '**/*.test.*',
          '**/*.spec.*',
          '**/*.figma.*',
        ],
};
