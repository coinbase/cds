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

/**
 * What a color attribute may hold once svgo has converted names and `rgb()` to hex: a 6-digit hex
 * color, `none`, or a reference to a gradient or pattern. Theming only recognizes 6-digit hex, so
 * anything else (alpha hex, `currentColor`, `rgba()`, `hsl()`, `var()`) would be published with its
 * light color in every variant and nobody would notice until it shipped. Figma never exports those
 * forms; seeing one means the SVG did not come straight from Figma, or Figma changed.
 */
const supportedColor = /^(#[0-9A-F]{6}|none|url\(#[^)]+\))$/;

export class UnsupportedColorError extends Error {
  constructor(attribute: string, value: string) {
    super(
      `${attribute}="${value}" cannot be themed: only 6-digit hex colors, "none" and url(#id) ` +
        'are supported' +
        (/^#[0-9A-F]{8}$|^#[0-9A-F]{4}$/.test(value)
          ? `; express transparency with ${attribute === 'stop-color' ? 'stop' : attribute}-opacity instead of an alpha channel`
          : ''),
    );
    this.name = 'UnsupportedColorError';
  }
}

function assertSupportedColor(attribute: string, value: string) {
  if (!supportedColor.test(value)) throw new UnsupportedColorError(attribute, value);
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
                const normalized = normalizeHexColor(node.attributes[attribute]);
                assertSupportedColor(attribute, normalized);
                node.attributes[attribute] = normalized;
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
