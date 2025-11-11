import React, { memo, useEffect, useMemo } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile';
import { Group } from '@shopify/react-native-skia';

import { Area, type AreaComponent } from '../area/Area';
import { useCartesianChartContext } from '../ChartProvider';
import { Point, type PointConfig, type RenderPointsParams } from '../Point';
import { type ChartPathCurveType, getLineData, getLinePath, type Transition } from '../utils';
import { evaluateGradientAtValue } from '../utils/gradient';

import { DottedLine } from './DottedLine';
import { type LineComponentProps, SolidLine } from './SolidLine';

export type { LineComponentProps } from './SolidLine';
export type LineComponent = React.FC<LineComponentProps>;

export type LineProps = SharedProps & {
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
   * Show area fill under the line.
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
   * The color of the line.
   * @default color of the series or theme.color.fgPrimary
   */
  stroke?: string;
  /**
   * Opacity of the line.
   * @default 1
   */
  opacity?: number;
  /**
   * Callback function to determine how to render points at each data point in the series.
   * Called for every entry in the data array.
   *
   * @param params - Contains the data and pixel coordinates of the data point.
   * @returns true for default point, false/null/undefined for no point, or PointConfig for custom point
   */
  renderPoints?: (params: RenderPointsParams) => boolean | null | undefined | PointConfig;
  strokeWidth?: number;
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * Transition configuration for line animations.
   * Defines how the line transitions when data changes.
   */
  transition?: Transition;
};

export const Line = memo<LineProps>(
  ({
    seriesId,
    curve = 'bump',
    type = 'solid',
    areaType = 'gradient',
    areaBaseline,
    stroke: specifiedStroke,
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

    // Trigger delayed point animation when component mounts and animate is true
    useEffect(() => {
      if (animate) {
        // Match web timing: 850ms delay + 150ms fade in
        setTimeout(() => {
          pointsOpacity.value = withTiming(1, { duration: 150 });
        }, 850);
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

    const xData = useMemo(() => {
      const data = xAxis?.data;
      return data && Array.isArray(data) && data.length > 0 && typeof data[0] === 'number'
        ? (data as number[])
        : null;
    }, [xAxis?.data]);

    const gradientScale = useMemo(() => {
      if (!gradient || !xScale || !yScale) return;
      return gradient.axis === 'x' ? xScale : yScale;
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
          strokeOpacity={opacity}
          transition={transition}
          yAxisId={matchedSeries?.yAxisId}
          {...props}
        />
        {renderPoints && (
          <Group opacity={pointsOpacity}>
            {chartData.map((value: number | null, index: number) => {
              if (value === null) return;

              const xValue = xData && xData[index] !== undefined ? xData[index] : index;

              const point = renderPoints({
                dataY: value,
                dataX: xValue,
                x: xScale?.(xValue) ?? 0,
                y: yScale?.(value) ?? 0,
              });

              if (!point) return;

              const pointConfig = point === true ? {} : point;

              // Evaluate colors from gradient if available (only if not explicitly set)
              let pointFill = pointConfig.fill ?? stroke;

              if (gradientScale && gradient && !pointConfig.fill) {
                // Use the appropriate data value based on gradient axis
                const axis = gradient.axis ?? 'y';
                const dataValue = axis === 'x' ? xValue : value;

                const evaluatedColor = evaluateGradientAtValue(gradient, dataValue, gradientScale);
                if (evaluatedColor) {
                  // Apply gradient color to fill if not explicitly set
                  pointFill = evaluatedColor;
                }
              }

              return (
                <Point
                  key={`${seriesId}-${xValue}`}
                  dataX={xValue}
                  dataY={value}
                  {...pointConfig}
                  fill={pointFill}
                  opacity={pointConfig.opacity ?? opacity}
                  transition={transition}
                />
              );
            })}
          </Group>
        )}
      </>
    );
  },
);
