import React, { forwardRef, memo, useMemo } from 'react';
import {
  type AxisConfigProps,
  defaultChartPadding,
  defaultStackId,
  getPadding,
  type Series,
} from '@coinbase/cds-common/visualizations/charts';

import { XAxis, type XAxisProps, YAxis, type YAxisProps } from '../axis';
import { Chart, type ChartProps } from '../Chart';

import { type BarProps } from './Bar';
import { BarPlot, type BarPlotProps } from './BarPlot';

/**
 * Series type specifically for bar charts - supports both single numbers and tuples,
 * and allows individual customization of Bar props per series.
 */
export type BarSeries = Series &
  Partial<Pick<BarProps, 'BarComponent' | 'fill' | 'fillOpacity' | 'stroke' | 'strokeWidth'>>;

export type BarChartProps = Omit<ChartProps, 'xAxis' | 'yAxis' | 'series'> &
  Pick<
    BarPlotProps,
    'barPadding' | 'StackComponent' | 'roundBaseline' | 'stackGap' | 'barMinSize' | 'stackMinSize'
  > &
  Pick<BarProps, 'BarComponent' | 'fillOpacity' | 'stroke' | 'strokeWidth' | 'borderRadius'> & {
    /**
     * Configuration objects that define how to visualize the data.
     * Each series supports Bar component props for individual customization.
     */
    series?: Array<BarSeries>;
    /**
     * Whether to stack the areas on top of each other.
     * When true, each series builds cumulative values on top of the previous series.
     *
     * **Note**: Only applies to series data containing singular numbers (e.g., `[10, 20, 30]`).
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
    /**
     * Key that identifies the current dataset.
     * When this changes, triggers fade-out/fade-in transitions for axes and scrubber heads.
     * Useful for distinguishing between live updates vs complete dataset changes.
     */
    dataKey?: string | number;

    xAxis?: Partial<AxisConfigProps> & XAxisProps;
    yAxis?: Partial<AxisConfigProps> & YAxisProps;
  };

export const BarChart = memo(
  forwardRef<SVGSVGElement, BarChartProps>(
    (
      {
        series,
        stacked,
        showXAxis,
        showYAxis,
        dataKey,
        xAxis,
        yAxis,
        padding: userPadding,
        children,
        barPadding,
        BarComponent,
        fillOpacity,
        stroke,
        strokeWidth,
        borderRadius,
        roundBaseline,
        StackComponent,
        stackGap,
        barMinSize,
        stackMinSize,
        ...chartProps
      },
      ref,
    ) => {
      const calculatedPadding = useMemo(
        () => getPadding(userPadding, defaultChartPadding),
        [userPadding],
      );

      // Convert BarSeries to Series for Chart context
      const chartSeries = useMemo(() => {
        return series?.map(
          (s): Series => ({
            id: s.id,
            data: s.data,
            label: s.label,
            color: s.color,
            xAxisId: s.xAxisId,
            yAxisId: s.yAxisId,
            stackId: s.stackId,
          }),
        );
      }, [series]);

      const transformedSeries = useMemo(() => {
        if (!stacked || !chartSeries) return chartSeries;
        return chartSeries.map((s) => ({ ...s, stackId: s.stackId ?? defaultStackId }));
      }, [chartSeries, stacked]);

      const seriesToRender = transformedSeries ?? chartSeries;

      // Keep the original series with bar-specific props for BarPlot
      const barSeriesToRender = useMemo(() => {
        if (!stacked || !series) return series;
        return series.map((s) => ({ ...s, stackId: s.stackId ?? defaultStackId }));
      }, [series, stacked]);

      // Split axis props into config props for Chart and visual props for axis components
      const {
        scaleType: xScaleType,
        data: xData,
        categoryPadding: xCategoryPadding,
        domain: xDomain,
        domainLimit: xDomainLimit,
        range: xRange,
        id: xAxisId,
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

      // todo: see if we can get rid of this
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
        <Chart
          ref={ref}
          {...chartProps}
          padding={calculatedPadding}
          series={seriesToRender}
          xAxis={xAxisConfig}
          yAxis={yAxisConfig}
        >
          {showXAxis && (
            <XAxis axisId={xAxisId} dataKey={dataKey} position="end" {...xAxisVisualProps} />
          )}
          {showYAxis && (
            <YAxis axisId={yAxisId} dataKey={dataKey} position="end" {...yAxisVisualProps} />
          )}
          <BarPlot
            BarComponent={BarComponent}
            StackComponent={StackComponent}
            barMinSize={barMinSize}
            barPadding={barPadding}
            borderRadius={borderRadius}
            fillOpacity={fillOpacity}
            roundBaseline={roundBaseline}
            series={barSeriesToRender}
            stackGap={stackGap}
            stackMinSize={stackMinSize}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          {children}
        </Chart>
      );
    },
  ),
);
