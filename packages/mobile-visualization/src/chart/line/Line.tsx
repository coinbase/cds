import React, { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile';
import { type AnimatedProp, Group } from '@shopify/react-native-skia';

import { Area, type AreaComponent } from '../area/Area';
import { useCartesianChartContext } from '../ChartProvider';
import type { PathProps } from '../Path';
import { Point, type PointBaseProps, type PointProps } from '../point';
import {
  type ChartPathCurveType,
  getLineData,
  getLinePath,
  type GradientDefinition,
} from '../utils';
import { evaluateGradientAtValue, getGradientStops } from '../utils/gradient';
import { convertToSerializableScale } from '../utils/scale';

import { DottedLine } from './DottedLine';
import { SolidLine } from './SolidLine';

export type LineBaseProps = {
  /**
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted';
  /**
   * Whether to show area fill under the line.
   */
  showArea?: boolean;
  /**
   * The type of area fill to add to the line.
   * @default 'gradient'
   */
  areaType?: 'gradient' | 'solid' | 'dotted';
  /**
   * Baseline value for the area.
   * When set, overrides the default baseline.
   */
  areaBaseline?: number;
  /**
   * Component to render the line.
   * Takes precedence over the type prop if provided.
   */
  LineComponent?: LineComponent;
  /**
   * Custom component to render line area fill.
   */
  AreaComponent?: AreaComponent;
  /**
   * Opacity of the line's stroke.
   * Will also be applied to points and area fill.
   * @default 1
   */
  opacity?: number;
  /**
   * Controls whether and how to render points at each data point in the series.
   * - `true`: Show all points with default styling
   * - `false` or `undefined`: Hide all points
   * - Function: Called for every entry in the data array to customize individual points
   *
   * @param defaults - The default point props computed by the Line component
   * @returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize
   */
  points?:
    | boolean
    | ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>);
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the line.
   * @default color of the series or theme.color.fgPrimary
   */
  stroke?: string;
  /**
   * Opacity of the line
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  strokeOpacity?: AnimatedProp<number>;
  /**
   * Width of the line
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
};

export type LineProps = LineBaseProps & Pick<PathProps, 'transitions' | 'transition'>;

export type LineComponentProps = Pick<
  LineProps,
  'stroke' | 'strokeOpacity' | 'strokeWidth' | 'gradient' | 'animate' | 'transitions' | 'transition'
> &
  Pick<PathProps, 'clipPath' | 'strokeCap'> & {
    /**
     * Path of the line
     */
    d: AnimatedProp<string | undefined>;
    /**
     * ID of the x-axis to use.
     * If not provided, defaults to the default x-axis.
     * @note Only used for axis selection when layout is 'horizontal'. Vertical layout uses a single x-axis.
     */
    xAxisId?: string;
    /**
     * ID of the y-axis to use.
     * If not provided, defaults to the default y-axis.
     * @note Only used for axis selection when layout is 'vertical'. Horizontal layout supports a single y-axis.
     */
    yAxisId?: string;
  };

export type LineComponent = React.FC<LineComponentProps>;

export const Line = memo<LineProps>(
  ({
    seriesId,
    curve = 'bump',
    type = 'solid',
    areaType = 'gradient',
    areaBaseline,
    stroke: strokeProp,
    strokeOpacity,
    showArea,
    LineComponent: SelectedLineComponent,
    AreaComponent,
    opacity = 1,
    points,
    connectNulls,
    transitions,
    transition,
    gradient: gradientProp,
    ...props
  }) => {
    const theme = useTheme();
    const { layout, animate, getSeries, getSeriesData, getXScale, getYScale, getXAxis, getYAxis } =
      useCartesianChartContext();

    const matchedSeries = useMemo(() => getSeries(seriesId), [getSeries, seriesId]);
    const gradient = useMemo(
      () => gradientProp ?? matchedSeries?.gradient,
      [gradientProp, matchedSeries?.gradient],
    );
    const sourceData = useMemo(() => getSeriesData(seriesId), [getSeriesData, seriesId]);

    const xAxis = useMemo(
      () => getXAxis(matchedSeries?.xAxisId),
      [getXAxis, matchedSeries?.xAxisId],
    );
    const xScale = useMemo(
      () => getXScale(matchedSeries?.xAxisId),
      [getXScale, matchedSeries?.xAxisId],
    );
    const yScale = useMemo(
      () => getYScale(matchedSeries?.yAxisId),
      [getYScale, matchedSeries?.yAxisId],
    );
    const yAxis = useMemo(
      () => getYAxis(matchedSeries?.yAxisId),
      [getYAxis, matchedSeries?.yAxisId],
    );

    // Convert sourceData to number array (line only supports numbers, not tuples)
    const chartData = useMemo(() => getLineData(sourceData), [sourceData]);

    const categoryAxisIsX = useMemo(() => {
      return layout !== 'horizontal';
    }, [layout]);

    const categoryAxis = useMemo(() => {
      return categoryAxisIsX ? xAxis : yAxis;
    }, [categoryAxisIsX, xAxis, yAxis]);

    const path = useMemo(() => {
      if (!xScale || !yScale || chartData.length === 0) return '';

      // Get numeric category-axis data if available.
      const indexData =
        categoryAxis?.data &&
        Array.isArray(categoryAxis.data) &&
        typeof categoryAxis.data[0] === 'number'
          ? (categoryAxis.data as number[])
          : undefined;

      return getLinePath({
        data: chartData,
        xScale,
        yScale,
        curve,
        xData: categoryAxisIsX ? indexData : undefined,
        yData: !categoryAxisIsX ? indexData : undefined,
        connectNulls,
        layout,
      });
    }, [xScale, yScale, chartData, categoryAxis, curve, categoryAxisIsX, connectNulls, layout]);

    const LineComponent = useMemo((): LineComponent => {
      if (SelectedLineComponent) {
        return SelectedLineComponent;
      }

      switch (type) {
        case 'dotted':
          return DottedLine;
        default:
          return SolidLine;
      }
    }, [SelectedLineComponent, type]);

    // Get series color for stroke
    const stroke = strokeProp ?? matchedSeries?.color ?? theme.color.fgPrimary;

    const categoryData = useMemo(() => {
      const data = categoryAxis?.data;
      return data && Array.isArray(data) && data.length > 0 && typeof data[0] === 'number'
        ? (data as number[])
        : null;
    }, [categoryAxis]);

    const gradientConfig = useMemo(() => {
      if (!gradient || !xScale || !yScale) return;

      const gradientScale = gradient.axis === 'x' ? xScale : yScale;
      const serializableScale = convertToSerializableScale(gradientScale);
      if (!serializableScale) return;

      const domain = { min: serializableScale.domain[0], max: serializableScale.domain[1] };
      const stops = getGradientStops(gradient.stops, domain);

      return {
        scale: serializableScale,
        stops,
      };
    }, [gradient, xScale, yScale]);

    if (!xScale || !yScale || !path) return;

    return (
      <>
        {showArea && (
          <Area
            AreaComponent={AreaComponent}
            baseline={areaBaseline}
            connectNulls={connectNulls}
            curve={curve}
            fill={stroke}
            fillOpacity={opacity}
            gradient={gradient}
            seriesId={seriesId}
            transition={transition}
            transitions={transitions}
            type={areaType}
          />
        )}
        {/* todo: pass in series id? */}
        <LineComponent
          d={path}
          gradient={gradient}
          stroke={stroke}
          strokeOpacity={strokeOpacity ?? opacity}
          transition={transition}
          transitions={transitions}
          xAxisId={matchedSeries?.xAxisId}
          yAxisId={matchedSeries?.yAxisId}
          {...props}
        />
        {points && (
          <Group>
            {chartData.map((value: number | null, index: number) => {
              if (value === null) return;

              const indexValue =
                categoryData && categoryData[index] !== undefined ? categoryData[index] : index;

              let pointFill = stroke;

              if (gradientConfig && gradient) {
                // Match gradient sampling to the chart axis roles for each layout.
                const gradientAxis = gradient.axis ?? 'y';
                const dataValue =
                  gradientAxis === 'x'
                    ? categoryAxisIsX
                      ? indexValue
                      : value
                    : categoryAxisIsX
                      ? value
                      : indexValue;

                const evaluatedColor = evaluateGradientAtValue(
                  gradientConfig.stops,
                  dataValue,
                  gradientConfig.scale,
                );
                if (evaluatedColor) {
                  // Apply gradient color to fill if not explicitly set
                  pointFill = evaluatedColor;
                }
              }

              // Build defaults that would be passed to Point
              const defaults: PointBaseProps = {
                dataX: categoryAxisIsX ? indexValue : value,
                dataY: categoryAxisIsX ? value : indexValue,
                fill: pointFill,
                xAxisId: matchedSeries?.xAxisId,
                yAxisId: matchedSeries?.yAxisId,
                opacity,
              };

              // If points is true, render with defaults
              if (points === true) {
                return (
                  <Point
                    key={`${seriesId}-${index}`}
                    transition={transition}
                    transitions={transitions}
                    {...defaults}
                  />
                );
              }

              // Call the function with defaults
              const result = points(defaults);

              if (!result) return;

              const pointConfig = result === true ? {} : result;

              return (
                <Point
                  key={`${seriesId}-${index}`}
                  transition={transition}
                  transitions={transitions}
                  {...defaults}
                  {...pointConfig}
                />
              );
            })}
          </Group>
        )}
      </>
    );
  },
);
