import { forwardRef, memo, useMemo } from 'react';

import { XAxis, type XAxisProps } from '../axis/XAxis';
import { YAxis, type YAxisProps } from '../axis/YAxis';
import {
  CartesianChart,
  type CartesianChartBaseProps,
  type CartesianChartProps,
} from '../CartesianChart';
import { type CartesianAxisConfigProps, type Series } from '../utils';

import { Line, type LineProps } from './Line';

export type LineSeries = Series &
  Partial<
    Pick<
      LineProps,
      | 'curve'
      | 'showArea'
      | 'areaType'
      | 'areaBaseline'
      | 'type'
      | 'LineComponent'
      | 'AreaComponent'
      | 'stroke'
      | 'strokeWidth'
      | 'strokeOpacity'
      | 'opacity'
      | 'points'
      | 'connectNulls'
      | 'transitions'
      | 'transition'
      | 'onPointClick'
    >
  >;

export type LineChartBaseProps = Omit<CartesianChartBaseProps, 'xAxis' | 'yAxis' | 'series'> &
  Pick<
    LineProps,
    | 'showArea'
    | 'areaType'
    | 'type'
    | 'LineComponent'
    | 'AreaComponent'
    | 'curve'
    | 'points'
    | 'strokeWidth'
    | 'strokeOpacity'
    | 'connectNulls'
    | 'transitions'
    | 'transition'
    | 'onPointClick'
    | 'opacity'
  > & {
    /**
     * Configuration objects that define how to visualize the data.
     * Each series supports Line component props for individual customization.
     */
    series?: Array<LineSeries>;
    /**
     * Whether to show the X axis.
     */
    showXAxis?: boolean;
    /**
     * Whether to show the Y axis.
     */
    showYAxis?: boolean;
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

export type LineChartProps = LineChartBaseProps &
  Omit<CartesianChartProps, 'xAxis' | 'yAxis' | 'series'>;

export const LineChart = memo(
  forwardRef<SVGSVGElement, LineChartProps>(
    (
      {
        series,
        showArea,
        areaType,
        type,
        onPointClick,
        LineComponent,
        AreaComponent,
        curve,
        points,
        strokeWidth,
        strokeOpacity,
        connectNulls,
        transitions,
        transition,
        opacity,
        showXAxis,
        showYAxis,
        xAxis,
        yAxis,
        inset,
        children,
        ...chartProps
      },
      ref,
    ) => {
      // Convert LineSeries to Series for Chart context
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
            gradient: s.gradient,
            legendShape: s.legendShape,
          }),
        );
      }, [series]);

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

      const xAxisConfig: Partial<CartesianAxisConfigProps> = {
        scaleType: xScaleType,
        data: xData,
        categoryPadding: xCategoryPadding,
        domain: xDomain,
        domainLimit: xDomainLimit,
        range: xRange,
      };

      const yAxisConfig: Partial<CartesianAxisConfigProps> = {
        scaleType: yScaleType,
        data: yData,
        categoryPadding: yCategoryPadding,
        domain: yDomain,
        domainLimit: yDomainLimit,
        range: yRange,
      };

      return (
        <CartesianChart
          {...chartProps}
          ref={ref}
          inset={inset}
          series={chartSeries}
          xAxis={xAxisConfig}
          yAxis={yAxisConfig}
        >
          {/* Render axes first for grid lines to appear behind everything else */}
          {showXAxis && <XAxis axisId={xAxisId} {...xAxisVisualProps} />}
          {showYAxis && <YAxis axisId={yAxisId} {...yAxisVisualProps} />}
          {series?.map(
            ({ id, data, label, color, xAxisId, yAxisId, legendShape, ...linePropsFromSeries }) => (
              <Line
                key={id}
                AreaComponent={AreaComponent}
                LineComponent={LineComponent}
                areaType={areaType}
                connectNulls={connectNulls}
                curve={curve}
                onPointClick={onPointClick}
                opacity={opacity}
                points={points}
                seriesId={id}
                showArea={showArea}
                strokeOpacity={strokeOpacity}
                strokeWidth={strokeWidth}
                transition={transition}
                transitions={transitions}
                type={type}
                {...linePropsFromSeries}
              />
            ),
          )}
          {children}
        </CartesianChart>
      );
    },
  ),
);
