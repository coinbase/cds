import { forwardRef, memo, useEffect, useImperativeHandle, useMemo } from 'react';
import {
  cancelAnimation,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { useTheme } from '@coinbase/cds-mobile';
import { Circle, Group } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { unwrapAnimatedValue } from '../utils';
import { projectPointWithSerializableScale } from '../utils/point';
import { buildTransition, defaultTransition } from '../utils/transition';

import type { ScrubberBeaconProps, ScrubberBeaconRef } from './Scrubber';

const radius = 5;
const glowRadius = 10;
const pulseRadius = 15;
const strokeWidth = 2;

const defaultPulseTransition = {
  type: 'timing' as const,
  duration: 1000,
};

export type DefaultScrubberBeaconProps = ScrubberBeaconProps;

export const DefaultScrubberBeacon = memo(
  forwardRef<ScrubberBeaconRef, DefaultScrubberBeaconProps>(
    ({ seriesId, color, dataX, dataY, isIdle, idlePulse, animate = true, transitions }, ref) => {
      const theme = useTheme();
      const { getSeries, getXSerializableScale, getYSerializableScale } =
        useCartesianChartContext();

      const targetSeries = useMemo(() => getSeries(seriesId), [getSeries, seriesId]);
      const xScale = useMemo(() => getXSerializableScale(), [getXSerializableScale]);
      const yScale = useMemo(
        () => getYSerializableScale(targetSeries?.yAxisId),
        [getYSerializableScale, targetSeries?.yAxisId],
      );

      const updateTransition = useMemo(
        () => transitions?.update ?? defaultTransition,
        [transitions?.update],
      );
      const pulseTransition = useMemo(
        () => transitions?.pulse ?? defaultPulseTransition,
        [transitions?.pulse],
      );

      const pulseOpacity = useSharedValue(0);
      const manualPulseTrigger = useSharedValue(0);

      // Scrubber state point (actively scrubbing) - project data to pixels
      const scrubberPoint = useDerivedValue(() => {
        if (!xScale || !yScale) return { x: 0, y: 0 };
        return projectPointWithSerializableScale({
          x: unwrapAnimatedValue(dataX),
          y: unwrapAnimatedValue(dataY),
          xScale,
          yScale,
        });
      }, [dataX, dataY, xScale, yScale]);

      // Animated position values for idle state point (the "follower")
      const animatedIdleX = useSharedValue(0);
      const animatedIdleY = useSharedValue(0);

      // Calculate the target idle state point position (the "target") - project data to pixels
      const targetIdleStatePoint = useDerivedValue(() => {
        if (!xScale || !yScale) return { x: 0, y: 0 };
        return projectPointWithSerializableScale({
          x: unwrapAnimatedValue(dataX),
          y: unwrapAnimatedValue(dataY),
          xScale,
          yScale,
        });
      }, [dataX, dataY, xScale, yScale]);

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
          // Increment trigger to cause a manual pulse
          manualPulseTrigger.value += 1;
        },
      }));

      // Watch isIdle changes and control automatic pulse
      useAnimatedReaction(
        () => ({ idle: unwrapAnimatedValue(isIdle), shouldAutoPulse: idlePulse }),
        (current, previous) => {
          'worklet';
          if (!animate) return;

          const { idle, shouldAutoPulse } = current;

          if (idle && shouldAutoPulse) {
            // Start continuous pulse when idle
            pulseOpacity.value = withRepeat(
              withSequence(
                buildTransition(0.1, pulseTransition),
                buildTransition(0, pulseTransition),
              ),
              -1, // infinite loop
              false,
            );
          } else {
            // Stop pulse when not idle or pulse disabled
            cancelAnimation(pulseOpacity);
            pulseOpacity.value = buildTransition(0, pulseTransition);
          }
        },
        [animate, idlePulse],
      );

      // Watch manual pulse trigger
      useAnimatedReaction(
        () => manualPulseTrigger.value,
        (current, previous) => {
          'worklet';
          if (current !== previous && unwrapAnimatedValue(isIdle) && animate) {
            // Trigger a single manual pulse
            cancelAnimation(pulseOpacity);
            pulseOpacity.value = withSequence(
              buildTransition(0.1, pulseTransition),
              buildTransition(0, pulseTransition),
            );
          }
        },
        [animate],
      );

      const scrubberStateOpacity = useDerivedValue(() => {
        if (unwrapAnimatedValue(isIdle)) return 0;
        return 1;
      }, [isIdle]);

      const idleStateOpacity = useDerivedValue(() => {
        if (!unwrapAnimatedValue(isIdle)) return 0;
        return 1;
      }, [isIdle]);

      return (
        <>
          <Group opacity={scrubberStateOpacity}>
            <Circle c={scrubberPoint} color={color} opacity={0.15} r={glowRadius} />
            <Circle c={scrubberPoint} color={theme.color.bg} r={radius + strokeWidth / 2} />
            <Circle c={scrubberPoint} color={color} r={radius - strokeWidth / 2} />
          </Group>
          <Group opacity={idleStateOpacity}>
            <Circle c={animatedIdleStatePoint} color={color} opacity={0.15} r={glowRadius} />
            <Circle
              c={animatedIdleStatePoint}
              color={color}
              opacity={pulseOpacity}
              r={pulseRadius}
            />
            <Circle
              c={animatedIdleStatePoint}
              color={theme.color.bg}
              r={radius + strokeWidth / 2}
            />
            <Circle c={animatedIdleStatePoint} color={color} r={radius - strokeWidth / 2} />
          </Group>
        </>
      );
    },
  ),
);
