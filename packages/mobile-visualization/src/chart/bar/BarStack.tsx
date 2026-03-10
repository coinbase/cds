import React, { memo, useMemo } from 'react';
import type { Rect } from '@coinbase/cds-common';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import type { ChartScaleFunction, Series } from '../utils';
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
      const x = indexPos;
      const width = thickness;
      const yScale = valueScale;

      let allBars: Array<{
        seriesId: string;
        x: number;
        y: number;
        width: number;
        height: number;
        dataY?: number | [number, number] | null;
        BarComponent?: BarComponent;
        fill?: string;
        roundTop?: boolean;
        roundBottom?: boolean;
        shouldApplyGap?: boolean;
      }> = [];

      if (!barsGrowVertically) {
        let minX = Infinity;
        let maxX = -Infinity;

        series.forEach((s) => {
          const data = getSeriesData(s.id);
          if (!data) return;

          const value = data[categoryIndex];
          if (value === null || value === undefined) return;

          const originalData = s.data;
          const originalValue = originalData?.[categoryIndex];
          const shouldApplyGap = !Array.isArray(originalValue);

          const [bottom, top] = (value as [number, number]).sort((a, b) => a - b);
          const edgeBottom = yScale(bottom) ?? baseline;
          const edgeTop = yScale(top) ?? baseline;

          const length = Math.abs(edgeBottom - edgeTop);
          const barX = Math.min(edgeBottom, edgeTop);
          if (length <= 0) return;

          minX = Math.min(minX, barX);
          maxX = Math.max(maxX, barX + length);

          let barFill = s.color || theme.color.fgPrimary;
          const seriesGradientConfig = seriesGradients.find((g) => g?.seriesId === s.id);
          if (seriesGradientConfig && originalValue !== null && originalValue !== undefined) {
            const axis = seriesGradientConfig.gradient.axis ?? 'y';
            const evalValue =
              axis === 'x'
                ? Array.isArray(originalValue)
                  ? originalValue[1]
                  : originalValue
                : categoryIndex;
            const evaluatedColor = evaluateGradientAtValue(
              seriesGradientConfig.stops,
              evalValue,
              seriesGradientConfig.scale,
            );
            if (evaluatedColor) {
              barFill = evaluatedColor;
            }
          }

          const roundTop = roundBaseline || Math.abs(edgeTop - baseline) >= EPSILON;
          const roundBottom = roundBaseline || Math.abs(edgeBottom - baseline) >= EPSILON;

          allBars.push({
            seriesId: s.id,
            x: barX,
            y: x,
            width: length,
            height: width,
            dataY: value,
            fill: barFill,
            roundTop,
            roundBottom,
            BarComponent: s.BarComponent,
            shouldApplyGap,
          });
        });

        if (stackGap && allBars.length > 1) {
          const barsAboveBaseline = allBars.filter((bar) => {
            const [bottom, top] = (bar.dataY as [number, number]).sort((a, b) => a - b);
            return bottom >= 0 && top !== bottom && bar.shouldApplyGap;
          });
          const barsBelowBaseline = allBars.filter((bar) => {
            const [bottom, top] = (bar.dataY as [number, number]).sort((a, b) => a - b);
            return bottom <= 0 && bottom !== top && bar.shouldApplyGap;
          });

          if (barsAboveBaseline.length > 1) {
            const totalGapSpace = stackGap * (barsAboveBaseline.length - 1);
            const totalDataLength = barsAboveBaseline.reduce((sum, bar) => sum + bar.width, 0);
            const lengthReduction = totalGapSpace / totalDataLength;
            const sortedBars = barsAboveBaseline.sort((a, b) => a.x - b.x);

            let currentEdge = baseline;
            sortedBars.forEach((bar, index) => {
              const newLength = bar.width * (1 - lengthReduction);
              const newX = currentEdge;
              currentEdge = newX + newLength + (index < sortedBars.length - 1 ? stackGap : 0);

              const barIndex = allBars.findIndex((b) => b.seriesId === bar.seriesId);
              if (barIndex !== -1) {
                allBars[barIndex] = {
                  ...allBars[barIndex],
                  width: newLength,
                  x: newX,
                };
              }
            });
          }

          if (barsBelowBaseline.length > 1) {
            const totalGapSpace = stackGap * (barsBelowBaseline.length - 1);
            const totalDataLength = barsBelowBaseline.reduce((sum, bar) => sum + bar.width, 0);
            const lengthReduction = totalGapSpace / totalDataLength;
            const sortedBars = barsBelowBaseline.sort((a, b) => b.x - a.x);

            let currentEdge = baseline;
            sortedBars.forEach((bar, index) => {
              const newLength = bar.width * (1 - lengthReduction);
              const newX = currentEdge - newLength;
              currentEdge = newX - (index < sortedBars.length - 1 ? stackGap : 0);

              const barIndex = allBars.findIndex((b) => b.seriesId === bar.seriesId);
              if (barIndex !== -1) {
                allBars[barIndex] = {
                  ...allBars[barIndex],
                  width: newLength,
                  x: newX,
                };
              }
            });
          }

          if (allBars.length > 0) {
            minX = Math.min(...allBars.map((bar) => bar.x));
            maxX = Math.max(...allBars.map((bar) => bar.x + bar.width));
          }
        }

        // Horizontal border radius logic: left-to-right sorting.
        const sortedBars = [...allBars].sort((a, b) => a.x - b.x);
        const roundedBars = sortedBars.map((bar, index) => {
          const barBefore = index > 0 ? sortedBars[index - 1] : null;
          const barAfter = index < sortedBars.length - 1 ? sortedBars[index + 1] : null;

          const shouldRoundLower =
            index === 0 ||
            (bar.shouldApplyGap && stackGap) ||
            (!bar.shouldApplyGap && barAfter && barAfter.x + barAfter.width !== bar.x);

          const shouldRoundHigher =
            index === sortedBars.length - 1 ||
            (bar.shouldApplyGap && stackGap) ||
            (!bar.shouldApplyGap && barBefore && barBefore.x !== bar.x + bar.width);

          return {
            ...bar,
            roundTop: Boolean(bar.roundTop && shouldRoundHigher),
            roundBottom: Boolean(bar.roundBottom && shouldRoundLower),
          };
        });

        const stackBounds = {
          x: minX === Infinity ? baseline : minX,
          y: x,
          width: maxX === -Infinity ? 0 : maxX - minX,
          height: width,
        };

        return { bars: roundedBars, stackRect: stackBounds };
      }

      // Track how many bars we've stacked in each direction for gap calculation
      let positiveBarCount = 0;
      let negativeBarCount = 0;

      // Track stack bounds for clipping
      let minY = Infinity;
      let maxY = -Infinity;

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

        const barBottom = yScale(bottom) ?? baseline;
        const barTop = yScale(top) ?? baseline;

        // Track bar counts for later gap calculations
        if (shouldApplyGap) {
          if (isAboveBaseline) {
            positiveBarCount++;
          } else if (isBelowBaseline) {
            negativeBarCount++;
          }
        }

        // Calculate height (remember SVG y coordinates are inverted)
        const height = Math.abs(barBottom - barTop);
        const y = Math.min(barBottom, barTop);

        // Skip bars that would have zero or negative height
        if (height <= 0) {
          return;
        }

        // Update stack bounds
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y + height);

        // Determine fill color, respecting gradient if present
        let barFill = s.color || theme.color.fgPrimary;

        // Evaluate gradient if provided (using precomputed stops)
        const seriesGradientConfig = seriesGradients.find((g) => g?.seriesId === s.id);
        if (seriesGradientConfig) {
          const axis = seriesGradientConfig.gradient.axis ?? 'y';
          // For x-axis gradient, use the categoryIndex
          // For y-axis gradient, use the actual data value
          const dataValue = axis === 'x' ? categoryIndex : top;
          const evaluatedColor = evaluateGradientAtValue(
            seriesGradientConfig.stops,
            dataValue,
            seriesGradientConfig.scale,
          );
          if (evaluatedColor) {
            // Only apply gradient color if fill is not explicitly set
            barFill = evaluatedColor;
          }
        }

        allBars.push({
          seriesId: s.id,
          x,
          y,
          width,
          height,
          dataY: value, // Store the actual data value
          fill: barFill,
          // Check if the bar should be rounded based on the baseline, with an epsilon to handle floating-point rounding
          roundTop: roundBaseline || Math.abs(barTop - baseline) >= EPSILON,
          roundBottom: roundBaseline || Math.abs(barBottom - baseline) >= EPSILON,
          BarComponent: s.BarComponent,
          shouldApplyGap,
        });
      });

      // Apply proportional gap distribution to maintain total stack height
      if (stackGap && allBars.length > 1) {
        // Separate bars by baseline side
        const barsAboveBaseline = allBars.filter((bar) => {
          const [bottom, top] = (bar.dataY as [number, number]).sort((a, b) => a - b);
          return bottom >= 0 && top !== bottom && bar.shouldApplyGap;
        });
        const barsBelowBaseline = allBars.filter((bar) => {
          const [bottom, top] = (bar.dataY as [number, number]).sort((a, b) => a - b);
          return bottom <= 0 && bottom !== top && bar.shouldApplyGap;
        });

        // Apply proportional gaps to bars above baseline
        if (barsAboveBaseline.length > 1) {
          const totalGapSpace = stackGap * (barsAboveBaseline.length - 1);
          const totalDataHeight = barsAboveBaseline.reduce((sum, bar) => sum + bar.height, 0);
          const heightReduction = totalGapSpace / totalDataHeight;

          // Sort bars by position (from baseline upward)
          const sortedBars = barsAboveBaseline.sort((a, b) => b.y - a.y);

          let currentY = baseline;
          sortedBars.forEach((bar, index) => {
            // Reduce bar height proportionally
            const newHeight = bar.height * (1 - heightReduction);
            const newY = currentY - newHeight;

            // Update the bar in allBars array
            const barIndex = allBars.findIndex((b) => b.seriesId === bar.seriesId);
            if (barIndex !== -1) {
              allBars[barIndex] = {
                ...allBars[barIndex],
                height: newHeight,
                y: newY,
              };
            }

            // Move to next position (include gap for next bar)
            currentY = newY - (index < sortedBars.length - 1 ? stackGap : 0);
          });
        }

        // Apply proportional gaps to bars below baseline
        if (barsBelowBaseline.length > 1) {
          const totalGapSpace = stackGap * (barsBelowBaseline.length - 1);
          const totalDataHeight = barsBelowBaseline.reduce((sum, bar) => sum + bar.height, 0);
          const heightReduction = totalGapSpace / totalDataHeight;

          // Sort bars by position (from baseline downward)
          const sortedBars = barsBelowBaseline.sort((a, b) => a.y - b.y);

          let currentY = baseline;
          sortedBars.forEach((bar, index) => {
            // Reduce bar height proportionally
            const newHeight = bar.height * (1 - heightReduction);

            // Update the bar in allBars array
            const barIndex = allBars.findIndex((b) => b.seriesId === bar.seriesId);
            if (barIndex !== -1) {
              allBars[barIndex] = {
                ...allBars[barIndex],
                height: newHeight,
                y: currentY,
              };
            }

            // Move to next position (include gap for next bar)
            currentY = currentY + newHeight + (index < sortedBars.length - 1 ? stackGap : 0);
          });
        }

        // Recalculate stack bounds after gap adjustments
        if (allBars.length > 0) {
          minY = Math.min(...allBars.map((bar) => bar.y));
          maxY = Math.max(...allBars.map((bar) => bar.y + bar.height));
        }
      }

      // Apply barMinSize constraints
      if (barMinSize) {
        // First, expand bars that need it and track the expansion
        const expandedBars = allBars.map((bar, index) => {
          if (bar.height < barMinSize) {
            const heightIncrease = barMinSize - bar.height;

            const [bottom, top] = (bar.dataY as [number, number]).sort((a, b) => a - b);

            // Determine how to expand the bar
            let newBottom = bottom;
            let newTop = top;

            const scaleUnit = Math.abs((yScale(1) ?? 0) - (yScale(0) ?? 0));

            if (bottom === 0) {
              // Expand away from baseline (upward for positive)
              newTop = top + heightIncrease / scaleUnit;
            } else if (top === 0) {
              // Expand away from baseline (downward for negative)
              newBottom = bottom - heightIncrease / scaleUnit;
            } else {
              // Expand in both directions
              const halfIncrease = heightIncrease / scaleUnit / 2;
              newBottom = bottom - halfIncrease;
              newTop = top + halfIncrease;
            }

            // Recalculate bar position with new data values
            const newBarBottom = yScale(newBottom) ?? baseline;
            const newBarTop = yScale(newTop) ?? baseline;
            const newHeight = Math.abs(newBarBottom - newBarTop);
            const newY = Math.min(newBarBottom, newBarTop);

            return {
              ...bar,
              height: newHeight,
              y: newY,
              wasExpanded: true,
            };
          }
          return { ...bar, wasExpanded: false };
        });

        // Now reposition all bars to avoid overlaps, similar to stackMinSize logic

        // Sort bars by position to maintain order
        const sortedExpandedBars = [...expandedBars].sort((a, b) => a.y - b.y);

        // Determine if we have bars above and below baseline
        const barsAboveBaseline = sortedExpandedBars.filter(
          (bar) => bar.y + bar.height <= baseline,
        );
        const barsBelowBaseline = sortedExpandedBars.filter((bar) => bar.y >= baseline);

        // Create a map of new positions
        const newPositions = new Map<string, { y: number; height: number }>();

        // Start positioning from the baseline and work outward
        let currentYAbove = baseline; // Start at baseline, work upward (decreasing Y)
        let currentYBelow = baseline; // Start at baseline, work downward (increasing Y)

        // Position bars above baseline (positive values, decreasing Y)
        for (let i = barsAboveBaseline.length - 1; i >= 0; i--) {
          const bar = barsAboveBaseline[i];
          const newY = currentYAbove - bar.height;

          newPositions.set(bar.seriesId, { y: newY, height: bar.height });

          // Update currentYAbove for next bar (preserve gaps)
          if (i > 0) {
            const currentBar = barsAboveBaseline[i];
            const nextBar = barsAboveBaseline[i - 1];
            // Find original bars to get original gap
            const originalCurrent = allBars.find((b) => b.seriesId === currentBar.seriesId)!;
            const originalNext = allBars.find((b) => b.seriesId === nextBar.seriesId)!;
            const originalGap = originalCurrent.y - (originalNext.y + originalNext.height);
            currentYAbove = newY - originalGap;
          }
        }

        // Position bars below baseline (negative values, increasing Y)
        for (let i = 0; i < barsBelowBaseline.length; i++) {
          const bar = barsBelowBaseline[i];
          const newY = currentYBelow;

          newPositions.set(bar.seriesId, { y: newY, height: bar.height });

          // Update currentYBelow for next bar (preserve gaps)
          if (i < barsBelowBaseline.length - 1) {
            const currentBar = barsBelowBaseline[i];
            const nextBar = barsBelowBaseline[i + 1];
            // Find original bars to get original gap
            const originalCurrent = allBars.find((b) => b.seriesId === currentBar.seriesId)!;
            const originalNext = allBars.find((b) => b.seriesId === nextBar.seriesId)!;
            const originalGap = originalNext.y - (originalCurrent.y + originalCurrent.height);
            currentYBelow = newY + bar.height + originalGap;
          }
        }

        // Apply new positions to all bars
        allBars = expandedBars.map((bar) => {
          const newPos = newPositions.get(bar.seriesId);
          if (newPos) {
            return {
              ...bar,
              y: newPos.y,
              height: newPos.height,
            };
          }
          return bar;
        });

        // Recalculate stack bounds after barMinSize expansion and repositioning
        if (allBars.length > 0) {
          minY = Math.min(...allBars.map((bar) => bar.y));
          maxY = Math.max(...allBars.map((bar) => bar.y + bar.height));
        }
      }

      // Apply border radius logic (will be reapplied after stackMinSize if needed)
      const applyBorderRadiusLogic = (bars: typeof allBars) => {
        return bars
          .sort((a, b) => b.y - a.y)
          .map((a, index) => {
            const barBefore = index > 0 ? bars[index - 1] : null;
            const barAfter = index < bars.length - 1 ? bars[index + 1] : null;

            const shouldRoundTop =
              index === bars.length - 1 ||
              (a.shouldApplyGap && stackGap) ||
              (!a.shouldApplyGap && barAfter && barAfter.y + barAfter.height !== a.y);

            const shouldRoundBottom =
              index === 0 ||
              (a.shouldApplyGap && stackGap) ||
              (!a.shouldApplyGap && barBefore && barBefore.y !== a.y + a.height);

            return {
              ...a,
              roundTop: Boolean(a.roundTop && shouldRoundTop),
              roundBottom: Boolean(a.roundBottom && shouldRoundBottom),
            };
          });
      };

      allBars = applyBorderRadiusLogic(allBars);

      // Calculate the bounding rect for the entire stack
      let stackBounds = {
        x,
        y: minY === Infinity ? baseline : minY,
        width,
        height: maxY === -Infinity ? 0 : maxY - minY,
      };

      // Apply stackMinSize constraints
      if (stackMinSize) {
        if (allBars.length === 1 && stackBounds.height < stackMinSize) {
          // For single bars (non-stacked), treat stackMinSize like barMinSize

          const bar = allBars[0];
          const heightIncrease = stackMinSize - bar.height;

          const [bottom, top] = (bar.dataY as [number, number]).sort((a, b) => a - b);

          // Determine how to expand the bar (same logic as barMinSize)
          let newBottom = bottom;
          let newTop = top;

          const scaleUnit = Math.abs((yScale(1) ?? 0) - (yScale(0) ?? 0));

          if (bottom === 0) {
            // Expand away from baseline (upward for positive)
            newTop = top + heightIncrease / scaleUnit;
          } else if (top === 0) {
            // Expand away from baseline (downward for negative)
            newBottom = bottom - heightIncrease / scaleUnit;
          } else {
            // Expand in both directions
            const halfIncrease = heightIncrease / scaleUnit / 2;
            newBottom = bottom - halfIncrease;
            newTop = top + halfIncrease;
          }

          // Recalculate bar position with new data values
          const newBarBottom = yScale(newBottom) ?? baseline;
          const newBarTop = yScale(newTop) ?? baseline;
          const newHeight = Math.abs(newBarBottom - newBarTop);
          const newY = Math.min(newBarBottom, newBarTop);

          allBars[0] = {
            ...bar,
            height: newHeight,
            y: newY,
          };

          // Recalculate stack bounds
          stackBounds = {
            x,
            y: newY,
            width,
            height: newHeight,
          };
        } else if (allBars.length > 1 && stackBounds.height < stackMinSize) {
          // For multiple bars (stacked), scale heights while preserving gaps

          // Calculate total bar height (excluding gaps)
          const totalBarHeight = allBars.reduce((sum, bar) => sum + bar.height, 0);
          const totalGapHeight = stackBounds.height - totalBarHeight;

          // Calculate how much we need to increase bar heights
          const requiredBarHeight = stackMinSize - totalGapHeight;
          const barScaleFactor = requiredBarHeight / totalBarHeight;

          // Sort bars by position to maintain order
          const sortedBars = [...allBars].sort((a, b) => a.y - b.y);

          // Determine if we have bars above and below baseline
          const barsAboveBaseline = sortedBars.filter((bar) => bar.y + bar.height <= baseline);
          const barsBelowBaseline = sortedBars.filter((bar) => bar.y >= baseline);

          // Create a map of new positions
          const newPositions = new Map<string, { y: number; height: number }>();

          // Start positioning from the baseline and work outward
          let currentYAbove = baseline; // Start at baseline, work upward (decreasing Y)
          let currentYBelow = baseline; // Start at baseline, work downward (increasing Y)

          // Position bars above baseline (positive values, decreasing Y)
          for (let i = barsAboveBaseline.length - 1; i >= 0; i--) {
            const bar = barsAboveBaseline[i];
            const newHeight = bar.height * barScaleFactor;
            const newY = currentYAbove - newHeight;

            newPositions.set(bar.seriesId, { y: newY, height: newHeight });

            // Update currentYAbove for next bar (preserve gaps)
            if (i > 0) {
              const currentBar = barsAboveBaseline[i];
              const nextBar = barsAboveBaseline[i - 1];
              const originalGap = currentBar.y - (nextBar.y + nextBar.height);
              currentYAbove = newY - originalGap;
            }
          }

          // Position bars below baseline (negative values, increasing Y)
          for (let i = 0; i < barsBelowBaseline.length; i++) {
            const bar = barsBelowBaseline[i];
            const newHeight = bar.height * barScaleFactor;
            const newY = currentYBelow;

            newPositions.set(bar.seriesId, { y: newY, height: newHeight });

            // Update currentYBelow for next bar (preserve gaps)
            if (i < barsBelowBaseline.length - 1) {
              const currentBar = barsBelowBaseline[i];
              const nextBar = barsBelowBaseline[i + 1];
              const originalGap = nextBar.y - (currentBar.y + currentBar.height);
              currentYBelow = newY + newHeight + originalGap;
            }
          }

          // Apply new positions to all bars
          allBars = allBars.map((bar) => {
            const newPos = newPositions.get(bar.seriesId);
            if (!newPos) return bar;
            return {
              ...bar,
              height: newPos.height,
              y: newPos.y,
            };
          });

          // Recalculate stack bounds
          const newMinY = Math.min(...allBars.map((bar) => bar.y));
          const newMaxY = Math.max(...allBars.map((bar) => bar.y + bar.height));

          stackBounds = {
            x,
            y: newMinY,
            width,
            height: newMaxY - newMinY,
          };
        }

        // Reapply border radius logic only if we actually scaled
        if (stackBounds.height < stackMinSize) {
          allBars = applyBorderRadiusLogic(allBars);
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
        dataX={barsGrowVertically ? categoryValue : (bar.dataY as any)}
        dataY={barsGrowVertically ? bar.dataY : categoryValue}
        fill={bar.fill}
        fillOpacity={defaultFillOpacity}
        height={bar.height}
        origin={baseline}
        roundBottom={bar.roundBottom}
        roundTop={bar.roundTop}
        seriesId={bar.seriesId}
        stroke={defaultStroke}
        strokeWidth={defaultStrokeWidth}
        transition={transition}
        transitions={transitions}
        width={bar.width}
        x={bar.x}
        y={bar.y}
      />
    ));

    // Check if the stack should be rounded based on baseline, across both orientations.
    const edge = barsGrowVertically ? stackRect.y : stackRect.x;
    const size = barsGrowVertically ? stackRect.height : stackRect.width;
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
