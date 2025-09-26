import React, { memo, useMemo, useRef } from 'react';
import type { ThemeVars } from '@coinbase/cds-common';
import { defaultAxisId } from '@coinbase/cds-common/visualizations/charts';
import { generateRandomId } from '@coinbase/cds-utils';

import { useChartContext } from '../ChartProvider';

import type { BarComponent, BarProps } from './Bar';
import type { BarSeries } from './BarChart';
import { BarStackGroup } from './BarStackGroup';
import type { StackComponent } from './DefaultStackComponent';

export type BarPlotProps = {
  /**
   * Array of series IDs to render.
   * If not provided, renders all series in the chart.
   */
  seriesIds?: string[];
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
  /**
   * Custom component to render the stack container.
   * Can be used to add clip paths, outlines, or other custom styling.
   * @default DefaultStackComponent
   */
  StackComponent?: StackComponent;
};

/**
 * BarPlot component that handles multiple series with proper stacking coordination.
 * Groups series by stack ID + y-axis ID combination and renders BarStackGroup for each group.
 * This allows series with different y-axes to be rendered side by side while preventing
 * cross-axis stacking (e.g., comparing $1M vs $1B companies on different scales).
 */
export const BarPlot = memo<BarPlotProps>(
  ({
    seriesIds,
    barPadding = 0.1,
    BarComponent: defaultBarComponent,
    fillOpacity: defaultFillOpacity,
    stroke: defaultStroke,
    strokeWidth: defaultStrokeWidth,
    borderRadius: defaultBorderRadius,
    roundBaseline,
    StackComponent,
    stackGap,
    barMinSize,
    stackMinSize,
  }) => {
    const { series: allSeries, drawingArea } = useChartContext();
    const clipPathId = useRef(generateRandomId()).current;

    const targetSeries = useMemo(() => {
      // Then filter by seriesIds if provided
      if (seriesIds !== undefined) {
        return allSeries.filter((s: any) => seriesIds.includes(s.id));
      }

      return allSeries;
    }, [allSeries, seriesIds]);

    const stackGroups = useMemo(() => {
      const groups = new Map<
        string,
        {
          stackId: string;
          series: BarSeries[];
          yAxisId?: string;
        }
      >();

      // Group series into stacks based on stackId + yAxisId combination
      targetSeries.forEach((series) => {
        const yAxisId = series.yAxisId ?? defaultAxisId;
        const stackId = series.stackId || `individual-${series.id}`;
        const stackKey = `${stackId}:${yAxisId}`;

        if (!groups.has(stackKey)) {
          groups.set(stackKey, {
            stackId: stackKey,
            series: [],
            yAxisId: series.yAxisId,
          });
        }

        const group = groups.get(stackKey)!;
        group.series.push(series);
      });

      return Array.from(groups.values());
    }, [targetSeries]);

    if (!drawingArea) {
      return null;
    }

    return (
      <>
        <defs>
          <clipPath id={clipPathId}>
            <rect
              height={drawingArea.height}
              width={drawingArea.width}
              x={drawingArea.x}
              y={drawingArea.y}
            />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipPathId})`} data-testid="whoa">
          {stackGroups.map((group, stackIndex) => (
            <BarStackGroup
              key={group.stackId}
              BarComponent={defaultBarComponent}
              StackComponent={StackComponent}
              barMinSize={barMinSize}
              barPadding={barPadding}
              borderRadius={defaultBorderRadius}
              fillOpacity={defaultFillOpacity}
              roundBaseline={roundBaseline}
              series={group.series}
              stackGap={stackGap}
              stackIndex={stackIndex}
              stackMinSize={stackMinSize}
              stroke={defaultStroke}
              strokeWidth={defaultStrokeWidth}
              totalStacks={stackGroups.length}
              yAxisId={group.yAxisId}
            />
          ))}
        </g>
      </>
    );
  },
);
