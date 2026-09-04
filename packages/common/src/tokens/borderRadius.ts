import type { Shape } from '../types/Shape';

export const shapeBorderRadius: Record<Shape, number> = {
  circle: 1e5,
  squircle: 8,
  square: 4,
  rectangle: 0,
  hexagon: 0,
};
