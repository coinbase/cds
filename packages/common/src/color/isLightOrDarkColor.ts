import { color } from 'd3-color';

export const isLightOrDarkColor = (value: string) => {
  const rgbObject = color(value)?.rgb();
  if (rgbObject) {
    const { r: red, g: green, b: blue } = rgbObject;
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    const hsp = Math.sqrt(0.299 * (red * red) + 0.587 * (green * green) + 0.114 * (blue * blue));
    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
      return 'light';
    }
    return 'dark';
  }
  // Fallback to light luminosity
  return 'light';
};
