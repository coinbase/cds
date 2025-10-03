import React, { memo, useMemo } from 'react';
import type { Rect } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import { type ChartPathCurveType, getAreaPath } from '../utils';

import { DottedArea } from './DottedArea';
import { GradientArea } from './GradientArea';
import { SolidArea } from './SolidArea';

export type AreaComponentProps = {
  d: string;
  fill: string;
  fillOpacity?: number;
  clipRect?: Rect;
  stroke?: string;
  strokeWidth?: number;
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
  /**
   * Baseline value for the gradient.
   * When set, overrides the default baseline.
   */
  baseline?: number;
};

export type AreaComponent = React.FC<AreaComponentProps>;

export type AreaProps = {
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
   * The type of area to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted' | 'gradient';
  /**
   * Component to render the area.
   * Takes precedence over the type prop if provided.
   */
  AreaComponent?: AreaComponent;
  /**
   * The color of the area.
   * @default color of the series or theme.color.fgPrimary
   */
  fill?: string;
  /**
   * Opacity of the area.
   * @default 1
   */
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  /**
   * Baseline value for the gradient.
   * When set, overrides the default baseline.
   */
  baseline?: number;
};

export const Area = memo<AreaProps>(
  ({
    seriesId,
    curve = 'linear',
    type = 'solid',
    AreaComponent: SelectedAreaComponent,
    fill: specifiedFill,
    fillOpacity = 1,
    stroke,
    strokeWidth,
    baseline,
  }) => {
    const theme = useTheme();
    const { getSeries, getSeriesData, getXScale, getYScale, getXAxis, drawingArea } =
      useCartesianChartContext();

    // Get sourceData from series (using stacked data if available)
    const matchedSeries = useMemo(() => getSeries(seriesId), [seriesId, getSeries]);

    // Check for stacked data first, then fall back to raw data
    const sourceData = useMemo(() => {
      return getSeriesData(seriesId) || null;
    }, [seriesId, getSeriesData]);

    // Get scales and axes for this series
    const xAxis = getXAxis();
    const xScale = getXScale();
    const yScale = getYScale(matchedSeries?.yAxisId);

    const area = useMemo(() => {
      if (!sourceData || sourceData.length === 0 || !xScale || !yScale) return '';

      // Get numeric x-axis data if available
      const xData =
        xAxis?.data && Array.isArray(xAxis.data) && typeof xAxis.data[0] === 'number'
          ? (xAxis.data as number[])
          : undefined;

      return getAreaPath({
        data: sourceData,
        xScale,
        yScale,
        curve,
        xData,
      });
    }, [sourceData, xScale, yScale, curve, xAxis?.data]);

    const AreaComponent = useMemo((): AreaComponent => {
      if (SelectedAreaComponent) {
        return SelectedAreaComponent;
      }

      switch (type) {
        case 'solid':
          return SolidArea;
        case 'dotted':
          return DottedArea;
        case 'gradient':
        default:
          return GradientArea;
      }
    }, [SelectedAreaComponent, type]);

    if (!xScale || !yScale || !sourceData || !area) {
      return null;
    }

    const fill = specifiedFill ?? matchedSeries?.color ?? theme.color.fgPrimary;

    return (
      <AreaComponent
        baseline={baseline}
        clipRect={drawingArea}
        d={area}
        fill={fill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
        yAxisId={matchedSeries?.yAxisId}
      />
    );
  },
);
