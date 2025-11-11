import { memo, useId, useMemo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';
import type { GradientDefinition } from '../utils';

import type { AreaComponentProps } from './Area';

export type GradientAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> &
  AreaComponentProps & {
    /**
     * The color at peak values (top/bottom of gradient).
     * @default fill or 'var(--color-fgPrimary)'
     */
    peakColor?: string;
    /**
     * The color at the baseline (0 or edge closest to 0).
     * @default peakColor or fill
     */
    baselineColor?: string;
    /**
     * Opacity at peak values.
     * @default 0.3
     */
    peakOpacity?: number;
    /**
     * Opacity at the baseline.
     * @default 0
     */
    baselineOpacity?: number;
    /**
     * Color gradient configuration.
     * When provided, overrides peakColor/baselineColor and creates a gradient-based gradient.
     * When not provided, creates an automatic diverging gradient around the baseline.
     */
    gradient?: GradientDefinition;
    /**
     * Series ID - used to retrieve gradient from series if not provided directly.
     */
    seriesId?: string;
  };

/**
 * A customizable gradient area component which uses Path with SVG linearGradient.
 *
 * When no gradient is provided, automatically creates an appropriate gradient:
 * - For data crossing zero: Creates a diverging gradient with peak opacity at both extremes
 *   and baseline opacity at zero (or the specified baseline).
 * - For all-positive or all-negative data: Creates a simple gradient from baseline to peak.
 */
export const GradientArea = memo<GradientAreaProps>(
  ({
    d,
    fill = 'var(--color-fgPrimary)',
    // todo: should we drop fillOpacity?
    fillOpacity = 1,
    peakColor,
    baselineColor,
    // todo: what about peak opacity?
    peakOpacity = 0.3,
    baselineOpacity = 0,
    baseline,
    yAxisId,
    gradient: gradientProp,
    seriesId,
    animate,
    transition,
    ...pathProps
  }) => {
    const { getYAxis } = useCartesianChartContext();
    const patternId = useId();

    const yAxisConfig = getYAxis(yAxisId);

    const gradient = useMemo((): GradientDefinition | undefined => {
      if (gradientProp) return gradientProp;
      if (!yAxisConfig) return;

      const { min, max } = yAxisConfig.domain;
      const baselineValue = min >= 0 ? min : max <= 0 ? max : (baseline ?? 0);

      // Diverging gradient (data crosses zero)
      if (min < 0 && max > 0) {
        return {
          axis: 'y' as const,
          stops: [
            { offset: min, color: fill, opacity: 0.4 },
            { offset: baselineValue, color: fill, opacity: 0 },
            { offset: max, color: fill, opacity: 0.4 },
          ],
        };
      }

      // Simple gradient (all positive or all negative)
      const peakValue = min >= 0 ? max : min;
      return {
        axis: 'y' as const,
        stops:
          max <= 0
            ? [
                { offset: peakValue, color: fill, opacity: peakOpacity },
                { offset: baselineValue, color: fill, opacity: baselineOpacity },
              ]
            : [
                { offset: baselineValue, color: fill, opacity: baselineOpacity },
                { offset: peakValue, color: fill, opacity: peakOpacity },
              ],
      };
    }, [gradientProp, yAxisConfig, fill, baseline, peakOpacity, baselineOpacity]);

    if (!gradient) {
      return (
        <Path
          animate={animate}
          d={d}
          fill={fill}
          fillOpacity={fillOpacity}
          transition={transition}
          {...pathProps}
        />
      );
    }

    return (
      <>
        <defs>
          <Gradient
            animate={animate}
            gradient={gradient}
            id={patternId}
            transition={transition}
            yAxisId={yAxisId}
          />
        </defs>
        <Path
          animate={animate}
          d={d}
          fill={`url(#${patternId})`}
          fillOpacity={fillOpacity}
          transition={transition}
          {...pathProps}
        />
      </>
    );
  },
);
