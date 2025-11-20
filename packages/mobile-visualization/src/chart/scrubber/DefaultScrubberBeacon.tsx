import { forwardRef, memo, useImperativeHandle, useMemo } from 'react';
import {
  cancelAnimation,
  Easing,
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
import { buildTransition, defaultTransition, type Transition } from '../utils/transition';

import type { ScrubberBeaconProps, ScrubberBeaconRef } from './Scrubber';

const radius = 5;
const strokeWidth = 2;

const pulseOpacityStart = 0.5;
const pulseOpacityEnd = 0;
const pulseRadiusStart = 10;
const pulseRadiusEnd = 15;

const defaultPulseTransition: Transition = {
  type: 'timing',
  duration: 1600,
  easing: Easing.bezier(0.0, 0.0, 0.0, 1.0),
};

const defaultPulseRepeatDelay = 400;

export type DefaultScrubberBeaconProps = ScrubberBeaconProps;

export const DefaultScrubberBeacon = memo(
  forwardRef<ScrubberBeaconRef, DefaultScrubberBeaconProps>(
    (
      {
        seriesId,
        color: colorProp,
        dataX,
        dataY,
        isIdle,
        idlePulse,
        animate = true,
        transitions,
        opacity: opacityProp = 1,
      },
      ref,
    ) => {
      const theme = useTheme();
      const { getSeries, getXSerializableScale, getYSerializableScale, drawingArea } =
        useCartesianChartContext();

      const targetSeries = useMemo(() => getSeries(seriesId), [getSeries, seriesId]);
      const xScale = useMemo(() => getXSerializableScale(), [getXSerializableScale]);
      const yScale = useMemo(
        () => getYSerializableScale(targetSeries?.yAxisId),
        [getYSerializableScale, targetSeries?.yAxisId],
      );

      const color = useMemo(
        () => colorProp ?? targetSeries?.color ?? theme.color.fgPrimary,
        [colorProp, targetSeries?.color, theme.color.fgPrimary],
      );

      const updateTransition = useMemo(
        () => transitions?.update ?? defaultTransition,
        [transitions?.update],
      );
      const pulseTransition = useMemo(
        () => transitions?.pulse ?? defaultPulseTransition,
        [transitions?.pulse],
      );
      const pulseRepeatDelay = useMemo(
        () => transitions?.pulseRepeatDelay ?? defaultPulseRepeatDelay,
        [transitions?.pulseRepeatDelay],
      );

      const pulseOpacity = useSharedValue(0);
      const pulseRadius = useSharedValue(pulseRadiusStart);

      const animatedX = useSharedValue(0);
      const animatedY = useSharedValue(0);

      // Calculate the target point position - project data to pixels
      const targetPoint = useDerivedValue(() => {
        if (!xScale || !yScale) return { x: 0, y: 0 };
        return projectPointWithSerializableScale({
          x: unwrapAnimatedValue(dataX),
          y: unwrapAnimatedValue(dataY),
          xScale,
          yScale,
        });
      }, [dataX, dataY, xScale, yScale]);

      useAnimatedReaction(
        () => {
          return { point: targetPoint.value, isIdle: unwrapAnimatedValue(isIdle) };
        },
        (current, previous) => {
          // When animation is disabled, on initial render, or when we are starting,
          // continuing, or finishing scrubbing we should immediately transition
          if (!animate || previous === null || !previous.isIdle || !current.isIdle) {
            animatedX.value = current.point.x;
            animatedY.value = current.point.y;
            return;
          }

          animatedX.value = buildTransition(current.point.x, updateTransition);
          animatedY.value = buildTransition(current.point.y, updateTransition);
        },
        [animate, updateTransition],
      );

      // Create animated point using the animated values
      const animatedPoint = useDerivedValue(() => {
        return { x: animatedX.value, y: animatedY.value };
      }, [animatedX, animatedY]);

      useImperativeHandle(
        ref,
        () => ({
          pulse: () => {
            // Only trigger manual pulse when idlePulse is not enabled
            if (!idlePulse) {
              cancelAnimation(pulseOpacity);
              cancelAnimation(pulseRadius);

              // Manual pulse without delay
              const immediatePulseTransition = { ...pulseTransition, delay: 0 };
              pulseOpacity.value = pulseOpacityStart;
              pulseRadius.value = pulseRadiusStart;
              pulseOpacity.value = buildTransition(pulseOpacityEnd, immediatePulseTransition);
              pulseRadius.value = buildTransition(pulseRadiusEnd, immediatePulseTransition);
            }
          },
        }),
        [idlePulse, pulseOpacity, pulseRadius, pulseTransition],
      );

      // Watch idlePulse changes and control continuous pulse
      useAnimatedReaction(
        () => idlePulse,
        (current, previous) => {
          if (!animate) return;

          if (current) {
            // Start continuous pulse when idlePulse is enabled
            // Create instant transition to reset pulse after delay
            const instantTransition: Transition = { type: 'timing', duration: 0 };
            const resetWithDelay = { ...instantTransition, delay: pulseRepeatDelay };

            pulseOpacity.value = pulseOpacityStart;
            pulseRadius.value = pulseRadiusStart;

            pulseOpacity.value = withRepeat(
              withSequence(
                buildTransition(pulseOpacityEnd, pulseTransition),
                buildTransition(pulseOpacityStart, resetWithDelay),
              ),
              -1, // infinite loop
              false,
            );

            pulseRadius.value = withRepeat(
              withSequence(
                buildTransition(pulseRadiusEnd, pulseTransition),
                buildTransition(pulseRadiusStart, resetWithDelay),
              ),
              -1, // infinite loop
              false,
            );
          } else {
            // Stop pulse when idlePulse is disabled
            cancelAnimation(pulseOpacity);
            cancelAnimation(pulseRadius);
            pulseOpacity.value = pulseOpacityEnd;
            pulseRadius.value = pulseRadiusStart;
          }
        },
        [animate, pulseTransition, pulseRepeatDelay],
      );

      const pulseVisibility = useDerivedValue(() => {
        // Never pulse when scrubbing
        if (!unwrapAnimatedValue(isIdle)) return 0;
        return pulseOpacity.value;
      }, [isIdle, pulseOpacity]);

      const beaconOpacity = useDerivedValue(() => {
        const point = targetPoint.value;
        const isWithinDrawingArea =
          point.x >= drawingArea.x &&
          point.x <= drawingArea.x + drawingArea.width &&
          point.y >= drawingArea.y &&
          point.y <= drawingArea.y + drawingArea.height;
        const userOpacity = unwrapAnimatedValue(opacityProp);
        return isWithinDrawingArea ? userOpacity : 0;
      }, [targetPoint, drawingArea, opacityProp]);

      return (
        <Group opacity={beaconOpacity}>
          <Circle c={animatedPoint} color={color} opacity={pulseVisibility} r={pulseRadius} />
          <Circle c={animatedPoint} color={theme.color.bg} r={radius + strokeWidth / 2} />
          <Circle c={animatedPoint} color={color} r={radius - strokeWidth / 2} />
        </Group>
      );
    },
  ),
);
