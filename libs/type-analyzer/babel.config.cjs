// @ts-check
const isTestEnv = process.env.NODE_ENV === 'test';

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: [['@babel/preset-env', { modules: 'commonjs' }], '@babel/preset-typescript'],
  ignore: isTestEnv
    ? []
    : [
        '**/__stories__/**',
        '**/__tests__/**',
        '**/__mocks__/**',
        '**/__fixtures__/**',
        '**/__testfixtures__/**',
        '**/*.stories.*',
        '**/*.test.*',
        '**/*.spec.*',
      ],
};
