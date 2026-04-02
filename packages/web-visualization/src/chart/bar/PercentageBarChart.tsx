import { forwardRef, memo, useMemo } from 'react';

import type { BarChartBaseProps, BarChartProps } from './BarChart';
import { BarChart } from './BarChart';
import type { BarSeries } from './BarStack';

/**
 * Series configuration for PercentageBarChart.
 * Each series represents one segment type across all groups (determined by array index).
 * Values at each index are normalized so all series at that index sum to 100%.
 *
 * @see PercentageBarChart
 */
export type PercentageBarSeries = Omit<BarSeries, 'data' | 'stackId' | 'xAxisId' | 'yAxisId'> & {
  /**
   * Non-negative values per group, or a single number as shorthand for one group only.
   * When multiple groups exist, a numeric value applies only to the first category (same as a one-element array).
   * Normalized per group so all series at each index sum to 100%.
   */
  data: number | Array<number | null>;
};

type PercentageBarChartOmittedBarChartKeys =
  | 'series'
  | 'stacked'
  | 'layout'
  | 'roundBaseline'
  | 'inset'
  | 'enableScrubbing'
  | 'onScrubberPositionChange';

/**
 *
 * Renders stacked bars whose segments always sum to 100% at each group index.
 * Values are normalized internally so any set of non-negative numbers can be passed.
 * Groups are determined by array index — category labels are provided via
 * `yAxis.data` (horizontal layout, default) or `xAxis.data` (vertical layout).
 * The value axis is fixed to a 0–100% scale.
 */
export type PercentageBarChartBaseProps = Omit<
  BarChartBaseProps,
  PercentageBarChartOmittedBarChartKeys
> & {
  /**
   * Series representing segment types across groups. Each series' `data` is either a number
   * (first group only) or an array of one value per group (by index). Values are normalized to 100% per group.
   * Use non-negative values only.
   */
  series: PercentageBarSeries[];
  /**
   * Chart layout - describes the direction bars/areas grow.
   * - 'vertical': Bars grow vertically. X is category axis, Y is value axis.
   * - 'horizontal' (default): Bars grow horizontally. Y is category axis, X is value axis.
   * @default 'horizontal'
   */
  layout?: BarChartBaseProps['layout'];
  /**
   * Whether to round the baseline of a bar (where the value is 0).
   * @default true
   */
  roundBaseline?: BarChartBaseProps['roundBaseline'];
  /**
   * Padding inside the chart drawing area (number or per-side object).
   * @default 0
   */
  inset?: BarChartBaseProps['inset'];
};

export type PercentageBarChartProps = PercentageBarChartBaseProps &
  Omit<BarChartProps, PercentageBarChartOmittedBarChartKeys>;

export const PercentageBarChart = memo(
  forwardRef<SVGSVGElement, PercentageBarChartProps>(
    (
      {
        series,
        layout = 'horizontal',
        roundBaseline = true,
        inset = 0,
        xAxis,
        yAxis,
        testID,
        children,
        ...props
      },
      ref,
    ) => {
      const barSeries = useMemo(() => {
        const getVal = (data: number | Array<number | null>, i: number) =>
          Math.max(0, (typeof data === 'number' ? (i === 0 ? data : null) : data[i]) ?? 0);
        const groupCount =
          series.length === 0
            ? 0
            : Math.max(...series.map(({ data }) => (typeof data === 'number' ? 1 : data.length)));
        const totals = Array.from({ length: groupCount }, (_, i) =>
          series.reduce((sum, { data }) => sum + getVal(data, i), 0),
        );
        return series.map(({ data, ...rest }) => ({
          ...rest,
          data: Array.from({ length: groupCount }, (_, i) =>
            totals[i] > 0 ? (getVal(data, i) / totals[i]) * 100 : null,
          ),
        }));
      }, [series]);

      const isHorizontalLayout = layout === 'horizontal';
      const axisConfig = useMemo(
        () => ({
          xAxis: isHorizontalLayout
            ? {
                domain: { min: 0, max: 100 },
                domainLimit: 'strict' as const,
                ...xAxis,
              }
            : { categoryPadding: 0, ...xAxis },
          yAxis: isHorizontalLayout
            ? { categoryPadding: 0, ...yAxis }
            : {
                domain: { min: 0, max: 100 },
                domainLimit: 'strict' as const,
                ...yAxis,
              },
        }),
        [isHorizontalLayout, xAxis, yAxis],
      );

      return (
        <BarChart
          ref={ref}
          stacked
          inset={inset}
          layout={layout}
          roundBaseline={roundBaseline}
          series={barSeries}
          testID={testID}
          xAxis={axisConfig.xAxis}
          yAxis={axisConfig.yAxis}
          {...props}
        >
          {children}
        </BarChart>
      );
    },
  ),
);

PercentageBarChart.displayName = 'PercentageBarChart';
