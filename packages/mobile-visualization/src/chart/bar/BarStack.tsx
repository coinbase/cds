import React, { memo, useMemo } from 'react';
import type { Rect } from '@coinbase/cds-common';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import type { ChartScaleFunction, Series } from '../utils';
import {
  applyBarMinSize,
  applyBorderRadiusLogic,
  applyStackGap,
  applyStackMinSize,
  getBarInitialOrigins,
  getInitialValueRange,
  type StackBounds,
} from '../utils/bar';
import { evaluateGradientAtValue, getGradientStops } from '../utils/gradient';
import { convertToSerializableScale } from '../utils/scale';

import { Bar, type BarBaseProps, type BarComponent, type BarProps } from './Bar';
import { DefaultBarStack } from './DefaultBarStack';

const EPSILON = 1e-4;

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
   * The origin coordinate for animations (baseline position).
   * For vertical layout (bars grow up), this is the y-origin.
   * For horizontal layout (bars grow sideways), this is the x-origin.
   */
  yOrigin?: number;
  /**
   * Minimum bar size in pixels. Used as the initial clip size when animating.
   */
  minSize?: number;
  /**
   * Initial value-axis range [start, end] for the clip animation when minSize is set.
   * Covers the bounding box of all bars at their stacked initial positions, so the clip
   * and the individual bar animations start in sync with no overlap or leaking.
   */
  initialValueRange?: [number, number];
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
    const barsGrowVertically = layout !== 'horizontal';

    const baseline = useMemo(() => {
      const domain = valueScale.domain();
      const [domainMin, domainMax] = domain;
      const baselineValue = domainMin >= 0 ? domainMin : domainMax <= 0 ? domainMax : 0;
      const fallback = barsGrowVertically ? rect.y + rect.height : rect.x;
      const baselinePos = valueScale(baselineValue) ?? fallback;

      if (barsGrowVertically) {
        return Math.max(rect.y, Math.min(baselinePos, rect.y + rect.height));
      }

      return Math.max(rect.x, Math.min(baselinePos, rect.x + rect.width));
    }, [rect, valueScale, barsGrowVertically]);

    const seriesGradients = useMemo(() => {
      return series.map((s) => {
        if (!s.gradient) return;

        const gradientScale =
          s.gradient.axis === 'x'
            ? barsGrowVertically
              ? indexScale
              : valueScale
            : barsGrowVertically
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
    }, [series, indexScale, valueScale, barsGrowVertically]);

    // Calculate bars for this specific category
    const { bars, stackRect } = useMemo(() => {
      let allBars: Array<{
        seriesId: string;
        indexPos: number;
        valuePos: number;
        thickness: number;
        length: number;
        dataValue?: number | [number, number] | null;
        BarComponent?: BarComponent;
        fill?: string;
        roundTop?: boolean;
        roundBottom?: boolean;
        shouldApplyGap?: boolean;
      }> = [];

      let positiveBarCount = 0;
      let negativeBarCount = 0;

      let minValuePos = Infinity;
      let maxValuePos = -Infinity;

      series.forEach((s) => {
        const data = getSeriesData(s.id);
        if (!data) return;

        const value = data[categoryIndex];
        if (value === null || value === undefined) return;

        const originalData = s.data;
        const originalValue = originalData?.[categoryIndex];
        const shouldApplyGap = !Array.isArray(originalValue);

        const [bottom, top] = (value as [number, number]).sort((a, b) => a - b);

        const isAboveBaseline = bottom >= 0 && top !== bottom;
        const isBelowBaseline = bottom <= 0 && bottom !== top;

        const edgeBottom = valueScale(bottom) ?? baseline;
        const edgeTop = valueScale(top) ?? baseline;

        const roundingEndA = roundBaseline || Math.abs(edgeTop - baseline) >= EPSILON;
        const roundingEndB = roundBaseline || Math.abs(edgeBottom - baseline) >= EPSILON;

        const roundTop = roundingEndA;
        const roundBottom = roundingEndB;

        if (shouldApplyGap) {
          if (isAboveBaseline) {
            positiveBarCount++;
          } else if (isBelowBaseline) {
            negativeBarCount++;
          }
        }

        const length = Math.abs(edgeBottom - edgeTop);
        const valuePos = Math.min(edgeBottom, edgeTop);

        if (length <= 0) return;

        minValuePos = Math.min(minValuePos, valuePos);
        maxValuePos = Math.max(maxValuePos, valuePos + length);

        let barFill = s.color || theme.color.fgPrimary;

        const seriesGradientConfig = seriesGradients.find((g) => g?.seriesId === s.id);
        if (seriesGradientConfig && originalValue !== null && originalValue !== undefined) {
          const axis = seriesGradientConfig.gradient.axis ?? 'y';

          let evalValue: number;
          if (axis === 'x') {
            evalValue = barsGrowVertically
              ? categoryIndex
              : Array.isArray(originalValue)
                ? originalValue[1]
                : originalValue;
          } else {
            evalValue = barsGrowVertically
              ? Array.isArray(originalValue)
                ? originalValue[1]
                : originalValue
              : categoryIndex;
          }

          const evaluatedColor = evaluateGradientAtValue(
            seriesGradientConfig.stops,
            evalValue,
            seriesGradientConfig.scale,
          );
          if (evaluatedColor) {
            barFill = evaluatedColor;
          }
        }

        allBars.push({
          seriesId: s.id,
          indexPos,
          valuePos,
          thickness,
          length,
          dataValue: value,
          fill: barFill,
          roundTop,
          roundBottom,
          shouldApplyGap,
          BarComponent: s.BarComponent,
        });
      });

      // Apply proportional gap distribution to maintain total stack length
      if (stackGap && allBars.length > 1) {
        allBars = applyStackGap(allBars, stackGap, barsGrowVertically, baseline);
        if (allBars.length > 0) {
          minValuePos = Math.min(...allBars.map((bar) => bar.valuePos));
          maxValuePos = Math.max(...allBars.map((bar) => bar.valuePos + bar.length));
        }
      }

      // Apply barMinSize constraints
      if (barMinSize) {
        allBars = applyBarMinSize(allBars, barMinSize, barsGrowVertically, baseline);
        if (allBars.length > 0) {
          minValuePos = Math.min(...allBars.map((bar) => bar.valuePos));
          maxValuePos = Math.max(...allBars.map((bar) => bar.valuePos + bar.length));
        }
      }

      allBars = applyBorderRadiusLogic(allBars, barsGrowVertically, stackGap);

      // Calculate the bounding rect for the entire stack
      // stackSize is the extent along the value axis, used for stackMinSize checks
      const stackSize =
        maxValuePos === -Infinity || minValuePos === Infinity ? 0 : maxValuePos - minValuePos;
      let stackBounds = {
        x: barsGrowVertically ? indexPos : minValuePos === Infinity ? baseline : minValuePos,
        y: barsGrowVertically ? (minValuePos === Infinity ? baseline : minValuePos) : indexPos,
        width: barsGrowVertically ? thickness : stackSize,
        height: barsGrowVertically ? stackSize : thickness,
      };

      // Apply stackMinSize constraints
      if (stackMinSize) {
        const result = applyStackMinSize(
          allBars,
          stackMinSize,
          stackSize,
          stackBounds as StackBounds,
          barsGrowVertically,
          indexPos,
          thickness,
          baseline,
        );
        allBars = result.bars;
        stackBounds = result.stackBounds;

        // Reapply border radius logic only if we actually scaled
        const newStackSize = barsGrowVertically ? stackBounds.height : stackBounds.width;
        if (newStackSize < stackMinSize) {
          allBars = applyBorderRadiusLogic(allBars, barsGrowVertically, stackGap);
        }
      }

      return { bars: allBars, stackRect: stackBounds };
    }, [
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
      barsGrowVertically,
    ]);

    // Per-bar initial animation origins: bars start stacked from the baseline (with gaps)
    // rather than all overlapping at the same position.
    const barInitialOrigins = useMemo(
      () =>
        getBarInitialOrigins(bars, barMinSize ?? 0, stackGap ?? 0, baseline, barsGrowVertically),
      [bars, barMinSize, stackGap, baseline, barsGrowVertically],
    );

    const categoryAxis = barsGrowVertically ? xAxis : yAxis;
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
        dataX={barsGrowVertically ? categoryValue : (bar.dataValue as any)}
        dataY={barsGrowVertically ? bar.dataValue : categoryValue}
        fill={bar.fill}
        fillOpacity={defaultFillOpacity}
        height={barsGrowVertically ? bar.length : thickness}
        minSize={barMinSize}
        origin={barInitialOrigins[index]}
        roundBottom={bar.roundBottom}
        roundTop={bar.roundTop}
        seriesId={bar.seriesId}
        stroke={defaultStroke}
        strokeWidth={defaultStrokeWidth}
        transition={transition}
        transitions={transitions}
        width={barsGrowVertically ? thickness : bar.length}
        x={barsGrowVertically ? indexPos : bar.valuePos}
        y={barsGrowVertically ? bar.valuePos : indexPos}
      />
    ));

    // Check if the stack should be rounded based on baseline, across both orientations.
    const edge = barsGrowVertically ? stackRect.y : stackRect.x;
    const size = barsGrowVertically ? stackRect.height : stackRect.width;
    const stackRoundLower = roundBaseline || Math.abs(edge - baseline) >= EPSILON;
    const stackRoundHigher = roundBaseline || Math.abs(edge + size - baseline) >= EPSILON;
    const stackRoundTop = barsGrowVertically ? stackRoundLower : stackRoundHigher;
    const stackRoundBottom = barsGrowVertically ? stackRoundHigher : stackRoundLower;

    const initialValueRange = useMemo(
      () => getInitialValueRange(barInitialOrigins, barMinSize ?? 0),
      [barInitialOrigins, barMinSize],
    );

    return (
      <BarStackComponent
        borderRadius={borderRadius}
        categoryIndex={categoryIndex}
        height={stackRect.height}
        initialValueRange={initialValueRange}
        minSize={barMinSize}
        roundBottom={stackRoundBottom}
        roundTop={stackRoundTop}
        transition={transition}
        transitions={transitions}
        width={stackRect.width}
        x={stackRect.x}
        y={stackRect.y}
        yOrigin={baseline}
      >
        {barElements}
      </BarStackComponent>
    );
  },
);
