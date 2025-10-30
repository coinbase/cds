import React, { memo, useMemo } from 'react';
import type { SVGProps } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { m as motion, type Transition } from 'framer-motion';

import { Area, type AreaComponent } from '../area/Area';
import { axisTickLabelsInitialAnimationVariants } from '../axis';
import { useCartesianChartContext } from '../ChartProvider';
import { Point, type PointConfig, type RenderPointsParams } from '../Point';
import {
  type ChartPathCurveType,
  evaluateGradientAtValue,
  getGradientScale,
  getLinePath,
  type Gradient,
} from '../utils';

import { DottedLine } from './DottedLine';
import { SolidLine } from './SolidLine';

export type LineComponentProps = {
  d: SVGProps<SVGPathElement>['d'];
  stroke: string;
  strokeOpacity?: number;
  strokeWidth?: number;
  testID?: string;
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
  clipPath?: string;
  /**
   * Color gradient configuration.
   * When provided, creates gradient-based coloring.
   */
  gradient?: Gradient;
  /**
   * Series ID - used to retrieve gradient from series if not provided directly.
   */
  seriesId?: string;
  /**
   * Y-axis ID to use for calculating color positions.
   * Only needed when using gradient with multiple y-axes.
   */
  yAxisId?: string;
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
   * Handler for when a dot is clicked.
   * Automatically makes dots appear pressable when provided.
   */
  onPointClick?: PointConfig['onClick'];
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
   * @default color of the series or 'var(--color-fgPrimary)'
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
   * When true, null values are skipped and the line connects across gaps.
   * By default, null values create gaps in the line.
   */
  connectNulls?: boolean;
  /**
   * Transition configurations for point animations.
   * Passed through to Point components rendered via renderPoints.
   *
   * @example
   * transitionConfigs={{
   *   enter: { type: 'spring', duration: 0.6 },
   *   update: { type: 'tween', duration: 0.3, ease: 'easeInOut' }
   * }}
   */
  transitionConfigs?: {
    /**
     * Transition used when points first enter/mount.
     */
    enter?: Transition;
    /**
     * Transition used when point positions update.
     */
    update?: Transition;
  };
};

export const Line = memo<LineProps>(
  ({
    seriesId,
    curve = 'linear',
    type = 'solid',
    areaType = 'gradient',
    areaBaseline,
    stroke: specifiedStroke,
    onPointClick,
    showArea = false,
    LineComponent: SelectedLineComponent,
    AreaComponent,
    opacity = 1,
    renderPoints,
    connectNulls,
    transitionConfigs,
    ...props
  }) => {
    const { animate, getSeries, getSeriesData, getXScale, getYScale, getXAxis, getYAxis } =
      useCartesianChartContext();

    const matchedSeries = getSeries(seriesId);
    const seriesGradient = matchedSeries?.gradient;

    const sourceData = useMemo(() => {
      const stackedData = getSeriesData(seriesId);
      if (stackedData) {
        return stackedData;
      }
      return getSeriesData(seriesId) || null;
    }, [seriesId, getSeriesData]);

    const xAxis = getXAxis();
    const xScale = getXScale();
    const yAxis = getYAxis(matchedSeries?.yAxisId);
    const yScale = getYScale(matchedSeries?.yAxisId);

    // Convert sourceData to number array (line only supports numbers, not tuples)
    // If data is stacked (tuples), extract the actual values from [baseline, actualValue] format
    const chartData = useMemo((): Array<number | null> => {
      if (!sourceData) return [];

      // Check if this is stacked data (array of tuples)
      const firstNonNull = sourceData.find((d: any) => d !== null);
      if (Array.isArray(firstNonNull)) {
        // Extract actual values from [baseline, value] tuples
        return sourceData.map((d: any) => {
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

    // Get series color for stroke
    const stroke = specifiedStroke ?? matchedSeries?.color ?? 'var(--color-fgPrimary)';

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

    // Pre-filter data to only include points within domain/range
    const filteredChartData = useMemo(() => {
      if (!xScale || !yScale || !xAxis || !yAxis) return [];

      return chartData.map((value, index) => {
        if (value === null) return { value: null, index };

        const xValue = xData && xData[index] !== undefined ? xData[index] : index;

        // Check if both x and y values are within their respective axis domains
        const isWithinXDomain = xValue >= xAxis.domain.min && xValue <= xAxis.domain.max;
        const isWithinYDomain = value >= yAxis.domain.min && value <= yAxis.domain.max;
        const isValid = isWithinXDomain && isWithinYDomain;

        return isValid ? { value, index, xValue } : { value: null, index, xValue };
      });
    }, [chartData, xData, xScale, yScale, xAxis, yAxis]);

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
            gradient={seriesGradient}
            seriesId={seriesId}
            type={areaType}
          />
        )}
        <LineComponent
          d={path}
          gradient={seriesGradient}
          seriesId={seriesId}
          stroke={stroke}
          strokeOpacity={opacity}
          yAxisId={matchedSeries?.yAxisId}
          {...props}
        />
        {renderPoints && (
          <motion.g
            data-component="line-points-group"
            {...(animate
              ? {
                  animate: 'animate',
                  exit: 'exit',
                  initial: 'initial',
                  variants: axisTickLabelsInitialAnimationVariants,
                }
              : {})}
          >
            {filteredChartData.map(({ value, index, xValue }) => {
              // Skip null values (either originally null or filtered out)
              if (value === null) {
                return null;
              }

              const point = renderPoints({
                dataY: value,
                dataX: xValue,
                x: xScale?.(xValue) ?? 0,
                y: yScale?.(value) ?? 0,
              });

              if (!point) return;

              const pointConfig = typeof point === 'object' ? point : {};

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
                  key={`${seriesId}-renderpoint-${index}`}
                  dataX={xValue}
                  dataY={value}
                  {...pointConfig}
                  fill={pointFill}
                  onClick={pointConfig.onClick ?? onPointClick}
                  opacity={pointConfig.opacity ?? opacity}
                  transitionConfigs={transitionConfigs}
                />
              );
            })}
          </motion.g>
        )}
      </>
    );
  },
);
