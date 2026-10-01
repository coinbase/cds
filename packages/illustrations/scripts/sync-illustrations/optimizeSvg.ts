import { type Config, optimize } from 'svgo';

/** https://github.com/svg/svgo/blob/main/plugins/_collections.js */
const colorAttributes = ['color', 'fill', 'stroke', 'stop-color', 'flood-color', 'lighting-color'];

/**
 * Expands 3-digit hex colors and uppercases the result so that every color in an optimized SVG is
 * an uppercase 6-digit hex value. The theming step relies on this when matching palette colors.
 * Anything that is not a hex color (`none`, `url(#gradient)`, `currentColor`) is left untouched.
 */
export function normalizeHexColor(value: string) {
  if (!value.startsWith('#')) return value;
  const hex = value.slice(1);
  const expanded = hex.length === 3 ? [...hex].map((digit) => digit + digit).join('') : hex;
  return `#${expanded.toUpperCase()}`;
}

export const svgoConfig: Config = {
  multipass: true,
  /** https://github.com/svg/svgo#built-in-plugins */
  plugins: [
    'convertStyleToAttrs',
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupNumericValues: { floatPrecision: 2 },
          convertColors: { names2hex: true, rgb2hex: true, shortname: false, shorthex: false },
        },
      },
    },
    'removeDimensions',
    'cleanupListOfValues',
    'removeRasterImages',
    'removeStyleElement',
    {
      name: 'normalizeHexColors',
      fn: () => ({
        element: {
          enter: (node) => {
            for (const attribute of colorAttributes) {
              if (attribute in node.attributes) {
                node.attributes[attribute] = normalizeHexColor(node.attributes[attribute]);
              }
            }
          },
        },
      }),
    },
  ],
};

/** Optimizes a raw Figma SVG export into the canonical light variant. */
export function optimizeSvg(rawSvg: string) {
  return optimize(rawSvg, svgoConfig).data;
}

/** Reads the intrinsic size from the viewBox, which `removeDimensions` leaves in place. */
export function getSvgSize(svg: string) {
  const viewBox = svg
    .match(/viewBox="([^"]+)"/)?.[1]
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  if (!viewBox || viewBox.length !== 4 || viewBox.some(Number.isNaN)) {
    throw new Error(`Unable to read the viewBox of an SVG: ${svg.slice(0, 120)}`);
  }
  return { width: viewBox[2], height: viewBox[3] };
}
