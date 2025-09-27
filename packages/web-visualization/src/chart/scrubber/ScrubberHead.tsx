import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
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
        dataX: dataXProp,
        dataY: dataYProp,
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

      const targetSeries = getSeries(seriesId);
      const sourceData = getSeriesData(seriesId);
      const xScale = getXScale();
      const yScale = getYScale(targetSeries?.yAxisId);

      const { dataX, dataY } = useMemo(() => {
        let x: number | undefined;
        let y: number | undefined;

        if (xScale && yScale) {
          if (
            dataXProp !== undefined &&
            dataYProp !== undefined &&
            !isNaN(dataYProp) &&
            !isNaN(dataXProp)
          ) {
            // Use direct coordinates if provided
            x = dataXProp;
            y = dataYProp;
          } else if (
            sourceData &&
            highlightedIndex != null &&
            highlightedIndex >= 0 &&
            highlightedIndex < sourceData.length
          ) {
            // Use series data at highlight index
            x = highlightedIndex;
            const dataValue = sourceData[highlightedIndex];

            if (typeof dataValue === 'number') {
              y = dataValue;
            } else if (Array.isArray(dataValue)) {
              const validValues = dataValue.filter((val): val is number => val !== null);
              if (validValues.length >= 2) {
                y = validValues[1];
              }
            }
          }
        }

        return { dataX: x, dataY: y };
      }, [dataXProp, dataYProp, sourceData, highlightedIndex, xScale, yScale]);

      const pixelCoordinate = useMemo(
        () =>
          dataX !== undefined && dataY !== undefined && xScale && yScale
            ? projectPoint({
                x: dataX,
                y: dataY,
                xScale,
                yScale,
              })
            : undefined,
        [dataX, dataY, xScale, yScale],
      );

      const pointColor = color || targetSeries?.color || 'var(--color-fgPrimary)';
      const pulseRadius = radius * 4;
      const innerRingRadius = (radius + pulseRadius) / 2;

      useEffect(() => {
        if (!pixelCoordinate) return;

        const isIdleState = highlightedIndex === undefined;

        // Initialize on first render
        if (!animatedPosition) {
          setAnimatedPosition(pixelCoordinate);
          controls.set({ x: 0, y: 0 });
          wasScrubbingRef.current = !isIdleState;
          return;
        }

        const positionChanged =
          animatedPosition.x !== pixelCoordinate.x || animatedPosition.y !== pixelCoordinate.y;

        const updatePositionImmediately = () => {
          controls.set({ x: 0, y: 0 });
          setAnimatedPosition(pixelCoordinate);
        };

        if (!isIdleState) {
          // Scrubbing - always update immediately
          updatePositionImmediately();
          wasScrubbingRef.current = true;
        } else if (wasScrubbingRef.current) {
          // Just stopped scrubbing - reset immediately
          updatePositionImmediately();
          wasScrubbingRef.current = false;
        } else if (animate && positionChanged) {
          // Idle state with animation enabled - animate the change
          const deltaX = pixelCoordinate.x - animatedPosition.x;
          const deltaY = pixelCoordinate.y - animatedPosition.y;

          controls
            .start({
              x: deltaX,
              y: deltaY,
              transition: { duration: 0.3, ease: 'easeInOut' },
            })
            .then(() => updatePositionImmediately());
        } else if (!animate) {
          // Animation disabled
          updatePositionImmediately();
        }
      }, [pixelCoordinate, highlightedIndex, animate, animatedPosition, controls]);

      useImperativeHandle(ref, () => ({
        pulse: () => {
          if (highlightedIndex === undefined) pointRef.current?.pulse();
        },
      }));

      if (!pixelCoordinate || dataX === undefined || dataY === undefined) return null;

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
            dataX={dataX}
            dataY={dataY}
            opacity={opacity}
            pixelCoordinates={displayPosition}
            pulse={idlePulse && highlightedIndex === undefined}
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
