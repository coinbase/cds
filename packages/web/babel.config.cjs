// @ts-check
const isTestEnv = process.env.NODE_ENV === 'test';

const invalidCharacters = '-0123456789';

const createClassName = (hash, title) => {
  const needsEscaping = invalidCharacters.includes(title.charAt(0));
  return `${needsEscaping ? '_' : ''}${title}-${hash}`;
};

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: [
    ['@babel/preset-env', { modules: isTestEnv ? 'commonjs' : false }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
    [
      require.resolve('@coinbase/cds-web-utils/babel/linariaPreset'),
      {
        sourceDir: 'packages/web/src',
        outputDir: 'packages/web/esm',
        linariaOptions: {
          classNameSlug: createClassName,
        },
      },
    ],
  ],
  // NOTE: To enable the React Compiler, install babel-plugin-react-compiler and react-compiler-runtime
  // plugins: [
  //   [
  //     'babel-plugin-react-compiler',
  //     {
  //       runtimeModule: 'react-compiler-runtime',
  //     },
  //   ],
  // ],
  ignore: isTestEnv
    ? []
    : [
        '**/__stories__/**',
        '**/__tests__/**',
        '**/__mocks__/**',
        '**/__fixtures__/**',
        '**/__figma__/**',
        '**/*.stories.*',
        '**/*.test.*',
        '**/*.spec.*',
        '**/*.figma.*',
        // Declaration-only files (e.g. figma Code Connect ambient types, jest globals)
        // emit no runtime code; skip them so empty `*.d.js` files aren't published.
        '**/*.d.ts',
      ],
};
