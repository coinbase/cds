import { memo, useCallback, useState } from 'react';
import type { Rect } from '@coinbase/cds-common/types';
import { useScrubberContext } from '@coinbase/cds-common/visualizations/charts';
import { m as motion } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { ChartText, type ChartTextProps } from '../text';

const idlePulseTransitionConfig = {
  duration: 2,
  repeat: Infinity,
  ease: 'easeInOut',
} as const;

export type ScrubberBeaconLabelProps = ChartTextProps & {
  /**
   * Preferred side for label placement.
   * @default 'auto' - automatically chooses based on available space
   */
  preferredSide?: 'left' | 'right' | 'auto';
  /**
   * Pulse the label while at rest (no active scrubbing).
   */
  idlePulse?: boolean;
};

/**
 * The ScrubberBeaconLabel is a special instance of ChartText used to label a series' scrubber beacon (i.e. a point on the series pinned to the scrubber position).
 * It contains logic to automatically change the ChartText's textAnchor based on it's proximity to the chart's bounds.
 */
export const ScrubberBeaconLabel = memo<ScrubberBeaconLabelProps>(
  ({
    preferredSide = 'auto',
    background = 'white',
    color = 'var(--color-fgPrimary)',
    opacity = 1,
    inset = 1,
    onDimensionsChange,
    elevation = background !== undefined ? 1 : undefined,
    borderRadius = background !== undefined ? 4 : undefined,
    testID,
    dx = 0,
    idlePulse,
    ...chartTextProps
  }) => {
    const { drawingArea: chartRect, animate: animationEnabled } = useCartesianChartContext();
    const { scrubberPosition } = useScrubberContext();

    // Track current side for auto placement
    const [currentSide, setCurrentSide] = useState<'left' | 'right'>('right');
    const side = preferredSide === 'auto' ? currentSide : preferredSide;
    // invert value of dx depending on the side the label is going to be placed on
    const spacing = Math.abs(dx) * (side === 'right' ? 1 : -1);

    const isIdleState = scrubberPosition === undefined;
    const shouldPulse = animationEnabled && isIdleState && idlePulse;

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

    // Wrap ChartText in a motion group for idle pulse animation
    const chartTextElement = (
      <ChartText
        background={background}
        borderRadius={borderRadius}
        color={color}
        dx={spacing}
        elevation={elevation}
        font="label1"
        horizontalAlignment={side === 'right' ? 'left' : 'right'}
        inset={inset}
        onDimensionsChange={handleDimensionsChange}
        testID={testID}
        verticalAlignment="middle"
        {...chartTextProps}
      />
    );

    if (shouldPulse) {
      return (
        <motion.g
          animate={{
            opacity: [1, 0.5, 1],
          }}
          initial={{ opacity: 1 }}
          transition={idlePulseTransitionConfig}
        >
          {chartTextElement}
        </motion.g>
      );
    }

    return chartTextElement;
  },
);
