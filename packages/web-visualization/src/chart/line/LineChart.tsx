import { forwardRef, memo, useMemo } from 'react';

import { XAxis, type XAxisProps } from '../axis/XAxis';
import { YAxis, type YAxisProps } from '../axis/YAxis';
import { CartesianChart, type CartesianChartProps } from '../CartesianChart';
import { type AxisConfigProps, defaultChartInset, getChartInset, type Series } from '../utils';

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
      | 'renderPoints'
      | 'connectNulls'
      | 'transition'
      | 'onPointClick'
    >
  >;

export type LineChartProps = Omit<CartesianChartProps, 'xAxis' | 'yAxis' | 'series'> &
  Pick<
    LineProps,
    | 'showArea'
    | 'areaType'
    | 'type'
    | 'LineComponent'
    | 'AreaComponent'
    | 'curve'
    | 'renderPoints'
    | 'strokeWidth'
    | 'strokeOpacity'
    | 'connectNulls'
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
    // todo: add comments here
    xAxis?: Partial<AxisConfigProps> & XAxisProps;
    yAxis?: Partial<AxisConfigProps> & YAxisProps;
  };

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
        renderPoints,
        strokeWidth,
        strokeOpacity,
        connectNulls,
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
      const calculatedInset = useMemo(() => getChartInset(inset, defaultChartInset), [inset]);

      // Convert LineSeries to Series for Chart context
      const chartSeries = useMemo(() => {
        return series?.map(
          (s): Series => ({
            id: s.id,
            data: s.data,
            label: s.label,
            color: s.color,
            yAxisId: s.yAxisId,
            stackId: s.stackId,
            gradient: s.gradient,
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

      const yAxisConfig: Partial<AxisConfigProps> = {
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
          inset={calculatedInset}
          series={chartSeries}
          xAxis={xAxisConfig}
          yAxis={yAxisConfig}
        >
          {/* Render axes first for grid lines to appear behind everything else */}
          {showXAxis && <XAxis {...xAxisVisualProps} />}
          {showYAxis && <YAxis axisId={yAxisId} {...yAxisVisualProps} />}
          {series?.map(({ id, data, label, color, yAxisId, ...linePropsFromSeries }) => (
            <Line
              key={id}
              AreaComponent={AreaComponent}
              LineComponent={LineComponent}
              areaType={areaType}
              connectNulls={connectNulls}
              curve={curve}
              onPointClick={onPointClick}
              opacity={opacity}
              renderPoints={renderPoints}
              seriesId={id}
              showArea={showArea}
              strokeOpacity={strokeOpacity}
              strokeWidth={strokeWidth}
              transition={linePropsFromSeries.transition ?? transition}
              type={type}
              {...linePropsFromSeries}
            />
          ))}
          {children}
        </CartesianChart>
      );
    },
  ),
);
