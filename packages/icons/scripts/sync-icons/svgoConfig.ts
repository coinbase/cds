import type { Config } from 'svgo';

export const svgoConfig: Config = {
  multipass: true,
  /** https://github.com/svg/svgo#built-in-plugins */
  plugins: [
    'convertStyleToAttrs',
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupNumericValues: {
            floatPrecision: 2,
          },
          convertColors: {
            names2hex: true,
            rgb2hex: true,
            shortname: false,
            shorthex: false, // ensure 6 digit long hex format
          },
        },
      },
    },
    'removeDimensions',
    'cleanupListOfValues',
    'removeRasterImages',
    'removeStyleElement',
  ],
};
