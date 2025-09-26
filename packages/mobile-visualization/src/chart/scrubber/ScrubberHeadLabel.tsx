import { memo, useCallback, useState } from 'react';
import type { Rect } from '@coinbase/cds-common/types';
import { useChartContext } from '../ChartProvider';
import { useTheme } from '@coinbase/cds-mobile';

import { ChartText, type ChartTextProps } from '../text';

export type ScrubberHeadLabelProps = ChartTextProps & {
  /**
   * Preferred side for label placement.
   * @default 'auto' - automatically chooses based on available space
   */
  preferredSide?: 'left' | 'right' | 'auto';
};

/**
 * The ScrubberHeadLabel is a special instance of ChartText used to label a series' scrubber head (i.e. a point on the series pinned to the scrubber position).
 * It contains logic to automatically change the ChartText's textAnchor based on it's proximity to the chart's bounds.
 */
export const ScrubberHeadLabel = memo<ScrubberHeadLabelProps>(
  ({
    preferredSide = 'auto',
    background,
    color,
    padding = 12,
    onDimensionsChange,
    elevation = background !== undefined ? 1 : undefined,
    borderRadius = background !== undefined ? 200 : undefined,
    testID,
    dx = 0,
    ...chartTextProps
  }) => {
    const theme = useTheme();
    const { drawingArea: chartRect } = useChartContext();

    // Use theme colors with defaults
    const resolvedBackground = background ?? theme.color.bg;
    const resolvedColor = color ?? theme.color.fgPrimary;

    // Track current side for auto placement
    const [currentSide, setCurrentSide] = useState<'left' | 'right'>('right');
    const side = preferredSide === 'auto' ? currentSide : preferredSide;
    // invert value of dx depending on the side the label is going to be placed on
    const spacing = Math.abs(Number(dx)) * (side === 'right' ? 1 : -1);

    // Collision detection callback for automatic side switching
    const handleDimensionsChange = useCallback(
      (rect: Rect) => {
        // Check if label is clipped and switch sides if needed
        const effectiveBounds = chartRect;
        if (preferredSide === 'auto' && effectiveBounds) {
          // Simple collision detection: check if rect extends beyond bounds
          const isClipped =
            rect.x < effectiveBounds.x ||
            rect.x + rect.width > effectiveBounds.x + effectiveBounds.width;

          if (isClipped) {
            setCurrentSide(currentSide === 'right' ? 'left' : 'right');
          }
        }
        onDimensionsChange?.(rect);
      },
      [chartRect, preferredSide, currentSide, onDimensionsChange],
    );

    return (
      <ChartText
        alignmentBaseline="central"
        background={resolvedBackground}
        borderRadius={borderRadius}
        color={resolvedColor}
        dx={spacing}
        elevation={elevation}
        onDimensionsChange={handleDimensionsChange}
        padding={padding}
        testID={testID}
        textAnchor={side === 'right' ? 'start' : 'end'}
        {...chartTextProps}
      />
    );
  },
);
