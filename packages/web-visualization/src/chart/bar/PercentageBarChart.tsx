import { forwardRef, memo, useMemo } from 'react';

import type { BarChartProps } from './BarChart';
import { BarChart } from './BarChart';
import type { BarSeries } from './BarStack';

const PERCENTAGE_BAR_STACK_ID = 'percentage-bar';

const percentTickFormatter = (value: number) => `${value}%`;

/**
 * Segment representing one part of the whole in a PercentageBarChart.
 * Inherits styling and customization fields from `BarSeries` (e.g. `gradient`,
 * `legendShape`, `BarComponent`). Fields that are managed internally
 * (`data`, `stackId`, `xAxisId`, `yAxisId`) are excluded.
 *
 * @see PercentageBarChart
 */
export type PercentageBarChartSegment = Omit<
  BarSeries,
  'data' | 'stackId' | 'xAxisId' | 'yAxisId'
> & {
  /** Numeric value (raw or percentage). Normalized so all segments in the same category sum to 100%. Non-negative. */
  value: number;
  /**
   * Optional category identifier. Segments sharing the same category form one
   * independently-normalized 100% bar. Omit for a single bar.
   */
  category?: string;
};

/**
 * Overrides for the value (X) axis. `domain` and `domainLimit` are fixed to
 * [0, 100] and 'strict' respectively and cannot be overridden.
 */
type PercentageBarXAxisOverrides = Omit<
  NonNullable<BarChartProps['xAxis']>,
  'domain' | 'domainLimit'
>;

/**
 * Overrides for the category (Y) axis. `data` is derived from segment `category`
 * values.
 */
type PercentageBarYAxisOverrides = Omit<NonNullable<BarChartProps['yAxis']>, 'data'>;

/**
 * Props for PercentageBarChart.
 *
 * Renders one or more horizontal bars whose segments always sum to 100%.
 * Segment values are normalized internally so any set of non-negative numbers
 * can be passed. Use the `category` field on segments to create multiple
 * independently-normalized bars in a single chart.
 * The value axis (X) is fixed to a 0–100% scale.
 */
export type PercentageBarChartProps = Omit<
  BarChartProps,
  'series' | 'xAxis' | 'yAxis' | 'stacked' | 'layout'
> & {
  /**
   * Segments representing parts of a whole. Values are normalized to 100%.
   * Use non-negative values only.
   */
  series: PercentageBarChartSegment[];
  /**
   * Optional overrides for the value (X) axis visual and config props.
   * `domain` and `domainLimit` are locked to [0, 100] / 'strict'.
   * Defaults to percentage tick labels (e.g. "0%", "25%", "100%").
   */
  xAxis?: PercentageBarXAxisOverrides;
  /**
   * Optional overrides for the category (Y) axis visual and config props.
   * `data` and `categoryPadding` are derived from segment categories (no padding).
   */
  yAxis?: PercentageBarYAxisOverrides;
};

const DEFAULT_CATEGORY = '';

function normalizeSegments(segments: PercentageBarChartSegment[]): {
  series: BarSeries[];
  categories: string[];
} {
  if (segments.length === 0) {
    return { series: [], categories: [] };
  }

  const clamped = segments.map((s) => ({ ...s, value: Math.max(0, s.value) }));

  const categoryOrder: string[] = [];
  for (const s of clamped) {
    const category = s.category ?? DEFAULT_CATEGORY;
    if (!categoryOrder.includes(category)) categoryOrder.push(category);
  }

  const categories = new Map<string, typeof clamped>();
  for (const s of clamped) {
    const category = s.category ?? DEFAULT_CATEGORY;
    if (!categories.has(category)) categories.set(category, []);
    categories.get(category)!.push(s);
  }

  const allSeries: BarSeries[] = [];

  for (const [categoryKey, categorySegments] of categories) {
    const total = categorySegments.reduce((sum, s) => sum + s.value, 0);
    if (total === 0) continue;

    const categoryIndex = categoryOrder.indexOf(categoryKey);

    for (const segment of categorySegments) {
      const { value, category: _category, ...rest } = segment;
      const data: (number | null)[] = categoryOrder.map((_, i) =>
        i === categoryIndex ? (value / total) * 100 : null,
      );
      const legendKey = segment.legendKey ?? segment.label ?? segment.id;
      allSeries.push({ ...rest, stackId: PERCENTAGE_BAR_STACK_ID, data, legendKey });
    }
  }

  return { series: allSeries, categories: categoryOrder };
}

export const PercentageBarChart = memo(
  forwardRef<SVGSVGElement, PercentageBarChartProps>(
    (
      {
        series,
        borderRadius = 3,
        roundBaseline = true,
        stackGap = 0,
        inset = 0,
        transitions,
        xAxis,
        yAxis,
        testID,
        children,
        ...rest
      },
      ref,
    ) => {
      const { series: barSeries, categories } = useMemo(() => normalizeSegments(series), [series]);

      if (barSeries.length === 0) {
        return null;
      }

      return (
        <BarChart
          ref={ref}
          stacked
          borderRadius={borderRadius}
          inset={inset}
          layout="horizontal"
          roundBaseline={roundBaseline}
          series={barSeries}
          stackGap={stackGap}
          testID={testID}
          transitions={transitions}
          xAxis={{
            tickLabelFormatter: percentTickFormatter,
            ...xAxis,
            domain: { min: 0, max: 100 },
            domainLimit: 'strict',
          }}
          yAxis={{
            categoryPadding: 0,
            ...yAxis,
            data: categories,
          }}
          {...rest}
        >
          {children}
        </BarChart>
      );
    },
  ),
);

PercentageBarChart.displayName = 'PercentageBarChart';
