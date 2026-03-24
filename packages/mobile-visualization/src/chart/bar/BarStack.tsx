import React, { memo, useMemo } from 'react';
import type { Rect } from '@coinbase/cds-common';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import type { ChartScaleFunction, Series } from '../utils';
import { EPSILON, getBarOrigins, getBars, getStackBaseline, getStackOrigin } from '../utils/bar';
import { getGradientStops } from '../utils/gradient';
import { convertToSerializableScale } from '../utils/scale';

import { Bar, type BarBaseProps, type BarComponent, type BarProps } from './Bar';
import { DefaultBarStack } from './DefaultBarStack';

/**
 * Extended series type that includes bar-specific properties.
 */
export type BarSeries = Series & {
  /**
   * Custom component to render bars for this series.
   */
  BarComponent?: BarComponent;
};

export type BarStackBaseProps = Pick<
  BarBaseProps,
  'BarComponent' | 'fillOpacity' | 'stroke' | 'strokeWidth' | 'borderRadius'
> & {
  /**
   * Array of series configurations that belong to this stack.
   */
  series: BarSeries[];
  /**
   * The category index for this stack.
   */
  categoryIndex: number;
  /**
   * Position of this stack along the index (categorical) axis.
   */
  indexPos: number;
  /**
   * Thickness of this stack.
   */
  thickness: number;
  /**
   * Scale for the independent (categorical) axis.
   */
  indexScale: ChartScaleFunction;
  /**
   * Scale for the dependent (magnitude) axis.
   */
  valueScale: ChartScaleFunction;
  /**
   * Chart rect for bounds.
   */
  rect: Rect;
  /**
   * X axis ID to use.
   * If not provided, defaults to defaultAxisId.
   * @note Only used for axis selection when layout is 'horizontal'. Vertical layout uses a single x-axis.
   */
  xAxisId?: string;
  /**
   * Y axis ID to use.
   * If not provided, defaults to defaultAxisId.
   * @note Only used for axis selection when layout is 'vertical'. Horizontal layout supports a single y-axis.
   */
  yAxisId?: string;
  /**
   * Custom component to render the stack container.
   * Can be used to add clip paths, outlines, or other custom styling.
   * @default DefaultBarStack
   */
  BarStackComponent?: BarStackComponent;
  /**
   * Whether to round the baseline of a bar (where the value is 0).
   */
  roundBaseline?: boolean;
  /**
   * Gap between bars in the stack.
   */
  stackGap?: number;
  /**
   * Minimum size for individual bars in the stack.
   */
  barMinSize?: number;
  /**
   * Minimum size for the entire stack.
   */
  stackMinSize?: number;
};

export type BarStackProps = BarStackBaseProps & Pick<BarProps, 'transitions' | 'transition'>;

export type BarStackComponentProps = Pick<
  BarStackProps,
  'categoryIndex' | 'borderRadius' | 'transitions' | 'transition'
> & {
  /**
   * The x position of the stack.
   */
  x: number;
  /**
   * The y position of the stack.
   */
  y: number;
  /**
   * The width of the stack.
   */
  width: number;
  /**
   * The height of the stack.
   */
  height: number;
  /**
   * The bar elements to render within the stack.
   */
  children: React.ReactNode;
  /**
   * Whether to round the top corners.
   */
  roundTop?: boolean;
  /**
   * Whether to round the bottom corners.
   */
  roundBottom?: boolean;
  /**
   * Stack animation origin.
   * - number: baseline on the value axis
   * - tuple: [start, end] clip range for stacked min-size enter animation
   */
  origin?: number | [number, number];
};

export type BarStackComponent = React.FC<BarStackComponentProps>;

/**
 * BarStack component that renders a single stack of bars at a specific category index.
 * Handles the stacking logic for bars within a single category.
 */
export const BarStack = memo<BarStackProps>(
  ({
    series,
    categoryIndex,
    indexPos,
    thickness,
    indexScale,
    valueScale,
    rect,
    xAxisId,
    yAxisId,
    BarComponent: defaultBarComponent,
    fillOpacity: defaultFillOpacity,
    stroke: defaultStroke,
    strokeWidth: defaultStrokeWidth,
    borderRadius = 4,
    BarStackComponent = DefaultBarStack,
    stackGap,
    barMinSize,
    stackMinSize,
    roundBaseline,
    transitions,
    transition,
  }) => {
    const theme = useTheme();
    const { layout, getSeriesData, getXAxis, getYAxis } = useCartesianChartContext();

    const xAxis = getXAxis(xAxisId);
    const yAxis = getYAxis(yAxisId);

    const baseline = useMemo(
      () => getStackBaseline(valueScale, rect, layout),
      [rect, valueScale, layout],
    );

    const seriesGradients = useMemo(() => {
      return series.map((s) => {
        if (!s.gradient) return;

        const gradientScale =
          s.gradient.axis === 'x'
            ? layout === 'vertical'
              ? indexScale
              : valueScale
            : layout === 'vertical'
              ? valueScale
              : indexScale;
        const serializableScale = convertToSerializableScale(gradientScale);
        if (!serializableScale) return;

        const domain = { min: serializableScale.domain[0], max: serializableScale.domain[1] };
        const stops = getGradientStops(s.gradient.stops, domain);

        return {
          seriesId: s.id,
          gradient: s.gradient,
          scale: serializableScale,
          stops,
        };
      });
    }, [series, indexScale, valueScale, layout]);

    const bars = useMemo(
      () =>
        getBars({
          series,
          getSeriesData,
          categoryIndex,
          indexPos,
          thickness,
          valueScale,
          seriesGradients,
          roundBaseline,
          barsGrowVertically: layout === 'vertical',
          baseline,
          stackGap,
          barMinSize,
          stackMinSize,
          defaultFill: theme.color.fgPrimary,
        }),
      [
        series,
        indexPos,
        thickness,
        getSeriesData,
        categoryIndex,
        roundBaseline,
        baseline,
        stackGap,
        barMinSize,
        stackMinSize,
        valueScale,
        seriesGradients,
        theme.color.fgPrimary,
        layout,
      ],
    );

    const stackRect = useMemo(() => {
      if (bars.length === 0) {
        return {
          x: layout === 'vertical' ? indexPos : baseline,
          y: layout === 'vertical' ? baseline : indexPos,
          width: layout === 'vertical' ? thickness : 0,
          height: layout === 'vertical' ? 0 : thickness,
        };
      }
      const valueRange = [
        Math.min(...bars.map((bar) => bar.valuePos)),
        Math.max(...bars.map((bar) => bar.valuePos + bar.length)),
      ];

      const [minValuePos, maxValuePos] = valueRange;
      const stackSize = maxValuePos - minValuePos;

      return {
        x: layout === 'vertical' ? indexPos : minValuePos,
        y: layout === 'vertical' ? minValuePos : indexPos,
        width: layout === 'vertical' ? thickness : stackSize,
        height: layout === 'vertical' ? stackSize : thickness,
      };
    }, [bars, baseline, indexPos, layout, thickness]);

    // Per-bar initial animation origins: bars start stacked from the baseline (with gaps)
    // rather than all overlapping at the same position.
    const barOrigins = useMemo(
      () => getBarOrigins(bars, barMinSize ?? 0, stackGap ?? 0, baseline, layout === 'vertical'),
      [bars, barMinSize, stackGap, baseline, layout],
    );

    const categoryAxis = layout === 'vertical' ? xAxis : yAxis;
    const categoryData =
      categoryAxis?.data &&
      Array.isArray(categoryAxis.data) &&
      typeof categoryAxis.data[0] === 'number'
        ? (categoryAxis.data as number[])
        : undefined;
    const categoryValue = categoryData ? categoryData[categoryIndex] : categoryIndex;

    const barElements = bars.map((bar, index) => (
      <Bar
        key={`${bar.seriesId}-${categoryIndex}-${index}`}
        BarComponent={bar.BarComponent || defaultBarComponent}
        borderRadius={borderRadius}
        dataX={layout === 'vertical' ? categoryValue : bar.dataValue}
        dataY={layout === 'vertical' ? bar.dataValue : categoryValue}
        fill={bar.fill}
        fillOpacity={defaultFillOpacity}
        height={layout === 'vertical' ? bar.length : thickness}
        minSize={barMinSize}
        origin={barOrigins[index]}
        roundBottom={bar.roundBottom}
        roundTop={bar.roundTop}
        seriesId={bar.seriesId}
        stroke={defaultStroke}
        strokeWidth={defaultStrokeWidth}
        transition={transition}
        transitions={transitions}
        width={layout === 'vertical' ? thickness : bar.length}
        x={layout === 'vertical' ? indexPos : bar.valuePos}
        y={layout === 'vertical' ? bar.valuePos : indexPos}
      />
    ));

    // Check if the stack should be rounded based on baseline, across both orientations.
    const edge = layout === 'vertical' ? stackRect.y : stackRect.x;
    const size = layout === 'vertical' ? stackRect.height : stackRect.width;
    const stackRoundLower = roundBaseline || Math.abs(edge - baseline) >= EPSILON;
    const stackRoundHigher = roundBaseline || Math.abs(edge + size - baseline) >= EPSILON;
    const stackRoundTop = layout === 'vertical' ? stackRoundLower : stackRoundHigher;
    const stackRoundBottom = layout === 'vertical' ? stackRoundHigher : stackRoundLower;

    const origin = useMemo(
      () => getStackOrigin(barOrigins, barMinSize ?? 0) ?? baseline,
      [barOrigins, barMinSize, baseline],
    );

    return (
      <BarStackComponent
        borderRadius={borderRadius}
        categoryIndex={categoryIndex}
        height={stackRect.height}
        origin={origin}
        roundBottom={stackRoundBottom}
        roundTop={stackRoundTop}
        transition={transition}
        transitions={transitions}
        width={stackRect.width}
        x={stackRect.x}
        y={stackRect.y}
      >
        {barElements}
      </BarStackComponent>
    );
  },
);
