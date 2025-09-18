import { color } from 'd3-color';

/**
 * Modify the alpha value of an rgba string
 * @param color - valid color value, i.e. `#ffffff` or`rgba(255, 255, 255, 1)`
 * @param newOpacity - 0.5
 * @returns rgbaString - `rgba(255, 255, 255, 0.5)`
 */
export const overrideAlpha = (value: string, opacity: number) => {
  const d3Color = color(value);
  return d3Color?.copy({ opacity }).formatRgb() ?? value;
};
