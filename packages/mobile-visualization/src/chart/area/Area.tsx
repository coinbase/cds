import React, { memo, useMemo } from 'react';
import type { Rect } from '@coinbase/cds-common/types';
import { type ChartPathCurveType, getAreaPath } from '@coinbase/cds-common/visualizations/charts';
import {
  useChartContext,
  useChartDrawingAreaContext,
} from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

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
};

export type AreaComponent = React.FC<AreaComponentProps>;

// todo: pull as many props as possible
// todo: checkout https://mui.com/x/react-charts/lines/#baseline
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
  }) => {
    const theme = useTheme();
    const { getSeries, getSeriesData, getXScale, getYScale, getXAxis } = useChartContext();
    const { drawingArea } = useChartDrawingAreaContext();

    // Get sourceData from series (using stacked data if available)
    const matchedSeries = useMemo(() => getSeries(seriesId), [seriesId, getSeries]);

    // Check for stacked data first, then fall back to raw data
    const sourceData = useMemo(() => {
      return getSeriesData(seriesId) || null;
    }, [seriesId, getSeriesData]);

    // Get scales and axes for this series
    const xScale = getXScale?.(matchedSeries?.xAxisId);
    const yScale = getYScale?.(matchedSeries?.yAxisId);
    const xAxis = getXAxis?.(matchedSeries?.xAxisId);

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

    // todo: should we drop fillOpacity? if we keep it, figure out the best way to handle opacity
    // Such as DottedArea, where they are set by light / dark theme

    return (
      <AreaComponent
        clipRect={drawingArea}
        d={area}
        fill={fill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    );
  },
);
