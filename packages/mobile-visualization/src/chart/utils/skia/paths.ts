import type { SkPath } from '@shopify/react-native-skia';
import { Skia } from '@shopify/react-native-skia';

/**
 * Converts an SVG path string to a Skia Path object.
 * This allows us to reuse all existing path generation logic (getLinePath, getAreaPath, etc.)
 * which returns SVG path strings, and render them with Skia.
 *
 * Marked as worklet so it can be called on the UI thread in animations.
 *
 * @param svgPathString - SVG path data string (e.g., "M 0 0 L 10 10")
 * @returns Skia Path object ready for rendering, or null if conversion fails
 *
 * @example
 * ```tsx
 * import { getLinePath } from '../path';
 *
 * // Generate path using existing utility
 * const svgPath = getLinePath({ data, xScale, yScale, curve: 'monotone' });
 *
 * // Convert to Skia path
 * const skiaPath = svgPathToSkiaPath(svgPath);
 *
 * // Render with Skia
 * <Path path={skiaPath} color="#0052FF" strokeWidth={2} style="stroke" />
 * ```
 */
export const svgPathToSkiaPath = (svgPathString: string): SkPath | null => {
  'worklet';
  if (!svgPathString || svgPathString.trim() === '') {
    return null;
  }

  return Skia.Path.MakeFromSVGString(svgPathString);
};

/**
 * Type guard to check if a Skia Path is valid (not null).
 * Useful for filtering null paths in map operations.
 *
 * @param path - Potential Skia Path object
 * @returns True if path is a valid SkPath, false if null
 *
 * @example
 * ```tsx
 * const paths = svgPaths.map(svgPathToSkiaPath).filter(isValidSkiaPath);
 * ```
 */
export const isValidSkiaPath = (path: SkPath | null): path is SkPath => {
  return path !== null;
};
