import { color } from 'd3-color';

export const darkenColor = (value: string) => {
  const d3Color = color(value);
  return d3Color?.darker().formatHex();
};
