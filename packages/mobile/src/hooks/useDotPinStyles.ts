import type { LayoutRectangle } from 'react-native';
import type { DotOverlap } from '@coinbase/cds-common';

/** Valid keys for accessing pin position offsets. */
export type DotPinStylesKey = 'end' | 'start' | 'bottom' | 'top';

/**
 * Calculates positioning offsets for pinning a dot badge to the edges of its parent element.
 *
 * Returns transform offsets that position the dot so it overlaps the edge by half its size.
 * Used by DotCount, DotSymbol, and DotStatusColor to position badges at corners like "top-end".
 *
 * @param childrenSize - Measured dimensions of the parent/host element
 * @param dotSize - Dimensions of the dot badge (number for uniform size, or LayoutRectangle)
 * @param overlap - When 'circular', pulls offsets inward to better align with circular parents (e.g., avatars)
 * @returns Object with edge offsets { end, start, bottom, top }, or null if dimensions unavailable
 *
 * @example
 * ```tsx
 * const transforms = useDotPinStyles(childrenSize, dotSize, overlap);
 * // For pin="top-end", use:
 * const style = {
 *   transform: [
 *     { translateX: transforms.end },
 *     { translateY: transforms.top }
 *   ]
 * };
 * ```
 */
export const useDotPinStyles = (
  childrenSize: LayoutRectangle | null = null,
  dotSize: LayoutRectangle | number | null = null,
  overlap?: DotOverlap,
) => {
  if (childrenSize === null || dotSize === null) {
    return null;
  }

  const dotSizeWidth = typeof dotSize === 'number' ? dotSize : dotSize.width;
  const dotSizeHeight = typeof dotSize === 'number' ? dotSize : dotSize.height;

  const baseOffsets = {
    end: childrenSize.width - dotSizeWidth / 2,
    start: -(dotSizeWidth / 2),
    bottom: childrenSize.height - dotSizeHeight / 2,
    top: -(dotSizeHeight / 2),
  };

  const widthOffset = (childrenSize.width / 2 - dotSizeWidth / 2) / 2.5;
  const heightOffset = (childrenSize.height / 2 - dotSizeHeight / 2) / 2.5;

  if (overlap === 'circular') {
    baseOffsets.end -= widthOffset;
    baseOffsets.start += widthOffset;
    baseOffsets.bottom -= heightOffset;
    baseOffsets.top += heightOffset;
  }

  return baseOffsets;
};
