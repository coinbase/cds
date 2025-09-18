import { color } from 'd3-color';

/**
 * Relative luminance is the relative brightness of any point in an RGB colorspace, normalized to 0 for darkest black and 1 for lightest white.
 *
 * Edge cases:
 * - Returns undefined for invalid color values or non-parseable color strings
 * - HSL colors outside the RGB gamut will have their RGB components clamped to [0,255], which may not preserve the original color relationships
 * - Special color keywords like 'currentColor' or 'transparent' will return undefined
 * - CSS Variables or dynamic values cannot be calculated
 *
 * @see https://contrastchecker.online/color-relative-luminance-calculator
 */
export const getLuminance = (value: string) => {
  const rgbObject = color(value)?.rgb();

  if (!rgbObject) return undefined;

  const { r, g, b } = rgbObject;
  const red = Number.isNaN(r) ? 0 : r;
  const green = Number.isNaN(g) ? 0 : g;
  const blue = Number.isNaN(b) ? 0 : b;
  const [redLinear, greenLinear, blueLinear] = [red / 255, green / 255, blue / 255].map((item) =>
    item <= 0.04045 ? item / 12.92 : ((item + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * redLinear + 0.7152 * greenLinear + 0.0722 * blueLinear;
};
