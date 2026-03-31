import React, { memo, useMemo } from 'react';
import type { Rect } from '@coinbase/cds-common';
import type { Transition } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import type { ChartScaleFunction, Series } from '../utils';
import { EPSILON, getBars, getStackBaseline, getStackOrigin } from '../utils/bar';
import { getGradientConfig } from '../utils/gradient';

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

export type BarStackComponentProps = {
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
   * The category index for this stack.
   */
  categoryIndex: number;
  /**
   * Transition configuration for animation.
   */
  transition?: Transition;
  /**
   * Transition configuration for enter and update animations.
   */
  transitions?: BarProps['transitions'];
  /**
   * Border radius for the bars.
   */
  borderRadius?: number;
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
    const { layout, getSeriesData, getXAxis, getYAxis } = useCartesianChartContext();

    const xAxis = getXAxis(xAxisId);
    const yAxis = getYAxis(yAxisId);

    const baseline = useMemo(() => {
      return getStackBaseline(valueScale, rect, layout);
    }, [rect, valueScale, layout]);

    const seriesGradients = useMemo(() => {
      return series.map((s) => {
        if (!s.gradient) return null;

        const evalScale =
          s.gradient.axis === 'x'
            ? layout === 'vertical'
              ? indexScale
              : valueScale
            : layout === 'vertical'
              ? valueScale
              : indexScale;

        // We need to pass original xScale/yScale to getGradientConfig for legacy reasons
        // For now let's assume getGradientConfig can handle these scales if we pass them correctly.
        const stops = getGradientConfig(
          s.gradient,
          layout === 'vertical' ? indexScale : valueScale,
          layout === 'vertical' ? valueScale : indexScale,
        );
        if (!stops) return null;

        return {
          seriesId: s.id,
          gradient: s.gradient,
          scale: evalScale,
          stops,
        };
      });
    }, [series, indexScale, valueScale, layout]);

    const categoryAxis = layout === 'vertical' ? xAxis : yAxis;
    const categoryData =
      categoryAxis?.data &&
      Array.isArray(categoryAxis.data) &&
      typeof categoryAxis.data[0] === 'number'
        ? (categoryAxis.data as number[])
        : undefined;
    const categoryValue = categoryData ? categoryData[categoryIndex] : categoryIndex;

    const seriesData = useMemo(
      () => Object.fromEntries(series.map((s) => [s.id, getSeriesData(s.id) ?? []])),
      [series, getSeriesData],
    );

    const bars = useMemo(
      () =>
        getBars({
          series,
          seriesData,
          categoryIndex,
          categoryValue,
          indexPos,
          thickness,
          valueScale,
          seriesGradients,
          roundBaseline,
          layout,
          baseline,
          stackGap,
          barMinSize,
          stackMinSize,
          defaultFill: 'var(--color-fgPrimary)',
          borderRadius,
          defaultFillOpacity,
          defaultStroke,
          defaultStrokeWidth,
          defaultBarComponent,
        }),
      [
        series,
        seriesData,
        stackGap,
        barMinSize,
        stackMinSize,
        indexPos,
        baseline,
        thickness,
        categoryIndex,
        categoryValue,
        valueScale,
        seriesGradients,
        roundBaseline,
        layout,
        borderRadius,
        defaultFillOpacity,
        defaultStroke,
        defaultStrokeWidth,
        defaultBarComponent,
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
      const minX = Math.min(...bars.map((b) => b.x));
      const minY = Math.min(...bars.map((b) => b.y));
      const maxX = Math.max(...bars.map((b) => b.x + b.width));
      const maxY = Math.max(...bars.map((b) => b.y + b.height));
      return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
    }, [bars, baseline, indexPos, layout, thickness]);

    const stackOrigin = useMemo(
      () =>
        getStackOrigin(
          bars.map((b) => b.origin),
          bars.map((b) => b.minSize ?? 0),
        ) ?? baseline,
      [bars, baseline],
    );

    const barElements = bars.map((bar, index) => (
      <Bar
        key={`${bar.seriesId}-${categoryIndex}-${index}`}
        BarComponent={bar.BarComponent}
        borderRadius={bar.borderRadius}
        dataX={bar.dataX}
        dataY={bar.dataY}
        fill={bar.fill}
        fillOpacity={bar.fillOpacity}
        height={bar.height}
        minSize={bar.minSize}
        origin={bar.origin}
        roundBottom={bar.roundBottom}
        roundTop={bar.roundTop}
        seriesId={bar.seriesId}
        stroke={bar.stroke}
        strokeWidth={bar.strokeWidth}
        transition={transition}
        transitions={transitions}
        width={bar.width}
        x={bar.x}
        y={bar.y}
      />
    ));

    const edge = layout === 'vertical' ? stackRect.y : stackRect.x;
    const size = layout === 'vertical' ? stackRect.height : stackRect.width;
    const stackRoundLower = roundBaseline || Math.abs(edge - baseline) >= EPSILON;
    const stackRoundHigher = roundBaseline || Math.abs(edge + size - baseline) >= EPSILON;
    const stackRoundTop = layout === 'vertical' ? stackRoundLower : stackRoundHigher;
    const stackRoundBottom = layout === 'vertical' ? stackRoundHigher : stackRoundLower;

    return (
      <BarStackComponent
        borderRadius={borderRadius}
        categoryIndex={categoryIndex}
        height={stackRect.height}
        origin={stackOrigin}
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
