import { memo, useEffect, useMemo, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import type { Rect } from '@coinbase/cds-common/types';
import { Group, Skia, usePathInterpolation } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { getStackGroups } from '../utils';
import { buildTransition, instantTransition } from '../utils/transition';

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

const makeClipPath = (area: Rect) => {
  const path = Skia.Path.Make();
  path.addRect(area);
  return path;
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
    transitions,
    transition,
  }) => {
    const { animate, series: allSeries, drawingArea } = useCartesianChartContext();

    const targetSeries: BarSeries[] = useMemo(() => {
      // Then filter by seriesIds if provided
      if (seriesIds !== undefined) {
        return allSeries.filter((s: any) => seriesIds.includes(s.id));
      }

      return allSeries;
    }, [allSeries, seriesIds]);

    const stackGroups = useMemo(() => getStackGroups(targetSeries), [targetSeries]);

    const clipUpdateTransition = useMemo(
      () => (transitions?.update !== undefined ? transitions.update : instantTransition),
      [transitions?.update],
    );

    const emptyPath = useMemo(() => Skia.Path.Make(), []);

    const initialPath = useMemo(
      () => (drawingArea ? makeClipPath(drawingArea) : emptyPath),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    const [clipPaths, setClipPaths] = useState({ from: initialPath, to: initialPath });
    const clipProgress = useSharedValue(0);

    useEffect(() => {
      if (!drawingArea) return;
      const nextPath = makeClipPath(drawingArea);
      setClipPaths((prev) => ({ from: prev.to, to: nextPath }));
      if (drawingArea.width || !drawingArea.height) {
        clipProgress.value = 1;
      } else {
        clipProgress.value = 0;
        clipProgress.value = buildTransition(1, animate ? clipUpdateTransition : null);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawingArea, animate, clipUpdateTransition]);

    const animatedClipPath = usePathInterpolation(
      clipProgress,
      [0, 1],
      [clipPaths.from, clipPaths.to],
    );

    if (!drawingArea) return;

    // Clip path animation for bar is just for chart size changes, not for
    // enter transition. One caveat, bar update transitions are staggered
    // but clip path is not, so some bars could be clipped in rare cases

    return (
      <Group clip={animatedClipPath}>
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
      </Group>
    );
  },
);
