import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Reanimated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';
import { Circle, G } from 'react-native-svg';
import type { SharedProps } from '@coinbase/cds-common/types';
import { projectPoint, useScrubberContext } from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile';

import { useCartesianChartContext } from '../ChartProvider';
import { Point, type PointProps, type PointRef } from '../point';

const AnimatedG = Reanimated.createAnimatedComponent(G);

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
        dataX: directX,
        dataY: directY,
        color,
        radius = 4,
        testID,
        idlePulse = false,
        opacity = 1,
        ...props
      },
      ref,
    ) => {
      const theme = useTheme();
      const pointRef = useRef<PointRef>(null);
      const { getSeries, getXScale, getYScale, getSeriesData, animate } = useCartesianChartContext();
      const { scrubberPosition: scrubberPosition } = useScrubberContext();

      const targetSeries = getSeries(seriesId);
      const sourceData = getSeriesData(seriesId);
      const xScale = getXScale();
      const yScale = getYScale(targetSeries?.yAxisId);

      const isIdleState = scrubberPosition === undefined;

      // Animation values
      const animatedX = useSharedValue(0);
      const animatedY = useSharedValue(0);
      const previousPositionRef = useRef<{ x: number; y: number } | undefined>(undefined);
      const [isInitialized, setIsInitialized] = useState(false);
      const wasScrubbing = useRef(false);

      // Calculate data coordinates
      const { dataX, dataY } = useMemo(() => {
        let x: number | undefined;
        let y: number | undefined;

        if (xScale && yScale) {
          if (
            directX !== undefined &&
            directY !== undefined &&
            !isNaN(directY) &&
            !isNaN(directX)
          ) {
            // Use direct coordinates if provided
            x = directX;
            y = directY;
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
      }, [directX, directY, sourceData, scrubberPosition, xScale, yScale]);

      // Calculate target pixel coordinates
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

      // Animated props for the G element
      const animatedProps = useAnimatedProps(() => {
        // React Native SVG expects transforms as an array of objects
        return {
          transform: [{ translateX: animatedX.value }, { translateY: animatedY.value }],
        };
      });

      // Effect for animations
      useEffect(() => {
        if (!targetPosition) return;

        const positionChanged =
          !previousPositionRef.current ||
          previousPositionRef.current.x !== targetPosition.x ||
          previousPositionRef.current.y !== targetPosition.y;

        if (!positionChanged) return;

        if (!isIdleState) {
          // When scrubbing - update immediately and track that we're scrubbing
          animatedX.value = targetPosition.x;
          animatedY.value = targetPosition.y;
          wasScrubbing.current = true;
          if (!isInitialized) {
            setIsInitialized(true);
          }
        } else {
          // When idle
          if (!previousPositionRef.current) {
            // First render - set position immediately
            animatedX.value = targetPosition.x;
            animatedY.value = targetPosition.y;
            if (!isInitialized) {
              setIsInitialized(true);
            }
          } else if (wasScrubbing.current) {
            // Just stopped scrubbing - snap to position without animation
            animatedX.value = targetPosition.x;
            animatedY.value = targetPosition.y;
            wasScrubbing.current = false;
          } else if (animate) {
            // Idle state with data update - animate to new position
            animatedX.value = withSpring(targetPosition.x, {
              damping: 20,
              stiffness: 300,
            });
            animatedY.value = withSpring(targetPosition.y, {
              damping: 20,
              stiffness: 300,
            });
          } else {
            // Idle but no animation - snap to position
            animatedX.value = targetPosition.x;
            animatedY.value = targetPosition.y;
          }
        }

        // Update previous position
        previousPositionRef.current = targetPosition;
      }, [targetPosition, isIdleState, animate, animatedX, animatedY, isInitialized]);

      useImperativeHandle(ref, () => ({
        pulse: () => {
          if (isIdleState) pointRef.current?.pulse();
        },
      }));

      // Don't render until we have a position and it's been initialized
      if (!targetPosition || dataX === undefined || dataY === undefined || !isInitialized)
        return null;
      const pointColor = color ?? targetSeries?.color ?? theme.color.fgPrimary;
      const pulseRadius = radius * 4;
      const innerRingRadius = (radius + pulseRadius) / 2;

      // When scrubbing - render without animation wrapper
      if (!isIdleState) {
        return (
          <G testID={testID}>
            <Circle
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
              stroke={theme.color.bg}
              strokeWidth={2}
              yAxisId={targetSeries?.yAxisId}
              {...props}
            />
          </G>
        );
      }

      // When idle - render with animation wrapper for smooth data updates
      // Render at origin (0,0) and use transform to position
      return (
        <AnimatedG animatedProps={animatedProps} testID={testID}>
          <Circle cx={0} cy={0} fill={pointColor} opacity={0.15} r={innerRingRadius} />
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
            stroke={theme.color.bg}
            strokeWidth={2}
            yAxisId={targetSeries?.yAxisId}
            {...props}
          />
        </AnimatedG>
      );
    },
  ),
);
