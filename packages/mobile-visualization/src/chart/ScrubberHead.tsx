import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import type { SVGProps } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { Rect, SharedProps } from '@coinbase/cds-common/types';
import { useChartContext } from '@coinbase/cds-common/visualizations/charts';
import { AnimatePresence, m } from 'framer-motion';

import { useHighlightContext } from './Chart';
import { Point, type PointRef } from './point';
import type { ChartTextChildren } from './text';

export const dataKeyUpdateAnimationVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.15,
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.05,
    },
  },
};

export type ScrubberHeadRef = PointRef;

// todo: expand available props
export type ScrubberHeadProps = /*Omit<SVGProps<SVGCircleElement>, 'r' | 'opacity'>*/ Pick<
  SVGProps<SVGCircleElement>,
  'style' | 'className' | 'stroke'
> &
  SharedProps & {
    /**
     * Filter to only show dot for specific series (used for hover-based positioning).
     */
    seriesId?: string;
    /**
     * Direct x-coordinate (data index). When provided, overrides hover-based positioning.
     */
    x?: number;
    /**
     * Direct y-coordinate (data value). When provided, overrides hover-based positioning.
     */
    y?: number;
    /**
     * Whether to animate the dot with a pulsing effect.
     * @default false
     */
    pulse?: boolean;
    /**
     * Opacity of the dot.
     * @default 1
     */
    opacity?: number;
    /**
     * Label content to display next to the scrubber head.
     */
    label?: ChartTextChildren;
    /**
     * Custom bounds for label positioning. If not provided, uses chart bounds.
     */
    labelBounds?: Rect;
    /**
     * Preferred side for label placement.
     * @default 'auto' - automatically chooses based on available space
     */
    labelSide?: 'left' | 'right' | 'auto';
    /**
     * Padding between scrubber head and label.
     * @default 2
     */
    labelPadding?: ThemeVars.Space;
    /**
     * Label text color
     * If not set, will default to the stroke for the scrubber head
     */
    labelTextColor?: string;
    /**
     * Background for the label
     * @default 'var(--color-bg)'
     */
    labelBackgroundColor?: string;
    /**
     * Key that identifies the current dataset.
     * When this changes, triggers a fade-out/fade-in transition animation.
     * Useful for distinguishing between live updates vs complete dataset changes.
     */
    dataKey?: string | number;
  };

export const ScrubberHead = memo(
  forwardRef<ScrubberHeadRef, ScrubberHeadProps>(
    (
      {
        seriesId,
        x: directX,
        y: directY,
        className,
        style,
        stroke,
        testID,
        pulse = false,
        opacity = 1,
        label,
        labelBounds,
        labelSide = 'auto',
        labelPadding = 2,
        labelTextColor,
        labelBackgroundColor = 'var(--color-bg)',
        dataKey,
        ...props
      },
      ref,
    ) => {
      const { getSeries, animate, getXScale, getYScale, getXAxis, getYAxis, getSeriesData } =
        useChartContext();
      const pointRef = useRef<PointRef>(null);

      const { highlightedIndex } = useHighlightContext();

      // Find target series for color and data
      const targetSeries = getSeries(seriesId);
      const sourceData = getSeriesData(seriesId);

      // Get scales for this series
      const xScale = getXScale?.(targetSeries?.xAxisId);
      const yScale = getYScale?.(targetSeries?.yAxisId);
      const xAxis = getXAxis?.(targetSeries?.xAxisId);
      const yAxis = getYAxis?.(targetSeries?.yAxisId);

      useImperativeHandle(ref, () => ({
        pulse: () => pointRef.current?.pulse(),
      }));

      if (!xScale || !yScale) {
        return null;
      }

      let x: number;
      let y: number;

      // Use direct coordinates if provided
      if (directX !== undefined && directY !== undefined) {
        // ensures that both directX/Y are specified and real numbers
        if (directY === null || directY === undefined || isNaN(directY) || isNaN(directX)) {
          return null;
        }

        x = directX;
        y = directY;
      } else {
        // Use series data and highlight (i.e scrubber) index to plot the Point
        if (!sourceData || highlightedIndex === undefined) {
          return null;
        }

        // edge case: ignore potential out of bounds scrubber positions
        if (highlightedIndex < 0 || highlightedIndex >= sourceData.length) {
          return null;
        }

        x = highlightedIndex;
        const highlightedYValue = sourceData[highlightedIndex];

        // If dataPoint is null, don't render
        if (highlightedYValue === null) {
          return null;
        }

        if (typeof highlightedYValue === 'number') {
          y = highlightedYValue;
        } else if (Array.isArray(highlightedYValue)) {
          const validValues = highlightedYValue.filter((val): val is number => val !== null);
          // If all values in the array are null, don't render
          if (validValues.length === 0) {
            return null;
          }

          y = Math.max(...validValues);
        } else {
          // Fallback case - shouldn't happen with proper typing
          return null;
        }
      }

      if (xAxis?.data && Array.isArray(xAxis.data)) {
        if (xAxis.data.length > x && xAxis.data[x]) {
          const val = xAxis.data[x];
          if (typeof val === 'number') {
            x = val;
          }
        }
      }

      const dotStroke = stroke || targetSeries?.color || 'var(--color-fgPrimary)';

      // Fixed radius values based on specifications
      const innerRadius = 4; // Inner circle radius
      const outerRingRadius = 10; // Outer ring radius

      return (
        <Point
          ref={pointRef}
          className={className}
          color={dotStroke}
          dataX={x}
          dataY={y}
          opacity={opacity}
          pulse={pulse}
          radius={innerRadius}
          stroke={dotStroke}
          strokeWidth={outerRingRadius}
          style={style}
          {...props}
        />
      );
    },
  ),
);
