import { forwardRef, memo, useMemo } from 'react';

import { XAxis, type XAxisProps, YAxis, type YAxisProps } from '../axis';
import { CartesianChart, type CartesianChartProps } from '../CartesianChart';
import { Line, type LineProps } from '../line/Line';
import {
  type AxisConfigProps,
  defaultChartInset,
  defaultStackId,
  getChartInset,
  type Series,
} from '../utils';

import { Area, type AreaProps } from './Area';

export type AreaSeries = Series &
  Partial<
    Pick<AreaProps, 'AreaComponent' | 'curve' | 'fillOpacity' | 'type' | 'fill' | 'connectNulls'>
  > &
  Partial<Pick<LineProps, 'LineComponent' | 'strokeWidth' | 'stroke' | 'opacity'>>;

export type AreaChartProps = Omit<CartesianChartProps, 'xAxis' | 'yAxis' | 'series'> &
  Pick<AreaProps, 'AreaComponent' | 'curve' | 'fillOpacity' | 'type' | 'connectNulls'> &
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
    lineType?: 'solid' | 'dotted' | 'gradient';

    xAxis?: Partial<AxisConfigProps> & XAxisProps;
    yAxis?: Partial<AxisConfigProps> & YAxisProps;
  };

export const AreaChart = memo(
  forwardRef<SVGSVGElement, AreaChartProps>(
    (
      {
        series,
        stacked,
        AreaComponent,
        curve,
        fillOpacity,
        type,
        connectNulls,
        LineComponent,
        strokeWidth,
        showXAxis,
        showYAxis,
        showLines,
        lineType = 'solid',
        xAxis,
        yAxis,
        inset: userInset,
        children,
        ...chartProps
      },
      ref,
    ) => {
      const calculatedInset = useMemo(
        () => getChartInset(userInset, defaultChartInset),
        [userInset],
      );

      // Convert AreaSeries to Series for Chart context
      const chartSeries = useMemo(() => {
        return series?.map(
          (s): Series => ({
            id: s.id,
            data: s.data,
            label: s.label,
            color: s.color,
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
        scaleType: xScaleType,
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
          {series?.map(
            ({
              id,
              data,
              label,
              color,
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
                yAxisId,
                fill,
                fillOpacity,
                stackId,
                ...linePropsFromSeries
              }) => {
                return (
                  <Line
                    key={id}
                    LineComponent={LineComponent}
                    connectNulls={connectNulls}
                    curve={curve}
                    seriesId={id}
                    strokeWidth={strokeWidth}
                    type={lineType}
                    {...linePropsFromSeries}
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
