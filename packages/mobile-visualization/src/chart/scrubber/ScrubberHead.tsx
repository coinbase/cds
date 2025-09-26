import { forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';
import { Circle } from 'react-native-svg';
import type { SharedProps } from '@coinbase/cds-common/types';
import {
  projectPoint,
  useChartContext,
  useScrubberContext,
} from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile';

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
    | 'pulse'
    | 'yAxisId'
    | 'onClick'
    | 'onScrubberEnter'
    | 'label'
    | 'labelConfig'
    | 'renderLabel'
    | 'dataX'
    | 'dataY'
    | 'hoverEffect'
  > & {
    /**
     * Applies the Point's pulse effect to the scrubber head while it is at rest.
     * @default false
     */
    idlePulse?: boolean;
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
        idlePulse = false,
        opacity = 1,
        dataKey,
        ...props
      },
      ref,
    ) => {
      const theme = useTheme();
      const pointRef = useRef<PointRef>(null);
      const { getSeries, getXScale, getYScale, getSeriesData } = useChartContext();
      const { highlightedIndex } = useScrubberContext();

      // Find target series for color and data
      const targetSeries = getSeries(seriesId);
      const sourceData = getSeriesData(seriesId);

      // Get scales for this series
      const xScale = getXScale?.();
      const yScale = getYScale?.(targetSeries?.yAxisId);

      const getPixelCoordinate = useCallback(
        (dataX: number, dataY: number) => {
          if (!xScale || !yScale) {
            return { x: 0, y: 0 };
          }

          return projectPoint({
            x: dataX,
            y: dataY,
            xScale,
            yScale,
          });
        },
        [xScale, yScale],
      );

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

      const pixelCoordinate = getPixelCoordinate(x, y);
      const pointColor = color || targetSeries?.color || theme.color.fgPrimary;
      const pulseRadius = radius * 4;
      const innerRingRadius = (radius + pulseRadius) / 2;

      return (
        <>
          <Circle
            cx={pixelCoordinate.x}
            cy={pixelCoordinate.y}
            fill={pointColor}
            opacity={0.15}
            r={innerRingRadius}
          />
          <Point
            ref={pointRef}
            color={pointColor}
            dataX={x}
            dataY={y}
            opacity={opacity}
            pulse={idlePulse && highlightedIndex === undefined}
            pulseRadius={pulseRadius}
            radius={radius}
            stroke={theme.color.bg}
            strokeWidth={2}
            yAxisId={targetSeries?.yAxisId}
            {...props}
          />
        </>
      );
    },
  ),
);
