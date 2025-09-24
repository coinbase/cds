import React, { memo, useMemo } from 'react';
import type { SVGProps } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { type ChartPathCurveType, getLinePath } from '@coinbase/cds-common/visualizations/charts';
import { useChartContext } from '@coinbase/cds-common/visualizations/charts';

import { Area, type AreaComponent } from '../area';
import { Point, type PointConfig, type RenderPointsParams } from '../point/Point';

import { DottedLine } from './DottedLine';
import { GradientLine } from './GradientLine';
import { SolidLine } from './SolidLine';

export type LineComponentProps = {
  d: SVGProps<SVGPathElement>['d'];
  stroke: string;
  strokeOpacity?: number;
  strokeWidth?: number;
  testID?: string;
  animate?: boolean;
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
  // todo: import all other line props that we could spread
  strokeWidth?: number;
};

export const Line = memo<LineProps>(
  ({
    seriesId,
    curve = 'linear',
    type = 'solid',
    areaType = 'gradient',
    stroke: specifiedStroke,
    onPointClick,
    showArea = false,
    LineComponent: SelectedLineComponent,
    AreaComponent,
    opacity = 1,
    renderPoints,
    ...props
  }) => {
    const { getSeries, getSeriesData, getXScale, getYScale, getXAxis } = useChartContext();

    const matchedSeries = getSeries(seriesId);

    const sourceData = useMemo(() => {
      const stackedData = getSeriesData(seriesId);
      if (stackedData) {
        return stackedData;
      }
      return getSeriesData(seriesId) || null;
    }, [seriesId, getSeriesData]);

    const xScale = getXScale?.(matchedSeries?.xAxisId);
    const yScale = getYScale?.(matchedSeries?.yAxisId);
    const xAxis = getXAxis?.(matchedSeries?.xAxisId);

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
      });
    }, [chartData, xScale, yScale, curve, xAxis?.data]);

    const LineComponent = useMemo((): LineComponent => {
      if (SelectedLineComponent) {
        return SelectedLineComponent;
      }

      switch (type) {
        case 'dotted':
          return DottedLine;
        case 'gradient':
          return GradientLine;
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

    // todo: if we keep it, figure out the best way to handle opacity

    return (
      <>
        {showArea && (
          <Area
            AreaComponent={AreaComponent}
            curve={curve}
            fill={stroke}
            fillOpacity={opacity}
            seriesId={seriesId}
            type={areaType}
          />
        )}
        <LineComponent d={path} stroke={stroke} strokeOpacity={opacity} {...props} />
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

            return (
              <Point
                key={`${seriesId}-renderpoint-${index}`}
                dataX={xValue}
                dataY={value}
                {...pointConfig}
                color={pointConfig.color ?? stroke}
                onClick={pointConfig.onClick ?? onPointClick}
                opacity={pointConfig.opacity ?? opacity}
              />
            );
          })}
      </>
    );
  },
);
