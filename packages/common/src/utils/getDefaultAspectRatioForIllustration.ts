import { illustrationDimensionDefaults, illustrationSizes } from '../tokens/illustrations';
import type { IllustrationVariant } from '../types/IllustrationNames';

/** Returns the default aspect ratio tuple for an illustration variant */
export function getDefaultAspectRatioForIllustration(variant: IllustrationVariant) {
  const dimensions = illustrationDimensionDefaults[variant];
  return illustrationSizes[dimensions];
}
