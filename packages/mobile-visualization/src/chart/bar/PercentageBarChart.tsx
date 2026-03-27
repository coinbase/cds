import { forwardRef, memo, useMemo } from 'react';
import type { View } from 'react-native';

import type { CartesianChartLayout } from '../utils';

import type { BarChartProps } from './BarChart';
import { BarChart } from './BarChart';
import type { BarSeries } from './BarStack';

const PERCENTAGE_BAR_STACK_ID = 'percentage-bar';

const percentTickFormatter = (value: number) => `${value}%`;

/**
 * Series configuration for PercentageBarChart.
 * Each series represents one segment type across all groups (determined by array index).
 * Values at each index are normalized so all series at that index sum to 100%.
 *
 * @see PercentageBarChart
 */
export type PercentageBarSeries = Omit<BarSeries, 'data' | 'stackId' | 'xAxisId' | 'yAxisId'> & {
  /** Array of non-negative numeric values, one per group. Normalized per-group so all series at each index sum to 100%. */
  data: Array<number | null>;
};

// Backward-compatible alias.
export type PercentageBarChartSeries = PercentageBarSeries;

/**
 * Props for PercentageBarChart.
 *
 * Renders stacked bars whose segments always sum to 100% at each group index.
 * Values are normalized internally so any set of non-negative numbers can be passed.
 * Groups are determined by array index — category labels are provided via
 * `yAxis.data` (horizontal layout, default) or `xAxis.data` (vertical layout).
 * The value axis is fixed to a 0–100% scale.
 */
export type PercentageBarChartProps = Omit<
  BarChartProps,
  'series' | 'stacked' | 'layout' | 'roundBaseline' | 'enableScrubbing' | 'onScrubberPositionChange'
> & {
  /**
   * Series representing segment types across groups. Each series' `data` array
   * contains one value per group (by index). Values are normalized to 100% per group.
   * Use non-negative values only.
   */
  series: PercentageBarSeries[];
  /**
   * Chart layout - describes the direction bars/areas grow.
   * - 'vertical': Bars grow vertically. X is category axis, Y is value axis.
   * - 'horizontal' (default): Bars grow horizontally. Y is category axis, X is value axis.
   * @default 'horizontal'
   */
  layout?: CartesianChartLayout;
  /**
   * Whether to round the baseline of a bar (where the value is 0).
   * @default true
   */
  roundBaseline?: boolean;
};

function nonNegativeCell(data: Array<number | null>, groupIndex: number): number {
  return Math.max(0, data[groupIndex] ?? 0);
}

function normalizePercentageSeries(series: PercentageBarSeries[]): BarSeries[] {
  if (series.length === 0) return [];

  const groupCount = Math.max(...series.map((s) => s.data.length));

  const groupTotals: number[] = Array(groupCount).fill(0);
  for (const s of series) {
    for (let g = 0; g < groupCount; g++) {
      groupTotals[g] += nonNegativeCell(s.data, g);
    }
  }

  if (groupTotals.every((t) => t === 0)) return [];

  return series.map((s) => {
    const { data: rawData, ...rest } = s;
    const normalized = Array.from({ length: groupCount }, (_, g) => {
      const total = groupTotals[g];
      const raw = nonNegativeCell(rawData, g);
      return total > 0 ? (raw / total) * 100 : null;
    });
    return { ...rest, stackId: PERCENTAGE_BAR_STACK_ID, data: normalized };
  });
}

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
      const barSeries = useMemo(() => normalizePercentageSeries(series), [series]);

      const isHorizontalLayout = layout === 'horizontal';

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
          xAxis={
            isHorizontalLayout
              ? {
                  tickLabelFormatter: percentTickFormatter,
                  domain: { min: 0, max: 100 },
                  domainLimit: 'strict',
                  ...xAxis,
                }
              : { categoryPadding: 0, ...xAxis }
          }
          yAxis={
            isHorizontalLayout
              ? { categoryPadding: 0, ...yAxis }
              : {
                  tickLabelFormatter: percentTickFormatter,
                  domain: { min: 0, max: 100 },
                  domainLimit: 'strict',
                  ...yAxis,
                }
          }
          {...props}
        >
          {children}
        </BarChart>
      );
    },
  ),
);

PercentageBarChart.displayName = 'PercentageBarChart';
