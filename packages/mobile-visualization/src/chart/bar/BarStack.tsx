import React, { memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common';
import { useChartContext } from '@coinbase/cds-common/visualizations/charts';
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
   * Default component to render individual bars.
   */
  BarComponent?: BarComponent;
  /**
   * Default bar type.
   */
  type?: BarProps['type'];
  /**
   * Default opacity of the bar.
   */
  fillOpacity?: number;
  /**
   * Disable animations for the bars.
   */
  disableAnimations?: boolean;
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
    BarComponent: defaultBarComponent,
    type: defaultType,
    fillOpacity: defaultFillOpacity,
    disableAnimations,
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
    const { getSeriesData } = useChartContext();
    const getStackedSeriesData = getSeriesData; // getSeriesData now returns stacked data

    const stackGapPx = useMemo(() => {
      return stackGap ? theme.space[stackGap] : 0;
    }, [stackGap, theme]);

    const barMinSizePx = useMemo(() => {
      const px = barMinSize ? theme.space[barMinSize] : 0;
      console.log('🔧 barMinSizePx calculated:', px, 'from barMinSize:', barMinSize);
      return px;
    }, [barMinSize, theme]);

    const stackMinSizePx = useMemo(() => {
      const px = stackMinSize ? theme.space[stackMinSize] : 0;
      console.log('🔧 stackMinSizePx calculated:', px, 'from stackMinSize:', stackMinSize);
      return px;
    }, [stackMinSize, theme]);

    const baseline = useMemo(() => {
      const domain = yScale.domain();
      const [domainMin, domainMax] = domain;
      const baselineValue = domainMin >= 0 ? domainMin : domainMax <= 0 ? domainMax : 0;
      const baseline = yScale(baselineValue) ?? rect.y + rect.height;

      return Math.max(rect.y, Math.min(baseline, rect.y + rect.height));
    }, [rect.height, rect.y, yScale]);

    // Calculate bars for this specific category
    const { bars, stackRect } = useMemo(() => {
      console.log('🚀 BarStack recalculating for category:', categoryIndex);
      console.log('🚀 barMinSizePx:', barMinSizePx, 'stackMinSizePx:', stackMinSizePx);
      console.log('🚀 Series count:', series.length);

      let allBars: Array<{
        seriesId: string;
        x: number;
        y: number;
        width: number;
        height: number;
        BarComponent?: BarComponent;
        type?: BarProps['type'];
        fill?: string;
        fillOpacity?: number;
        stroke?: string;
        strokeWidth?: number;
        disableAnimations?: boolean;
        borderRadius?: BarProps['borderRadius'];
        dataValue?: number | [number, number] | null;
        categoryIndex?: number;
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
        const data = getStackedSeriesData(s.id);
        if (!data) return;

        const value = data[categoryIndex];
        if (value === null || value === undefined) return;

        const originalData = getSeriesData(s.id);
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
          // Use series-specific properties, falling back to defaults
          BarComponent: s.BarComponent,
          type: s.type,
          fill: s.fill || s.color || theme.color.fgPrimary,
          fillOpacity: s.fillOpacity,
          stroke: s.stroke,
          strokeWidth: s.strokeWidth,
          disableAnimations: s.disableAnimations,
          // Pass context data for custom components
          dataValue: value,
          categoryIndex: categoryIndex,
          roundTop: roundBaseline || barTop !== baseline,
          roundBottom: roundBaseline || barBottom !== baseline,
          shouldApplyGap,
        });
      });

      // Apply barMinSize constraints
      if (barMinSizePx > 0) {
        console.log('📏 Applying barMinSize constraints. barMinSizePx:', barMinSizePx);
        console.log('📏 Initial bars count:', allBars.length);

        // First, expand bars that need it and track the expansion
        const expandedBars = allBars.map((bar, index) => {
          console.log(
            `📏 Bar ${index} (${bar.seriesId}): height=${bar.height}, minSize=${barMinSizePx}`,
          );

          if (bar.height < barMinSizePx) {
            console.log(`📏 Bar ${index} needs expansion: ${bar.height} < ${barMinSizePx}`);

            const heightIncrease = barMinSizePx - bar.height;
            const [bottom, top] = (bar.dataValue as [number, number]).sort((a, b) => a - b);

            console.log(
              `📏 Bar ${index} original data: [${bottom}, ${top}], heightIncrease: ${heightIncrease}`,
            );

            // Determine how to expand the bar
            let newBottom = bottom;
            let newTop = top;

            const scaleUnit = Math.abs(yScale(1) - yScale(0));
            console.log(`📏 Bar ${index} scale unit (1px in data units): ${scaleUnit}`);

            if (bottom === 0) {
              // Expand away from baseline (upward for positive)
              newTop = top + heightIncrease / scaleUnit;
              console.log(`📏 Bar ${index} expanding upward from baseline: newTop=${newTop}`);
            } else if (top === 0) {
              // Expand away from baseline (downward for negative)
              newBottom = bottom - heightIncrease / scaleUnit;
              console.log(
                `📏 Bar ${index} expanding downward from baseline: newBottom=${newBottom}`,
              );
            } else {
              // Expand in both directions
              const halfIncrease = heightIncrease / scaleUnit / 2;
              newBottom = bottom - halfIncrease;
              newTop = top + halfIncrease;
              console.log(
                `📏 Bar ${index} expanding both directions: newBottom=${newBottom}, newTop=${newTop}`,
              );
            }

            // Recalculate bar position with new data values
            const newBarBottom = yScale(newBottom) ?? baseline;
            const newBarTop = yScale(newTop) ?? baseline;
            const newHeight = Math.abs(newBarBottom - newBarTop);
            const newY = Math.min(newBarBottom, newBarTop);

            console.log(
              `📏 Bar ${index} after expansion: height=${newHeight}, y=${newY}, dataValue=[${newBottom}, ${newTop}]`,
            );

            return {
              ...bar,
              height: newHeight,
              y: newY,
              dataValue: [newBottom, newTop] as [number, number],
              wasExpanded: true,
            };
          }
          console.log(`📏 Bar ${index} already meets minimum size`);
          return { ...bar, wasExpanded: false };
        });

        // Now reposition all bars to avoid overlaps, similar to stackMinSize logic
        console.log('📏 Repositioning bars to avoid overlaps after barMinSize expansion');

        // Sort bars by position to maintain order
        const sortedExpandedBars = [...expandedBars].sort((a, b) => a.y - b.y);

        // Determine if we have bars above and below baseline
        const barsAboveBaseline = sortedExpandedBars.filter(
          (bar) => bar.y + bar.height <= baseline,
        );
        const barsBelowBaseline = sortedExpandedBars.filter((bar) => bar.y >= baseline);

        console.log(
          '📏 After expansion - Bars above baseline:',
          barsAboveBaseline.length,
          'Bars below baseline:',
          barsBelowBaseline.length,
        );

        // Create a map of new positions
        const newPositions = new Map<string, { y: number; height: number }>();

        // Start positioning from the baseline and work outward
        let currentYAbove = baseline; // Start at baseline, work upward (decreasing Y)
        let currentYBelow = baseline; // Start at baseline, work downward (increasing Y)

        // Position bars above baseline (positive values, decreasing Y)
        for (let i = barsAboveBaseline.length - 1; i >= 0; i--) {
          const bar = barsAboveBaseline[i];
          const newY = currentYAbove - bar.height;

          console.log(
            `📏 Repositioning ${bar.seriesId} (above baseline): y=${newY}, height=${bar.height}`,
          );

          newPositions.set(bar.seriesId, { y: newY, height: bar.height });

          // Update currentYAbove for next bar (preserve gaps)
          if (i > 0) {
            const currentBar = barsAboveBaseline[i];
            const nextBar = barsAboveBaseline[i - 1];
            // Find original bars to get original gap
            const originalCurrent = allBars.find((b) => b.seriesId === currentBar.seriesId)!;
            const originalNext = allBars.find((b) => b.seriesId === nextBar.seriesId)!;
            const originalGap = originalCurrent.y - (originalNext.y + originalNext.height);
            console.log(
              `📏 Preserving gap between ${nextBar.seriesId} and ${currentBar.seriesId}: ${originalGap}px`,
            );
            currentYAbove = newY - originalGap;
          }
        }

        // Position bars below baseline (negative values, increasing Y)
        for (let i = 0; i < barsBelowBaseline.length; i++) {
          const bar = barsBelowBaseline[i];
          const newY = currentYBelow;

          console.log(
            `📏 Repositioning ${bar.seriesId} (below baseline): y=${newY}, height=${bar.height}`,
          );

          newPositions.set(bar.seriesId, { y: newY, height: bar.height });

          // Update currentYBelow for next bar (preserve gaps)
          if (i < barsBelowBaseline.length - 1) {
            const currentBar = barsBelowBaseline[i];
            const nextBar = barsBelowBaseline[i + 1];
            // Find original bars to get original gap
            const originalCurrent = allBars.find((b) => b.seriesId === currentBar.seriesId)!;
            const originalNext = allBars.find((b) => b.seriesId === nextBar.seriesId)!;
            const originalGap = originalNext.y - (originalCurrent.y + originalCurrent.height);
            console.log(
              `📏 Preserving gap between ${currentBar.seriesId} and ${nextBar.seriesId}: ${originalGap}px`,
            );
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

        console.log('📏 After barMinSize repositioning, bars count:', allBars.length);

        // Recalculate stack bounds after barMinSize expansion and repositioning
        if (allBars.length > 0) {
          minY = Math.min(...allBars.map((bar) => bar.y));
          maxY = Math.max(...allBars.map((bar) => bar.y + bar.height));
          console.log(
            '📏 Recalculated stack bounds after barMinSize: minY=',
            minY,
            'maxY=',
            maxY,
            'height=',
            maxY - minY,
          );
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

      console.log(
        '📦 Initial stack bounds calculated: height=',
        stackBounds.height,
        'y=',
        stackBounds.y,
      );

      // Apply stackMinSize constraints
      if (stackMinSizePx > 0) {
        if (allBars.length === 1 && stackBounds.height < stackMinSizePx) {
          // For single bars (non-stacked), treat stackMinSize like barMinSize
          console.log('📐 Applying stackMinSize to single bar (non-stacked behavior)');
          console.log('📐 Current bar height:', stackBounds.height, 'Required:', stackMinSizePx);

          const bar = allBars[0];
          const heightIncrease = stackMinSizePx - bar.height;
          const [bottom, top] = (bar.dataValue as [number, number]).sort((a, b) => a - b);

          console.log(
            `📐 Single bar original data: [${bottom}, ${top}], heightIncrease: ${heightIncrease}`,
          );

          // Determine how to expand the bar (same logic as barMinSize)
          let newBottom = bottom;
          let newTop = top;

          const scaleUnit = Math.abs(yScale(1) - yScale(0));
          console.log(`📐 Single bar scale unit: ${scaleUnit}`);

          if (bottom === 0) {
            // Expand away from baseline (upward for positive)
            newTop = top + heightIncrease / scaleUnit;
            console.log(`📐 Single bar expanding upward from baseline: newTop=${newTop}`);
          } else if (top === 0) {
            // Expand away from baseline (downward for negative)
            newBottom = bottom - heightIncrease / scaleUnit;
            console.log(`📐 Single bar expanding downward from baseline: newBottom=${newBottom}`);
          } else {
            // Expand in both directions
            const halfIncrease = heightIncrease / scaleUnit / 2;
            newBottom = bottom - halfIncrease;
            newTop = top + halfIncrease;
            console.log(
              `📐 Single bar expanding both directions: newBottom=${newBottom}, newTop=${newTop}`,
            );
          }

          // Recalculate bar position with new data values
          const newBarBottom = yScale(newBottom) ?? baseline;
          const newBarTop = yScale(newTop) ?? baseline;
          const newHeight = Math.abs(newBarBottom - newBarTop);
          const newY = Math.min(newBarBottom, newBarTop);

          console.log(
            `📐 Single bar after expansion: height=${newHeight}, y=${newY}, dataValue=[${newBottom}, ${newTop}]`,
          );

          allBars[0] = {
            ...bar,
            height: newHeight,
            y: newY,
            dataValue: [newBottom, newTop] as [number, number],
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
          console.log('📐 Applying stackMinSize to stacked bars (height scaling only)');
          console.log('📐 Current stack height:', stackBounds.height, 'Required:', stackMinSizePx);

          // Calculate total bar height (excluding gaps)
          const totalBarHeight = allBars.reduce((sum, bar) => sum + bar.height, 0);
          const totalGapHeight = stackBounds.height - totalBarHeight;

          console.log('📐 Total bar height:', totalBarHeight, 'Total gap height:', totalGapHeight);

          // Calculate how much we need to increase bar heights
          const requiredBarHeight = stackMinSizePx - totalGapHeight;
          const barScaleFactor = requiredBarHeight / totalBarHeight;

          console.log(
            '📐 Bar scale factor:',
            barScaleFactor,
            'Required bar height:',
            requiredBarHeight,
          );

          // Sort bars by position to maintain order
          const sortedBars = [...allBars].sort((a, b) => a.y - b.y);

          // Determine if we have bars above and below baseline
          const barsAboveBaseline = sortedBars.filter((bar) => bar.y + bar.height <= baseline);
          const barsBelowBaseline = sortedBars.filter((bar) => bar.y >= baseline);

          console.log(
            '📐 Bars above baseline:',
            barsAboveBaseline.length,
            'Bars below baseline:',
            barsBelowBaseline.length,
          );
          console.log('📐 Baseline position:', baseline);

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

            console.log(
              `📐 Bar ${bar.seriesId} (above baseline) before scaling: height=${bar.height}, y=${
                bar.y
              }, dataValue=${JSON.stringify(bar.dataValue)}`,
            );
            console.log(
              `📐 Bar ${bar.seriesId} (above baseline) after scaling: height=${newHeight}, y=${newY}, baseline=${baseline}`,
            );

            newPositions.set(bar.seriesId, { y: newY, height: newHeight });

            // Update currentYAbove for next bar (preserve gaps)
            if (i > 0) {
              const currentBar = barsAboveBaseline[i];
              const nextBar = barsAboveBaseline[i - 1];
              const originalGap = currentBar.y - (nextBar.y + nextBar.height);
              console.log(
                `📐 Gap between ${nextBar.seriesId} and ${currentBar.seriesId}: ${originalGap}px`,
              );
              currentYAbove = newY - originalGap;
            }
          }

          // Position bars below baseline (negative values, increasing Y)
          for (let i = 0; i < barsBelowBaseline.length; i++) {
            const bar = barsBelowBaseline[i];
            const newHeight = bar.height * barScaleFactor;
            const newY = currentYBelow;

            console.log(
              `📐 Bar ${bar.seriesId} (below baseline) before scaling: height=${bar.height}, y=${
                bar.y
              }, dataValue=${JSON.stringify(bar.dataValue)}`,
            );
            console.log(
              `📐 Bar ${bar.seriesId} (below baseline) after scaling: height=${newHeight}, y=${newY}, baseline=${baseline}`,
            );

            newPositions.set(bar.seriesId, { y: newY, height: newHeight });

            // Update currentYBelow for next bar (preserve gaps)
            if (i < barsBelowBaseline.length - 1) {
              const currentBar = barsBelowBaseline[i];
              const nextBar = barsBelowBaseline[i + 1];
              const originalGap = nextBar.y - (currentBar.y + currentBar.height);
              console.log(
                `📐 Gap between ${currentBar.seriesId} and ${nextBar.seriesId}: ${originalGap}px`,
              );
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

          console.log(
            '📐 New stack bounds: minY=',
            newMinY,
            'maxY=',
            newMaxY,
            'height=',
            newMaxY - newMinY,
          );

          stackBounds = {
            x,
            y: newMinY,
            width,
            height: newMaxY - newMinY,
          };
        } else {
          console.log(
            '📐 Stack already meets minimum size:',
            stackBounds.height,
            '>=',
            stackMinSizePx,
          );
        }

        // Reapply border radius logic only if we actually scaled
        if (stackBounds.height < stackMinSizePx) {
          console.log('📐 Reapplying border radius logic after stackMinSize scaling');
          allBars = applyBorderRadiusLogic(allBars);
        }
      }

      console.log(
        '🎯 Final result - bars count:',
        allBars.length,
        'stack height:',
        stackBounds.height,
      );
      console.log(
        '🎯 Final bars:',
        allBars.map((b) => ({ id: b.seriesId, height: b.height, y: b.y })),
      );

      return { bars: allBars, stackRect: stackBounds };
    }, [
      categoryIndex,
      barMinSizePx,
      stackMinSizePx,
      series,
      x,
      baseline,
      width,
      getStackedSeriesData,
      getSeriesData,
      theme.color.fgPrimary,
      roundBaseline,
      stackGapPx,
      yScale,
    ]);

    // Use the same baseline for yOrigin (animations)
    const yOrigin = baseline;

    const barElements = bars.map((bar, index) => (
      <Bar
        key={`${bar.seriesId}-${categoryIndex}-${index}`}
        BarComponent={bar.BarComponent || defaultBarComponent}
        borderRadius={borderRadius}
        categoryIndex={bar.categoryIndex}
        dataValue={bar.dataValue}
        disableAnimations={bar.disableAnimations ?? disableAnimations}
        fill={bar.fill}
        fillOpacity={bar.fillOpacity ?? defaultFillOpacity}
        height={bar.height}
        roundBottom={bar.roundBottom}
        roundTop={bar.roundTop}
        seriesId={bar.seriesId}
        stroke={bar.stroke ?? defaultStroke}
        strokeWidth={bar.strokeWidth ?? defaultStrokeWidth}
        type={bar.type || defaultType}
        width={bar.width}
        x={bar.x}
        y={bar.y}
        yOrigin={yOrigin}
        yScale={yScale}
      />
    ));

    const stackRoundBottom = useMemo(() => {
      return roundBaseline || stackRect.y + stackRect.height !== baseline;
    }, [roundBaseline, stackRect.y, stackRect.height, baseline]);

    const stackRoundTop = useMemo(() => {
      return roundBaseline || stackRect.y !== baseline;
    }, [roundBaseline, stackRect.y, baseline]);

    return (
      <StackComponent
        borderRadius={borderRadius}
        categoryIndex={categoryIndex}
        disableAnimations={disableAnimations}
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
