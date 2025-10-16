import { forwardRef, memo, useEffect, useImperativeHandle, useMemo } from 'react';
import {
  cancelAnimation,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile';
import { Circle, Group } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { projectPoint, useScrubberContext } from '../utils';

const radius = 5;
const glowRadius = 10;
const pulseRadius = 15;

const pulseDuration = 2000; // 2 seconds
const singlePulseDuration = 1000; // 1 second

export type ScrubberBeaconRef = {
  /**
   * Triggers a single pulse animation.
   */
  pulse: () => void;
};

export type ScrubberBeaconProps = SharedProps & {
  /**
   * Optional data X coordinate to position the beacon.
   * If not provided, uses the scrubber position from context.
   */
  dataX?: number;
  /**
   * Optional data Y coordinate to position the beacon.
   * If not provided, looks up the Y value from series data at scrubber position.
   */
  dataY?: number;
  /**
   * Filter to only show dot for specific series (used for hover-based positioning).
   */
  seriesId?: string;
  /**
   * Color of the beacon point.
   * If not provided, uses the series color.
   */
  color?: string;
  /**
   * Opacity of the beacon.
   * @default 1
   */
  opacity?: number;
  /**
   * Pulse the scrubber beacon while it is at rest.
   */
  idlePulse?: boolean;
};

/**
 * The ScrubberBeacon is a special instance of a Point used to mark the scrubber's position on a specific series.
 */
export const ScrubberBeacon = memo(
  forwardRef<ScrubberBeaconRef, ScrubberBeaconProps>(
    (
      { seriesId, dataX: dataXProp, dataY: dataYProp, color, testID, idlePulse, opacity = 1 },
      ref,
    ) => {
      const theme = useTheme();
      const { getSeries, getXScale, getYScale, getSeriesData, animate } =
        useCartesianChartContext();
      const { scrubberPosition } = useScrubberContext();

      const targetSeries = getSeries(seriesId);
      const sourceData = getSeriesData(seriesId);
      const xScale = getXScale();
      const yScale = getYScale(targetSeries?.yAxisId);

      const isIdleState = scrubberPosition === undefined;

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

      const previousIdleState = usePreviousValue(!!isIdleState);

      const pixelCoordinate = useMemo(() => {
        if (!xScale || !yScale || dataX === undefined || dataY === undefined) return undefined;

        const point = projectPoint({
          x: dataX,
          y: dataY,
          xScale,
          yScale,
        });

        // Return undefined if coordinates are invalid
        if (!point || isNaN(point.x) || isNaN(point.y)) return undefined;

        return point;
      }, [xScale, yScale, dataX, dataY]);

      const animatedX = useSharedValue(pixelCoordinate?.x ?? 0);
      const animatedY = useSharedValue(pixelCoordinate?.y ?? 0);
      const pulseOpacity = useSharedValue(0);

      useImperativeHandle(ref, () => ({
        pulse: () => {
          if (isIdleState && animate) {
            pulseOpacity.value = 0.1;
            pulseOpacity.value = withTiming(0, { duration: singlePulseDuration });
          }
        },
      }));

      useEffect(() => {
        const shouldPulse = animate && isIdleState && idlePulse;

        if (shouldPulse) {
          pulseOpacity.value = withRepeat(
            withSequence(
              withTiming(0.1, { duration: pulseDuration / 2 }),
              withTiming(0, { duration: pulseDuration / 2 }),
            ),
            -1, // loop
            false,
          );
        } else {
          cancelAnimation(pulseOpacity);
          pulseOpacity.value = withTiming(0, { duration: 200 });
        }
      }, [animate, isIdleState, idlePulse, pulseOpacity]);

      // Update position when data coordinates change
      useEffect(() => {
        if (!pixelCoordinate) return;

        // When scrubbing or animations disabled: snap immediately
        if (!isIdleState || !animate || !previousIdleState) {
          // Cancel any ongoing animations before snapping
          cancelAnimation(animatedX);
          cancelAnimation(animatedY);
          animatedX.value = pixelCoordinate.x;
          animatedY.value = pixelCoordinate.y;
        } else {
          // When idle with animations enabled: animate smoothly
          animatedX.value = withTiming(pixelCoordinate.x, { duration: 300 });
          animatedY.value = withTiming(pixelCoordinate.y, { duration: 300 });
        }
      }, [pixelCoordinate, isIdleState, animate, previousIdleState, animatedX, animatedY]);

      // Create derived animated point for circles
      const animatedPoint = useDerivedValue(() => {
        return { x: animatedX.value, y: animatedY.value };
      }, [animatedX, animatedY]);

      if (!pixelCoordinate) return null;

      const pointColor = color ?? targetSeries?.color ?? theme.color.fgPrimary;

      if (!isIdleState) {
        return (
          <Group opacity={opacity}>
            {/* Glow circle behind */}
            <Circle
              c={{ x: pixelCoordinate.x, y: pixelCoordinate.y }}
              color={pointColor}
              opacity={0.15}
              r={glowRadius}
            />
            {/* Filled circle */}
            <Circle
              c={{ x: pixelCoordinate.x, y: pixelCoordinate.y }}
              color={pointColor}
              r={radius}
            />
            {/* Stroke circle (background color) */}
            <Circle
              c={{ x: pixelCoordinate.x, y: pixelCoordinate.y }}
              color={theme.color.bg}
              r={radius}
              strokeWidth={2}
              style="stroke"
            />
          </Group>
        );
      }

      return (
        <Group opacity={opacity}>
          {/* Glow circle */}
          <Circle c={animatedPoint} color={pointColor} opacity={0.15} r={glowRadius} />
          {/* Pulse circle */}
          <Circle c={animatedPoint} color={pointColor} opacity={pulseOpacity} r={pulseRadius} />
          {/* Filled circle */}
          <Circle c={animatedPoint} color={pointColor} r={radius} />
          {/* Stroke circle (background color) */}
          <Circle
            c={animatedPoint}
            color={theme.color.bg}
            r={radius}
            strokeWidth={2}
            style="stroke"
          />
        </Group>
      );
    },
  ),
);
