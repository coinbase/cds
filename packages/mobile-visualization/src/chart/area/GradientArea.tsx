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
    yAxisId,
    animate,
    transition,
    ...pathProps
  }) => {
    const { getYAxis } = useCartesianChartContext();
    const theme = useTheme();

    const yAxisConfig = getYAxis(yAxisId);

    const fill = useMemo(
      () => fillProp ?? theme.color.fgPrimary,
      [fillProp, theme.color.fgPrimary],
    );

    const gradient = useMemo(() => {
      if (gradientProp) return gradientProp;
      if (!yAxisConfig) return;

      const baselineValue = getBaseline(yAxisConfig.domain, baseline);
      return createGradient(yAxisConfig.domain, baselineValue, fill, peakOpacity, baselineOpacity);
    }, [gradientProp, yAxisConfig, fill, baseline, peakOpacity, baselineOpacity]);

    return (
      <Path
        animate={animate}
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
