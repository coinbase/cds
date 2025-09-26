import React, { forwardRef, memo, useMemo } from 'react';
import { View } from 'react-native';
import {
  type AxisConfigProps,
  defaultChartPadding,
  getPadding,
  type Series,
} from '@coinbase/cds-common/visualizations/charts';
import { chartFallbackNegative, chartFallbackPositive } from '@coinbase/cds-lottie-files';
import { Lottie } from '@coinbase/cds-mobile/animation';
import { Box } from '@coinbase/cds-mobile/layout';

import { XAxis, type XAxisProps, YAxis, type YAxisProps } from '../axis';
import { Chart, type ChartProps } from '../Chart';

import { Line, type LineProps } from './Line';

/**
 * Default fallback component that shows Lottie animations for loading states
 */
export type LineChartDefaultFallbackProps = {
  fallbackType?: 'positive' | 'negative';
};

// Default fallback component with Lottie animations
const DefaultFallback = memo(({ fallbackType = 'positive' }: LineChartDefaultFallbackProps) => {
  const source = fallbackType === 'negative' ? chartFallbackNegative : chartFallbackPositive;
  return <Lottie autoplay loop height="100%" source={source} width="100%" />;
});

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
      | 'showArea'
      | 'areaType'
      | 'areaBaseline'
      | 'type'
      | 'LineComponent'
      | 'AreaComponent'
      | 'stroke'
      | 'opacity'
      | 'renderPoints'
    >
  >;

export type LineChartProps = Omit<ChartProps, 'xAxis' | 'yAxis' | 'series'> &
  Pick<
    LineProps,
    'showArea' | 'areaType' | 'type' | 'LineComponent' | 'AreaComponent' | 'curve' | 'renderPoints'
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
     * Key that identifies the current dataset.
     * When this changes, triggers fade-out/fade-in transitions for axes and scrubber heads.
     * Useful for distinguishing between live updates vs complete dataset changes.
     */
    dataKey?: string | number;
    xAxis?: Partial<AxisConfigProps> & XAxisProps;
    yAxis?: Partial<AxisConfigProps> & YAxisProps;
    /**
     * Fallback shown when data is not available. This is usually a loading state.
     */
    fallback?: React.ReactNode;
    /**
     * If you use the default fallback then this specifies if the fallback line is decreasing or increasing
     */
    fallbackType?: 'positive' | 'negative';
    /**
     * Disables the fallback state of the chart.
     */
    disableFallback?: boolean;
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
        showXAxis,
        showYAxis,
        dataKey,
        xAxis,
        yAxis,
        padding: userPadding,
        children,
        enableScrubbing,
        fallback,
        fallbackType = 'positive',
        disableFallback,
        ...chartProps
      },
      ref,
    ) => {
      const calculatedPadding = useMemo(
        () => getPadding(userPadding, defaultChartPadding),
        [userPadding],
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
        <View style={{ position: 'relative' }}>
          <Chart
            {...chartProps}
            ref={ref}
            enableScrubbing={enableScrubbing}
            padding={calculatedPadding}
            series={chartSeries}
            xAxis={xAxisConfig}
            yAxis={yAxisConfig}
          >
            {/* Render axes first for grid lines to appear behind everything else */}
            {showXAxis && <XAxis dataKey={dataKey} position="end" {...xAxisVisualProps} />}
            {showYAxis && (
              <YAxis axisId={yAxisId} dataKey={dataKey} position="end" {...yAxisVisualProps} />
            )}
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
                  type={type}
                  {...linePropsFromSeries}
                />
              ))}
            {children}
          </Chart>
          {!hasData && !disableFallback && (
            <Box
              alignItems="center"
              height="100%"
              justifyContent="center"
              position="absolute"
              top={0}
              width="100%"
            >
              {fallback ?? <DefaultFallback fallbackType={fallbackType} />}
            </Box>
          )}
        </View>
      );
    },
  ),
);
