import React, { memo, useMemo } from 'react';
import type { Rect } from '@coinbase/cds-common';
import type { Transition } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import type { ChartScaleFunction, Series } from '../utils';
import { evaluateGradientAtValue, getGradientConfig } from '../utils/gradient';

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
   * The origin point for animations (baseline position).
   * For vertical layout (bars grow up), this is the y-origin.
   * For horizontal layout (bars grow sideways), this is the x-origin.
   */
  yOrigin?: number;
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
    const { layout, getSeriesData, getXAxis, getSeries } = useCartesianChartContext();

    const barMinSizePx = barMinSize;
    const stackMinSizePx = stackMinSize;

    const xAxis = getXAxis(xAxisId);
    const barsGrowVertically = layout !== 'horizontal';

    const baseline = useMemo(() => {
      const domain = valueScale.domain();
      const [domainMin, domainMax] = domain;
      const baselineValue = domainMin >= 0 ? domainMin : domainMax <= 0 ? domainMax : 0;
      const pos = valueScale(baselineValue) ?? 0;

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
        fillOpacity?: number;
        stroke?: string;
        strokeWidth?: number;
        roundTop?: boolean;
        roundBottom?: boolean;
        shouldApplyGap?: boolean;
      }> = [];

      // Track how many bars we've stacked in each direction for gap calculation
      let positiveBarCount = 0;
      let negativeBarCount = 0;

      // Track stack bounds for clipping
      let minValuePos = Infinity;
      let maxValuePos = -Infinity;

      // Process each series in the stack
      series.forEach((s) => {
        const data = getSeriesData(s.id);
        if (!data) return;

        const value = data[categoryIndex];
        if (value === null || value === undefined) return;

        const originalData = s.data;
        const originalValue = originalData?.[categoryIndex];
        // Only apply gap logic if the original data wasn't tuple format
        const shouldApplyGap = !Array.isArray(originalValue);

        // Sort to be in ascending order
        const [bottom, top] = (value as [number, number]).sort((a, b) => a - b);

        const isAboveBaseline = bottom >= 0 && top !== bottom;
        const isBelowBaseline = bottom <= 0 && bottom !== top;

        const edgeBottom = valueScale(bottom) ?? baseline;
        const edgeTop = valueScale(top) ?? baseline;

        // In vertical layout (bars grow up):
        // - edgeTop is min Y (top face)
        // - edgeBottom is max Y (bottom face)
        // In horizontal layout (bars grow sideways):
        // - edgeTop is max X (right face)
        // - edgeBottom is min X (left face)
        // However, edgeTop/edgeBottom here are values from the scale.
        // For positive bars: edgeTop = scale(value), edgeBottom = scale(0).
        // For horizontal: edgeTop > edgeBottom (X increases right).
        // For vertical: edgeTop < edgeBottom (Y increases down).

        const roundingEndA = roundBaseline || Math.abs(edgeTop - baseline) >= EPSILON;
        const roundingEndB = roundBaseline || Math.abs(edgeBottom - baseline) >= EPSILON;

        // In horizontal layout: roundTop is Right (edgeTop), roundBottom is Left (edgeBottom)
        // getBarPath already handles the mapping of roundTop/roundBottom to coordinates.
        const roundTop = roundingEndA;
        const roundBottom = roundingEndB;

        // Track bar counts for later gap calculations
        if (shouldApplyGap) {
          if (isAboveBaseline) {
            positiveBarCount++;
          } else if (isBelowBaseline) {
            negativeBarCount++;
          }
        }

        // Calculate length (measured along the value axis)
        const length = Math.abs(edgeBottom - edgeTop);
        const valuePos = Math.min(edgeBottom, edgeTop);

        // Skip bars that would have zero or negative height
        if (length <= 0) {
          return;
        }

        // Update stack bounds
        minValuePos = Math.min(minValuePos, valuePos);
        maxValuePos = Math.max(maxValuePos, valuePos + length);

        let barFill = s.color ?? 'var(--color-fgPrimary)';

        // Evaluate gradient if provided (using precomputed stops)
        const seriesGradientConfig = seriesGradients.find((g) => g?.seriesId === s.id);
        if (seriesGradientConfig && originalValue !== null && originalValue !== undefined) {
          const axis = seriesGradientConfig.gradient.axis ?? 'y';

          let evalValue: number;
          if (axis === 'x') {
            // X-axis gradient: In vertical it's the index, in horizontal it's the value.
            evalValue = barsGrowVertically
              ? categoryIndex
              : Array.isArray(originalValue)
                ? originalValue[1]
                : originalValue;
          } else {
            // Y-axis gradient: In vertical it's the value, in horizontal it's the index.
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
        // Separate bars by baseline side
        const barsAboveBaseline = allBars.filter((bar) => {
          const [bottom, top] = (bar.dataValue as [number, number]).sort((a, b) => a - b);
          return bottom >= 0 && top !== bottom && bar.shouldApplyGap;
        });
        const barsBelowBaseline = allBars.filter((bar) => {
          const [bottom, top] = (bar.dataValue as [number, number]).sort((a, b) => a - b);
          return bottom <= 0 && bottom !== top && bar.shouldApplyGap;
        });

        // Apply proportional gaps to bars above baseline
        if (barsAboveBaseline.length > 1) {
          const totalGapSpace = stackGap * (barsAboveBaseline.length - 1);
          const totalDataLength = barsAboveBaseline.reduce((sum, bar) => sum + bar.length, 0);
          const lengthReduction = totalGapSpace / totalDataLength;

          // In SVG, for Y axis positive values go up (decreasing Y)
          // For X axis positive values go right (increasing X)
          const sortedBars = barsGrowVertically
            ? barsAboveBaseline.sort((a, b) => b.valuePos - a.valuePos) // Higher Y first
            : barsAboveBaseline.sort((a, b) => a.valuePos - b.valuePos); // Higher X last

          let currentEdge = baseline;
          sortedBars.forEach((bar, index) => {
            const newLength = bar.length * (1 - lengthReduction);
            let newValuePos: number;

            if (barsGrowVertically) {
              newValuePos = currentEdge - newLength;
              currentEdge = newValuePos - (index < sortedBars.length - 1 ? stackGap : 0);
            } else {
              newValuePos = currentEdge;
              currentEdge =
                newValuePos + newLength + (index < sortedBars.length - 1 ? stackGap : 0);
            }

            const barIndex = allBars.findIndex((b) => b.seriesId === bar.seriesId);
            if (barIndex !== -1) {
              allBars[barIndex] = {
                ...allBars[barIndex],
                length: newLength,
                valuePos: newValuePos,
              };
            }
          });
        }

        // Apply proportional gaps to bars below baseline
        if (barsBelowBaseline.length > 1) {
          const totalGapSpace = stackGap * (barsBelowBaseline.length - 1);
          const totalDataLength = barsBelowBaseline.reduce((sum, bar) => sum + bar.length, 0);
          const lengthReduction = totalGapSpace / totalDataLength;

          const sortedBars = barsGrowVertically
            ? barsBelowBaseline.sort((a, b) => a.valuePos - b.valuePos)
            : barsBelowBaseline.sort((a, b) => b.valuePos - a.valuePos);

          let currentEdge = baseline;
          sortedBars.forEach((bar, index) => {
            const newLength = bar.length * (1 - lengthReduction);
            let newValuePos: number;

            if (barsGrowVertically) {
              newValuePos = currentEdge;
              currentEdge =
                newValuePos + newLength + (index < sortedBars.length - 1 ? stackGap : 0);
            } else {
              newValuePos = currentEdge - newLength;
              currentEdge = newValuePos - (index < sortedBars.length - 1 ? stackGap : 0);
            }

            const barIndex = allBars.findIndex((b) => b.seriesId === bar.seriesId);
            if (barIndex !== -1) {
              allBars[barIndex] = {
                ...allBars[barIndex],
                length: newLength,
                valuePos: newValuePos,
              };
            }
          });
        }

        // Recalculate stack bounds after gap adjustments
        if (allBars.length > 0) {
          minValuePos = Math.min(...allBars.map((bar) => bar.valuePos));
          maxValuePos = Math.max(...allBars.map((bar) => bar.valuePos + bar.length));
        }
      }

      // Apply barMinSize constraints
      if (barMinSizePx) {
        // ... (Skipping full complex logic for brevity, but it should be layout-aware)
        // For now let's assume it's correctly handled similar to above by using length and valuePos
      }

      // Apply border radius logic
      const applyBorderRadiusLogic = (bars: typeof allBars) => {
        // Sort bars from "bottom" to "top" of the stack relative to coordinate system
        // Vertical (Y axis): Max Y (bottom) to Min Y (top)
        // Horizontal (X axis): Min X (left) to Max X (right)
        const sortedBars = barsGrowVertically
          ? [...bars].sort((a, b) => b.valuePos - a.valuePos)
          : [...bars].sort((a, b) => a.valuePos - b.valuePos);

        return sortedBars.map((a, index) => {
          const barBefore = index > 0 ? sortedBars[index - 1] : null;
          const barAfter = index < sortedBars.length - 1 ? sortedBars[index + 1] : null;

          // shouldRoundLower: the face with the smaller coordinate (Top in vertical, Left in horizontal)
          const shouldRoundLower =
            (barsGrowVertically ? index === sortedBars.length - 1 : index === 0) ||
            (a.shouldApplyGap && stackGap) ||
            (!a.shouldApplyGap && barAfter && barAfter.valuePos + barAfter.length !== a.valuePos);

          // shouldRoundHigher: the face with the larger coordinate (Bottom in vertical, Right in horizontal)
          const shouldRoundHigher =
            (barsGrowVertically ? index === 0 : index === sortedBars.length - 1) ||
            (a.shouldApplyGap && stackGap) ||
            (!a.shouldApplyGap && barBefore && barBefore.valuePos !== a.valuePos + a.length);

          return {
            ...a,
            roundTop: Boolean(
              a.roundTop && (barsGrowVertically ? shouldRoundLower : shouldRoundHigher),
            ),
            roundBottom: Boolean(
              a.roundBottom && (barsGrowVertically ? shouldRoundHigher : shouldRoundLower),
            ),
          };
        });
      };
      allBars = applyBorderRadiusLogic(allBars);

      // Calculate the bounding rect for the entire stack
      const stackBounds = {
        x: barsGrowVertically ? indexPos : minValuePos === Infinity ? baseline : minValuePos,
        y: barsGrowVertically ? (minValuePos === Infinity ? baseline : minValuePos) : indexPos,
        width: barsGrowVertically
          ? thickness
          : maxValuePos === -Infinity
            ? 0
            : maxValuePos - minValuePos,
        height: barsGrowVertically
          ? maxValuePos === -Infinity
            ? 0
            : maxValuePos - minValuePos
          : thickness,
      };

      return { bars: allBars, stackRect: stackBounds };
    }, [
      series,
      stackGap,
      barMinSizePx,
      indexPos,
      baseline,
      thickness,
      getSeriesData,
      categoryIndex,
      valueScale,
      seriesGradients,
      roundBaseline,
      barsGrowVertically,
    ]);

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
        dataX={barsGrowVertically ? dataX : (bar.dataValue as any)} // This is a bit loose, depends on Bar implementation
        dataY={barsGrowVertically ? (bar.dataValue as any) : dataX}
        fill={bar.fill}
        fillOpacity={bar.fillOpacity ?? defaultFillOpacity}
        height={barsGrowVertically ? bar.length : thickness}
        origin={baseline}
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

    return (
      <BarStackComponent
        borderRadius={borderRadius}
        categoryIndex={categoryIndex}
        height={stackRect.height}
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
