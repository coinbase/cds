import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';
import { createGradient, getBaseline } from '../utils';

import type { AreaComponentProps } from './Area';

export type GradientAreaProps = Pick<
  PathProps,
  | 'initialPath'
  | 'children'
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'strokeCap'
  | 'strokeJoin'
  | 'clipRect'
  | 'clipPath'
  | 'clipOffset'
> &
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
 * A customizable gradient area component.
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
    xAxisId,
    yAxisId,
    animate,
    transitions,
    transition,
    ...pathProps
  }) => {
    const { layout, getXAxis, getYAxis } = useCartesianChartContext();
    const theme = useTheme();

    const valueAxisConfig = layout !== 'horizontal' ? getYAxis(yAxisId) : getXAxis(xAxisId);
    const gradientAxis = layout !== 'horizontal' ? 'y' : 'x';

    const fill = useMemo(
      () => fillProp ?? theme.color.fgPrimary,
      [fillProp, theme.color.fgPrimary],
    );

    const gradient = useMemo(() => {
      if (gradientProp) return gradientProp;
      if (!valueAxisConfig) return;

      const baselineValue = getBaseline(valueAxisConfig.domain, baseline);
      return createGradient(
        valueAxisConfig.domain,
        baselineValue,
        fill,
        peakOpacity,
        baselineOpacity,
        gradientAxis,
      );
    }, [gradientProp, valueAxisConfig, fill, baseline, peakOpacity, baselineOpacity, gradientAxis]);

    return (
      <Path
        animate={animate}
        d={d}
        fill={fill}
        fillOpacity={fillOpacity}
        transition={transition}
        transitions={transitions}
        {...pathProps}
      >
        {gradient && <Gradient gradient={gradient} xAxisId={xAxisId} yAxisId={yAxisId} />}
      </Path>
    );
  },
);
