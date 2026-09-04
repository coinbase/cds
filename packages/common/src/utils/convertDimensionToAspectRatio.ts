import { illustrationSizes } from '../tokens/illustrations';
import type { IllustrationDimension } from '../types/IllustrationProps';

/** Returns the aspect ratio tuple for a given dimension */
export function convertDimensionToAspectRatio(dimension: IllustrationDimension) {
  return illustrationSizes[dimension];
}
