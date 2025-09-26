import React, { memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common';
import type { Rect } from '@coinbase/cds-common/types';
import { useChartContext } from '../ChartProvider';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { Bar, type BarComponent, type BarProps } from './Bar';
import type { BarSeries } from './BarChart';
import { DefaultStackComponent, type StackComponent } from './DefaultStackComponent';

// todo: simplify props by reusing from other types
export type BarStackProps = {
  /**
   * Array of series configurations that belong to this stack.
   */
  series: BarSeries[];
  /**
   * The category index for this stack.
   */
  categoryIndex: number;
  /**
   * X position for this stack.
   */
  x: number;
  /**
   * Width of this stack.
   */
  width: number;
  /**
   * Y scale function.
   */
  yScale: any; // TODO: proper d3-scale type
  /**
   * Chart rect for bounds.
   */
  rect: { x: number; y: number; width: number; height: number };
  /**
   * Y axis ID to use.
   * If not provided, will use the yAxisId from the first series.
   */
  yAxisId?: string;
  /**
   * Default component to render individual bars.
   */
  BarComponent?: BarComponent;
  /**
   * Default opacity of the bar.
   */
  fillOpacity?: number;
  /**
   * Default stroke color for the bar outline.
   */
  stroke?: string;
  /**
   * Default stroke width for the bar outline.
   */
  strokeWidth?: number;
  /**
   * Default border radius from theme.
   */
  borderRadius?: BarProps['borderRadius'];
  /**
   * Custom component to render the stack container.
   * Can be used to add clip paths, outlines, or other custom styling.
   * @default DefaultStackComponent
   */
  StackComponent?: StackComponent;
  /**
   * Whether to round the baseline of a bar (where the value is 0).
   */
  roundBaseline?: boolean;
  /**
   * Gap between bars in the stack.
   */
  stackGap?: ThemeVars.Space;
  /**
   * Minimum size for individual bars in the stack.
   */
  barMinSize?: ThemeVars.Space;
  /**
   * Minimum size for the entire stack.
   */
  stackMinSize?: ThemeVars.Space;
};

/**
 * BarStack component that renders a single stack of bars at a specific category index.
 * Handles the stacking logic for bars within a single category.
 */
export const BarStack = memo<BarStackProps>(
  ({
    series,
    categoryIndex,
    x,
    width,
    yScale,
    rect,
    yAxisId,
    BarComponent: defaultBarComponent,
    fillOpacity: defaultFillOpacity,
    stroke: defaultStroke,
    strokeWidth: defaultStrokeWidth,
    borderRadius,
    StackComponent = DefaultStackComponent,
    stackGap,
    barMinSize,
    stackMinSize,
    roundBaseline,
  }) => {
    const theme = useTheme();
    const { getSeriesData, getXAxis } = useChartContext();

    const stackGapPx = stackGap ? theme.space[stackGap] : 0;
    const barMinSizePx = barMinSize ? theme.space[barMinSize] : 0;
    const stackMinSizePx = stackMinSize ? theme.space[stackMinSize] : 0;

    const xAxis = getXAxis();

    const baseline = useMemo(() => {
      const domain = yScale.domain();
      const [domainMin, domainMax] = domain;
      const baselineValue = domainMin >= 0 ? domainMin : domainMax <= 0 ? domainMax : 0;
      const baseline = yScale(baselineValue) ?? rect.y + rect.height;

      return Math.max(rect.y, Math.min(baseline, rect.y + rect.height));
    }, [rect.height, rect.y, yScale]);

    // Calculate bars for this specific category
    const { bars, stackRect } = useMemo(() => {
      let allBars: Array<{
        seriesId: string;
        x: number;
        y: number;
        width: number;
        height: number;
        dataY?: number | [number, number] | null;
        BarComponent?: BarComponent;
        fill?: string;
        fillOpacity?: number;
        stroke?: string;
        strokeWidth?: number;
        borderRadius?: BarProps['borderRadius'];
        roundTop?: boolean;
        roundBottom?: boolean;
        shouldApplyGap?: boolean;
      }> = [];

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

        let barBottom: number;
        let barTop: number;

        // Sort to be in ascending order
        const [bottom, top] = (value as [number, number]).sort((a, b) => a - b);

        const isAboveBaseline = bottom >= 0 && top !== bottom;
        const isBelowBaseline = bottom <= 0 && bottom !== top;

        let gapOffset = 0;
        if (shouldApplyGap) {
          if (isAboveBaseline) {
            gapOffset = positiveBarCount > 0 ? stackGapPx * positiveBarCount : 0;
            positiveBarCount++;
          } else if (isBelowBaseline) {
            gapOffset = negativeBarCount > 0 ? stackGapPx * negativeBarCount : 0;
            negativeBarCount++;
          }
        }

        if (isAboveBaseline) {
          barBottom = (yScale(bottom) ?? baseline) - gapOffset;
          barTop = (yScale(top) ?? baseline) - gapOffset;
        } else if (isBelowBaseline) {
          barBottom = (yScale(bottom) ?? baseline) + gapOffset;
          barTop = (yScale(top) ?? baseline) + gapOffset;
        } else {
          // Tuple data or mixed/edge case - no gap modification
          barBottom = yScale(bottom) ?? baseline;
          barTop = yScale(top) ?? baseline;
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

        allBars.push({
          seriesId: s.id,
          x,
          y,
          width,
          height,
          dataY: value, // Store the actual data value
          // Use series-specific properties, falling back to defaults
          BarComponent: s.BarComponent,
          fill: s.fill || s.color || theme.color.fgPrimary,
          fillOpacity: s.fillOpacity,
          stroke: s.stroke,
          strokeWidth: s.strokeWidth,
          // Pass context data for custom components
          roundTop: roundBaseline || barTop !== baseline,
          roundBottom: roundBaseline || barBottom !== baseline,
          shouldApplyGap,
        });
      });

      // Apply barMinSize constraints
      if (barMinSizePx > 0) {
        // First, expand bars that need it and track the expansion
        const expandedBars = allBars.map((bar, index) => {
          if (bar.height < barMinSizePx) {
            const heightIncrease = barMinSizePx - bar.height;
            // For now, skip minimum size expansion logic
            // TODO: Implement minimum size expansion without storing dataValue
            const bottom = 0;
            const top = 0;

            // Determine how to expand the bar
            let newBottom = bottom;
            let newTop = top;

            const scaleUnit = Math.abs(yScale(1) - yScale(0));

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
              (a.shouldApplyGap && stackGapPx > 0) ||
              (!a.shouldApplyGap && barAfter && barAfter.y + barAfter.height !== a.y);

            const shouldRoundBottom =
              index === 0 ||
              (a.shouldApplyGap && stackGapPx > 0) ||
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
      if (stackMinSizePx > 0) {
        if (allBars.length === 1 && stackBounds.height < stackMinSizePx) {
          // For single bars (non-stacked), treat stackMinSize like barMinSize

          const bar = allBars[0];
          const heightIncrease = stackMinSizePx - bar.height;
          // For now, skip minimum size expansion logic
          // TODO: Implement minimum size expansion without storing dataValue
          const bottom = 0;
          const top = 0;

          // Determine how to expand the bar (same logic as barMinSize)
          let newBottom = bottom;
          let newTop = top;

          const scaleUnit = Math.abs(yScale(1) - yScale(0));

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
        } else if (allBars.length > 1 && stackBounds.height < stackMinSizePx) {
          // For multiple bars (stacked), scale heights while preserving gaps

          // Calculate total bar height (excluding gaps)
          const totalBarHeight = allBars.reduce((sum, bar) => sum + bar.height, 0);
          const totalGapHeight = stackBounds.height - totalBarHeight;

          // Calculate how much we need to increase bar heights
          const requiredBarHeight = stackMinSizePx - totalGapHeight;
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
            const newPos = newPositions.get(bar.seriesId)!;
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
        if (stackBounds.height < stackMinSizePx) {
          allBars = applyBorderRadiusLogic(allBars);
        }
      }

      return { bars: allBars, stackRect: stackBounds };
    }, [
      series,
      x,
      width,
      getSeriesData,
      categoryIndex,
      roundBaseline,
      baseline,
      stackGapPx,
      barMinSizePx,
      stackMinSizePx,
      yScale,
      theme.color.fgPrimary,
    ]);

    // Use the same baseline for yOrigin (animations)
    const yOrigin = baseline;

    const dataX = xAxis?.data?.[categoryIndex] ?? categoryIndex;

    const barElements = bars.map((bar, index) => (
      <Bar
        key={`${bar.seriesId}-${categoryIndex}-${index}`}
        BarComponent={bar.BarComponent || defaultBarComponent}
        borderRadius={borderRadius}
        dataX={dataX}
        dataY={bar.dataY}
        fill={bar.fill}
        fillOpacity={bar.fillOpacity ?? defaultFillOpacity}
        height={bar.height}
        originY={yOrigin}
        roundBottom={bar.roundBottom}
        roundTop={bar.roundTop}
        stroke={bar.stroke ?? defaultStroke}
        strokeWidth={bar.strokeWidth ?? defaultStrokeWidth}
        width={bar.width}
        x={bar.x}
        y={bar.y}
      />
    ));

    const stackRoundBottom = roundBaseline || stackRect.y + stackRect.height !== baseline;
    const stackRoundTop = roundBaseline || stackRect.y !== baseline;

    return (
      <StackComponent
        borderRadius={borderRadius}
        categoryIndex={categoryIndex}
        height={stackRect.height}
        roundBottom={stackRoundBottom}
        roundTop={stackRoundTop}
        width={stackRect.width}
        x={stackRect.x}
        y={stackRect.y}
        yOrigin={yOrigin}
      >
        {barElements}
      </StackComponent>
    );
  },
);
