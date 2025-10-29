import React, { memo, useMemo } from 'react';
import type { Rect } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import { type ChartPathCurveType, getAreaPath, type TransitionConfig } from '../utils';
import type { Gradient } from '../utils/gradient';

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
   * Series ID - used to retrieve colorMap scale from context.
   */
  seriesId?: string;
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
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: Gradient;
  /**
   * Whether to animate the area.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
  /**
   * Transition configuration for area animations.
   * Defines how the area transitions when data changes.
   */
  transitionConfig?: TransitionConfig;
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
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: Gradient;
  /**
   * When true, null values are skipped and the area connects across gaps.
   * When false, null values create gaps in the area.
   * @default false
   */
  connectNulls?: boolean;
  /**
   * Whether to animate the area.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
  /**
   * Transition configuration for area animations.
   * Defines how the area transitions when data changes.
   */
  transitionConfig?: TransitionConfig;
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
    gradient: gradientProp,
    connectNulls = false,
    animate,
    transitionConfig,
  }) => {
    const { getSeries, getSeriesData, getXScale, getYScale, getXAxis, drawingArea } =
      useCartesianChartContext();

    const matchedSeries = useMemo(() => getSeries(seriesId), [seriesId, getSeries]);
    const gradient = gradientProp ?? matchedSeries?.gradient;

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
        connectNulls,
      });
    }, [sourceData, xScale, yScale, curve, xAxis?.data, connectNulls]);

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

    const fill = specifiedFill ?? matchedSeries?.color ?? 'red';

    return (
      <AreaComponent
        animate={animate}
        baseline={baseline}
        clipRect={drawingArea}
        d={area}
        fill={fill}
        fillOpacity={fillOpacity}
        gradient={gradient}
        seriesId={seriesId}
        stroke={stroke}
        strokeWidth={strokeWidth}
        transitionConfig={transitionConfig}
        yAxisId={matchedSeries?.yAxisId}
      />
    );
  },
);
