import type { RGBA } from '@figma/rest-api-spec';

export function figmaColorToRgba(color: RGBA) {
  const { r, g, b, a } = color;
  const [red, green, blue] = [r, g, b].map((item) => Math.round(item * 255));
  return `rgba(${red},${green},${blue},${a})`;
}
