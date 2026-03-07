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
  | 'transitions'
  | 'transition'
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
    const { layout, getXScale, getYScale, drawingArea, dataLength } = useCartesianChartContext();

    const xScale = getXScale();
    const yScale = getYScale(yAxisId);

    const stackConfigs = useMemo(() => {
      if (!xScale || !yScale || !drawingArea || dataLength === 0) return [];

      const indexScale = layout !== 'horizontal' ? xScale : yScale;

      if (!isCategoricalScale(indexScale)) {
        return [];
      }

      const categoryWidth = indexScale.bandwidth();

      // Calculate thickness for each stack within a category
      const gapSize = totalStacks > 1 ? (categoryWidth * barPadding) / (totalStacks - 1) : 0;
      const stackThickness =
        categoryWidth / totalStacks - getBarSizeAdjustment(totalStacks, gapSize);

      const configs: Array<{
        categoryIndex: number;
        indexPos: number;
        thickness: number;
      }> = [];

      // Calculate position for each category
      for (let categoryIndex = 0; categoryIndex < dataLength; categoryIndex++) {
        // Get position for this category along the index axis
        const categoryPos = indexScale(categoryIndex);
        if (categoryPos !== undefined) {
          // Calculate position for this specific stack within the category
          const stackPos = categoryPos + stackIndex * (stackThickness + gapSize);

          configs.push({
            categoryIndex,
            indexPos: stackPos,
            thickness: stackThickness,
          });
        }
      }

      return configs;
    }, [xScale, yScale, drawingArea, dataLength, stackIndex, totalStacks, barPadding]);

    const indexScaleComputed = layout !== 'horizontal' ? xScale : yScale;
    const valueScaleComputed = layout !== 'horizontal' ? yScale : xScale;

    if (indexScaleComputed && !isCategoricalScale(indexScaleComputed)) {
      throw new Error(
        `BarStackGroup requires a band scale for ${
          layout !== 'horizontal' ? 'x-axis' : 'y-axis'
        }. See https://cds.coinbase.com/components/graphs/${
          layout !== 'horizontal' ? 'XAxis' : 'YAxis'
        }/#scale-type`,
      );
    }

    if (!indexScaleComputed || !valueScaleComputed || !drawingArea || stackConfigs.length === 0)
      return null;

    return stackConfigs.map(({ categoryIndex, indexPos, thickness }) => (
      <BarStack
        {...props}
        key={`stack-${stackIndex}-category-${categoryIndex}`}
        categoryIndex={categoryIndex}
        rect={drawingArea}
        series={series}
        thickness={thickness}
        indexPos={indexPos}
        yAxisId={yAxisId}
        indexScale={indexScaleComputed}
        valueScale={valueScaleComputed}
      />
    ));
  },
);
