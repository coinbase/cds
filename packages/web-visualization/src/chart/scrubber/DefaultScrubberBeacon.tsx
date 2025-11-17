import { forwardRef, memo, useImperativeHandle, useMemo } from 'react';
import {
  m as motion,
  type Transition,
  useAnimate,
  type ValueAnimationTransition,
} from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { defaultTransition, projectPoint } from '../utils';

import type { ScrubberBeaconProps, ScrubberBeaconRef } from './Scrubber';

const radius = 5;
const glowRadius = 10;
const pulseRadius = 15;
const strokeWidth = 2;

const defaultPulseTransition: Transition = {
  duration: 1,
  ease: 'easeInOut',
};

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
        transitions,
        className,
        style,
        testID,
      },
      ref,
    ) => {
      const [scope, animate] = useAnimate();
      const { getSeries, getXScale, getYScale } = useCartesianChartContext();

      const targetSeries = getSeries(seriesId);
      const xScale = getXScale();
      const yScale = getYScale(targetSeries?.yAxisId);

      const color = useMemo(
        () => colorProp ?? targetSeries?.color ?? 'var(--color-fgPrimary)',
        [colorProp, targetSeries],
      );

      const updateTransition = useMemo(
        () => transitions?.update ?? defaultTransition,
        [transitions?.update],
      );
      const pulseTransition = useMemo(
        () => transitions?.pulse ?? defaultPulseTransition,
        [transitions?.pulse],
      );

      const pixelCoordinate = useMemo(() => {
        if (!xScale || !yScale) return;
        return projectPoint({ x: dataX, y: dataY, xScale, yScale });
      }, [dataX, dataY, xScale, yScale]);

      useImperativeHandle(
        ref,
        () => ({
          pulse: () => {
            // Only pulse when idle and idlePulse is not enabled
            if (isIdle && !idlePulse && scope.current) {
              animate(
                scope.current,
                {
                  opacity: [0.1, 0],
                },
                pulseTransition as ValueAnimationTransition,
              );
            }
          },
        }),
        [isIdle, idlePulse, scope, animate, pulseTransition],
      );

      // Create continuous pulse transition by repeating the base pulse transition in reverse
      const continuousPulseTransition: Transition = useMemo(
        () => ({
          ...pulseTransition,
          repeat: Infinity,
          repeatType: 'reverse',
        }),
        [pulseTransition],
      );

      const shouldPulse = isIdle && idlePulse;

      if (!pixelCoordinate) return;

      if (isIdle) {
        return (
          <g data-testid={testID}>
            <motion.circle
              animate={{
                cx: pixelCoordinate.x,
                cy: pixelCoordinate.y,
              }}
              cx={pixelCoordinate.x}
              cy={pixelCoordinate.y}
              fill={color}
              initial={false}
              opacity={0.15}
              r={glowRadius}
              transition={updateTransition}
            />
            <motion.g
              animate={{
                x: pixelCoordinate.x,
                y: pixelCoordinate.y,
              }}
              initial={false}
              transition={updateTransition}
            >
              <motion.circle
                ref={scope}
                animate={
                  shouldPulse
                    ? {
                        opacity: [0.1, 0],
                        transition: continuousPulseTransition,
                      }
                    : { opacity: 0 }
                }
                cx={0}
                cy={0}
                fill={color}
                initial={{ opacity: shouldPulse ? 0.1 : 0 }}
                r={pulseRadius}
              />
            </motion.g>
            <motion.circle
              animate={{
                cx: pixelCoordinate.x,
                cy: pixelCoordinate.y,
              }}
              className={className}
              cx={pixelCoordinate.x}
              cy={pixelCoordinate.y}
              fill={color}
              initial={false}
              r={radius}
              stroke="var(--color-bg)"
              strokeWidth={strokeWidth}
              style={style}
              transition={updateTransition}
            />
          </g>
        );
      }

      return (
        <g data-testid={testID}>
          <circle
            cx={pixelCoordinate.x}
            cy={pixelCoordinate.y}
            fill={color}
            opacity={0.15}
            r={glowRadius}
          />
          <circle
            className={className}
            cx={pixelCoordinate.x}
            cy={pixelCoordinate.y}
            fill={color}
            r={radius}
            stroke="var(--color-bg)"
            strokeWidth={2}
            style={style}
          />
        </g>
      );
    },
  ),
);
