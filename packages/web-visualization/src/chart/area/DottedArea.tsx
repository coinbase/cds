import { memo, useId, useMemo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';
import { createGradient, getBaseline } from '../utils';

import type { AreaComponentProps } from './Area';

export type DottedAreaProps = Pick<
  PathProps,
  | 'stroke'
  | 'strokeWidth'
  | 'strokeOpacity'
  | 'strokeLinecap'
  | 'strokeLinejoin'
  | 'strokeDasharray'
  | 'strokeDashoffset'
  | 'clipOffset'
  | 'children'
> &
  AreaComponentProps & {
    /**
     * Size of the pattern unit (width and height).
     * @default 4
     */
    patternSize?: number;
    /**
     * Size of the dots within the pattern.
     * @default 1
     */
    dotSize?: number;
    /**
     * Opacity at the peak values (top/bottom of gradient).
     * @note only used when no gradient is provided
     * @default 1
     */
    peakOpacity?: number;
    /**
     * Opacity at the baseline (0 or edge closest to 0).
     * @note only used when no gradient is provided
     * @default 0
     */
    baselineOpacity?: number;
  };

/**
 * A customizable dotted area gradient component.
 * When no gradient is provided, renders a default gradient based
 * on the fill color and peak/baseline opacities.
 */
export const DottedArea = memo<DottedAreaProps>(
  ({
    d,
    fill = 'var(--color-fgPrimary)',
    patternSize = 4,
    dotSize = 1,
    peakOpacity = 1,
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
    const gradientId = useId();
    const maskId = useId();

    const dotCenterPosition = patternSize / 2;
    const yAxisConfig = getYAxis(yAxisId);

    const gradient = useMemo(() => {
      if (gradientProp) return gradientProp;
      if (!yAxisConfig) return;

      const baselineValue = getBaseline(yAxisConfig.domain, baseline);
      return createGradient(yAxisConfig.domain, baselineValue, fill, peakOpacity, baselineOpacity);
    }, [gradientProp, yAxisConfig, fill, baseline, peakOpacity, baselineOpacity]);

    return (
      <g>
        <defs>
          <pattern
            height={patternSize}
            id={patternId}
            patternUnits="userSpaceOnUse"
            width={patternSize}
            x="0"
            y="0"
          >
            <circle cx={dotCenterPosition} cy={dotCenterPosition} fill="white" r={dotSize} />
          </pattern>
          <mask id={maskId}>
            <Path animate={animate} d={d} fill={`url(#${patternId})`} transition={transition} />
          </mask>
          {gradient && (
            <Gradient
              animate={animate}
              gradient={gradient}
              id={gradientId}
              transition={transition}
              yAxisId={yAxisId}
            />
          )}
        </defs>
        <Path
          animate={animate}
          d={d}
          fill={gradient ? `url(#${gradientId})` : fill}
          mask={`url(#${maskId})`}
          transition={transition}
          {...pathProps}
        />
      </g>
    );
  },
);
