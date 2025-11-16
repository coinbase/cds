import { forwardRef, memo, useImperativeHandle, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { m as motion, type Transition, useAnimate } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import {
  defaultTransition,
  evaluateGradientAtValue,
  getGradientConfig,
  type GradientDefinition,
  projectPoint,
  useScrubberContext,
} from '../utils';

const radius = 5;
const glowRadius = 10;
const pulseRadius = 15;
const strokeWidth = 2;

const defaultPulseTransition: Transition = {
  duration: 1,
  ease: 'easeInOut',
};

export type ScrubberBeaconRef = {
  /**
   * Triggers a single pulse animation.
   * Only works when the scrubber is in idle state (not actively scrubbing).
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
   * // Timing-based transitions (pulse runs for 1s out + 1s back = 2s total cycle)
   * transitions={{
   *   update: { type: 'tween', duration: 0.3, ease: 'easeInOut' },
   *   pulse: { duration: 1, ease: 'easeInOut' }
   * }}
   *
   * @example
   * // Spring-based transitions (spring applied to each direction)
   * transitions={{
   *   update: { type: 'spring', damping: 15, stiffness: 300 },
   *   pulse: { type: 'spring', damping: 10, stiffness: 100 }
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
     * @default { duration: 1, ease: 'easeInOut' }
     */
    pulse?: Transition;
  };
  /**
   * Custom className for styling.
   */
  className?: string;
  /**
   * Custom inline styles.
   */
  style?: React.CSSProperties;
};

export const ScrubberBeacon = memo(
  forwardRef<ScrubberBeaconRef, ScrubberBeaconProps>(
    (
      {
        seriesId,
        dataX: dataXProp,
        dataY: dataYProp,
        color,
        gradient,
        testID,
        idlePulse,
        opacity = 1,
        transitions,
        className,
        style,
      },
      ref,
    ) => {
      const [scope, animate] = useAnimate();

      const updateTransition = useMemo(
        () => transitions?.update ?? defaultTransition,
        [transitions?.update],
      );
      const pulseTransition = useMemo(
        () => transitions?.pulse ?? defaultPulseTransition,
        [transitions?.pulse],
      );
      const {
        getSeries,
        getXScale,
        getYScale,
        getSeriesData,
        animate: animationEnabled,
        drawingArea,
      } = useCartesianChartContext();
      const { scrubberPosition } = useScrubberContext();

      const targetSeries = getSeries(seriesId);
      const sourceData = getSeriesData(seriesId);
      const xScale = getXScale();
      const yScale = getYScale(targetSeries?.yAxisId);

      const isIdleState = scrubberPosition === undefined;

      // Expose imperative handle for triggering pulse animations
      useImperativeHandle(
        ref,
        () => ({
          pulse: () => {
            // Only pulse when idle
            if (isIdleState && scope.current) {
              animate(
                scope.current,
                {
                  opacity: [0.1, 0],
                },
                pulseTransition as any,
              );
            }
          },
        }),
        [isIdleState, scope, animate, pulseTransition],
      );

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

      const pixelCoordinate = useMemo(() => {
        if (!xScale || !yScale || dataX === undefined || dataY === undefined) {
          return;
        }

        return projectPoint({
          x: dataX,
          y: dataY,
          xScale,
          yScale,
        });
      }, [xScale, yScale, dataX, dataY]);

      const isWithinDrawingArea = useMemo(() => {
        if (!pixelCoordinate) return false;
        return (
          pixelCoordinate.x >= drawingArea.x &&
          pixelCoordinate.x <= drawingArea.x + drawingArea.width &&
          pixelCoordinate.y >= drawingArea.y &&
          pixelCoordinate.y <= drawingArea.y + drawingArea.height
        );
      }, [pixelCoordinate, drawingArea]);

      // Create continuous pulse transition by repeating the base pulse transition in reverse
      // repeatType: "reverse" creates a ping-pong effect, applying the transition twice per cycle
      const continuousPulseTransition: Transition = useMemo(
        () => ({
          ...pulseTransition,
          repeat: Infinity,
          repeatType: 'reverse',
        }),
        [pulseTransition],
      );

      const pointColor = useMemo(() => {
        if (color) return color;

        // Evaluate gradient if present
        const gradientToEvaluate = gradient ?? targetSeries?.gradient;
        if (gradientToEvaluate && xScale && yScale) {
          const gradientScale = gradientToEvaluate.axis === 'x' ? xScale : yScale;
          const stops = getGradientConfig(gradientToEvaluate, xScale, yScale);

          if (stops) {
            const axis = gradientToEvaluate.axis ?? 'y';
            const dataValue = axis === 'x' ? dataX : dataY;

            if (dataValue !== undefined) {
              const evaluatedColor = evaluateGradientAtValue(stops, dataValue, gradientScale);
              if (evaluatedColor) return evaluatedColor;
            }
          }
        }

        return targetSeries?.color ?? 'var(--color-fgPrimary)';
      }, [color, gradient, dataX, dataY, xScale, yScale, targetSeries]);

      const shouldPulse = animationEnabled && isIdleState && idlePulse;
      const effectiveOpacity = isWithinDrawingArea ? opacity : 0;

      if (!pixelCoordinate) {
        return;
      }

      if (animationEnabled && isIdleState) {
        return (
          <g data-testid={testID} opacity={effectiveOpacity}>
            <motion.circle
              animate={{
                cx: pixelCoordinate.x,
                cy: pixelCoordinate.y,
              }}
              cx={pixelCoordinate.x}
              cy={pixelCoordinate.y}
              fill={pointColor}
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
                fill={pointColor}
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
              fill={pointColor}
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
        <g data-testid={testID} opacity={effectiveOpacity}>
          <circle
            cx={pixelCoordinate.x}
            cy={pixelCoordinate.y}
            fill={pointColor}
            opacity={0.15}
            r={glowRadius}
          />
          <circle
            className={className}
            cx={pixelCoordinate.x}
            cy={pixelCoordinate.y}
            fill={pointColor}
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
