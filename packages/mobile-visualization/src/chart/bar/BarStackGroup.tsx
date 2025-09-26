import React, { memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common';
import { defaultAxisId } from '@coinbase/cds-common/visualizations/charts';
import { useChartContext } from '../ChartProvider';
import { getBarSizeAdjustment } from '@coinbase/cds-common/visualizations/charts/bar';
import { isCategoricalScale } from '@coinbase/cds-common/visualizations/charts/scale';

import type { BarComponent, BarProps } from './Bar';
import type { BarSeries } from './BarChart';
import { BarStack } from './BarStack';
import type { StackComponent } from './DefaultStackComponent';

// todo: simplify props by reusing from other types
export type BarStackGroupProps = {
  /**
   * Array of series configurations that belong to this stack group.
   */
  series: BarSeries[];
  /**
   * Y axis ID to use.
   * If not provided, defaults to the default axis id.
   */
  yAxisId?: string;
  /**
   * Index of this stack within the category (0-based).
   */
  stackIndex: number;
  /**
   * Total number of stacks per category.
   */
  totalStacks: number;
  /**
   * Padding between bar groups (0-1).
   * @default 0.1
   */
  barPadding?: number;
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
   * Whether to round the baseline of a bar (where the value is 0).
   */
  roundBaseline?: boolean;
  stackGap?: ThemeVars.Space;
  /**
   * Minimum size for individual bars in the stack.
   */
  barMinSize?: ThemeVars.Space;
  /**
   * Minimum size for the entire stack.
   */
  stackMinSize?: ThemeVars.Space;
  /**
   * Custom component to render the stack container.
   * Can be used to add clip paths, outlines, or other custom styling.
   * @default DefaultStackComponent
   */
  StackComponent?: StackComponent;
};

/**
 * BarStackGroup component that renders a group of stacks across all categories.
 * Delegates the actual stacking logic to BarStack for each category.
 */
export const BarStackGroup = memo<BarStackGroupProps>(
  ({ series, yAxisId = defaultAxisId, stackIndex, totalStacks, barPadding = 0.1, ...props }) => {
    const { getSeriesData, getXScale, getYScale, drawingArea } = useChartContext();

    const xScale = getXScale();
    const yScale = getYScale(yAxisId);

    const maxDataLength = useMemo(() => {
      if (!series || series.length === 0) return 0;

      let maxLength = 0;
      series.forEach((s) => {
        const data = getSeriesData(s.id);
        if (data && data.length > maxLength) {
          maxLength = data.length;
        }
      });

      return maxLength;
    }, [series, getSeriesData]);

    const stackConfigs = useMemo(() => {
      if (!xScale || !yScale || !drawingArea || maxDataLength === 0) return [];

      if (!isCategoricalScale(xScale)) {
        return [];
      }

      const categoryWidth = xScale.bandwidth();

      // Calculate width for each stack within a category
      // Only apply barPadding when there are multiple stacks
      const gapWidth = totalStacks > 1 ? (categoryWidth * barPadding) / (totalStacks - 1) : 0;
      const barWidth = categoryWidth / totalStacks - getBarSizeAdjustment(totalStacks, gapWidth);

      const configs: Array<{
        categoryIndex: number;
        x: number;
        width: number;
      }> = [];

      // Calculate position for each category
      for (let categoryIndex = 0; categoryIndex < maxDataLength; categoryIndex++) {
        // Get x position for this category
        const categoryX = xScale(categoryIndex);
        if (categoryX !== undefined) {
          // Calculate x position for this specific stack within the category
          const stackX = categoryX + stackIndex * (barWidth + gapWidth);

          configs.push({
            categoryIndex,
            x: stackX,
            width: barWidth,
          });
        }
      }

      return configs;
    }, [xScale, yScale, drawingArea, maxDataLength, stackIndex, totalStacks, barPadding]);

    if (xScale && !isCategoricalScale(xScale)) {
      console.error('BarStackGroup requires a band scale for x-axis');
      return null;
    }

    if (!yScale || !drawingArea || stackConfigs.length === 0) {
      return null;
    }

    return stackConfigs.map(({ categoryIndex, x, width }) => (
      <BarStack
        {...props}
        key={`stack-${stackIndex}-category-${categoryIndex}`}
        categoryIndex={categoryIndex}
        rect={drawingArea}
        series={series}
        width={width}
        x={x}
        yScale={yScale}
      />
    ));
  },
);
