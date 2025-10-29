import React, { memo, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile';

import { Area, type AreaComponent } from '../area/Area';
import { useCartesianChartContext } from '../ChartProvider';
import { Point, type PointConfig, type RenderPointsParams } from '../Point';
import { type ChartPathCurveType, getLinePath, type TransitionConfig } from '../utils';
import { evaluateGradientAtValue, getGradientScale, type Gradient } from '../utils/gradient';

import { DottedLine } from './DottedLine';
import { SolidLine } from './SolidLine';

export type LineComponentProps = {
  d: string;
  stroke: string;
  strokeOpacity?: number;
  strokeWidth?: number;
  testID?: string;
  clipPath?: string;
  /**
   * Series ID - used to retrieve gradient scale from context.
   */
  seriesId?: string;
  /**
   * ID of the y-axis to use.
   * Required for components that need to map data values to pixel positions.
   */
  yAxisId?: string;
  /**
   * Color mapping configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: Gradient;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
  /**
   * Transition configuration for line animations.
   * Defines how the line transitions when data changes.
   */
  transitionConfig?: TransitionConfig;
};

export type LineComponent = React.FC<LineComponentProps>;

export type LineProps = SharedProps & {
  /**
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'linear'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted' | 'gradient';
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
   * Whether to animate the line.
   * Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
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
   * When true, null values are skipped and the line connects across gaps.
   * When false, null values create gaps in the line.
   * @default false
   */
  connectNulls?: boolean;
  /**
   * Transition configuration for line animations.
   * Defines how the line transitions when data changes.
   */
  transitionConfig?: TransitionConfig;
};

export const Line = memo<LineProps>(
  ({
    seriesId,
    curve = 'linear',
    type = 'solid',
    areaType = 'gradient',
    areaBaseline,
    stroke: specifiedStroke,
    showArea = false,
    LineComponent: SelectedLineComponent,
    AreaComponent,
    opacity = 1,
    renderPoints,
    connectNulls = false,
    animate,
    transitionConfig,
    ...props
  }) => {
    const theme = useTheme();
    const { getSeries, getSeriesData, getXScale, getYScale, getXAxis } = useCartesianChartContext();

    const matchedSeries = getSeries(seriesId);
    const seriesGradient = matchedSeries?.gradient;

    const sourceData = useMemo(() => {
      return getSeriesData(seriesId) || null;
    }, [seriesId, getSeriesData]);

    const xAxis = getXAxis();
    const xScale = getXScale();
    const yScale = getYScale(matchedSeries?.yAxisId);

    // Convert sourceData to number array (line only supports numbers, not tuples)
    // If data is stacked (tuples), extract the actual values from [baseline, actualValue] format
    const chartData = useMemo((): Array<number | null> => {
      if (!sourceData) return [];

      // Check if this is stacked data (array of tuples)
      const firstNonNull = sourceData.find((d) => d !== null);
      if (Array.isArray(firstNonNull)) {
        // Extract actual values from [baseline, value] tuples
        return sourceData.map((d) => {
          if (d === null) return null;
          if (Array.isArray(d)) return d[1];
          return d as number;
        });
      }

      // Regular number array
      if (
        sourceData.every(
          (d: number | null | [number, number] | null) => typeof d === 'number' || d === null,
        )
      ) {
        return sourceData as Array<number | null>;
      }

      return [];
    }, [sourceData]);

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
        case 'gradient':
        case 'solid':
        default:
          return SolidLine;
      }
    }, [SelectedLineComponent, type]);

    const stroke = specifiedStroke ?? matchedSeries?.color ?? theme.color.fgPrimary;

    const xData = useMemo(() => {
      const data = xAxis?.data;
      return data && Array.isArray(data) && data.length > 0 && typeof data[0] === 'number'
        ? (data as number[])
        : null;
    }, [xAxis?.data]);

    const gradientScale = useMemo(() => {
      if (!seriesGradient || !xScale || !yScale) return null;
      return getGradientScale(seriesGradient, xScale, yScale);
    }, [seriesGradient, xScale, yScale]);

    if (!xScale || !yScale) return;

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
            gradient={seriesGradient}
            seriesId={seriesId}
            transitionConfig={transitionConfig}
            type={areaType}
          />
        )}
        <LineComponent
          animate={animate}
          d={path}
          gradient={seriesGradient}
          seriesId={seriesId}
          stroke={stroke}
          strokeOpacity={opacity}
          transitionConfig={transitionConfig}
          yAxisId={matchedSeries?.yAxisId}
          {...props}
        />
        {renderPoints &&
          chartData.map((value, index) => {
            if (value === null) {
              return null;
            }

            const xValue = xData && xData[index] !== undefined ? xData[index] : index;

            const pointResult = renderPoints({
              dataY: value,
              dataX: xValue,
              x: xScale?.(xValue) ?? 0,
              y: yScale?.(value) ?? 0,
            });

            if (pointResult === false || pointResult === null || pointResult === undefined) {
              return null;
            }

            const pointConfig = pointResult === true ? {} : pointResult;

            // Evaluate colors from gradient if available (only if not explicitly set)
            let pointFill = pointConfig.fill ?? stroke;

            if (gradientScale && seriesGradient && !pointConfig.fill) {
              // Use the appropriate data value based on gradient axis
              const axis = seriesGradient.axis ?? 'y';
              const dataValue = axis === 'x' ? xValue : value;

              const evaluatedColor = evaluateGradientAtValue(
                seriesGradient,
                dataValue,
                gradientScale,
              );
              if (evaluatedColor) {
                // Apply gradient color to fill if not explicitly set
                pointFill = evaluatedColor;
              }
            }

            return (
              <Point
                key={`${seriesId}-renderpoint-${xValue}`}
                dataX={xValue}
                dataY={value}
                transitionConfig={transitionConfig}
                {...pointConfig}
                fill={pointFill}
                opacity={pointConfig.opacity ?? opacity}
              />
            );
          })}
      </>
    );
  },
);
