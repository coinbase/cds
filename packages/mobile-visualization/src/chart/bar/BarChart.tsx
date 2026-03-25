import { forwardRef, memo, useMemo } from 'react';
import type { View } from 'react-native';

import { XAxis, type XAxisProps, YAxis, type YAxisProps } from '../axis';
import {
  CartesianChart,
  type CartesianChartBaseProps,
  type CartesianChartProps,
} from '../CartesianChart';
import { type CartesianAxisConfigProps, defaultStackId } from '../utils';

import { BarPlot, type BarPlotProps } from './BarPlot';
import type { BarSeries } from './BarStack';

export type BarChartBaseProps = Omit<
  CartesianChartBaseProps,
  | 'xAxis'
  | 'yAxis'
  | 'series'
  | 'borderRadius'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'borderBottomLeftRadius'
  | 'borderBottomRightRadius'
> &
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
    | 'transitions'
    | 'transition'
  > & {
    /**
     * Configuration objects that define how to visualize the data.
     * Each series can optionally define its own BarComponent.
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

export type BarChartProps = BarChartBaseProps &
  Omit<
    CartesianChartProps,
    | 'xAxis'
    | 'yAxis'
    | 'series'
    | 'borderRadius'
    | 'borderTopLeftRadius'
    | 'borderTopRightRadius'
    | 'borderBottomLeftRadius'
    | 'borderBottomRightRadius'
  >;

export const BarChart = memo(
  forwardRef<View, BarChartProps>(
    (
      {
        series: seriesProp,
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
        transitions,
        transition,
        ...chartProps
      },
      ref,
    ) => {
      const series: Array<BarSeries> | undefined = useMemo(() => {
        if (!stacked || !seriesProp) return seriesProp;
        return seriesProp.map((s) => ({ ...s, stackId: s.stackId ?? defaultStackId }));
      }, [seriesProp, stacked]);

      const seriesIds = useMemo(() => series?.map((s) => s.id), [series]);
      const isHorizontalLayout = chartProps.layout === 'horizontal';
      const defaultXScaleType = isHorizontalLayout ? 'linear' : 'band';
      const defaultYScaleType = isHorizontalLayout ? 'band' : 'linear';

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

      const xAxisConfig = useMemo<Partial<CartesianAxisConfigProps>>(
        () => ({
          scaleType: xScaleType ?? defaultXScaleType,
          data: xData,
          categoryPadding: xCategoryPadding,
          domain: isHorizontalLayout && !hasNegativeValues ? { min: 0, ...xDomain } : xDomain,
          domainLimit: xDomainLimit,
          range: xRange,
        }),
        [
          xScaleType,
          defaultXScaleType,
          xData,
          xCategoryPadding,
          isHorizontalLayout,
          hasNegativeValues,
          xDomain,
          xDomainLimit,
          xRange,
        ],
      );

      // Set default min domain to 0 for bar chart, but only if there are no negative values.
      const yAxisConfig = useMemo<Partial<CartesianAxisConfigProps>>(
        () => ({
          scaleType: yScaleType ?? defaultYScaleType,
          data: yData,
          categoryPadding: yCategoryPadding,
          domain: !isHorizontalLayout && !hasNegativeValues ? { min: 0, ...yDomain } : yDomain,
          domainLimit: yDomainLimit,
          range: yRange,
        }),
        [
          yScaleType,
          defaultYScaleType,
          yData,
          yCategoryPadding,
          isHorizontalLayout,
          hasNegativeValues,
          yDomain,
          yDomainLimit,
          yRange,
        ],
      );

      return (
        <CartesianChart
          {...chartProps}
          ref={ref}
          inset={inset}
          series={series}
          xAxis={xAxisConfig}
          yAxis={yAxisConfig}
        >
          {showXAxis && <XAxis axisId={xAxisId} {...xAxisVisualProps} />}
          {showYAxis && <YAxis axisId={yAxisId} {...yAxisVisualProps} />}
          <BarPlot
            BarComponent={BarComponent}
            BarStackComponent={BarStackComponent}
            barMinSize={barMinSize}
            barPadding={barPadding}
            borderRadius={borderRadius}
            fillOpacity={fillOpacity}
            roundBaseline={roundBaseline}
            seriesIds={seriesIds}
            stackGap={stackGap}
            stackMinSize={stackMinSize}
            stroke={stroke}
            strokeWidth={strokeWidth}
            transition={transition}
            transitions={transitions}
          />
          {children}
        </CartesianChart>
      );
    },
  ),
);
