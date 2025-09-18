import { type ColorCommonInstance, rgb, type RGBColor } from 'd3-color';

export type ColorValue =
  | string
  | { r: number; g: number; b: number; opacity?: number }
  | ColorCommonInstance;

type BlendColorsParams = {
  underlayColor: ColorValue;
  overlayColor: ColorValue;
};

export const getRGBColor = (color: ColorValue): RGBColor => {
  if (typeof color === 'string') {
    return rgb(color);
  }
  if ('r' in color && 'g' in color && 'b' in color) {
    return rgb(color.r, color.g, color.b, color.opacity);
  }
  return rgb(color);
};

/**
 * The overlayColor value must have an alpha less than 1 in order to output a different color.
 * @param underlayColor ColorValue
 * @param overlayColor  ColorValue
 * @returns rbgString
 */
export const blendColors = ({ underlayColor, overlayColor }: BlendColorsParams): RGBColor => {
  const {
    r: underlayR,
    g: underlayG,
    b: underlayB,
    opacity: underlayOpacity,
  } = getRGBColor(underlayColor);
  const {
    r: OverlayR,
    g: OverlayG,
    b: OverlayB,
    opacity: overlayOpacity,
  } = getRGBColor(overlayColor);

  const mix = [];
  mix[3] = 1 - (1 - overlayOpacity) * (1 - underlayOpacity); // alpha
  // red
  mix[0] = Math.round(
    (OverlayR * overlayOpacity) / mix[3] +
      (underlayR * underlayOpacity * (1 - overlayOpacity)) / mix[3],
  );
  // green
  mix[1] = Math.round(
    (OverlayG * overlayOpacity) / mix[3] +
      (underlayG * underlayOpacity * (1 - overlayOpacity)) / mix[3],
  );
  // blue
  mix[2] = Math.round(
    (OverlayB * overlayOpacity) / mix[3] +
      (underlayB * underlayOpacity * (1 - overlayOpacity)) / mix[3],
  );

  return rgb(mix[0], mix[1], mix[2]);
};
