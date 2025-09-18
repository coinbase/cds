import { illustrationSizes } from '../tokens/illustrations';
import type { IllustrationDimension } from '../types';

export type SizeObject = { width: number; height: number };

/** Statically lookup a dimension string such as "24x24" and return it's size object { width: 24, height: 24 } */
export function convertDimensionToSize(dimension: IllustrationDimension): SizeObject {
  const [width, height] = illustrationSizes[dimension];
  return {
    width,
    height,
  };
}
