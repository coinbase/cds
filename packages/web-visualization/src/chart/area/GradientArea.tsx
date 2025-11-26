import { memo, useId, useMemo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';
import { createGradient, getBaseline } from '../utils';

import type { AreaComponentProps } from './Area';

export type GradientAreaProps = Pick<
  PathProps,
  | 'stroke'
  | 'strokeWidth'
  | 'strokeOpacity'
  | 'strokeLinecap'
  | 'strokeLinejoin'
  | 'strokeDasharray'
  | 'strokeDashoffset'
  | 'clipRect'
  | 'clipOffset'
  | 'children'
> &
  AreaComponentProps & {
    /**
     * Opacity at peak values.
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
    fillOpacity = 1,
    peakOpacity = 0.3,
    baselineOpacity = 0,
    baseline,
    yAxisId,
    gradient: gradientProp,
    animate,
    transition,
    ...pathProps
  }) => {
    const { getYAxis } = useCartesianChartContext();
    const patternId = useId();

    const yAxisConfig = getYAxis(yAxisId);

    const gradient = useMemo(() => {
      if (gradientProp) return gradientProp;
      if (!yAxisConfig) return;

      const baselineValue = getBaseline(yAxisConfig.domain, baseline);
      return createGradient(yAxisConfig.domain, baselineValue, fill, peakOpacity, baselineOpacity);
    }, [gradientProp, yAxisConfig, fill, baseline, peakOpacity, baselineOpacity]);

    return (
      <>
        {gradient && (
          <defs>
            <Gradient
              animate={animate}
              gradient={gradient}
              id={patternId}
              transition={transition}
              yAxisId={yAxisId}
            />
          </defs>
        )}
        <Path
          animate={animate}
          d={d}
          fill={gradient ? `url(#${patternId})` : fill}
          fillOpacity={fillOpacity}
          transition={transition}
          {...pathProps}
        />
      </>
    );
  },
);
