import React, { memo, useMemo } from 'react';
import type { Rect } from '@coinbase/cds-common';
import type { Transition } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import type { ChartScaleFunction, Series } from '../utils';
import {
  computeStackBars,
  EPSILON,
  getBarOrigins,
  getStackOrigin,
  getStackRect,
} from '../utils/bar';
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
    const { layout, getSeriesData, getXAxis } = useCartesianChartContext();

    const xAxis = getXAxis(xAxisId);
    const barsGrowVertically = layout !== 'horizontal';

    const baseline = useMemo(() => {
      const domain = valueScale.domain();
      const [domainMin, domainMax] = domain;
      const baselineValue = domainMin >= 0 ? domainMin : domainMax <= 0 ? domainMax : 0;

      // In vertical layout (bars grow up), value scale is Y. In horizontal, it's X.
      const fallback = barsGrowVertically ? rect.y + rect.height : rect.x;
      const baselinePos = valueScale(baselineValue) ?? fallback;

      if (barsGrowVertically) {
        return Math.max(rect.y, Math.min(baselinePos, rect.y + rect.height));
      } else {
        return Math.max(rect.x, Math.min(baselinePos, rect.x + rect.width));
      }
    }, [rect, valueScale, barsGrowVertically]);

    const seriesGradients = useMemo(() => {
      return series.map((s) => {
        if (!s.gradient) return null;

        const evalScale =
          s.gradient.axis === 'x'
            ? barsGrowVertically
              ? indexScale
              : valueScale
            : barsGrowVertically
              ? valueScale
              : indexScale;

        // We need to pass original xScale/yScale to getGradientConfig for legacy reasons
        // For now let's assume getGradientConfig can handle these scales if we pass them correctly.
        const stops = getGradientConfig(
          s.gradient,
          barsGrowVertically ? indexScale : valueScale,
          barsGrowVertically ? valueScale : indexScale,
        );
        if (!stops) return null;

        return {
          seriesId: s.id,
          gradient: s.gradient,
          scale: evalScale,
          stops,
        };
      });
    }, [series, indexScale, valueScale, barsGrowVertically]);

    const bars = useMemo(
      () =>
        computeStackBars({
          series,
          getSeriesData,
          categoryIndex,
          indexPos,
          thickness,
          valueScale,
          seriesGradients,
          roundBaseline,
          barsGrowVertically,
          baseline,
          stackGap,
          barMinSize,
          stackMinSize,
          defaultFill: 'var(--color-fgPrimary)',
        }),
      [
        series,
        stackGap,
        barMinSize,
        stackMinSize,
        indexPos,
        baseline,
        thickness,
        getSeriesData,
        categoryIndex,
        valueScale,
        seriesGradients,
        roundBaseline,
        barsGrowVertically,
      ],
    );

    const stackRect = useMemo(
      () => getStackRect(bars, { indexPos, thickness, barsGrowVertically, baseline }),
      [bars, indexPos, thickness, barsGrowVertically, baseline],
    );

    // Per-bar initial animation origins: bars start stacked from the baseline (with gaps)
    // rather than all overlapping at the same position.
    const barOrigins = useMemo(
      () => getBarOrigins(bars, barMinSize ?? 0, stackGap ?? 0, baseline, barsGrowVertically),
      [bars, barMinSize, stackGap, baseline, barsGrowVertically],
    );

    const xData =
      xAxis?.data && Array.isArray(xAxis.data) && typeof xAxis.data[0] === 'number'
        ? (xAxis.data as number[])
        : undefined;
    const dataX = xData ? xData[categoryIndex] : categoryIndex;

    const barElements = bars.map((bar, index) => (
      <Bar
        key={`${bar.seriesId}-${categoryIndex}-${index}`}
        BarComponent={bar.BarComponent || defaultBarComponent}
        borderRadius={borderRadius}
        dataX={barsGrowVertically ? dataX : (bar.dataValue as any)}
        dataY={barsGrowVertically ? (bar.dataValue as any) : dataX}
        fill={bar.fill}
        fillOpacity={bar.fillOpacity ?? defaultFillOpacity}
        height={barsGrowVertically ? bar.length : thickness}
        minSize={barMinSize}
        origin={barOrigins[index]}
        roundBottom={bar.roundBottom}
        roundTop={bar.roundTop}
        seriesId={bar.seriesId}
        stroke={bar.stroke ?? defaultStroke}
        strokeWidth={bar.strokeWidth ?? defaultStrokeWidth}
        transition={transition}
        transitions={transitions}
        width={barsGrowVertically ? thickness : bar.length}
        x={barsGrowVertically ? indexPos : bar.valuePos}
        y={barsGrowVertically ? bar.valuePos : indexPos}
      />
    ));

    // Check if the stack as a whole should be rounded based on the baseline
    // edge: top in vertical, left in horizontal
    // size: height in vertical, width in horizontal
    const edge = barsGrowVertically ? stackRect.y : stackRect.x;
    const size = barsGrowVertically ? stackRect.height : stackRect.width;

    // stackRoundLower: face at smaller coordinate (Top in vertical, Left in horizontal)
    // stackRoundHigher: face at larger coordinate (Bottom in vertical, Right in horizontal)
    const stackRoundLower = roundBaseline || Math.abs(edge - baseline) >= EPSILON;
    const stackRoundHigher = roundBaseline || Math.abs(edge + size - baseline) >= EPSILON;

    const stackRoundTop = barsGrowVertically ? stackRoundLower : stackRoundHigher;
    const stackRoundBottom = barsGrowVertically ? stackRoundHigher : stackRoundLower;

    // Clip animation start range: covers all bars' initial positions so the clip and the
    // individual bar animations start in sync with no overlap or leaking.
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
