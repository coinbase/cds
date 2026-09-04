module.exports = {
  multipass: true,
  plugins: [
    'convertStyleToAttrs',
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupNumericValues: {
            floatPrecision: 2,
          },
        },
      },
    },
    'removeDimensions',
    'cleanupListOfValues',
    'removeStyleElement',
  ],
};
