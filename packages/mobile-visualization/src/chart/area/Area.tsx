import React, { memo, useMemo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import type { PathBaseProps, PathProps } from '../Path';
import { type ChartPathCurveType, getAreaPath } from '../utils';
import type { GradientDefinition } from '../utils/gradient';

import { DottedArea } from './DottedArea';
import { GradientArea } from './GradientArea';
import { SolidArea } from './SolidArea';

export type AreaBaseProps = {
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
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the area.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  fill?: PathBaseProps['fill'];
  /**
   * Opacity of the area
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  fillOpacity?: PathBaseProps['fillOpacity'];
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
   * Whether to animate the area.
   * Overrides the animate value from the chart context.
   */
  animate?: PathBaseProps['animate'];
};

export type AreaProps = AreaBaseProps & Pick<PathProps, 'transitions' | 'transition'>;

export type AreaComponentProps = Pick<
  AreaProps,
  'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transitions' | 'transition'
> & {
  /**
   * Path of the area
   */
  d: string;
  /**
   * ID of the x-axis to use.
   * If not provided, defaults to the default x-axis.
   * @note Only used for axis selection when layout is 'horizontal'. Vertical layout uses a single x-axis.
   */
  xAxisId?: string;
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   * @note Only used for axis selection when layout is 'vertical'. Horizontal layout supports a single y-axis.
   */
  yAxisId?: string;
};

export type AreaComponent = React.FC<AreaComponentProps>;

export const Area = memo<AreaProps>(
  ({
    seriesId,
    curve = 'bump',
    type = 'solid',
    AreaComponent: AreaComponentProp,
    fill: fillProp,
    fillOpacity = 1,
    baseline,
    connectNulls,
    gradient: gradientProp,
    transitions,
    transition,
    animate,
  }) => {
    const { layout, getSeries, getSeriesData, getXScale, getYScale, getXAxis, getYAxis } =
      useCartesianChartContext();

    const matchedSeries = useMemo(() => getSeries(seriesId), [seriesId, getSeries]);
    const gradient = useMemo(
      () => gradientProp ?? matchedSeries?.gradient,
      [gradientProp, matchedSeries?.gradient],
    );
    const fill = useMemo(() => fillProp ?? matchedSeries?.color, [fillProp, matchedSeries?.color]);

    const sourceData = useMemo(() => getSeriesData(seriesId), [seriesId, getSeriesData]);

    const xAxis = getXAxis(matchedSeries?.xAxisId);
    const xScale = getXScale(matchedSeries?.xAxisId);
    const yScale = getYScale(matchedSeries?.yAxisId);
    const yAxis = getYAxis(matchedSeries?.yAxisId);

    const categoryAxisIsX = useMemo(() => {
      return layout !== 'horizontal';
    }, [layout]);

    const categoryAxis = useMemo(() => {
      return categoryAxisIsX ? xAxis : yAxis;
    }, [categoryAxisIsX, xAxis, yAxis]);

    const area = useMemo(() => {
      if (!sourceData || sourceData.length === 0 || !xScale || !yScale) return '';

      const indexData =
        categoryAxis?.data &&
        Array.isArray(categoryAxis.data) &&
        typeof categoryAxis.data[0] === 'number'
          ? (categoryAxis.data as number[])
          : undefined;

      return getAreaPath({
        data: sourceData,
        xScale,
        yScale,
        curve,
        xData: categoryAxisIsX ? indexData : undefined,
        yData: !categoryAxisIsX ? indexData : undefined,
        connectNulls,
        layout,
      });
    }, [sourceData, xScale, yScale, curve, categoryAxis, categoryAxisIsX, connectNulls, layout]);

    const AreaComponent = useMemo((): AreaComponent => {
      if (AreaComponentProp) {
        return AreaComponentProp;
      }

      switch (type) {
        case 'dotted':
          return DottedArea;
        case 'gradient':
          return GradientArea;
        case 'solid':
        default:
          return SolidArea;
      }
    }, [AreaComponentProp, type]);

    if (!xScale || !yScale || !sourceData || !area) return;

    return (
      <AreaComponent
        animate={animate}
        baseline={baseline}
        d={area}
        fill={fill}
        fillOpacity={fillOpacity}
        gradient={gradient}
        transition={transition}
        transitions={transitions}
        xAxisId={matchedSeries?.xAxisId}
        yAxisId={matchedSeries?.yAxisId}
      />
    );
  },
);
