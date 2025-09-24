import { memo, useCallback, useState } from 'react';
import type { Rect } from '@coinbase/cds-common/types';
import {
  useChartContext,
  useChartDrawingAreaContext,
} from '@coinbase/cds-common/visualizations/charts';

import { ChartText, type ChartTextProps } from '../text';

export type ScrubberHeadLabelProps = ChartTextProps & {
  /**
   * Preferred side for label placement.
   * @default 'auto' - automatically chooses based on available space
   */
  preferredSide?: 'left' | 'right' | 'auto';
  /**
   * Opacity of the entire label.
   * @default 1
   */
  opacity?: number;
  /**
   * Custom styles to apply to the label
   */
  style?: React.CSSProperties;
  /**
   * Custom className to apply to the label
   */
  className?: string;
};

/**
 * The ScrubberHeadLabel is a special instance of ChartText used to label a series' scrubber head (i.e. a point on the series pinned to the scrubber position).
 * It contains logic to automatically change the ChartText's textAnchor based on it's proximity to the chart's bounds.
 */
export const ScrubberHeadLabel = memo<ScrubberHeadLabelProps>(
  ({
    preferredSide = 'auto',
    background = 'white',
    color = 'var(--color-fgPrimary)',
    opacity = 1,
    padding = 12,
    onDimensionsChange,
    elevation = background !== undefined ? 1 : undefined,
    borderRadius = background !== undefined ? 200 : undefined,
    style,
    className,
    testID,
    dx = 0,
    ...chartTextProps
  }) => {
    const { drawingArea: chartRect } = useChartDrawingAreaContext();

    // Track current side for auto placement
    const [currentSide, setCurrentSide] = useState<'left' | 'right'>('right');
    const side = preferredSide === 'auto' ? currentSide : preferredSide;
    // invert value of dx depending on the side the label is going to be placed on
    const spacing = Math.abs(dx) * (side === 'right' ? 1 : -1);

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
      <g className={className} data-testid={testID} opacity={opacity} style={style}>
        <ChartText
          background={background}
          borderRadius={borderRadius}
          color={color}
          dominantBaseline="central"
          dx={spacing}
          elevation={elevation}
          font="label1"
          onDimensionsChange={handleDimensionsChange}
          padding={padding}
          textAnchor={side === 'right' ? 'start' : 'end'}
          {...chartTextProps}
        />
      </g>
    );
  },
);
