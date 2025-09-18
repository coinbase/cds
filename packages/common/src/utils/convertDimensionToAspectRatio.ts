import { illustrationSizes } from '../tokens/illustrations';
import type { IllustrationDimension } from '../types';

/** Returns the aspect ratio tuple for a given dimension */
export function convertDimensionToAspectRatio(dimension: IllustrationDimension) {
  return illustrationSizes[dimension];
}
