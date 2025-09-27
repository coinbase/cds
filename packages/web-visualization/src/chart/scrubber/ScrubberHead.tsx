import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { projectPoint, useScrubberContext } from '@coinbase/cds-common/visualizations/charts';
import { m, useAnimation } from 'framer-motion';

import { useChartContext } from '../ChartProvider';
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
      const pointRef = useRef<PointRef>(null);
      const { getSeries, getXScale, getYScale, getSeriesData, animate } = useChartContext();
      const { highlightedIndex } = useScrubberContext();

      const controls = useAnimation();
      const [animatedPosition, setAnimatedPosition] = useState<{ x: number; y: number } | null>(
        null,
      );
      const wasScrubbingRef = useRef(false);

      // Find target series for color and data
      const targetSeries = getSeries(seriesId);
      const sourceData = getSeriesData(seriesId);

      // Get scales for this series
      const xScale = getXScale();
      const yScale = getYScale(targetSeries?.yAxisId);

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

      // Calculate coordinates (may be invalid)
      let x: number | undefined;
      let y: number | undefined;
      let isValid = false;

      if (xScale && yScale) {
        // Use direct coordinates if provided
        if (directX !== undefined && directY !== undefined) {
          // ensures that both directX/Y are specified and real numbers
          if (directY !== null && directY !== undefined && !isNaN(directY) && !isNaN(directX)) {
            x = directX;
            y = directY;
            isValid = true;
          }
        } else {
          // Use series data and highlight (i.e scrubber) index to plot the Point
          if (
            sourceData &&
            highlightedIndex != null && // not null or undefined
            highlightedIndex >= 0 &&
            highlightedIndex < sourceData.length
          ) {
            x = highlightedIndex;
            const highlightedYValue = sourceData[highlightedIndex];

            // If dataPoint is not null, extract y value
            if (highlightedYValue !== null) {
              if (typeof highlightedYValue === 'number') {
                y = highlightedYValue;
                isValid = true;
              } else if (Array.isArray(highlightedYValue)) {
                const validValues = highlightedYValue.filter((val): val is number => val !== null);
                if (validValues.length >= 2) {
                  y = validValues[1];
                  isValid = true;
                }
              }
            }
          }
        }
      }

      const pixelCoordinate = useMemo(
        () => (x !== undefined && y !== undefined ? getPixelCoordinate(x, y) : { x: 0, y: 0 }),
        [x, y, getPixelCoordinate],
      );

      const pointColor = color || targetSeries?.color || 'var(--color-fgPrimary)';
      const pulseRadius = radius * 4;
      const innerRingRadius = (radius + pulseRadius) / 2;

      // Animate position changes when highlightedIndex is null (idle state)
      useEffect(() => {
        if (!isValid) return;

        const isIdleState = highlightedIndex == null; // true for both null and undefined, but not 0

        // Initialize position on first render
        if (!animatedPosition) {
          setAnimatedPosition(pixelCoordinate);
          controls.set({ x: 0, y: 0 });
          wasScrubbingRef.current = !isIdleState;
          return;
        }

        if (isIdleState) {
          // We're in idle state
          if (wasScrubbingRef.current) {
            // Just transitioned from scrubbing to idle - immediately reset without animation
            controls.set({ x: 0, y: 0 });
            setAnimatedPosition(pixelCoordinate);
            wasScrubbingRef.current = false;
          } else if (animate) {
            // We were already idle and position changed - animate the change
            if (
              animatedPosition.x !== pixelCoordinate.x ||
              animatedPosition.y !== pixelCoordinate.y
            ) {
              // Calculate the translation delta from current animated position
              const deltaX = pixelCoordinate.x - animatedPosition.x;
              const deltaY = pixelCoordinate.y - animatedPosition.y;

              // Animate using transform translate
              controls
                .start({
                  x: deltaX,
                  y: deltaY,
                  transition: {
                    duration: 0.3, // 300ms as requested
                    ease: 'easeInOut',
                  },
                })
                .then(() => {
                  // After animation completes, reset transform and update position
                  controls.set({ x: 0, y: 0 });
                  setAnimatedPosition(pixelCoordinate);
                });
            }
          } else {
            // Animation disabled, just update position
            controls.set({ x: 0, y: 0 });
            setAnimatedPosition(pixelCoordinate);
          }
        } else {
          // We're scrubbing - immediately update position (no animation)
          controls.set({ x: 0, y: 0 });
          setAnimatedPosition(pixelCoordinate);
          wasScrubbingRef.current = true;
        }
      }, [pixelCoordinate, highlightedIndex, animate, animatedPosition, controls, isValid]);

      useImperativeHandle(ref, () => ({
        pulse: () => pointRef.current?.pulse(),
      }));

      // Early return if invalid coordinates
      if (!isValid || !xScale || !yScale || x === undefined || y === undefined) {
        return null;
      }

      const isIdleState = highlightedIndex == null; // true for both null and undefined, but not 0

      // Use the animated position if available, otherwise use current pixel coordinate
      const displayPosition = animatedPosition || pixelCoordinate;

      return (
        <m.g animate={controls} initial={{ x: 0, y: 0 }}>
          <circle
            cx={displayPosition.x}
            cy={displayPosition.y}
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
            pixelCoordinates={displayPosition}
            pulse={idlePulse && isIdleState}
            pulseRadius={pulseRadius}
            radius={radius}
            stroke="var(--color-bg)"
            strokeWidth={2}
            yAxisId={targetSeries?.yAxisId}
            {...props}
          />
        </m.g>
      );
    },
  ),
);
