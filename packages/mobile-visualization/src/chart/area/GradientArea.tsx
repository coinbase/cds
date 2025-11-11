import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';
import { type GradientDefinition } from '../utils/gradient';

import type { AreaComponentProps } from './Area';

export type GradientAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> &
  AreaComponentProps & {
    /**
     * Opacity at peak of gradient.
     * @note only used when no gradient is provided
     * @default 0.3
     */
    peakOpacity?: number;
    /**
     * Opacity at the baseline.
     * @note only used when no gradient is provided
     * @default 0
     */
    baselineOpacity?: number;
  };

/**
 * A customizable gradient area component which uses Path.
 * When no gradient is provided, renders a default gradient based
 * on the fill color and peak/baseline opacities.
 */
export const GradientArea = memo<GradientAreaProps>(
  ({
    d,
    fill: fillProp,
    fillOpacity = 1,
    gradient: gradientProp,
    peakOpacity = 0.3,
    baselineOpacity = 0,
    baseline,
    yAxisId,
    clipRect,
    animate,
    transition,
    ...pathProps
  }) => {
    const { getYAxis } = useCartesianChartContext();
    const theme = useTheme();

    const fill = useMemo(
      () => fillProp ?? theme.color.fgPrimary,
      [fillProp, theme.color.fgPrimary],
    );

    const yAxisConfig = getYAxis(yAxisId);

    // Generate gradient if not provided
    const gradient = useMemo(() => {
      if (gradientProp) return gradientProp;
      if (!yAxisConfig) return;

      const { min, max } = yAxisConfig.domain;
      const baselineValue = baseline ? baseline : min >= 0 ? min : max <= 0 ? max : 0;

      // Diverging gradient (data crosses zero)
      if (min < 0 && max > 0) {
        const gradient: GradientDefinition = {
          axis: 'y',
          stops: [
            { offset: min, color: fill, opacity: peakOpacity },
            { offset: baselineValue, color: fill, opacity: baselineOpacity },
            { offset: max, color: fill, opacity: peakOpacity },
          ],
        };
        return gradient;
      }

      // Simple gradient (all positive or all negative)
      const peakValue = min >= 0 ? max : min;
      const gradient: GradientDefinition = {
        axis: 'y',
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
      return gradient;
    }, [gradientProp, yAxisConfig, fill, baseline, peakOpacity, baselineOpacity]);

    return (
      <Path
        animate={animate}
        clipRect={clipRect}
        d={d}
        fill={fill}
        fillOpacity={fillOpacity}
        transition={transition}
        {...pathProps}
      >
        {gradient && <Gradient gradient={gradient} yAxisId={yAxisId} />}
      </Path>
    );
  },
);
