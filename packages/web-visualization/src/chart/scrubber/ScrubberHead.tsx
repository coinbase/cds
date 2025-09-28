import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { projectPoint, useScrubberContext } from '@coinbase/cds-common/visualizations/charts';
import { m, useAnimation } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { Point, type PointProps, type PointRef } from '../point';

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
        ...props
      },
      ref,
    ) => {
      const pointRef = useRef<PointRef>(null);
      const { getSeries, getXScale, getYScale, getSeriesData, animate } = useCartesianChartContext();
      const { scrubberPosition } = useScrubberContext();

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
            scrubberPosition != null &&
            scrubberPosition >= 0 &&
            scrubberPosition < sourceData.length
          ) {
            // Use series data at highlight index
            x = scrubberPosition;
            const dataValue = sourceData[scrubberPosition];

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
      }, [dataXProp, dataYProp, sourceData, scrubberPosition, xScale, yScale]);

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

      const previousPositionRef = useRef<{ x: number; y: number } | undefined>(undefined);
      const isInitializedRef = useRef(false);
      const wasScrubbing = useRef(false);

      const isIdleState = scrubberPosition === undefined;

      // Effect for animations
      useEffect(() => {
        if (!targetPosition) return;

        // Initialize on first render
        if (!isInitializedRef.current) {
          controls.set({ x: targetPosition.x, y: targetPosition.y });
          previousPositionRef.current = targetPosition;
          isInitializedRef.current = true;
          return;
        }

        const positionChanged =
          !previousPositionRef.current ||
          previousPositionRef.current.x !== targetPosition.x ||
          previousPositionRef.current.y !== targetPosition.y;

        if (!positionChanged) return;

        if (!isIdleState) {
          // When scrubbing - track that we're scrubbing but don't update controls
          // The scrubbing render doesn't use the animation controls
          wasScrubbing.current = true;
        } else {
          // When idle
          if (wasScrubbing.current) {
            // Just stopped scrubbing - snap to position without animation
            controls.set({ x: targetPosition.x, y: targetPosition.y });
            wasScrubbing.current = false;
          } else if (animate) {
            // Idle state with data update - animate to new position
            controls.start({
              x: targetPosition.x,
              y: targetPosition.y,
              transition: { duration: 0.3, ease: 'easeInOut' },
            });
          } else {
            // Idle but no animation - snap to position
            controls.set({ x: targetPosition.x, y: targetPosition.y });
          }
        }

        // Update previous position
        previousPositionRef.current = targetPosition;
      }, [targetPosition, isIdleState, animate, controls]);

      useImperativeHandle(ref, () => ({
        pulse: () => {
          if (isIdleState) pointRef.current?.pulse();
        },
      }));

      // Don't render until we have a position and it's been initialized
      if (
        !targetPosition ||
        dataX === undefined ||
        dataY === undefined ||
        !isInitializedRef.current
      )
        return null;

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

      // When idle - render with animation wrapper for smooth data updates
      // Render at origin (0,0) and use transform to position
      return (
        <m.g animate={controls} initial={{ x: targetPosition.x, y: targetPosition.y }}>
          <circle cx={0} cy={0} fill={pointColor} opacity={0.15} r={innerRingRadius} />
          <Point
            ref={pointRef}
            color={pointColor}
            dataX={dataX}
            dataY={dataY}
            opacity={opacity}
            pixelCoordinates={{ x: 0, y: 0 }}
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
