import { forwardRef, memo, useEffect, useImperativeHandle, useMemo } from 'react';
import {
  cancelAnimation,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile';
import { Circle, Group } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { applySerializableScale, useScrubberContext } from '../utils';
import {
  evaluateGradientAtValueWithPrecomputedStops,
  getGradientStops,
  type GradientDefinition,
} from '../utils/gradient';
import { convertToSerializableScale } from '../utils/scale';
import { buildTransition, defaultTransition, type TransitionConfig } from '../utils/transition';

const radius = 5;
const glowRadius = 10;
const pulseRadius = 15;
const strokeWidth = 2;

const defaultPulseTransitionConfig: TransitionConfig = {
  type: 'timing',
  duration: 1000,
};

export type ScrubberBeaconRef = {
  /**
   * Triggers a single pulse animation.
   */
  pulse: () => void;
};

export type ScrubberBeaconProps = SharedProps & {
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
   * Gradient configuration.
   * When provided, the beacon color is evaluated based on the data value.
   */
  gradient?: GradientDefinition;
  /**
   * Pulse the scrubber beacon while it is at rest.
   */
  idlePulse?: boolean;
  /**
   * Transition configuration for beacon animations.
   * Allows customization of both position update animations and pulse animations.
   *
   * @example
   * // Custom update and pulse animations
   * beaconTransitionConfig={{
   *   update: { type: 'spring', damping: 8, stiffness: 100 },
   *   pulse: { type: 'timing', duration: 1500 }
   * }}
   */
  beaconTransitionConfig?: {
    /**
     * Transition used for beacon position updates when idle.
     * @default defaultTransition
     */
    update?: TransitionConfig;
    /**
     * Transition used for the pulse animation (0->peak->0).
     * This duration represents a single pulse cycle.
     * @default { type: 'timing', duration: 1000 }
     */
    pulse?: TransitionConfig;
  };
};

/**
 * The ScrubberBeacon is a special instance of a Point used to mark the scrubber's position on a specific series.
 */
export const ScrubberBeacon = memo(
  forwardRef<ScrubberBeaconRef, ScrubberBeaconProps>(
    (
      { seriesId, color, gradient: gradientProp, testID, idlePulse, beaconTransitionConfig },
      ref,
    ) => {
      const theme = useTheme();
      const {
        series,
        getXAxis,
        getSeries,
        getXSerializableScale,
        getYSerializableScale,
        getXScale,
        getYScale,
        getSeriesData,
        animate,
      } = useCartesianChartContext();
      const { scrubberPosition } = useScrubberContext();

      const xAxis = useMemo(() => getXAxis(), [getXAxis]);

      const targetSeries = useMemo(() => getSeries(seriesId), [getSeries, seriesId]);
      const sourceData = useMemo(() => getSeriesData(seriesId), [getSeriesData, seriesId]);
      const gradient = useMemo(
        () => gradientProp ?? targetSeries?.gradient,
        [gradientProp, targetSeries?.gradient],
      );
      const xScale = useMemo(() => getXSerializableScale(), [getXSerializableScale]);
      const yScale = useMemo(
        () => getYSerializableScale(targetSeries?.yAxisId),
        [getYSerializableScale, targetSeries?.yAxisId],
      );

      const gradientScale = useMemo(() => {
        if (!gradient) return;
        const scale = gradient.axis === 'x' ? getXScale() : getYScale(targetSeries?.yAxisId);
        if (!scale) return;
        return convertToSerializableScale(scale);
      }, [gradient, getXScale, getYScale, targetSeries?.yAxisId]);

      // Pre-compute gradient stops off the UI thread for better performance
      const precomputedGradientStops = useMemo(() => {
        if (!gradient || !gradientScale) return undefined;

        // Extract domain from serializable scale
        const domain = { min: gradientScale.domain[0], max: gradientScale.domain[1] };

        return getGradientStops(gradient.stops, domain);
      }, [gradient, gradientScale]);

      const isIdleState = useDerivedValue(() => {
        return scrubberPosition.value === undefined;
      }, [scrubberPosition]);

      // Extract update and pulse configs with defaults
      const updateTransitionConfig = useMemo(
        () => beaconTransitionConfig?.update ?? defaultTransition,
        [beaconTransitionConfig?.update],
      );
      const pulseTransitionConfig = useMemo(
        () => beaconTransitionConfig?.pulse ?? defaultPulseTransitionConfig,
        [beaconTransitionConfig?.pulse],
      );

      const maxDataLength = useMemo(
        () =>
          series?.reduce((max: any, s: any) => {
            const seriesData = getSeriesData(s.id);
            return Math.max(max, seriesData?.length ?? 0);
          }, 0) ?? 0,
        [series, getSeriesData],
      );

      const dataIndex = useDerivedValue(() => {
        return scrubberPosition.value ?? Math.max(0, maxDataLength - 1);
      }, [scrubberPosition, maxDataLength]);

      const dataX = useDerivedValue(() => {
        if (xAxis?.data && Array.isArray(xAxis.data) && xAxis.data[dataIndex.value] !== undefined) {
          const dataValue = xAxis.data[dataIndex.value];
          return typeof dataValue === 'string' ? dataIndex.value : dataValue;
        }
        return dataIndex.value;
      }, [xAxis, dataIndex]);

      // todo: we might not want to show a scrubber if the max data point for this one is less than some of the other series
      // the solution would be to pass in max data index from Scrubber
      const idleDataX = useMemo(() => {
        if (
          xAxis?.data &&
          Array.isArray(xAxis.data) &&
          xAxis.data[maxDataLength - 1] !== undefined
        ) {
          const dataValue = xAxis.data[maxDataLength - 1];
          return typeof dataValue === 'string' ? maxDataLength - 1 : dataValue;
        }
        return maxDataLength - 1;
      }, [xAxis, maxDataLength]);

      const idleDataY = useMemo(() => {
        if (sourceData && sourceData[maxDataLength - 1] !== undefined) {
          const dataValue = sourceData[maxDataLength - 1];
          if (Array.isArray(dataValue)) {
            return dataValue[dataValue.length - 1];
          } else if (dataValue !== null) {
            return dataValue;
          }
        }
      }, [sourceData, maxDataLength]);

      const dataY = useDerivedValue(() => {
        if (xScale && yScale) {
          if (
            sourceData &&
            dataIndex.value !== undefined &&
            dataIndex.value >= 0 &&
            dataIndex.value < sourceData.length
          ) {
            const dataValue = sourceData[dataIndex.value];

            if (typeof dataValue === 'number') {
              return dataValue;
            } else if (Array.isArray(dataValue)) {
              const validValues = dataValue.filter((val): val is number => val !== null);
              if (validValues.length >= 1) {
                return validValues[validValues.length - 1];
              }
            }
          }
        }
      }, [sourceData, scrubberPosition, xScale, yScale]);

      const pulseOpacity = useSharedValue(0);

      // Animated position values for idle state point only (the "follower")
      const animatedIdleX = useSharedValue(0);
      const animatedIdleY = useSharedValue(0);

      // Calculate the target idle state point position (the "target")
      const targetIdleStatePoint = useDerivedValue(() => {
        const pixelX =
          idleDataX !== undefined && xScale ? applySerializableScale(idleDataX, xScale) : undefined;
        const pixelY =
          idleDataY !== undefined && yScale ? applySerializableScale(idleDataY, yScale) : undefined;
        if (pixelX === undefined || pixelY === undefined) return;
        return { x: pixelX, y: pixelY };
      }, [idleDataX, idleDataY, xScale, yScale]);

      // Initialize animated idle position with current target position
      useEffect(() => {
        const targetPos = targetIdleStatePoint.value;
        if (targetPos) {
          animatedIdleX.value = targetPos.x;
          animatedIdleY.value = targetPos.y;
        }
      }, [animatedIdleX, animatedIdleY, targetIdleStatePoint]);

      // Animate idle state position changes when data updates
      useAnimatedReaction(
        () => {
          return targetIdleStatePoint.value;
        },
        (newPosition, previousPosition) => {
          if (
            newPosition &&
            (!previousPosition ||
              newPosition.x !== previousPosition.x ||
              newPosition.y !== previousPosition.y)
          ) {
            if (!animate) {
              // Snap immediately when animations are disabled
              animatedIdleX.value = newPosition.x;
              animatedIdleY.value = newPosition.y;
            } else {
              // Animate to new position using the update transition config
              animatedIdleX.value = buildTransition(newPosition.x, updateTransitionConfig);
              animatedIdleY.value = buildTransition(newPosition.y, updateTransitionConfig);
            }
          }
        },
        [targetIdleStatePoint, animate, updateTransitionConfig],
      );

      // Create animated idle state point using the animated values
      const animatedIdleStatePoint = useDerivedValue(() => {
        return { x: animatedIdleX.value, y: animatedIdleY.value };
      }, [animatedIdleX, animatedIdleY]);

      useImperativeHandle(ref, () => ({
        pulse: () => {
          if (isIdleState.value && animate) {
            pulseOpacity.value = 0.1;
            pulseOpacity.value = buildTransition(0, pulseTransitionConfig);
          }
        },
      }));

      useEffect(() => {
        if (animate && idlePulse) {
          // Use a derived value to control pulse based on scrubber state
          const shouldPulse = scrubberPosition.value === undefined;

          if (shouldPulse) {
            pulseOpacity.value = withRepeat(
              withSequence(
                buildTransition(0.1, pulseTransitionConfig),
                buildTransition(0, pulseTransitionConfig),
              ),
              -1, // loop
              false,
            );
          } else {
            cancelAnimation(pulseOpacity);
            pulseOpacity.value = buildTransition(0, pulseTransitionConfig);
          }
        } else {
          cancelAnimation(pulseOpacity);
          pulseOpacity.value = buildTransition(0, pulseTransitionConfig);
        }
      }, [animate, idlePulse, pulseOpacity, pulseTransitionConfig, scrubberPosition]);

      // Update position when data coordinates change
      /*useEffect(() => {
        const currentPixelCoordinate = pixelCoordinate.value;
        if (!currentPixelCoordinate) return;

        const currentIsIdleState = isIdleState.value;

        // When scrubbing or animations disabled: snap immediately
        if (!currentIsIdleState || !animate || !previousIdleState) {
          // Cancel any ongoing animations before snapping
          cancelAnimation(animatedX);
          cancelAnimation(animatedY);
          animatedX.value = currentPixelCoordinate.x;
          animatedY.value = currentPixelCoordinate.y;
        } else {
          animatedX.value = buildTransition(currentPixelCoordinate.x, updateTransitionConfig);
          animatedY.value = buildTransition(currentPixelCoordinate.y, updateTransitionConfig);
        }
      }, [
        pixelCoordinate,
        isIdleState,
        animate,
        previousIdleState,
        animatedX,
        animatedY,
        updateTransitionConfig,
      ]);*/

      // Create derived animated point for circles

      const pointColor = useDerivedValue(() => {
        if (gradient && gradientScale && precomputedGradientStops) {
          const axis = gradient.axis ?? 'y';
          const dataValue = axis === 'x' ? dataX.value : dataY.value;

          if (dataValue !== undefined) {
            const evaluatedColor = evaluateGradientAtValueWithPrecomputedStops(
              precomputedGradientStops,
              dataValue,
              gradientScale,
            );
            if (evaluatedColor) {
              return evaluatedColor;
            }
          }
        }

        return color ?? targetSeries?.color ?? theme.color.fgPrimary;
      }, [
        gradient,
        gradientScale,
        precomputedGradientStops,
        dataX,
        dataY,
        color,
        targetSeries?.color,
        theme.color.fgPrimary,
      ]);

      const scrubberPoint = useDerivedValue(() => {
        const pixelX =
          dataX.value !== undefined && xScale
            ? applySerializableScale(dataX.value, xScale)
            : undefined;
        const pixelY =
          dataY.value !== undefined && yScale
            ? applySerializableScale(dataY.value, yScale)
            : undefined;
        if (pixelX === undefined || pixelY === undefined) return;
        return { x: pixelX, y: pixelY };
      }, [dataX, dataY, xScale, yScale]);

      const scrubberStateOpacity = useDerivedValue(() => {
        return isIdleState.value ? 0 : 1;
      }, [isIdleState]);

      const idleStatePoint = useDerivedValue(() => {
        const pixelX =
          idleDataX !== undefined && xScale ? applySerializableScale(idleDataX, xScale) : undefined;
        const pixelY =
          idleDataY !== undefined && yScale ? applySerializableScale(idleDataY, yScale) : undefined;
        if (pixelX === undefined || pixelY === undefined) return;
        return { x: pixelX, y: pixelY };
      }, [idleDataX, idleDataY, xScale, yScale]);

      const idleStateOpacity = useDerivedValue(() => {
        return isIdleState.value ? 1 : 0;
      }, [isIdleState]);

      return (
        <>
          <Group opacity={scrubberStateOpacity}>
            {/* Glow circle behind */}
            <Circle c={scrubberPoint} color={pointColor} opacity={0.15} r={glowRadius} />
            {/* Outer stroke circle */}
            <Circle c={scrubberPoint} color={theme.color.bg} r={radius + strokeWidth / 2} />
            {/* Inner fill circle */}
            <Circle c={scrubberPoint} color={pointColor} r={radius - strokeWidth / 2} />
          </Group>
          <Group opacity={idleStateOpacity}>
            {/* Glow circle */}
            <Circle c={animatedIdleStatePoint} color={pointColor} opacity={0.15} r={glowRadius} />
            {/* Pulse circle */}
            <Circle
              c={animatedIdleStatePoint}
              color={pointColor}
              opacity={pulseOpacity}
              r={pulseRadius}
            />
            {/* Outer stroke circle */}
            <Circle
              c={animatedIdleStatePoint}
              color={theme.color.bg}
              r={radius + strokeWidth / 2}
            />
            {/* Inner fill circle */}
            <Circle c={animatedIdleStatePoint} color={pointColor} r={radius - strokeWidth / 2} />
          </Group>
        </>
      );
    },
  ),
);
