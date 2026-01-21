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

const defaultRadius = 5;
const defaultStrokeWidth = 2;
const defaultStroke = 'var(--color-bg)';

const pulseOpacityStart = 0.5;
const pulseOpacityEnd = 0;
const pulseRadiusStartMultiplier = 2;
const pulseRadiusEndMultiplier = 3;

const defaultPulseTransition: Transition = {
  duration: 1.6,
  ease: [0.0, 0.0, 0.0, 1.0],
};

const defaultPulseRepeatDelay = 0.4;

export type DefaultScrubberBeaconProps = ScrubberBeaconProps & {
  /**
   * Radius of the beacon circle.
   * @default 5
   */
  radius?: number;
  /**
   * Stroke width of the beacon circle.
   * @default 2
   */
  strokeWidth?: number;
};

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
        animate: animateProp,
        transitions,
        opacity = 1,
        radius = defaultRadius,
        stroke = defaultStroke,
        strokeWidth = defaultStrokeWidth,
        className,
        style,
        testID = `${seriesId}-beacon`,
      },
      ref,
    ) => {
      const [scope, animateFn] = useAnimate();
      const {
        animate: animateContext,
        getSeries,
        getXScale,
        getYScale,
        drawingArea,
      } = useCartesianChartContext();
      const animate = animateProp ?? animateContext;

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

      const pulseRadiusStart = radius * pulseRadiusStartMultiplier;
      const pulseRadiusEnd = radius * pulseRadiusEndMultiplier;

      useImperativeHandle(
        ref,
        () => ({
          pulse: () => {
            // Only pulse when idle and idlePulse is not enabled
            if (isIdle && !idlePulse && scope.current) {
              animateFn(
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
        [isIdle, idlePulse, scope, animateFn, pulseTransition, pulseRadiusStart, pulseRadiusEnd],
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

      const pulseCircle = (
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
          data-testid={`${testID}-pulse`}
          fill={color}
          initial={{
            opacity: shouldPulse ? pulseOpacityStart : pulseOpacityEnd,
            r: pulseRadiusStart,
          }}
        />
      );

      const beaconCircle =
        isIdle && animate ? (
          <motion.circle
            animate={{ cx: pixelCoordinate.x, cy: pixelCoordinate.y }}
            className={className}
            cx={pixelCoordinate.x}
            cy={pixelCoordinate.y}
            fill={color}
            initial={false}
            r={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            style={style}
            transition={updateTransition}
          />
        ) : (
          <circle
            className={className}
            cx={pixelCoordinate.x}
            cy={pixelCoordinate.y}
            fill={color}
            r={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            style={style}
          />
        );

      return (
        <g data-testid={testID} opacity={isWithinDrawingArea ? opacity : 0}>
          {isIdle &&
            (animate ? (
              <motion.g
                animate={{ x: pixelCoordinate.x, y: pixelCoordinate.y }}
                initial={false}
                transition={updateTransition}
              >
                {pulseCircle}
              </motion.g>
            ) : (
              <g transform={`translate(${pixelCoordinate.x}, ${pixelCoordinate.y})`}>
                {pulseCircle}
              </g>
            ))}
          {beaconCircle}
        </g>
      );
    },
  ),
);
