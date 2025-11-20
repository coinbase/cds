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
const strokeWidth = 2;

const pulseOpacityStart = 0.5;
const pulseOpacityEnd = 0;
const pulseRadiusStart = 10;
const pulseRadiusEnd = 15;

const defaultPulseTransition: Transition = {
  duration: 1.6,
  ease: [0.0, 0.0, 0.0, 1.0],
};

const defaultPulseRepeatDelay = 0.4;

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
        opacity = 1,
        className,
        style,
        testID,
      },
      ref,
    ) => {
      const [scope, animate] = useAnimate();
      const { getSeries, getXScale, getYScale, drawingArea } = useCartesianChartContext();

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
      const pulseRepeatDelay = useMemo(
        () => transitions?.pulseRepeatDelay ?? defaultPulseRepeatDelay,
        [transitions?.pulseRepeatDelay],
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
                  opacity: [pulseOpacityStart, pulseOpacityEnd],
                  r: [pulseRadiusStart, pulseRadiusEnd],
                },
                pulseTransition as ValueAnimationTransition,
              );
            }
          },
        }),
        [isIdle, idlePulse, scope, animate, pulseTransition],
      );

      // Create continuous pulse transition by repeating the base pulse transition with delay
      const continuousPulseTransition: Transition = useMemo(
        () => ({
          ...pulseTransition,
          repeat: Infinity,
          repeatDelay: pulseRepeatDelay,
        }),
        [pulseTransition, pulseRepeatDelay],
      );

      const shouldPulse = isIdle && idlePulse;

      const isWithinDrawingArea = useMemo(() => {
        if (!pixelCoordinate) return false;
        return (
          pixelCoordinate.x >= drawingArea.x &&
          pixelCoordinate.x <= drawingArea.x + drawingArea.width &&
          pixelCoordinate.y >= drawingArea.y &&
          pixelCoordinate.y <= drawingArea.y + drawingArea.height
        );
      }, [pixelCoordinate, drawingArea]);

      if (!pixelCoordinate) return;

      if (isIdle) {
        return (
          <g data-testid={testID} opacity={isWithinDrawingArea ? opacity : 0}>
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
                        opacity: [pulseOpacityStart, pulseOpacityEnd],
                        r: [pulseRadiusStart, pulseRadiusEnd],
                        transition: continuousPulseTransition,
                      }
                    : { opacity: pulseOpacityEnd, r: pulseRadiusStart }
                }
                cx={0}
                cy={0}
                fill={color}
                initial={{
                  opacity: shouldPulse ? pulseOpacityStart : pulseOpacityEnd,
                  r: pulseRadiusStart,
                }}
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
        <g data-testid={testID} opacity={isWithinDrawingArea ? opacity : 0}>
          <circle
            className={className}
            cx={pixelCoordinate.x}
            cy={pixelCoordinate.y}
            fill={color}
            r={radius}
            stroke="var(--color-bg)"
            strokeWidth={strokeWidth}
            style={style}
          />
        </g>
      );
    },
  ),
);
