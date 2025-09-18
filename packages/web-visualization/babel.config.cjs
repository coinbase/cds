// @ts-check
const isTestEnv = process.env.NODE_ENV === 'test';

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: [
    ['@babel/preset-env', { modules: isTestEnv ? 'commonjs' : false }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
    [
      require.resolve('@cbhq/cds-web-utils/babel/linariaPreset'),
      {
        sourceDir: 'packages/web-visualization/src',
        outputDir: 'packages/web-visualization/esm',
        linariaOptions: {
          classNameSlug: (hash, title) => (isTestEnv ? title : `cds-${title}-${hash}`),
        },
      },
    ],
  ],
  ignore: isTestEnv
    ? []
    : [
        '**/__stories__/**',
        '**/__tests__/**',
        '**/__mocks__/**',
        '**/__fixtures__/**',
        '**/*.stories.*',
        '**/*.test.*',
        '**/*.spec.*',
      ],
};
