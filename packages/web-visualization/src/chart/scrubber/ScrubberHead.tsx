import { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useChartContext } from '@coinbase/cds-common/visualizations/charts';

import { useScrubberContext } from '../Chart';
import { Point, type PointProps, type PointRef } from '../point';

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

export type ScrubberHeadProps = SharedProps &
  Omit<
    PointProps,
    | 'yAxisId'
    | 'xAxisId'
    | 'onClick'
    | 'onScrubberEnter'
    | 'label'
    | 'labelConfig'
    | 'renderLabel'
    | 'dataX'
    | 'dataY'
    | 'hoverEffect'
  > & {
    // make Point's coordinates optional for ScrubberHead
    dataX?: PointProps['dataX'];
    dataY?: PointProps['dataY'];
    /**
     * Filter to only show dot for specific series (used for hover-based positioning).
     */
    seriesId?: string;
    /**
     * Key that identifies the current dataset.
     * When this changes, triggers a fade-out/fade-in transition animation.
     * Useful for distinguishing between live updates vs complete dataset changes.
     */
    dataKey?: string | number;
  };

/**
 * The ScrubberHead is a special instance of a Point used to mark the scrubber's position on a specific series.
 * It optionally labels the Point with an instance of ScrubberHeadLabel.
 */
export const ScrubberHead = memo(
  forwardRef<ScrubberHeadRef, ScrubberHeadProps>(
    (
      {
        seriesId,
        dataX: directX,
        dataY: directY,
        color,
        radius = 4,
        testID,
        pulse = false,
        opacity = 1,
        dataKey,
        ...props
      },
      ref,
    ) => {
      const { getSeries, getXScale, getYScale, getSeriesData } = useChartContext();
      const pointRef = useRef<PointRef>(null);

      const { highlightedIndex } = useScrubberContext();

      // Find target series for color and data
      const targetSeries = getSeries(seriesId);
      const sourceData = getSeriesData(seriesId);

      // Get scales for this series
      const xScale = getXScale?.(targetSeries?.xAxisId);
      const yScale = getYScale?.(targetSeries?.yAxisId);

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
          if (validValues.length < 2) {
            return null;
          }

          y = validValues[1];
        } else {
          // Fallback case - shouldn't happen with proper typing
          return null;
        }
      }

      const pointColor = color || targetSeries?.color || 'var(--color-fgPrimary)';

      return (
        <Point
          ref={pointRef}
          color={pointColor}
          dataX={x}
          dataY={y}
          opacity={opacity}
          pulse={pulse}
          radius={radius}
          stroke="var(--color-bg)"
          strokeWidth={2}
          {...props}
        />
      );
    },
  ),
);
