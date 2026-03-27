import { forwardRef, memo, useMemo } from 'react';
import type { View } from 'react-native';

import { XAxis, type XAxisProps, YAxis, type YAxisProps } from '../axis';
import {
  CartesianChart,
  type CartesianChartBaseProps,
  type CartesianChartProps,
} from '../CartesianChart';
import { Line, type LineProps } from '../line/Line';
import {
  type CartesianAxisConfigProps,
  defaultStackId,
  type Series,
  withBaselineDomain,
} from '../utils';

import { Area, type AreaProps } from './Area';

export type AreaSeries = Series &
  Partial<
    Pick<
      AreaProps,
      | 'AreaComponent'
      | 'curve'
      | 'fillOpacity'
      | 'type'
      | 'fill'
      | 'connectNulls'
      | 'transition'
      | 'transitions'
    >
  > &
  Partial<
    Pick<
      LineProps,
      'LineComponent' | 'strokeWidth' | 'stroke' | 'opacity' | 'transition' | 'transitions'
    >
  > & {
    /**
     * The type of line to render for this series.
     * Overrides the chart-level lineType if provided.
     * @default 'solid'
     */
    lineType?: 'solid' | 'dotted';
  };

export type AreaChartBaseProps = Omit<CartesianChartBaseProps, 'xAxis' | 'yAxis' | 'series'> &
  Pick<
    AreaProps,
    | 'AreaComponent'
    | 'curve'
    | 'fillOpacity'
    | 'type'
    | 'connectNulls'
    | 'transition'
    | 'transitions'
  > &
  Pick<LineProps, 'LineComponent' | 'strokeWidth'> & {
    /**
     * Configuration objects that define how to visualize the data.
     * Each series supports Area and Line component props for individual customization.
     */
    series?: Array<AreaSeries>;
    /**
     * Whether to stack the areas on top of each other.
     * When true, each series builds cumulative values on top of the previous series.
     *
     * **Note**: Only applies to series data containing singular numbers (e.g., `[10, 20, 30]`).
     * Series with [baseline, value] tuples (e.g., `[[0, 10], [0, -5]]`) will be skipped during stacking
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
     * Whether to show lines on top of the areas.
     * Useful for stacked contexts to show the outline of each area.
     */
    showLines?: boolean;
    /**
     * The type of line to render.
     * @default 'solid'
     */
    lineType?: 'solid' | 'dotted';
    /**
     * Configuration for x-axis.
     * Accepts axis config and axis props.
     * To show the axis, set `showXAxis` to true.
     */
    xAxis?: Partial<CartesianAxisConfigProps> & XAxisProps;
    /**
     * Configuration for y-axis.
     * Accepts axis config and axis props.
     * To show the axis, set `showYAxis` to true.
     */
    yAxis?: Partial<CartesianAxisConfigProps> & YAxisProps;
  };

export type AreaChartProps = AreaChartBaseProps &
  Omit<CartesianChartProps, 'xAxis' | 'yAxis' | 'series'>;

export const AreaChart = memo(
  forwardRef<View, AreaChartProps>(
    (
      {
        series,
        stacked,
        AreaComponent,
        curve,
        fillOpacity,
        type,
        connectNulls,
        transition,
        transitions,
        LineComponent,
        strokeWidth,
        showXAxis,
        showYAxis,
        showLines,
        lineType = 'solid',
        xAxis,
        yAxis,
        inset,
        children,
        ...chartProps
      },
      ref,
    ) => {
      // Convert AreaSeries to Series for Chart context
      const chartSeries = useMemo(() => {
        return series?.map(
          (s): Series => ({
            id: s.id,
            data: s.data,
            label: s.label,
            color: s.color,
            gradient: s.gradient,
            xAxisId: s.xAxisId,
            yAxisId: s.yAxisId,
            stackId: s.stackId,
            legendShape: s.legendShape,
          }),
        );
      }, [series]);

      const transformedSeries = useMemo(() => {
        if (!stacked || !chartSeries) return chartSeries;
        return chartSeries.map((s) => ({ ...s, stackId: s.stackId ?? defaultStackId }));
      }, [chartSeries, stacked]);

      const seriesToRender = transformedSeries ?? chartSeries;

      // Split axis props into config props for Chart and visual props for axis components
      const {
        scaleType: xScaleType,
        data: xData,
        categoryPadding: xCategoryPadding,
        domain: xDomain,
        domainLimit: xDomainLimit,
        range: xRange,
        baseline: xBaseline,
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
        baseline: yBaseline,
        id: yAxisId,
        ...yAxisVisualProps
      } = yAxis || {};
      const isHorizontalLayout = chartProps.layout === 'horizontal';
      const valueAxisBaseline = isHorizontalLayout ? xBaseline : yBaseline;

      const xAxisConfig: Partial<CartesianAxisConfigProps> = {
        scaleType: xScaleType,
        data: xData,
        categoryPadding: xCategoryPadding,
        domain: isHorizontalLayout ? withBaselineDomain(xDomain, valueAxisBaseline) : xDomain,
        domainLimit: xDomainLimit,
        range: xRange,
        baseline: xBaseline,
      };

      const yAxisConfig: Partial<CartesianAxisConfigProps> = {
        scaleType: yScaleType,
        data: yData,
        categoryPadding: yCategoryPadding,
        domain: !isHorizontalLayout ? withBaselineDomain(yDomain, valueAxisBaseline) : yDomain,
        domainLimit: yDomainLimit,
        range: yRange,
        baseline: yBaseline,
      };

      return (
        <CartesianChart
          {...chartProps}
          ref={ref}
          inset={inset}
          series={seriesToRender}
          xAxis={xAxisConfig}
          yAxis={yAxisConfig}
        >
          {showXAxis && <XAxis axisId={xAxisId} {...xAxisVisualProps} />}
          {showYAxis && <YAxis axisId={yAxisId} {...yAxisVisualProps} />}
          {series?.map(
            ({
              id,
              data,
              label,
              color,
              xAxisId,
              yAxisId,
              opacity,
              LineComponent,
              stackId,
              ...areaPropsFromSeries
            }) => (
              <Area
                key={id}
                AreaComponent={AreaComponent}
                connectNulls={connectNulls}
                curve={curve}
                fillOpacity={fillOpacity}
                seriesId={id}
                transition={transition}
                transitions={transitions}
                type={type}
                {...areaPropsFromSeries}
              />
            ),
          )}
          {showLines &&
            series?.map(
              ({
                id,
                data,
                label,
                color,
                xAxisId,
                yAxisId,
                fill,
                fillOpacity,
                stackId,
                type, // Area type (don't pass to Line)
                ...otherPropsFromSeries
              }) => {
                return (
                  <Line
                    key={id}
                    LineComponent={LineComponent}
                    connectNulls={connectNulls}
                    curve={curve}
                    seriesId={id}
                    strokeWidth={strokeWidth}
                    transition={transition}
                    transitions={transitions}
                    type={lineType}
                    {...otherPropsFromSeries}
                  />
                );
              },
            )}
          {children}
        </CartesianChart>
      );
    },
  ),
);
