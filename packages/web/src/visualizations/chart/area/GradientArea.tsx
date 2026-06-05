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
    xAxisId,
    yAxisId,
    gradient: gradientProp,
    animate,
    transitions,
    transition,
    ...pathProps
  }) => {
    const { layout, getXAxis, getYAxis } = useCartesianChartContext();
    const patternId = useId();

    const valueAxisConfig = layout !== 'horizontal' ? getYAxis(yAxisId) : getXAxis(xAxisId);
    const gradientAxis = layout !== 'horizontal' ? 'y' : 'x';

    const gradient = useMemo(() => {
      if (gradientProp) return gradientProp;
      if (!valueAxisConfig) return;

      const baselineValue = getBaseline(valueAxisConfig.domain, valueAxisConfig.baseline);
      return createGradient(
        valueAxisConfig.domain,
        baselineValue,
        fill,
        peakOpacity,
        baselineOpacity,
        gradientAxis,
      );
    }, [gradientProp, valueAxisConfig, fill, peakOpacity, baselineOpacity, gradientAxis]);

    return (
      <>
        {gradient && (
          <defs>
            <Gradient
              animate={animate}
              gradient={gradient}
              id={patternId}
              transition={transitions?.update ?? transition}
              xAxisId={xAxisId}
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
          transitions={transitions}
          {...pathProps}
        />
      </>
    );
  },
);
