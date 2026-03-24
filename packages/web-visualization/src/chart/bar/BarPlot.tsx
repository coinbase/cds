import { memo, useId, useMemo } from 'react';
import { m as motion } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { getStackGroups, instantTransition } from '../utils';

import type { BarSeries } from './BarStack';
import type { BarStackGroupProps } from './BarStackGroup';
import { BarStackGroup } from './BarStackGroup';

export type BarPlotBaseProps = Pick<
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

export type BarPlotProps = BarPlotBaseProps &
  Pick<BarStackGroupProps, 'transitions' | 'transition'>;

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
    transitions,
    transition,
  }) => {
    const { animate, series: allSeries, drawingArea } = useCartesianChartContext();
    const clipPathId = useId();

    const targetSeries: BarSeries[] = useMemo(() => {
      // Then filter by seriesIds if provided
      if (seriesIds !== undefined) {
        return allSeries.filter((s: any) => seriesIds.includes(s.id));
      }

      return allSeries;
    }, [allSeries, seriesIds]);

    const stackGroups = useMemo(() => getStackGroups(targetSeries), [targetSeries]);

    if (!drawingArea) return;

    // Clip path animation for bar is just for chart size changes, not for
    // enter transition. One caveat, bar update transitions are staggered
    // but clip path is not, so some bars could be clipped in rare cases

    return (
      <>
        <defs>
          <clipPath id={clipPathId}>
            {animate ? (
              <motion.rect
                height={drawingArea.height}
                transition={transitions?.update ?? instantTransition}
                width={drawingArea.width}
                x={drawingArea.x}
                y={drawingArea.y}
              />
            ) : (
              <rect
                height={drawingArea.height}
                width={drawingArea.width}
                x={drawingArea.x}
                y={drawingArea.y}
              />
            )}
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipPathId})`}>
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
              transition={transition}
              transitions={transitions}
              xAxisId={group.xAxisId}
              yAxisId={group.yAxisId}
            />
          ))}
        </g>
      </>
    );
  },
);
