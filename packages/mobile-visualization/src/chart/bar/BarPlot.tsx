import { memo, useId, useMemo } from 'react';
import { ClipPath, Defs, G, Rect } from 'react-native-svg';

import { useCartesianChartContext } from '../ChartProvider';
import { defaultAxisId } from '../utils';

import type { BarSeries } from './BarChart';
import type { BarStackGroupProps } from './BarStackGroup';
import { BarStackGroup } from './BarStackGroup';

export type BarPlotProps = Pick<
  BarStackGroupProps,
  | 'barPadding'
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
> & {
  /**
   * Array of series IDs to render.
   * If not provided, renders all series in the chart.
   */
  seriesIds?: string[];
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
    BarStackComponent,
    stackGap,
    barMinSize,
    stackMinSize,
  }) => {
    const { series: allSeries, drawingArea } = useCartesianChartContext();
    const clipPathId = useId();

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
        <Defs>
          <ClipPath id={clipPathId}>
            <Rect
              height={drawingArea.height}
              width={drawingArea.width}
              x={drawingArea.x}
              y={drawingArea.y}
            />
          </ClipPath>
        </Defs>
        <G clipPath={`url(#${clipPathId})`}>
          {stackGroups.map((group, stackIndex) => (
            <BarStackGroup
              key={group.stackId}
              BarComponent={defaultBarComponent}
              BarStackComponent={BarStackComponent}
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
        </G>
      </>
    );
  },
);
