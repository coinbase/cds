import type { LayoutRectangle } from 'react-native';
import type { DotOverlap } from '@cbhq/cds-common';

export type DotPinStylesKey = 'end' | 'start' | 'bottom' | 'top';

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
