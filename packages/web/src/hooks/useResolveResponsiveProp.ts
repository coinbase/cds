import { useContext } from 'react';

import { media } from '../styles/media';
import type { ResponsiveProp, ResponsiveValue } from '../styles/styleProps';
import { MediaQueryContext } from '../system/MediaQueryProvider';

const isResponsiveValue = <T>(value: ResponsiveProp<T>): value is ResponsiveValue<T> =>
  typeof value === 'object' &&
  value !== null &&
  ('base' in value || 'phone' in value || 'tablet' in value || 'desktop' in value);

/**
 * Resolves a ResponsiveProp to a single value based on the current viewport.
 *
 * Use this when you need the resolved value in JavaScript (e.g., passing to a child
 * component or using in conditional logic). For applying responsive styles via CSS,
 * use getStyles from styleProps instead—it handles responsive objects via
 * media-query CSS variables.
 *
 * Reads getSnapshot from MediaQueryContext when within MediaQueryProvider.
 * Without it, returns the first defined value (base ?? phone ?? tablet ?? desktop).
 *
 * @param value - A scalar value or responsive object with base/phone/tablet/desktop keys
 * @returns The resolved value for the current breakpoint
 */
export const useResolveResponsiveProp = <T>(
  value: ResponsiveProp<T> | undefined,
): T | undefined => {
  const context = useContext(MediaQueryContext);
  const getSnapshot = context?.getSnapshot;

  if (!value || !isResponsiveValue(value)) return value;
  const fallback = value.base ?? value.phone ?? value.tablet ?? value.desktop;
  if (!getSnapshot) return fallback;
  if (typeof value.phone !== 'undefined' && getSnapshot(media.phone)) return value.phone;
  if (typeof value.tablet !== 'undefined' && getSnapshot(media.tablet)) return value.tablet;
  if (typeof value.desktop !== 'undefined' && getSnapshot(media.desktop)) return value.desktop;
  return fallback;
};
