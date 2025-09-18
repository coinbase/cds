import { illustrationDimensionDefaults } from '../tokens/illustrations';
import type { IllustrationVariant } from '../types';

import { convertDimensionToSize } from './convertDimensionToSize';

/** Returns the default size object for an illustration variant */
export function getDefaultSizeObjectForIllustration(variant?: IllustrationVariant) {
  return convertDimensionToSize(illustrationDimensionDefaults[variant ?? 'all']);
}
