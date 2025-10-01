import React, { forwardRef, memo, useMemo } from 'react';
import {
  type AxisConfigProps,
  defaultChartInset,
  getChartInset,
  type Series,
} from '@coinbase/cds-common/visualizations/charts';

import { XAxis, type XAxisProps } from '../axis/XAxis';
import { YAxis, type YAxisProps } from '../axis/YAxis';
import { CartesianChart, type CartesianChartProps } from '../CartesianChart';

import { Line, type LineProps } from './Line';

/**
 * Series type specifically for line charts - enforces single number arrays and supports Line props
 */
export type LineSeries = Omit<Series, 'data'> & {
  /**
   * The data array for this series. Use null values to create gaps in the line.
   * - Single numbers: Area (if shown) will extend from the y-axis minimum to the value
   * - Tuples [baseline, value]: Area will extend from baseline to value (line still shows at value)
   */
  data?: Array<number | null> | Array<[number, number] | null>;
} & Partial<
    Pick<
      LineProps,
      | 'curve'
      | 'onPointClick'
      | 'showArea'
      | 'areaType'
      | 'areaBaseline'
      | 'type'
      | 'type'
      | 'LineComponent'
      | 'AreaComponent'
      | 'stroke'
      | 'opacity'
      | 'renderPoints'
    >
  >;

export type LineChartProps = Omit<CartesianChartProps, 'xAxis' | 'yAxis' | 'series'> &
  Pick<
    LineProps,
    | 'showArea'
    | 'areaType'
    | 'type'
    | 'onPointClick'
    | 'LineComponent'
    | 'AreaComponent'
    | 'curve'
    // TODO: what does renderPoints on LineChart mean? what x and y values is it called with?
    | 'renderPoints'
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
        showXAxis,
        showYAxis,
        xAxis,
        yAxis,
        inset: userInset,
        children,
        enableScrubbing,
        renderPoints,
        ...chartProps
      },
      ref,
    ) => {
      const calculatedInset = useMemo(
        () => getChartInset(userInset, defaultChartInset),
        [userInset],
      );

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
          ref={ref}
          {...chartProps}
          enableScrubbing={enableScrubbing}
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
              curve={curve}
              onPointClick={onPointClick}
              renderPoints={renderPoints}
              seriesId={id}
              showArea={showArea}
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
