// @ts-check
const isTestEnv = process.env.NODE_ENV === 'test';
const isDetoxEnv = process.env.DETOX_TEST === 'true';

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: [
    ['@babel/preset-env', { modules: isTestEnv ? 'commonjs' : false, loose: true }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
    ...(isTestEnv || isDetoxEnv ? ['module:metro-react-native-babel-preset'] : []),
  ],
  plugins: isTestEnv || isDetoxEnv ? ['react-native-reanimated/plugin'] : [],
  ignore:
    isTestEnv || isDetoxEnv
      ? []
      : // TO DO: The mobile-app release builds break if we ignore stories
        [
          // '**/__stories__/**',
          '**/__tests__/**',
          '**/__mocks__/**',
          '**/__fixtures__/**',
          // '**/*.stories.*',
          '**/*.test.*',
          '**/*.spec.*',
        ],
};
