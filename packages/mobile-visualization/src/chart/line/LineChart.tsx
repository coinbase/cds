import { forwardRef, memo, useMemo } from 'react';
import type { View } from 'react-native';

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
      | 'opacity'
      | 'renderPoints'
      | 'strokeWidth'
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
    xAxis?: Partial<AxisConfigProps> & XAxisProps;
    yAxis?: Partial<AxisConfigProps> & YAxisProps;
  };

export const LineChart = memo(
  forwardRef<View, LineChartProps>(
    (
      {
        series,
        showArea,
        areaType,
        type,
        LineComponent,
        AreaComponent,
        curve,
        renderPoints,
        strokeWidth,
        showXAxis,
        showYAxis,
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

      // Check if we have valid data across all series
      const hasData = useMemo(() => {
        if (!series || series.length === 0) return false;
        return series.some((s) => s.data && s.data.length > 0);
      }, [series]);

      // Convert LineSeries to Series for Chart context
      const chartSeries = useMemo(() => {
        return series?.map(
          (s): Series => ({
            id: s.id,
            data: s.data,
            label: s.label,
            color: s.color,
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
          {hasData &&
            series?.map(({ id, data, label, color, yAxisId, ...linePropsFromSeries }) => (
              <Line
                key={id}
                AreaComponent={AreaComponent}
                LineComponent={LineComponent}
                areaType={areaType}
                curve={curve}
                renderPoints={renderPoints}
                seriesId={id}
                showArea={showArea}
                strokeWidth={strokeWidth}
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
