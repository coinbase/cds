import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Reanimated, {
  cancelAnimation,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Circle, G } from 'react-native-svg';
import type { SharedProps } from '@coinbase/cds-common/types';
import { projectPoint, useScrubberContext } from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile';

import { useCartesianChartContext } from '../ChartProvider';

const AnimatedCircle = Reanimated.createAnimatedComponent(Circle);

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
      const {
        getSeries,
        getXScale,
        getYScale,
        getSeriesData,
        animate: animationEnabled,
      } = useCartesianChartContext();
      const { scrubberPosition } = useScrubberContext();

      const targetSeries = getSeries(seriesId);
      const sourceData = getSeriesData(seriesId);
      const xScale = getXScale();
      const yScale = getYScale(targetSeries?.yAxisId);

      const isIdleState = scrubberPosition === undefined;

      // Shared values for animations
      const animatedX = useSharedValue(0);
      const animatedY = useSharedValue(0);
      const pulseOpacity = useSharedValue(0);
      const previousPositionRef = useRef<{ x: number; y: number } | undefined>(undefined);
      const [isInitialized, setIsInitialized] = useState(false);
      const wasScrubbing = useRef(false);

      // Calculate data coordinates
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

      // Calculate target pixel coordinates
      const pixelCoordinate = useMemo(() => {
        if (!xScale || !yScale || dataX === undefined || dataY === undefined) {
          return null;
        }

        return projectPoint({
          x: dataX,
          y: dataY,
          xScale,
          yScale,
        });
      }, [xScale, yScale, dataX, dataY]);

      // Imperative handle for pulse
      useImperativeHandle(ref, () => ({
        pulse: () => {
          if (isIdleState && animationEnabled) {
            pulseOpacity.value = 0.1;
            pulseOpacity.value = withTiming(0, { duration: singlePulseDuration });
          }
        },
      }));

      // Pulse opacity animation
      useEffect(() => {
        const shouldPulse = animationEnabled && isIdleState && idlePulse;

        if (shouldPulse) {
          pulseOpacity.value = withRepeat(
            withSequence(
              withTiming(0.1, { duration: pulseDuration / 2 }),
              withTiming(0, { duration: pulseDuration / 2 }),
            ),
            -1, // infinite repeat
            false,
          );
        } else {
          cancelAnimation(pulseOpacity);
          pulseOpacity.value = withTiming(0, { duration: 200 });
        }
      }, [animationEnabled, isIdleState, idlePulse, pulseOpacity]);

      // Position animation
      useEffect(() => {
        if (!pixelCoordinate) return;

        const positionChanged =
          !previousPositionRef.current ||
          previousPositionRef.current.x !== pixelCoordinate.x ||
          previousPositionRef.current.y !== pixelCoordinate.y;

        if (!positionChanged) return;

        if (!isIdleState) {
          // When scrubbing - update immediately
          animatedX.value = pixelCoordinate.x;
          animatedY.value = pixelCoordinate.y;
          wasScrubbing.current = true;
          if (!isInitialized) {
            setIsInitialized(true);
          }
        } else {
          // When idle
          if (!previousPositionRef.current) {
            // First render - set position immediately
            animatedX.value = pixelCoordinate.x;
            animatedY.value = pixelCoordinate.y;
            if (!isInitialized) {
              setIsInitialized(true);
            }
          } else if (wasScrubbing.current) {
            // Just stopped scrubbing - snap to position
            animatedX.value = pixelCoordinate.x;
            animatedY.value = pixelCoordinate.y;
            wasScrubbing.current = false;
          } else if (animationEnabled) {
            // Idle state with data update - animate to new position
            animatedX.value = withTiming(pixelCoordinate.x, { duration: 300 });
            animatedY.value = withTiming(pixelCoordinate.y, { duration: 300 });
          } else {
            // Idle but no animation - snap to position
            animatedX.value = pixelCoordinate.x;
            animatedY.value = pixelCoordinate.y;
          }
        }

        previousPositionRef.current = pixelCoordinate;
      }, [pixelCoordinate, isIdleState, animationEnabled, animatedX, animatedY, isInitialized]);

      // Animated props - MUST be called unconditionally (hooks rule)
      // Animate cx/cy for glow ring
      const glowAnimatedProps = useAnimatedProps(() => ({
        cx: animatedX.value,
        cy: animatedY.value,
      }));

      // Animate cx/cy and opacity for pulse ring
      const pulseAnimatedProps = useAnimatedProps(() => ({
        cx: animatedX.value,
        cy: animatedY.value,
        opacity: pulseOpacity.value,
      }));

      // Animate cx/cy for main point
      const pointAnimatedProps = useAnimatedProps(() => ({
        cx: animatedX.value,
        cy: animatedY.value,
      }));

      // Don't render until initialized
      if (!pixelCoordinate || !isInitialized) {
        return null;
      }

      const pointColor = color ?? targetSeries?.color ?? theme.color.fgPrimary;

      // When scrubbing - render without animation (regular SVG elements)
      if (!isIdleState) {
        return (
          <G opacity={opacity} testID={testID}>
            <Circle
              cx={pixelCoordinate.x}
              cy={pixelCoordinate.y}
              fill={pointColor}
              opacity={0.15}
              r={glowRadius}
            />
            <Circle
              cx={pixelCoordinate.x}
              cy={pixelCoordinate.y}
              fill={pointColor}
              r={radius}
              stroke={theme.color.bg}
              strokeWidth={2}
            />
          </G>
        );
      }

      // When idle - animate each circle's cx/cy independently
      return (
        <G opacity={opacity} testID={testID}>
          <AnimatedCircle
            animatedProps={glowAnimatedProps}
            fill={pointColor}
            opacity={0.15}
            r={glowRadius}
          />
          <AnimatedCircle animatedProps={pulseAnimatedProps} fill={pointColor} r={pulseRadius} />
          <AnimatedCircle
            animatedProps={pointAnimatedProps}
            fill={pointColor}
            r={radius}
            stroke={theme.color.bg}
            strokeWidth={2}
          />
        </G>
      );
    },
  ),
);
