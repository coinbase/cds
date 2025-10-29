import { memo, useId, useMemo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient as GradientDef } from '../gradient';
import { Path, type PathProps } from '../Path';
import { getGradientConfig, type Gradient } from '../utils/gradient';

import type { AreaComponentProps } from './Area';

export type DottedAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity' | 'clipRect'> &
  Omit<AreaComponentProps, 'clipRect'> & {
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
     * @default 1
     */
    peakOpacity?: number;
    /**
     * Opacity at the baseline (0 or edge closest to 0).
     * @default 0
     */
    baselineOpacity?: number;
    /**
     * ID of the y-axis to use for gradient range.
     * If not provided, defaults to the default y-axis.
     */
    yAxisId?: string;
    className?: string;
    style?: React.CSSProperties;
    /**
     * Custom class names for the component.
     */
    classNames?: {
      /**
       * Custom class name for the root element.
       */
      root?: string;
      /**
       * Custom class name for the pattern element.
       */
      pattern?: string;
      /**
       * Custom class name for the area path element.
       */
      path?: string;
    };
    /**
     * Custom styles for the component.
     */
    styles?: {
      /**
       * Custom styles for the root element.
       */
      root?: React.CSSProperties;
      /**
       * Custom styles for the pattern element.
       */
      pattern?: React.CSSProperties;
      /**
       * Custom styles for the area path element.
       */
      path?: React.CSSProperties;
    };
  };

export const DottedArea = memo<DottedAreaProps>(
  ({
    d,
    fill = 'var(--color-fgPrimary)',
    className,
    style,
    patternSize = 4,
    dotSize = 1,
    peakOpacity = 1,
    baselineOpacity = 0,
    baseline,
    yAxisId,
    gradient: gradientProp,
    seriesId,
    classNames,
    styles,
    animate,
    ...pathProps
  }) => {
    const context = useCartesianChartContext();
    const patternId = useId();
    const gradientId = useId();
    const maskId = useId();

    const dotCenterPosition = patternSize / 2;

    const targetSeries = seriesId ? context.getSeries(seriesId) : undefined;

    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);
    const yAxisConfig = context.getYAxis(yAxisId);
    const { drawingArea } = context;

    // Auto-generate gradient if not provided
    const gradient = useMemo((): Gradient | undefined => {
      if (gradientProp) return gradientProp;
      if (targetSeries?.gradient) return targetSeries.gradient;
      if (!yAxisConfig) return;

      const { min, max } = yAxisConfig.domain;
      const baselineValue = min >= 0 ? min : max <= 0 ? max : (baseline ?? 0);

      // Diverging gradient (data crosses zero)
      if (min < 0 && max > 0) {
        return {
          axis: 'y' as const,
          stops: [
            { offset: min, color: fill, opacity: peakOpacity },
            { offset: baselineValue, color: fill, opacity: baselineOpacity },
            { offset: max, color: fill, opacity: peakOpacity },
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
    }, [
      gradientProp,
      targetSeries?.gradient,
      yAxisConfig,
      fill,
      baseline,
      peakOpacity,
      baselineOpacity,
    ]);

    const gradientConfig = useMemo(() => {
      if (!gradient || !xScale || !yScale) return;
      return getGradientConfig(gradient, xScale, yScale);
    }, [gradient, xScale, yScale]);

    const gradientDirection = (gradient?.axis ?? 'y') === 'x' ? 'horizontal' : 'vertical';

    if (!gradientConfig) {
      return (
        <g className={className ?? classNames?.root} style={style ?? styles?.root}>
          <defs>
            <pattern
              className={classNames?.pattern}
              height={patternSize}
              id={patternId}
              patternUnits="userSpaceOnUse"
              style={styles?.pattern}
              width={patternSize}
              x="0"
              y="0"
            >
              <circle cx={dotCenterPosition} cy={dotCenterPosition} fill={fill} r={dotSize} />
            </pattern>
          </defs>
          <Path
            animate={animate}
            className={classNames?.path}
            d={d}
            fill={`url(#${patternId})`}
            style={styles?.path}
            {...pathProps}
          />
        </g>
      );
    }

    return (
      <g className={className ?? classNames?.root} style={style ?? styles?.root}>
        <defs>
          <pattern
            className={classNames?.pattern}
            height={patternSize}
            id={patternId}
            patternUnits="userSpaceOnUse"
            style={styles?.pattern}
            width={patternSize}
            x="0"
            y="0"
          >
            <circle cx={dotCenterPosition} cy={dotCenterPosition} fill="white" r={dotSize} />
          </pattern>
          <mask id={maskId}>
            <Path animate={animate} d={d} fill={`url(#${patternId})`} />
          </mask>
          <GradientDef
            config={gradientConfig}
            direction={gradientDirection}
            drawingArea={drawingArea}
            id={gradientId}
          />
        </defs>
        <Path
          animate={animate}
          className={classNames?.path}
          d={d}
          fill={`url(#${gradientId})`}
          mask={`url(#${maskId})`}
          style={styles?.path}
          {...pathProps}
        />
      </g>
    );
  },
);
