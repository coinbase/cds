import { memo, useMemo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { getBarSizeAdjustment } from '../utils/bar';
import { isCategoricalScale } from '../utils/scale';

import type { BarStackProps } from './BarStack';
import { BarStack } from './BarStack';

export type BarStackGroupProps = Pick<
  BarStackProps,
  | 'BarComponent'
  | 'fillOpacity'
  | 'stroke'
  | 'strokeWidth'
  | 'borderRadius'
  | 'roundBaseline'
  | 'stackGap'
  | 'barMinSize'
  | 'stackMinSize'
  | 'BarStackComponent'
> &
  Pick<BarStackProps, 'series' | 'yAxisId'> & {
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
  };

/**
 * BarStackGroup component that renders a group of stacks across all categories.
 * Delegates the actual stacking logic to BarStack for each category.
 */
export const BarStackGroup = memo<BarStackGroupProps>(
  ({ series, yAxisId, stackIndex, totalStacks, barPadding = 0.1, ...props }) => {
    const { getSeriesData, getXScale, getYScale, drawingArea } = useCartesianChartContext();

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
      throw new Error(
        'BarStackGroup requires a band scale for x-axis. See https://cds.coinbase.com/components/graphs/XAxis/#scale-type',
      );
    }

    if (!yScale || !drawingArea || stackConfigs.length === 0) return;

    return stackConfigs.map(({ categoryIndex, x, width }) => (
      <BarStack
        {...props}
        key={`stack-${stackIndex}-category-${categoryIndex}`}
        categoryIndex={categoryIndex}
        rect={drawingArea}
        series={series}
        width={width}
        x={x}
        yAxisId={yAxisId}
        yScale={yScale}
      />
    ));
  },
);
