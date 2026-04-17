import { forwardRef, memo, useMemo } from 'react';
import type { View } from 'react-native';

import type { BarChartBaseProps, BarChartProps } from './BarChart';
import { BarChart } from './BarChart';
import type { BarSeries } from './BarStack';

/** Extended series type that supports single data values. */
export type PercentageBarSeries = Omit<BarSeries, 'data' | 'stackId' | 'xAxisId' | 'yAxisId'> & {
  /**
   * Data for this series.
   *
   * Can be either:
   * - Single number: `1400`
   * - Array of numbers: `[10, 15, 20]`
   */
  data: number | Array<number | null>;
};

export type PercentageBarChartBaseProps = Omit<
  BarChartBaseProps,
  | 'series'
  | 'stacked'
  | 'layout'
  | 'roundBaseline'
  | 'inset'
  | 'enableScrubbing'
  | 'onScrubberPositionChange'
> & {
  /**
   * Configuration objects that define how to visualize the data.
   * Each series contains its own data.
   */
  series?: PercentageBarSeries[];
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
   * Inset around the entire chart (outside the axes).
   * @default 0
   */
  inset?: BarChartBaseProps['inset'];
};

/**
 * Returns the value for a group index from numeric shorthand or per-group series data.
 * @param data - A single number (group `0` only) or an array of values per group.
 * @param groupIndex - The group index to read.
 * @returns The clamped value for that group, or `null` when the value is `null`, undefined, or out of range.
 */
const unwrapSeriesDataValue = (
  data: PercentageBarSeries['data'],
  groupIndex: number,
): number | null => {
  const raw = typeof data === 'number' ? (groupIndex === 0 ? data : null) : data[groupIndex];
  return raw != null ? Math.max(0, raw) : null;
};

export type PercentageBarChartProps = PercentageBarChartBaseProps &
  Omit<
    BarChartProps,
    | 'series'
    | 'stacked'
    | 'layout'
    | 'roundBaseline'
    | 'inset'
    | 'enableScrubbing'
    | 'onScrubberPositionChange'
  >;

export const PercentageBarChart = memo(
  forwardRef<View, PercentageBarChartProps>(
    (
      {
        series,
        layout = 'horizontal',
        roundBaseline = true,
        inset = 0,
        transitions,
        xAxis,
        yAxis,
        testID,
        children,
        ...props
      },
      ref,
    ) => {
      const barSeries = useMemo(() => {
        const groupCount = Math.max(
          0,
          ...(series?.map(({ data }) => (typeof data === 'number' ? 1 : data.length)) ?? []),
        );

        const totals = Array.from(
          { length: groupCount },
          (_, i) =>
            series?.reduce((sum, { data }) => sum + (unwrapSeriesDataValue(data, i) ?? 0), 0) ?? 0,
        );

        return series?.map((s) => ({
          ...s,
          data: Array.from({ length: groupCount }, (_, i) => {
            const val = unwrapSeriesDataValue(s.data, i);
            return val != null && totals[i] > 0 ? (val / totals[i]) * 100 : null;
          }),
        }));
      }, [series]);

      const isHorizontalLayout = layout === 'horizontal';

      const xAxisConfig: BarChartProps['xAxis'] = useMemo(() => {
        return isHorizontalLayout
          ? { domain: { min: 0, max: 100 }, domainLimit: 'strict', ...xAxis }
          : { categoryPadding: 0, ...xAxis };
      }, [isHorizontalLayout, xAxis]);

      const yAxisConfig: BarChartProps['yAxis'] = useMemo(() => {
        return isHorizontalLayout
          ? { categoryPadding: 0, ...yAxis }
          : { domain: { min: 0, max: 100 }, domainLimit: 'strict', ...yAxis };
      }, [isHorizontalLayout, yAxis]);

      return (
        <BarChart
          ref={ref}
          stacked
          inset={inset}
          layout={layout}
          roundBaseline={roundBaseline}
          series={barSeries}
          testID={testID}
          transitions={transitions}
          xAxis={xAxisConfig}
          yAxis={yAxisConfig}
          {...props}
        >
          {children}
        </BarChart>
      );
    },
  ),
);

PercentageBarChart.displayName = 'PercentageBarChart';
