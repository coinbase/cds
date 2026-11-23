import type { Config } from 'svgo';

type SvgoPlugin = NonNullable<Config['plugins']>[number];

/**
 * The svgo settings every Figma sync optimizes its SVGs with: optimize them without dropping
 * what the icon font and the themes rely on. A sync that needs more adds plugins to it with
 * `withSvgoPlugins`, so the base is the same everywhere.
 */
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

/** The shared svgo settings followed by the plugins of one sync. */
export const withSvgoPlugins = (...plugins: SvgoPlugin[]): Config => ({
  ...svgoConfig,
  plugins: [...(svgoConfig.plugins ?? []), ...plugins],
});
