import { forwardRef, memo, useImperativeHandle, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { m as motion, useAnimate } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { projectPoint, useScrubberContext } from '../utils';

const pulseTransitionConfig = {
  duration: 2,
  repeat: Infinity,
  ease: 'easeInOut',
} as const;

const singlePulseTransitionConfig = {
  duration: 1,
  ease: 'easeInOut',
} as const;

export type ScrubberBeaconRef = {
  /**
   * Triggers a single pulse animation.
   * Only works when the scrubber is in idle state (not actively scrubbing).
   */
  pulse: () => void;
};

const radius = 5;
const glowRadius = 10;
const pulseRadius = 15;

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
  /**
   * Custom className for styling.
   */
  className?: string;
  /**
   * Custom inline styles.
   */
  style?: React.CSSProperties;
};

/**
 * The ScrubberBeacon is a special instance of a Point used to mark the scrubber's position on a specific series.
 * It renders a glow effect around the point to highlight the scrubber position.
 */
export const ScrubberBeacon = memo(
  forwardRef<ScrubberBeaconRef, ScrubberBeaconProps>(
    (
      {
        seriesId,
        dataX: dataXProp,
        dataY: dataYProp,
        color,
        testID,
        idlePulse,
        opacity = 1,
        className,
        style,
      },
      ref,
    ) => {
      const [scope, animate] = useAnimate();
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

      // Expose imperative handle for triggering pulse animations
      useImperativeHandle(ref, () => ({
        pulse: () => {
          // Only pulse when idle
          if (isIdleState && scope.current) {
            animate(
              scope.current,
              {
                opacity: [0.1, 0],
              },
              singlePulseTransitionConfig,
            );
          }
        },
      }));

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
          return null;
        }

        return projectPoint({
          x: dataX,
          y: dataY,
          xScale,
          yScale,
        });
      }, [xScale, yScale, dataX, dataY]);

      if (!pixelCoordinate) {
        return null;
      }

      const pointColor = color ?? targetSeries?.color ?? 'var(--color-fgPrimary)';
      const shouldPulse = animationEnabled && isIdleState && idlePulse;

      if (animationEnabled && isIdleState) {
        return (
          <g data-testid={testID} opacity={opacity}>
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
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
            <motion.g
              animate={{
                x: pixelCoordinate.x,
                y: pixelCoordinate.y,
              }}
              initial={false}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <motion.circle
                ref={scope}
                animate={
                  shouldPulse
                    ? {
                        opacity: [0.1, 0, 0.1],
                        transition: pulseTransitionConfig,
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
              strokeWidth={2}
              style={style}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </g>
        );
      }
      return (
        <g data-testid={testID} opacity={opacity}>
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
