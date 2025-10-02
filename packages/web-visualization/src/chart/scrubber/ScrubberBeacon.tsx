import { forwardRef, memo, useImperativeHandle, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useScrubberContext } from '@coinbase/cds-common/visualizations/charts';
import { m as motion, useAnimate } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { Point, type PointProps } from '../point';

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

export type ScrubberBeaconProps = SharedProps &
  Omit<
    PointProps,
    | 'yAxisId'
    | 'onClick'
    | 'onScrubberEnter'
    | 'label'
    | 'labelConfig'
    | 'renderLabel'
    | 'dataX'
    | 'dataY'
    | 'children'
    | 'hoverEffect'
    | 'radius'
  > & {
    /**
     * Pulse the scrubber beacon while it is at rest.
     */
    idlePulse?: boolean;
    // make Point's coordinates optional for ScrubberBeacon
    dataX?: PointProps['dataX'];
    dataY?: PointProps['dataY'];
    /**
     * Filter to only show dot for specific series (used for hover-based positioning).
     */
    seriesId?: string;
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
        ...props
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

      if (dataX === undefined || dataY === undefined) {
        return null;
      }

      const pointColor = color ?? targetSeries?.color ?? 'var(--color-fgPrimary)';

      const shouldPulse = animationEnabled && isIdleState && idlePulse;

      return (
        <Point
          key={animationEnabled ? 'animated' : 'static'}
          animate={isIdleState}
          color={pointColor}
          dataX={dataX}
          dataY={dataY}
          opacity={opacity}
          radius={radius}
          stroke="var(--color-bg)"
          strokeWidth={2}
          testID={testID}
          yAxisId={targetSeries?.yAxisId}
          {...props}
        >
          <circle cx={0} cy={0} fill={pointColor} opacity={0.15} r={glowRadius} />
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
        </Point>
      );
    },
  ),
);
