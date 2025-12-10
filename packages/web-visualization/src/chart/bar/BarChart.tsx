import { forwardRef, memo, useMemo } from 'react';

import { XAxis, type XAxisProps, YAxis, type YAxisProps } from '../axis';
import {
  CartesianChart,
  type CartesianChartBaseProps,
  type CartesianChartProps,
} from '../CartesianChart';
import {
  type CartesianAxisConfigProps,
  defaultChartInset,
  defaultStackId,
  getChartInset,
} from '../utils';

import { BarPlot, type BarPlotProps } from './BarPlot';
import type { BarSeries } from './BarStack';

export type BarChartBaseProps = Omit<CartesianChartBaseProps, 'xAxis' | 'yAxis' | 'series'> &
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
    | 'transition'
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
  Omit<CartesianChartProps, 'xAxis' | 'yAxis' | 'series'>;

export const BarChart = memo(
  forwardRef<SVGSVGElement, BarChartProps>(
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
        transition,
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
      const seriesIds = seriesToRender?.map((s) => s.id);

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

      const xAxisConfig: Partial<CartesianAxisConfigProps> = {
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
      const yAxisConfig: Partial<CartesianAxisConfigProps> = {
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
            seriesIds={seriesIds}
            stackGap={stackGap}
            stackMinSize={stackMinSize}
            stroke={stroke}
            strokeWidth={strokeWidth}
            transition={transition}
          />
          {children}
        </CartesianChart>
      );
    },
  ),
);
