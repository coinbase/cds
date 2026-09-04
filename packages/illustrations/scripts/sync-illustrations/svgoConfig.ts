import type { Config } from 'svgo';

import { defaultSvgoConfig } from './helpers/image/svgoConfig';

/** https://github.com/svg/svgo/blob/main/plugins/_collections.js#L2161 */
const colorsProps = ['color', 'fill', 'stroke', 'stop-color', 'flood-color', 'lighting-color'];

function colorTo6DigitUppercaseHex(val: string) {
  if (val === 'none') return null;
  if (!val.startsWith('#'))
    throw Error('Unexpected color format in sync-illustrations colorTo6DigitUppercaseHex');
  const hex = val.substring(1);
  if (hex.length === 3) return `#${hex}${hex}`.toUpperCase();
  return val.toUpperCase();
}

/** The base pass, plus normalization of every fill to an uppercase 6-digit hex value. */
export const svgoConfig: Config = {
  ...defaultSvgoConfig,
  plugins: [
    ...(defaultSvgoConfig.plugins ?? []),
    {
      /**
       * Ensure all fills are uppercase 6 digit hex values.
       * This is a simplified version of https://github.com/svg/svgo/blob/main/plugins/convertColors.js
       */
      name: 'customColorPlugin',
      fn: () => {
        return {
          element: {
            enter: (node) => {
              Object.entries(node.attributes).forEach(([key, value]) => {
                if (colorsProps.includes(key)) {
                  const hex = colorTo6DigitUppercaseHex(value);
                  if (hex) {
                    node.attributes[key] = hex; // we have to re-assign to apply change
                  }
                }
              });
            },
          },
        };
      },
    },
  ],
};
