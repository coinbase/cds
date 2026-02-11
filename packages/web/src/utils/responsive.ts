import { media } from '../styles/media';
import type { ResponsiveProp, ResponsiveValue } from '../styles/styleProps';
import type { MediaQueryContextValue } from '../system/MediaQueryProvider';

/**
 * Type for the media query snapshot function. Use this when you need to resolve
 * responsive values in JavaScript (e.g., passing to a child component).
 * Typically obtained from `MediaQueryContext.getSnapshot`.
 */
export type MediaQueryGetSnapshot = MediaQueryContextValue['getSnapshot'];

/**
 * Type guard to check if a value is a responsive object with breakpoint keys
 * (base, phone, tablet, desktop) rather than a scalar value.
 */
export const isResponsiveValue = <T>(value: ResponsiveProp<T>): value is ResponsiveValue<T> =>
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
 * @param value - A scalar value or responsive object with base/phone/tablet/desktop keys
 * @param getSnapshot - Function that returns whether a media query matches. Pass
 *   MediaQueryContext.getSnapshot when used within MediaQueryProvider. Without it,
 *   returns the first defined value (base ?? phone ?? tablet ?? desktop).
 * @returns The resolved value for the current breakpoint, or the fallback when
 *   getSnapshot is not provided
 */
export const resolveResponsiveProp = <T>(
  value: ResponsiveProp<T> | undefined,
  getSnapshot?: MediaQueryGetSnapshot,
): T | undefined => {
  if (!value || !isResponsiveValue(value)) return value;
  const fallback = value.base ?? value.phone ?? value.tablet ?? value.desktop;
  if (!getSnapshot) return fallback;
  if (typeof value.phone !== 'undefined' && getSnapshot(media.phone)) return value.phone;
  if (typeof value.tablet !== 'undefined' && getSnapshot(media.tablet)) return value.tablet;
  if (typeof value.desktop !== 'undefined' && getSnapshot(media.desktop)) return value.desktop;
  return fallback;
};
