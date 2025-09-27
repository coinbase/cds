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

      // Calculate the target position
      const targetPosition = useMemo(
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

      const [currentPosition, setCurrentPosition] = useState<{ x: number; y: number } | null>(
        targetPosition ?? null,
      );

      const isIdleState = highlightedIndex === undefined;

      // Effect for idle state animations
      useEffect(() => {
        if (!targetPosition) return;

        // Set the current position to the target position when we don't have a current position
        if (!currentPosition) {
          controls.set({ x: 0, y: 0 });
          setCurrentPosition(targetPosition);
          return;
        }

        // If the user is scrubbing, we don't want to animate the position
        if (!isIdleState) {
          controls.set({ x: 0, y: 0 });
          setCurrentPosition(null);
          return;
        }

        const positionChanged =
          currentPosition.x !== targetPosition.x || currentPosition.y !== targetPosition.y;
        if (!positionChanged) return;

        const updatePosition = () => {
          controls.set({ x: 0, y: 0 });
          setCurrentPosition(targetPosition);
        };

        if (animate) {
          // Animate to new position
          const deltaX = targetPosition.x - currentPosition.x;
          const deltaY = targetPosition.y - currentPosition.y;

          controls
            .start({
              x: deltaX,
              y: deltaY,
              transition: { duration: 0.3, ease: 'easeInOut' },
            })
            .then(() => updatePosition());
        } else {
          updatePosition();
        }
      }, [targetPosition, isIdleState, animate, currentPosition, controls]);

      useImperativeHandle(ref, () => ({
        pulse: () => {
          if (isIdleState) pointRef.current?.pulse();
        },
      }));

      if (!targetPosition || dataX === undefined || dataY === undefined) return null;

      const pointColor = color ?? targetSeries?.color ?? 'var(--color-fgPrimary)';
      const pulseRadius = radius * 4;
      const innerRingRadius = (radius + pulseRadius) / 2;

      // When scrubbing - render without animation wrapper
      if (!isIdleState) {
        return (
          <g>
            <circle
              cx={targetPosition.x}
              cy={targetPosition.y}
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
              pixelCoordinates={targetPosition}
              pulse={false}
              pulseRadius={pulseRadius}
              radius={radius}
              stroke="var(--color-bg)"
              strokeWidth={2}
              yAxisId={targetSeries?.yAxisId}
              {...props}
            />
          </g>
        );
      }

      const displayPosition = currentPosition ?? targetPosition;

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
            pulse={idlePulse}
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
