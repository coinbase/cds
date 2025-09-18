import { color } from 'd3-color';

/**
 * @param color - any valid color value, i.e. `rgba(255, 255, 255, 1)`
 * @returns hex - `#ffffff`
 * @website https://github.com/d3/d3-color#color
 */
export const colorToHex = (value: string) => {
  return color(value)?.formatHex() ?? value;
};
