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
import { useScrubberContext } from '../utils';
import {
  evaluateGradientAtValue,
  getGradientStops,
  type GradientDefinition,
} from '../utils/gradient';
import { getPointOnSerializableScale } from '../utils/point';
import { convertToSerializableScale } from '../utils/scale';
import { buildTransition, defaultTransition, type Transition } from '../utils/transition';

const radius = 5;
const glowRadius = 10;
const pulseRadius = 15;
const strokeWidth = 2;

const defaultPulseTransition: Transition = {
  type: 'timing',
  duration: 1000,
};

export type ScrubberBeaconRef = {
  /**
   * Triggers a single pulse animation.
   */
  pulse: () => void;
};

export type ScrubberBeaconBaseProps = SharedProps & {
  /**
   * Filter to only show dot for specific series (used for hover-based positioning).
   */
  seriesId?: string;
  /**
   * Color of the beacon point.
   * If not provided, uses the series color.
   * Gradient overrides this property.
   */
  color?: string;
  /**
   * Gradient configuration.
   * When provided, this overrides color.
   */
  gradient?: GradientDefinition;
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
 * By default, the beacon position is determined by the scrubber context.
 */
export type ContextPositionedBeaconProps = ScrubberBeaconBaseProps & {
  dataX?: never;
  dataY?: never;
};

/**
 * You can also provide direct X and Y coordinates for positioning.
 */
export type DirectPositionedBeaconProps = ScrubberBeaconBaseProps & {
  /**
   * Direct X coordinate for positioning.
   * When provided, dataY must also be provided.
   */
  dataX: number;
  /**
   * Direct Y coordinate for positioning.
   * When provided, dataX must also be provided.
   */
  dataY: number;
};

export type ScrubberBeaconProps = (ContextPositionedBeaconProps | DirectPositionedBeaconProps) & {
  /**
   * Transition configuration for beacon animations.
   *
   * @example
   * // Custom update and pulse animations
   * transitions={{
   *   update: { type: 'spring', damping: 8, stiffness: 100 },
   *   pulse: { type: 'timing', duration: 1500 }
   * }}
   */
  transitions?: {
    /**
     * Transition used for beacon position updates when idle.
     * @default defaultTransition
     */
    update?: Transition;
    /**
     * Transition used for the pulse animation.
     * When using 'idlePulse', this transition is applied in both directions (0->peak->0).
     * When using 'pulse' from a ref, this transition is applied in a single direction (peak->0).
     * @default { type: 'timing', duration: 1000 }
     */
    pulse?: Transition;
  };
};

export const ScrubberBeacon = memo(
  forwardRef<ScrubberBeaconRef, ScrubberBeaconProps>(
    (
      {
        seriesId,
        dataX: dataXProp,
        dataY: dataYProp,
        color,
        gradient: gradientProp,
        opacity = 1,
        testID,
        idlePulse,
        transitions,
      },
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
        drawingArea,
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

      const gradientStops = useMemo(() => {
        if (!gradient || !gradientScale) return undefined;
        const domain = { min: gradientScale.domain[0], max: gradientScale.domain[1] };
        return getGradientStops(gradient.stops, domain);
      }, [gradient, gradientScale]);

      const isIdleState = useDerivedValue(() => {
        return scrubberPosition.value === undefined;
      }, [scrubberPosition]);

      const updateTransition = useMemo(
        () => transitions?.update ?? defaultTransition,
        [transitions?.update],
      );
      const pulseTransition = useMemo(
        () => transitions?.pulse ?? defaultPulseTransition,
        [transitions?.pulse],
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
        // Use direct prop if provided (discriminated union ensures both are present)
        if (dataXProp !== undefined && !isNaN(dataXProp)) {
          return dataXProp;
        }

        // Fall back to context-based resolution
        if (xAxis?.data && Array.isArray(xAxis.data) && xAxis.data[dataIndex.value] !== undefined) {
          const dataValue = xAxis.data[dataIndex.value];
          return typeof dataValue === 'string' ? dataIndex.value : dataValue;
        }
        return dataIndex.value;
      }, [dataXProp, xAxis, dataIndex]);

      // todo: we might not want to show a scrubber if the max data point for this one is less than some of the other series
      // the solution would be to pass in max data index from Scrubber
      const idleDataX = useMemo(() => {
        // Use direct prop if provided (discriminated union ensures both are present)
        if (dataXProp !== undefined && !isNaN(dataXProp)) {
          return dataXProp;
        }

        // Fall back to last data point
        if (
          xAxis?.data &&
          Array.isArray(xAxis.data) &&
          xAxis.data[maxDataLength - 1] !== undefined
        ) {
          const dataValue = xAxis.data[maxDataLength - 1];
          return typeof dataValue === 'string' ? maxDataLength - 1 : dataValue;
        }
        return maxDataLength - 1;
      }, [dataXProp, xAxis, maxDataLength]);

      const idleDataY = useMemo(() => {
        // Use direct prop if provided (discriminated union ensures both are present)
        if (dataYProp !== undefined && !isNaN(dataYProp)) {
          return dataYProp;
        }

        // Fall back to last data point
        if (sourceData && sourceData[maxDataLength - 1] !== undefined) {
          const dataValue = sourceData[maxDataLength - 1];
          if (Array.isArray(dataValue)) {
            return dataValue[dataValue.length - 1];
          } else if (dataValue !== null) {
            return dataValue;
          }
        }
      }, [dataYProp, sourceData, maxDataLength]);

      const dataY = useDerivedValue(() => {
        // Use direct prop if provided (discriminated union ensures both are present)
        if (dataYProp !== undefined && !isNaN(dataYProp)) {
          return dataYProp;
        }

        // Fall back to context-based resolution
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
      }, [dataYProp, sourceData, scrubberPosition, xScale, yScale, dataIndex]);

      const pulseOpacity = useSharedValue(0);

      // Animated position values for idle state point only (the "follower")
      const animatedIdleX = useSharedValue(0);
      const animatedIdleY = useSharedValue(0);

      // Calculate the target idle state point position (the "target")
      const targetIdleStatePoint = useDerivedValue(() => {
        const pixelX =
          idleDataX !== undefined && xScale
            ? getPointOnSerializableScale(idleDataX, xScale)
            : undefined;
        const pixelY =
          idleDataY !== undefined && yScale
            ? getPointOnSerializableScale(idleDataY, yScale)
            : undefined;
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
              animatedIdleX.value = buildTransition(newPosition.x, updateTransition);
              animatedIdleY.value = buildTransition(newPosition.y, updateTransition);
            }
          }
        },
        [targetIdleStatePoint, animate, updateTransition],
      );

      // Create animated idle state point using the animated values
      const animatedIdleStatePoint = useDerivedValue(() => {
        return { x: animatedIdleX.value, y: animatedIdleY.value };
      }, [animatedIdleX, animatedIdleY]);

      useImperativeHandle(ref, () => ({
        pulse: () => {
          if (isIdleState.value && animate) {
            pulseOpacity.value = 0.1;
            pulseOpacity.value = buildTransition(0, pulseTransition);
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
                buildTransition(0.1, pulseTransition),
                buildTransition(0, pulseTransition),
              ),
              -1, // loop
              false,
            );
          } else {
            cancelAnimation(pulseOpacity);
            pulseOpacity.value = buildTransition(0, pulseTransition);
          }
        } else {
          cancelAnimation(pulseOpacity);
          pulseOpacity.value = buildTransition(0, pulseTransition);
        }
      }, [animate, idlePulse, pulseOpacity, pulseTransition, scrubberPosition]);

      const pointColor = useDerivedValue(() => {
        if (color) return color;
        if (gradient && gradientScale && gradientStops) {
          const axis = gradient.axis ?? 'y';
          const dataValue = axis === 'x' ? dataX.value : dataY.value;

          if (dataValue !== undefined) {
            const evaluatedColor = evaluateGradientAtValue(gradientStops, dataValue, gradientScale);
            if (evaluatedColor) {
              return evaluatedColor;
            }
          }
        }

        return targetSeries?.color ?? theme.color.fgPrimary;
      }, [
        gradient,
        gradientScale,
        gradientStops,
        dataX,
        dataY,
        color,
        targetSeries?.color,
        theme.color.fgPrimary,
      ]);

      const scrubberPoint = useDerivedValue(() => {
        const pixelX =
          dataX.value !== undefined && xScale
            ? getPointOnSerializableScale(dataX.value, xScale)
            : undefined;
        const pixelY =
          dataY.value !== undefined && yScale
            ? getPointOnSerializableScale(dataY.value, yScale)
            : undefined;
        if (pixelX === undefined || pixelY === undefined) return;
        return { x: pixelX, y: pixelY };
      }, [dataX, dataY, xScale, yScale]);

      const scrubberStateOpacity = useDerivedValue(() => {
        if (isIdleState.value) return 0;
        if (!scrubberPoint.value) return 0;

        // Check if scrubber point is within drawing area
        const isWithinBounds =
          scrubberPoint.value.x >= drawingArea.x &&
          scrubberPoint.value.x <= drawingArea.x + drawingArea.width &&
          scrubberPoint.value.y >= drawingArea.y &&
          scrubberPoint.value.y <= drawingArea.y + drawingArea.height;

        return (isWithinBounds ? 1 : 0) * opacity;
      }, [isIdleState, scrubberPoint, drawingArea, opacity]);

      const idleStateOpacity = useDerivedValue(() => {
        if (!isIdleState.value) return 0;
        if (!animatedIdleStatePoint.value) return 0;

        // Check if idle state point is within drawing area
        const isWithinBounds =
          animatedIdleStatePoint.value.x >= drawingArea.x &&
          animatedIdleStatePoint.value.x <= drawingArea.x + drawingArea.width &&
          animatedIdleStatePoint.value.y >= drawingArea.y &&
          animatedIdleStatePoint.value.y <= drawingArea.y + drawingArea.height;

        return (isWithinBounds ? 1 : 0) * opacity;
      }, [isIdleState, animatedIdleStatePoint, drawingArea, opacity]);

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
