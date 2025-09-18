import { useMemo } from 'react';

import { shapeBorderRadius } from '../tokens/borderRadius';
import type { Shape } from '../types/Shape';

const WIDTH_MODIFIERS = [0.5, 0, 0.6, 0.8, 0.1, 0.9, 0.4, 0.2, 0.7, 0.3];

export type UseFallbackShapeOptions = {
  disableRandomRectWidth?: boolean;
  rectWidthVariant?: number;
};

export function useFallbackShape(
  shape: Shape,
  baseWidth: number | string,
  options?: UseFallbackShapeOptions,
) {
  const width = useMemo(() => {
    // When rectangle, lets vary the width a bit so things are
    // a little less... uniform. Variety is nice.
    if (
      shape === 'rectangle' &&
      typeof baseWidth === 'number' &&
      (!options?.disableRandomRectWidth || options?.rectWidthVariant !== undefined)
    ) {
      const modifier =
        options?.rectWidthVariant !== undefined
          ? WIDTH_MODIFIERS[options.rectWidthVariant % WIDTH_MODIFIERS.length]
          : Math.random();
      const quarter = Math.round(baseWidth / 4);
      const min = Math.max(baseWidth - quarter, 1);
      const max = baseWidth + quarter;

      return Math.floor(modifier * (max - min + 1)) + min;
    }

    // All other shapes need a fixed aspect ratio
    return baseWidth;
  }, [baseWidth, options, shape]);

  const borderRadius = useMemo(() => {
    if (shape === 'circle' && Number.isInteger(width)) {
      return Number(width) / 2;
    }

    return shape === 'squircle' ? shapeBorderRadius.squircle : 0;
  }, [shape, width]);

  return useMemo(() => ({ borderRadius, width }), [borderRadius, width]);
}
