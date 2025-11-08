import { forwardRef, memo, useMemo } from 'react';
import type { View } from 'react-native';

import { XAxis, type XAxisProps, YAxis, type YAxisProps } from '../axis';
import { CartesianChart, type CartesianChartProps } from '../CartesianChart';
import {
  type AxisConfigProps,
  defaultChartInset,
  defaultStackId,
  getChartInset,
  type Series,
} from '../utils';

import { BarPlot, type BarPlotProps } from './BarPlot';

// Exported for consistency with AreaChart and LineChart
// note we don't really support this at the moment since we don't pass this information into BarPlot
export type BarSeries = Series;

export type BarChartProps = Omit<CartesianChartProps, 'xAxis' | 'yAxis' | 'series'> &
  Pick<
    BarPlotProps,
    | 'barPadding'
    | 'BarComponent'
    | 'fillOpacity'
    | 'stroke'
    | 'strokeWidth'
    | 'borderRadius'
    | 'BarStackComponent'
    | 'roundBaseline'
    | 'stackGap'
    | 'barMinSize'
    | 'stackMinSize'
    | 'transitionConfig'
  > & {
    /**
     * Configuration objects that define how to visualize the data.
     */
    series?: Array<BarSeries>;
    /**
     * Whether to stack the areas on top of each other.
     * When true, each series builds cumulative values on top of the previous series.
     *
     * @note only applies to series data containing singular numbers (e.g., `[10, 20, 30]`).
     * Series with start & end value tuples (e.g., `[[0, 10], [5, 20]]`) will be skipped during stacking
     * and rendered as-is.
     */
    stacked?: boolean;
    /**
     * Whether to show the X axis.
     */
    showXAxis?: boolean;
    /**
     * Whether to show the Y axis.
     */
    showYAxis?: boolean;
    // todo: add comments
    xAxis?: Partial<AxisConfigProps> & XAxisProps;
    yAxis?: Partial<AxisConfigProps> & YAxisProps;
  };

export const BarChart = memo(
  forwardRef<View, BarChartProps>(
    (
      {
        series,
        stacked,
        showXAxis,
        showYAxis,
        xAxis,
        yAxis,
        inset,
        children,
        barPadding,
        BarComponent,
        fillOpacity,
        stroke,
        strokeWidth,
        borderRadius,
        roundBaseline,
        BarStackComponent,
        stackGap,
        barMinSize,
        stackMinSize,
        transitionConfig,
        ...chartProps
      },
      ref,
    ) => {
      const calculatedInset = useMemo(() => getChartInset(inset, defaultChartInset), [inset]);

      const transformedSeries = useMemo(() => {
        if (!stacked || !series) return series;
        return series.map((s) => ({ ...s, stackId: s.stackId ?? defaultStackId }));
      }, [series, stacked]);

      // Unlike other charts with custom props per series, we do not need to pick out
      // the props from each series that shouldn't be passed to CartesianChart
      const seriesToRender = transformedSeries ?? series;

      // Split axis props into config props for Chart and visual props for axis components
      const {
        scaleType: xScaleType,
        data: xData,
        categoryPadding: xCategoryPadding,
        domain: xDomain,
        domainLimit: xDomainLimit,
        range: xRange,
        ...xAxisVisualProps
      } = xAxis || {};
      const {
        scaleType: yScaleType,
        data: yData,
        categoryPadding: yCategoryPadding,
        domain: yDomain,
        domainLimit: yDomainLimit,
        range: yRange,
        id: yAxisId,
        ...yAxisVisualProps
      } = yAxis || {};

      const xAxisConfig: Partial<AxisConfigProps> = {
        scaleType: xScaleType ?? 'band',
        data: xData,
        categoryPadding: xCategoryPadding,
        domain: xDomain,
        domainLimit: xDomainLimit,
        range: xRange,
      };

      const hasNegativeValues = useMemo(() => {
        if (!series) return false;
        return series.some((s) =>
          s.data?.some(
            (value: number | null | [number, number]) =>
              (typeof value === 'number' && value < 0) ||
              (Array.isArray(value) && value.some((v) => typeof v === 'number' && v < 0)),
          ),
        );
      }, [series]);

      // Set default min domain to 0 for area chart, but only if there are no negative values
      const yAxisConfig: Partial<AxisConfigProps> = {
        scaleType: yScaleType,
        data: yData,
        categoryPadding: yCategoryPadding,
        domain: hasNegativeValues ? yDomain : { min: 0, ...yDomain },
        domainLimit: yDomainLimit,
        range: yRange,
      };

      return (
        <CartesianChart
          {...chartProps}
          ref={ref}
          inset={calculatedInset}
          series={seriesToRender}
          xAxis={xAxisConfig}
          yAxis={yAxisConfig}
        >
          {showXAxis && <XAxis {...xAxisVisualProps} />}
          {showYAxis && <YAxis axisId={yAxisId} {...yAxisVisualProps} />}
          <BarPlot
            BarComponent={BarComponent}
            BarStackComponent={BarStackComponent}
            barMinSize={barMinSize}
            barPadding={barPadding}
            borderRadius={borderRadius}
            fillOpacity={fillOpacity}
            roundBaseline={roundBaseline}
            seriesIds={series?.map((s) => s.id)}
            stackGap={stackGap}
            stackMinSize={stackMinSize}
            stroke={stroke}
            strokeWidth={strokeWidth}
            transitionConfig={transitionConfig}
          />
          {children}
        </CartesianChart>
      );
    },
  ),
);
