import React, { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import { type ChartPathCurveType, getAreaPath, type TransitionConfig } from '../utils';
import type { GradientDefinition } from '../utils/gradient';

import { DottedArea } from './DottedArea';
import { GradientArea } from './GradientArea';
import { type AreaComponentProps, SolidArea } from './SolidArea';

export type { AreaComponentProps } from './SolidArea';
export type AreaComponent = React.FC<AreaComponentProps>;

export type AreaProps = {
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
  gradient?: GradientDefinition;
  /**
   * When true, the area is connected across null values.
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
    curve = 'bump',
    type = 'solid',
    AreaComponent: SelectedAreaComponent,
    fill: specifiedFill,
    fillOpacity = 1,
    stroke,
    strokeWidth,
    baseline,
    gradient: gradientProp,
    connectNulls,
    animate,
    transitionConfig,
  }) => {
    const theme = useTheme();
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

    const fill = specifiedFill ?? matchedSeries?.color ?? theme.color.fgPrimary;

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
