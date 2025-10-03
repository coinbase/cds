import React, { memo, useMemo } from 'react';
import type { SVGProps } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { type ChartPathCurveType, getAreaPath } from '../utils';

import { DottedArea } from './DottedArea';
import { GradientArea } from './GradientArea';
import { SolidArea } from './SolidArea';

export type AreaComponentProps = {
  d: SVGProps<SVGPathElement>['d'];
  /**
   * The color of the area.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  yAxisId?: string;
  animate?: boolean;
  /**
   * Baseline value for the gradient.
   * When set, overrides the default baseline.
   */
  baseline?: number;
};

export type AreaComponent = React.FC<AreaComponentProps>;

export type AreaProps = Pick<
  AreaComponentProps,
  'fill' | 'fillOpacity' | 'stroke' | 'strokeWidth' | 'baseline'
> & {
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
    const { getSeries, getSeriesData, getXScale, getYScale, getXAxis } = useCartesianChartContext();

    // Get sourceData from series (using stacked data if available)
    const matchedSeries = useMemo(() => getSeries(seriesId), [seriesId, getSeries]);

    // Check for stacked data first, then fall back to raw data
    const sourceData = useMemo(() => {
      const stackedData = getSeriesData(seriesId);
      if (stackedData) {
        return stackedData;
      }
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

    const fill = specifiedFill ?? matchedSeries?.color ?? 'var(--color-fgPrimary)';

    return (
      <AreaComponent
        baseline={baseline}
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
