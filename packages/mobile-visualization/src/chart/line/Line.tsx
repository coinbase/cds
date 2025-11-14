import React, { memo, useEffect, useMemo } from 'react';
import { useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile';
import { type AnimatedProp, Group } from '@shopify/react-native-skia';

import { Area, type AreaComponent } from '../area/Area';
import { useCartesianChartContext } from '../ChartProvider';
import { Point, type PointConfig, type RenderPointsParams } from '../Point';
import {
  accessoryFadeTransitionDelay,
  accessoryFadeTransitionDuration,
  type ChartPathCurveType,
  getLineData,
  getLinePath,
  type GradientDefinition,
  type Transition,
} from '../utils';
import { evaluateGradientAtValue, getGradientStops } from '../utils/gradient';
import { convertToSerializableScale } from '../utils/scale';

import { DottedLine } from './DottedLine';
import { SolidLine } from './SolidLine';

export type LineComponentProps = {
  /**
   * Path of the line
   */
  d: AnimatedProp<string | undefined>;
  /**
   * The color of the line.
   * @default color of the series or theme.color.fgPrimary
   */
  stroke: string;
  /**
   * Opacity of the line
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  strokeOpacity?: number;
  /**
   * Width of the line
   * @default 2
   */
  strokeWidth?: number;
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
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
  /**
   * Transition configuration for line animations.
   */
  transition?: Transition;
};

export type LineComponent = React.FC<LineComponentProps>;

export type LineProps = Partial<
  Pick<
    LineComponentProps,
    'stroke' | 'strokeWidth' | 'strokeOpacity' | 'gradient' | 'animate' | 'transition'
  >
> &
  SharedProps & {
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
     * Handler for when a point is pressed.
     * Passed through to Point components rendered via renderPoints.
     */
    onPointPress?: PointConfig['onPress'];
    /**
     * Callback function to determine how to render points at each data point in the series.
     * Called for every entry in the data array.
     *
     * @param params - Contains the data and pixel coordinates of the data point.
     * @returns true for default point, false/null/undefined for no point, or PointConfig for custom point
     */
    renderPoints?: (params: RenderPointsParams) => boolean | null | undefined | PointConfig;
    /**
     * When true, the area is connected across null values.
     */
    connectNulls?: boolean;
  };

export const Line = memo<LineProps>(
  ({
    seriesId,
    curve = 'bump',
    type = 'solid',
    areaType = 'gradient',
    areaBaseline,
    stroke: specifiedStroke,
    strokeOpacity: strokeOpacityProp,
    onPointPress,
    showArea,
    LineComponent: SelectedLineComponent,
    AreaComponent,
    opacity = 1,
    renderPoints,
    connectNulls,
    transition,
    gradient: gradientProp,
    ...props
  }) => {
    const theme = useTheme();
    const { animate, getSeries, getSeriesData, getXScale, getYScale, getXAxis } =
      useCartesianChartContext();

    // todo: figure out why we have to do point animations here
    // Animation state for delayed point rendering (matches web timing)
    const pointsOpacity = useSharedValue(animate ? 0 : 1);

    // Delay point appearance until after path enter animation completes
    useEffect(() => {
      if (animate) {
        pointsOpacity.value = withDelay(
          accessoryFadeTransitionDelay,
          withTiming(1, { duration: accessoryFadeTransitionDuration }),
        );
      }
    }, [animate, pointsOpacity]);

    const matchedSeries = useMemo(() => getSeries(seriesId), [getSeries, seriesId]);
    const gradient = useMemo(
      () => gradientProp ?? matchedSeries?.gradient,
      [gradientProp, matchedSeries?.gradient],
    );
    const sourceData = useMemo(() => getSeriesData(seriesId), [getSeriesData, seriesId]);

    const xAxis = useMemo(() => getXAxis(), [getXAxis]);
    const xScale = useMemo(() => getXScale(), [getXScale]);
    const yScale = useMemo(
      () => getYScale(matchedSeries?.yAxisId),
      [getYScale, matchedSeries?.yAxisId],
    );

    // Convert sourceData to number array (line only supports numbers, not tuples)
    const chartData = useMemo(() => getLineData(sourceData), [sourceData]);

    const path = useMemo(() => {
      if (!xScale || !yScale || chartData.length === 0) return '';

      // Get numeric x-axis data if available
      const xData =
        xAxis?.data && Array.isArray(xAxis.data) && typeof xAxis.data[0] === 'number'
          ? (xAxis.data as number[])
          : undefined;

      return getLinePath({
        data: chartData,
        xScale,
        yScale,
        curve,
        xData,
        connectNulls,
      });
    }, [chartData, xScale, yScale, curve, xAxis?.data, connectNulls]);

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
    const stroke = specifiedStroke ?? matchedSeries?.color ?? theme.color.fgPrimary;

    // Use strokeOpacity if provided, otherwise fall back to opacity
    const strokeOpacity = strokeOpacityProp ?? opacity;

    const xData = useMemo(() => {
      const data = xAxis?.data;
      return data && Array.isArray(data) && data.length > 0 && typeof data[0] === 'number'
        ? (data as number[])
        : null;
    }, [xAxis?.data]);

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
            type={areaType}
          />
        )}
        {/* todo: pass in series id? */}
        <LineComponent
          d={path}
          gradient={gradient}
          stroke={stroke}
          strokeOpacity={strokeOpacity}
          transition={transition}
          yAxisId={matchedSeries?.yAxisId}
          {...props}
        />
        {renderPoints && (
          <Group opacity={pointsOpacity}>
            {chartData.map((value: number | null, index: number) => {
              if (value === null) return;

              const xValue = xData && xData[index] !== undefined ? xData[index] : index;

              let pointFill = stroke;

              if (gradientConfig && gradient) {
                // Use the appropriate data value based on gradient axis
                const axis = gradient.axis ?? 'y';
                const dataValue = axis === 'x' ? xValue : value;

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

              const point = renderPoints({
                dataY: value,
                dataX: xValue,
                x: xScale?.(xValue) ?? 0,
                y: yScale?.(value) ?? 0,
                fill: pointFill,
              });

              if (!point) return;

              const pointConfig = point === true ? {} : point;

              pointFill = pointConfig.fill ?? pointFill;

              return (
                <Point
                  key={`${seriesId}-${xValue}`}
                  dataX={xValue}
                  dataY={value}
                  transition={transition}
                  {...pointConfig}
                  fill={pointFill}
                  onPress={pointConfig.onPress ?? onPointPress}
                  opacity={pointConfig.opacity ?? opacity}
                />
              );
            })}
          </Group>
        )}
      </>
    );
  },
);
