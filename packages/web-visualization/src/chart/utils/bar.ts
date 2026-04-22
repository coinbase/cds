import type { Rect } from '@coinbase/cds-common/types';
import type { Transition } from 'framer-motion';

import type { BarBaseProps, BarComponent } from '../bar/Bar';
import type { BarSeries } from '../bar/BarStack';

import { defaultAxisId as fallbackAxisId } from './axis';
import type { CartesianChartLayout } from './context';
import type { GradientDefinition, GradientStop } from './gradient';
import { evaluateGradientAtValue } from './gradient';
import type { ChartScaleFunction } from './scale';
import { defaultTransition } from './transition';

/**
 * A bar-specific transition that extends Transition with stagger support.
 * When `staggerDelay` is provided, bars will animate with increasing delays
 * based on their position along the category axis (vertical: left-to-right,
 * horizontal: top-to-bottom).
 *
 * @example
 * // Bars stagger in from left to right over 0.25s, each animating for 0.75s
 * { type: 'tween', duration: 0.75, staggerDelay: 0.25 }
 */
export type BarTransition = Transition & {
  /**
   * Maximum stagger delay (seconds) distributed across bars by x position.
   * Leftmost bar starts immediately, rightmost starts after this delay.
   */
  staggerDelay?: number;
};

/**
 * Computes a bar's normalized [0, 1] position along the category axis, used for
 * stagger-delay calculations.
 *
 * Vertical charts stagger left-to-right (x axis); horizontal charts stagger
 * top-to-bottom (y axis). Returns 0 when the drawing area has no extent.
 *
 * @param layout - The layout of the chart
 * @param x - Bar's left edge in pixels
 * @param y - Bar's top edge in pixels
 */
export const getNormalizedStagger = (
  layout: CartesianChartLayout,
  x: number,
  y: number,
  drawingArea: Rect,
): number => {
  if (layout === 'horizontal') {
    return drawingArea.height > 0 ? (y - drawingArea.y) / drawingArea.height : 0;
  }
  return drawingArea.width > 0 ? (x - drawingArea.x) / drawingArea.width : 0;
};

/**
 * Strips `staggerDelay` from a transition and computes a positional delay.
 *
 * @param transition - The transition config (may include staggerDelay)
 * @param normalizedPosition - The bar's normalized position along the category axis (0–1)
 * @returns A standard Transition with computed delay
 */
export const withStaggerDelayTransition = (
  transition: BarTransition | null,
  normalizedPosition: number,
): Transition | null => {
  if (!transition) return null;
  const { staggerDelay, ...baseTransition } = transition;
  if (!staggerDelay) return transition;
  return {
    ...baseTransition,
    delay: (baseTransition?.delay ?? 0) + normalizedPosition * staggerDelay,
  };
};

/**
 * Default bar enter transition. Uses the default spring with a stagger delay
 * so bars spring into place from left to right.
 * `{ type: 'spring', stiffness: 900, damping: 120, mass: 4, staggerDelay: 0.25 }`
 */
export const defaultBarEnterTransition: BarTransition = {
  ...defaultTransition,
  staggerDelay: 0.25,
};

/**
 * Default bar enter opacity transition.
 * `{ type: 'tween', duration: 0.2 }`
 */
export const defaultBarEnterOpacityTransition: BarTransition = {
  type: 'tween',
  duration: 0.2,
};

/**
 * Calculates the size adjustment needed for bars when accounting for gaps between them.
 * This function helps determine how much to reduce each bar's width to accommodate
 * the specified gap size between multiple bars in a group.
 *
 * @param barCount - The number of bars in the group
 * @param gapSize - The desired gap size between bars
 * @returns The amount to reduce each bar's size by, or 0 if there's only one bar
 *
 * @example
 * ```typescript
 * // For 3 bars with 12px gaps, each bar should be reduced by 8px
 * const adjustment = getBarSizeAdjustment(3, 12);
 *
 * // Single bar needs no adjustment
 * const singleBarAdjustment = getBarSizeAdjustment(1, 10);
 * ```
 */
export function getBarSizeAdjustment(barCount: number, gapSize: number): number {
  if (barCount <= 1) {
    return 0;
  }

  return (gapSize * (barCount - 1)) / barCount;
}

type StackGroup = {
  stackId: string;
  series: BarSeries[];
  xAxisId?: string;
  yAxisId?: string;
};

/**
 * Groups bar series into stack groups scoped by stackId + axis IDs.
 *
 * Series with no `stackId` are treated as independent stacks keyed by series id.
 * Axis IDs are included in the group key so series on different axes never stack together.
 */
export function getStackGroups(
  series: BarSeries[],
  defaultAxisId: string = fallbackAxisId,
): StackGroup[] {
  const groups: Record<string, StackGroup> = {};

  series.forEach((entry) => {
    const xAxisId = entry.xAxisId ?? defaultAxisId;
    const yAxisId = entry.yAxisId ?? defaultAxisId;
    const stackId = entry.stackId || `individual-${entry.id}`;
    const stackKey = `${stackId}:${xAxisId}:${yAxisId}`;

    if (!groups[stackKey]) {
      groups[stackKey] = {
        stackId: stackKey,
        series: [],
        xAxisId: entry.xAxisId,
        yAxisId: entry.yAxisId,
      };
    }

    groups[stackKey].series.push(entry);
  });

  return Object.values(groups);
}

/**
 * A single positioned bar in a stack, used throughout all bar layout helpers.
 */
/**
 * A single positioned bar — the source-of-truth data shape for the bar system.
 *
 * Layout fields (`valuePos`, `length`) are axis-agnostic and used by helper
 * functions during computation. Rendering fields (`x`, `y`, `width`, `height`,
 * `origin`, `dataX`, `dataY`) are derived at the end of `getBars` and can be
 * passed directly to the `<Bar>` component.
 *
 * `BarBaseProps` in `Bar.tsx` picks from this type.
 */
/**
 * A fully computed bar ready to render — extends `BarBaseProps` with required
 * identity fields and internal layout data used by helper functions.
 *
 * `getBars` returns `BarData[]` with every `BarBaseProps` field populated so
 * the `<Bar>` component can consume them directly.
 */
type BarData = BarBaseProps & {
  /** The ID of the series this bar belongs to. */
  seriesId: string;
  /** Coordinate of the baseline/origin for animations. */
  origin: number;
  /** Position along the value axis in pixels (axis-agnostic, used by layout helpers). */
  valuePos: number;
  /** Size along the value axis in pixels (axis-agnostic, used by layout helpers). */
  length: number;
  /** The raw data value as [baseline, value], used by layout helpers for gap/rounding logic. */
  dataValue: [number, number];
  /** Whether gap distribution should be applied to this bar in a stack. */
  shouldApplyGap?: boolean;
};

/**
 * Applies proportional gap distribution to a stack of bars, maintaining total stack length.
 * Gaps are only inserted between bars that have `shouldApplyGap = true`.
 * Positive (above-baseline) and negative (below-baseline) groups are gapped independently.
 *
 * @param bars - Array of bar items with current valuePos and length
 * @param stackGap - Gap size in pixels between adjacent bars
 * @param layout - The layout of the chart
 * @param baseline - Value-axis baseline in data space
 * @param baselinePx - Pixel position of the value-axis baseline on the value axis
 * @returns New array of bars with adjusted valuePos and length
 */
function applyStackGap(
  bars: BarData[],
  stackGap: number,
  layout: CartesianChartLayout,
  baseline: number,
  baselinePx: number,
): BarData[] {
  if (!stackGap || bars.length <= 1) return bars;

  const result = [...bars];

  const barsAboveBaseline = bars.filter((bar) => {
    const [bottom, top] = [...bar.dataValue].sort((a, b) => a - b);
    return bottom >= baseline && top !== bottom && bar.shouldApplyGap;
  });
  const barsBelowBaseline = bars.filter((bar) => {
    const [bottom, top] = [...bar.dataValue].sort((a, b) => a - b);
    return top <= baseline && bottom !== top && bar.shouldApplyGap;
  });

  const applyGapGroup = (group: BarData[], growing: boolean) => {
    if (group.length <= 1) return;

    const totalGapSpace = stackGap * (group.length - 1);
    const totalDataLength = group.reduce((sum, bar) => sum + bar.length, 0);
    const lengthReduction = totalGapSpace / totalDataLength;

    const sortedBars = growing
      ? [...group].sort((a, b) => b.valuePos - a.valuePos)
      : [...group].sort((a, b) => a.valuePos - b.valuePos);

    let currentEdge = baselinePx;
    sortedBars.forEach((bar, index) => {
      const newLength = bar.length * (1 - lengthReduction);
      let newValuePos: number;

      if (growing) {
        newValuePos = currentEdge - newLength;
        currentEdge = newValuePos - (index < sortedBars.length - 1 ? stackGap : 0);
      } else {
        newValuePos = currentEdge;
        currentEdge = newValuePos + newLength + (index < sortedBars.length - 1 ? stackGap : 0);
      }

      const barIndex = result.findIndex((b) => b.seriesId === bar.seriesId);
      if (barIndex !== -1) {
        result[barIndex] = { ...result[barIndex], length: newLength, valuePos: newValuePos };
      }
    });
  };

  // Positive bars: grow up in vertical (decreasing Y), grow right in horizontal (increasing X)
  applyGapGroup(barsAboveBaseline, layout === 'vertical');
  // Negative bars: grow down in vertical (increasing Y), grow left in horizontal (decreasing X)
  applyGapGroup(barsBelowBaseline, layout !== 'vertical');

  return result;
}

/**
 * Expands bars that are shorter than `barMinSize` to the minimum size.
 * Non-expanded bars are scaled down proportionally to keep the total bar length constant,
 * preventing stacked bars from overflowing the chart area.
 *
 * Bars are then repositioned from the baseline, preserving original gaps between them.
 *
 * @param bars - Array of bar items with current valuePos and length
 * @param barMinSize - Minimum bar size in pixels
 * @param baseline - Value-axis baseline in data space
 * @param baselinePx - Pixel position of the value-axis baseline on the value axis
 * @param layout - Chart layout
 * @returns New array of bars with adjusted valuePos and length
 */
function applyBarMinSize(
  bars: BarData[],
  barMinSize: number,
  baseline: number,
  baselinePx: number,
  layout: CartesianChartLayout,
): BarData[] {
  if (!barMinSize || bars.length === 0) return bars;

  const originalTotalLength = bars.reduce((sum, bar) => sum + bar.length, 0);
  const needsExpansion = bars.map((bar) => bar.length < barMinSize);
  const expandedTotalLength = bars.reduce(
    (sum, bar, i) => sum + (needsExpansion[i] ? barMinSize : bar.length),
    0,
  );

  let finalLengths: number[];
  if (expandedTotalLength > originalTotalLength) {
    // Scale down non-expanded bars to keep total bar length constant
    const spaceForExpanded = needsExpansion.filter(Boolean).length * barMinSize;
    const spaceForNonExpanded = Math.max(0, originalTotalLength - spaceForExpanded);
    const nonExpandedOrigTotal = bars.reduce(
      (sum, bar, i) => (!needsExpansion[i] ? sum + bar.length : sum),
      0,
    );
    const scaleFactor = nonExpandedOrigTotal > 0 ? spaceForNonExpanded / nonExpandedOrigTotal : 0;
    finalLengths = bars.map((bar, i) =>
      needsExpansion[i] ? barMinSize : bar.length * scaleFactor,
    );
  } else {
    finalLengths = bars.map((bar, i) => (needsExpansion[i] ? barMinSize : bar.length));
  }

  const expandedBars = bars.map((bar, i) => ({
    ...bar,
    length: finalLengths[i],
  }));

  const newPositions = new Map<string, { valuePos: number; length: number }>();

  // Range bars (shouldApplyGap=false) float at data-defined coordinates independent of the
  // baseline. Restacking them from the zero baseline would place them off-screen when the
  // y-axis domain doesn't include 0 (e.g., a price chart with domain [28000, 37000]).
  // Instead, expand them in-place, centered on their original midpoint.
  for (let i = 0; i < bars.length; i++) {
    if (bars[i].shouldApplyGap === false) {
      const originalMid = bars[i].valuePos + bars[i].length / 2;
      newPositions.set(bars[i].seriesId, {
        valuePos: originalMid - expandedBars[i].length / 2,
        length: expandedBars[i].length,
      });
    }
  }

  // Stacked bars (shouldApplyGap=true/undefined): classify by which side of the baseline
  // they're on and restack from the baseline outward.
  const stackedSortedBars = [...expandedBars]
    .filter((bar) => bar.shouldApplyGap !== false)
    .sort((a, b) => a.valuePos - b.valuePos);

  if (stackedSortedBars.length > 0) {
    // Classify using dataValue to correctly identify which side of the baseline each bar is on,
    // independent of the current valuePos (which hasn't been repositioned yet).
    const barsAboveBaseline = stackedSortedBars.filter((bar) => {
      const [bottom, top] = [...bar.dataValue].sort((a, b) => a - b);
      return bottom >= baseline && top !== bottom;
    });
    const barsBelowBaseline = stackedSortedBars.filter((bar) => {
      const [bottom, top] = [...bar.dataValue].sort((a, b) => a - b);
      return top <= baseline && bottom !== top;
    });

    // Restack bars above baseline (positive data side).
    // vertical → grow up (−Y from baseline); horizontal → grow right (+X from baseline).
    if (layout === 'vertical') {
      let currentAbove = baselinePx;
      for (let i = barsAboveBaseline.length - 1; i >= 0; i--) {
        const bar = barsAboveBaseline[i];
        const newValuePos = currentAbove - bar.length;
        newPositions.set(bar.seriesId, { valuePos: newValuePos, length: bar.length });
        if (i > 0) {
          const nextBar = barsAboveBaseline[i - 1];
          const originalCurrent = bars.find((b) => b.seriesId === bar.seriesId)!;
          const originalNext = bars.find((b) => b.seriesId === nextBar.seriesId)!;
          const originalGap =
            originalCurrent.valuePos - (originalNext.valuePos + originalNext.length);
          currentAbove = newValuePos - originalGap;
        }
      }
    } else {
      let currentEdge = baselinePx;
      for (let i = 0; i < barsAboveBaseline.length; i++) {
        const bar = barsAboveBaseline[i];
        newPositions.set(bar.seriesId, { valuePos: currentEdge, length: bar.length });
        if (i < barsAboveBaseline.length - 1) {
          const nextBar = barsAboveBaseline[i + 1];
          const originalCurrent = bars.find((b) => b.seriesId === bar.seriesId)!;
          const originalNext = bars.find((b) => b.seriesId === nextBar.seriesId)!;
          const originalGap =
            originalNext.valuePos - (originalCurrent.valuePos + originalCurrent.length);
          currentEdge = currentEdge + bar.length + originalGap;
        }
      }
    }

    // Restack bars below baseline (negative data side).
    // vertical → grow down (+Y); horizontal → grow left (−X).
    if (layout === 'vertical') {
      let currentBelow = baselinePx;
      for (let i = 0; i < barsBelowBaseline.length; i++) {
        const bar = barsBelowBaseline[i];
        newPositions.set(bar.seriesId, { valuePos: currentBelow, length: bar.length });
        if (i < barsBelowBaseline.length - 1) {
          const nextBar = barsBelowBaseline[i + 1];
          const originalCurrent = bars.find((b) => b.seriesId === bar.seriesId)!;
          const originalNext = bars.find((b) => b.seriesId === nextBar.seriesId)!;
          const originalGap =
            originalNext.valuePos - (originalCurrent.valuePos + originalCurrent.length);
          currentBelow = currentBelow + bar.length + originalGap;
        }
      }
    } else {
      const sortedBelow = [...barsBelowBaseline].sort((a, b) => b.valuePos - a.valuePos);
      let currentEdge = baselinePx;
      for (let i = sortedBelow.length - 1; i >= 0; i--) {
        const bar = sortedBelow[i];
        const newValuePos = currentEdge - bar.length;
        newPositions.set(bar.seriesId, { valuePos: newValuePos, length: bar.length });
        if (i > 0) {
          const nextBar = sortedBelow[i - 1];
          const originalCurrent = bars.find((b) => b.seriesId === bar.seriesId)!;
          const originalNext = bars.find((b) => b.seriesId === nextBar.seriesId)!;
          const originalGap =
            originalCurrent.valuePos - (originalNext.valuePos + originalNext.length);
          currentEdge = newValuePos - originalGap;
        }
      }
    }
  }

  return expandedBars.map((bar) => {
    const newPos = newPositions.get(bar.seriesId);
    if (newPos) return { ...bar, valuePos: newPos.valuePos, length: newPos.length };
    return bar;
  });
}

/**
 * Computes per-bar initial animation origin positions for bar entrance animations.
 *
 * Bars are stacked from the baseline in their respective directions so they start at
 * distinct, non-overlapping positions with the gap already applied:
 * - Positive bars: stack rightward (horizontal) / upward (vertical) from the baseline.
 * - Negative bars: stack leftward (horizontal) / downward (vertical) from the baseline.
 *
 * The bar closest to the baseline always gets index 0 and starts exactly at the baseline.
 *
 * @param bars - Array of bar items with final valuePos, length, and dataValue
 * @param initialBarMinSizes - Per-bar initial sizes in pixels for entrance animation
 * @param stackGap - Gap between adjacent bars in pixels
 * @param baseline - Value-axis baseline in data space
 * @param baselinePx - Pixel position of the value-axis baseline on the value axis
 * @param layout - The layout of the chart
 * @returns Array of origin positions (one per bar, parallel to input), all defaulting to baselinePx
 */
function getBarOrigins(
  bars: BarData[],
  initialBarMinSizes: number[],
  stackGap: number,
  baseline: number,
  baselinePx: number,
  layout: CartesianChartLayout,
): number[] {
  const result = bars.map(() => baselinePx);
  if (bars.length === 0 || initialBarMinSizes.every((size) => !size)) return result;

  const isPositive = (bar: BarData) => {
    const [lo, hi] = [...bar.dataValue].sort((a, b) => a - b);
    return lo >= baseline && hi !== lo;
  };

  const isNegative = (bar: BarData) => {
    const [lo, hi] = [...bar.dataValue].sort((a, b) => a - b);
    return hi <= baseline && hi !== lo;
  };

  const positiveBars = bars
    .map((bar, i) => ({ bar, i }))
    .filter(({ bar }) => isPositive(bar))
    .sort(
      (a, b) =>
        layout === 'vertical'
          ? b.bar.valuePos - a.bar.valuePos // vertical: largest Y pixel = closest to bottom baseline
          : a.bar.valuePos - b.bar.valuePos, // horizontal: smallest X pixel = closest to left baseline
    );

  if (layout === 'vertical') {
    let currentPositive = baselinePx;
    positiveBars.forEach(({ i }, idx) => {
      const initialSize = initialBarMinSizes[i] ?? 0;
      currentPositive -= initialSize;
      result[i] = currentPositive;
      if (idx < positiveBars.length - 1) {
        currentPositive -= stackGap;
      }
    });
  } else {
    let currentPositive = baselinePx;
    positiveBars.forEach(({ i }, idx) => {
      const initialSize = initialBarMinSizes[i] ?? 0;
      result[i] = currentPositive;
      currentPositive += initialSize;
      if (idx < positiveBars.length - 1) {
        currentPositive += stackGap;
      }
    });
  }

  const negativeBars = bars
    .map((bar, i) => ({ bar, i }))
    .filter(({ bar }) => isNegative(bar))
    .sort(
      (a, b) =>
        layout === 'vertical'
          ? a.bar.valuePos - b.bar.valuePos // vertical: smallest Y pixel = closest to top baseline
          : b.bar.valuePos + b.bar.length - (a.bar.valuePos + a.bar.length), // horizontal: largest right edge = closest to baseline
    );

  if (layout === 'vertical') {
    let currentNegative = baselinePx;
    negativeBars.forEach(({ i }, idx) => {
      const initialSize = initialBarMinSizes[i] ?? 0;
      result[i] = currentNegative;
      currentNegative += initialSize;
      if (idx < negativeBars.length - 1) {
        currentNegative += stackGap;
      }
    });
  } else {
    let currentNegative = baselinePx;
    negativeBars.forEach(({ i }, idx) => {
      const initialSize = initialBarMinSizes[i] ?? 0;
      currentNegative -= initialSize;
      result[i] = currentNegative;
      if (idx < negativeBars.length - 1) {
        currentNegative -= stackGap;
      }
    });
  }

  return result;
}

/**
 * Computes stack clip origin [start, end] that covers the bounding box
 * of all bars at their stacked starting positions (as computed by `getBarOrigins`).
 *
 * This is passed to `DefaultBarStack` so the clip animation starts in sync with the
 * individual bar animations — no bars leak outside the clip on frame 0.
 *
 * @param barOrigins - Per-bar initial origins from `getBarOrigins`
 * @param barMinSizes - Per-bar minimum sizes in pixels (or a uniform value)
 * @returns [originStart, originEnd] or undefined when barMinSize is 0 / no bars
 */
export function getStackOrigin(
  barOrigins: number[],
  barMinSizes: number[] | number,
): [number, number] | undefined {
  if (barOrigins.length === 0) return undefined;
  const minSizes = Array.isArray(barMinSizes) ? barMinSizes : barOrigins.map(() => barMinSizes);

  let rangeStart = Number.POSITIVE_INFINITY;
  let rangeEnd = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < barOrigins.length; i++) {
    const minSize = minSizes[i] ?? 0;
    if (minSize <= 0) continue;

    const barStart = barOrigins[i];
    const barEnd = barStart + minSize;
    rangeStart = Math.min(rangeStart, barStart, barEnd);
    rangeEnd = Math.max(rangeEnd, barStart, barEnd);
  }

  if (!Number.isFinite(rangeStart) || !Number.isFinite(rangeEnd)) return undefined;
  return [rangeStart, rangeEnd];
}

function getInitialBarMinSizes(
  bars: BarData[],
  barMinSize: number | undefined,
  stackMinSize: number | undefined,
): number[] {
  const perBarMinFromBarMinSize = barMinSize ?? 0;
  if (bars.length === 0) return [];
  if (!stackMinSize) {
    return bars.map(() => perBarMinFromBarMinSize);
  }

  const totalBarLength = bars.reduce((sum, bar) => sum + bar.length, 0);
  const perBarMinFromStack = totalBarLength
    ? bars.map((bar) => (stackMinSize * bar.length) / totalBarLength)
    : bars.map(() => stackMinSize / bars.length);

  return perBarMinFromStack.map((stackMin) => Math.max(perBarMinFromBarMinSize, stackMin));
}

/**
 * Computes the initial clip rect used for stack enter animations.
 */
export function getStackInitialClipRect(
  stackRect: Rect,
  layout: CartesianChartLayout,
  origin?: number | [number, number],
): Rect {
  const { x, y, width, height } = stackRect;

  if (Array.isArray(origin)) {
    const [originStart, originEnd] = origin;
    if (layout === 'vertical') {
      return { x, y: originStart, width, height: originEnd - originStart };
    }
    return { x: originStart, y, width: originEnd - originStart, height };
  }

  const initialSize = 1;
  if (layout === 'vertical') {
    const valueBaseline = origin ?? y + height;
    return { x, y: valueBaseline, width, height: initialSize };
  }

  const valueBaseline = origin ?? x;
  return { x: valueBaseline, y, width: initialSize, height };
}

/**
 * Scales a stack of bars up so the total stack extent meets `stackMinSize`.
 * For a single bar, the bar is expanded away from the baseline.
 * For multiple bars, all bars are scaled proportionally, preserving relative gaps.
 *
 * @param bars - Array of bar items with current valuePos and length
 * @param stackMinSize - Minimum stack size in pixels
 * @param stackSize - Current total pixel extent of the stack
 * @param stackBounds - Current bounding rect of the stack
 * @param layout - The layout of the chart
 * @param indexPos - Pixel position along the categorical (index) axis
 * @param thickness - Bar thickness in pixels
 * @param baseline - Value-axis baseline in data space
 * @param baselinePx - Pixel position of the value-axis baseline on the value axis
 * @returns Updated bars and stackBounds; unchanged if stackSize >= stackMinSize
 */
function applyStackMinSize(
  bars: BarData[],
  stackMinSize: number,
  stackSize: number,
  stackBounds: Rect,
  layout: CartesianChartLayout,
  indexPos: number,
  thickness: number,
  baseline: number,
  baselinePx: number,
): { bars: BarData[]; stackBounds: Rect } {
  if (!stackMinSize || stackSize >= stackMinSize) return { bars, stackBounds };
  if (bars.length === 0) return { bars, stackBounds };

  let updatedBars = [...bars];
  let updatedBounds = { ...stackBounds };

  if (bars.length === 1) {
    const bar = bars[0];
    const sizeIncrease = stackMinSize - bar.length;
    const [bottom, top] = [...bar.dataValue].sort((a, b) => a - b);

    let newValuePos: number;
    const newLength = stackMinSize;

    if (bottom >= baseline && top !== bottom) {
      // Bar is on the positive side: vertical→expands upward (↑), horizontal→expands rightward (→)
      newValuePos = layout === 'vertical' ? bar.valuePos - sizeIncrease : bar.valuePos;
    } else if (top <= baseline && top !== bottom) {
      // Bar is on the negative side: vertical→expands downward (↓), horizontal→expands leftward (←)
      newValuePos = layout === 'vertical' ? bar.valuePos : bar.valuePos - sizeIncrease;
    } else {
      // Bar spans baseline or is zero: expand equally in both directions
      newValuePos = bar.valuePos - sizeIncrease / 2;
    }

    updatedBars = [{ ...bar, valuePos: newValuePos, length: newLength }];
    updatedBounds = {
      x: layout === 'vertical' ? indexPos : newValuePos,
      y: layout === 'vertical' ? newValuePos : indexPos,
      width: layout === 'vertical' ? thickness : newLength,
      height: layout === 'vertical' ? newLength : thickness,
    };
  } else {
    const totalBarLength = bars.reduce((sum, bar) => sum + bar.length, 0);
    const totalGapLength = stackSize - totalBarLength;
    const requiredBarLength = stackMinSize - totalGapLength;
    const barScaleFactor = requiredBarLength / totalBarLength;

    const sortedBars = [...bars].sort((a, b) => a.valuePos - b.valuePos);

    // For vertical: positive bars are above baseline (smaller Y), negative bars are below (larger Y)
    // For horizontal: positive bars are right of baseline (larger X), negative bars are left (smaller X)
    const barsOnPositiveSide =
      layout === 'vertical'
        ? sortedBars.filter((bar) => bar.valuePos + bar.length <= baselinePx)
        : sortedBars.filter((bar) => bar.valuePos >= baselinePx);
    const barsOnNegativeSide =
      layout === 'vertical'
        ? sortedBars.filter((bar) => bar.valuePos >= baselinePx)
        : sortedBars.filter((bar) => bar.valuePos + bar.length <= baselinePx);

    const newPositions = new Map<string, { valuePos: number; length: number }>();

    if (layout === 'vertical') {
      // Stack from baseline upward (decreasing valuePos) for positive bars
      let currentPos = baselinePx;
      for (let i = barsOnPositiveSide.length - 1; i >= 0; i--) {
        const bar = barsOnPositiveSide[i];
        const newLength = bar.length * barScaleFactor;
        const newValuePos = currentPos - newLength;
        newPositions.set(bar.seriesId, { valuePos: newValuePos, length: newLength });
        if (i > 0) {
          const nextBar = barsOnPositiveSide[i - 1];
          const originalGap = bar.valuePos - (nextBar.valuePos + nextBar.length);
          currentPos = newValuePos - originalGap;
        }
      }
      // Stack from baseline downward (increasing valuePos) for negative bars
      let currentPosBelow = baselinePx;
      for (let i = 0; i < barsOnNegativeSide.length; i++) {
        const bar = barsOnNegativeSide[i];
        const newLength = bar.length * barScaleFactor;
        newPositions.set(bar.seriesId, { valuePos: currentPosBelow, length: newLength });
        if (i < barsOnNegativeSide.length - 1) {
          const nextBar = barsOnNegativeSide[i + 1];
          const originalGap = nextBar.valuePos - (bar.valuePos + bar.length);
          currentPosBelow = currentPosBelow + newLength + originalGap;
        }
      }
    } else {
      // Stack from baseline rightward (increasing valuePos) for positive bars
      let currentPos = baselinePx;
      for (let i = 0; i < barsOnPositiveSide.length; i++) {
        const bar = barsOnPositiveSide[i];
        const newLength = bar.length * barScaleFactor;
        newPositions.set(bar.seriesId, { valuePos: currentPos, length: newLength });
        if (i < barsOnPositiveSide.length - 1) {
          const nextBar = barsOnPositiveSide[i + 1];
          const originalGap = nextBar.valuePos - (bar.valuePos + bar.length);
          currentPos = currentPos + newLength + originalGap;
        }
      }
      // Stack from baseline leftward (decreasing valuePos) for negative bars
      let currentPosLeft = baselinePx;
      for (let i = barsOnNegativeSide.length - 1; i >= 0; i--) {
        const bar = barsOnNegativeSide[i];
        const newLength = bar.length * barScaleFactor;
        const newValuePos = currentPosLeft - newLength;
        newPositions.set(bar.seriesId, { valuePos: newValuePos, length: newLength });
        if (i > 0) {
          const nextBar = barsOnNegativeSide[i - 1];
          const originalGap = bar.valuePos - (nextBar.valuePos + nextBar.length);
          currentPosLeft = newValuePos - originalGap;
        }
      }
    }

    updatedBars = bars.map((bar) => {
      const newPos = newPositions.get(bar.seriesId);
      if (!newPos) return bar;
      return { ...bar, length: newPos.length, valuePos: newPos.valuePos };
    });

    const newMinValuePos = Math.min(...updatedBars.map((bar) => bar.valuePos));
    const newMaxValuePos = Math.max(...updatedBars.map((bar) => bar.valuePos + bar.length));

    updatedBounds = {
      x: layout === 'vertical' ? indexPos : newMinValuePos,
      y: layout === 'vertical' ? newMinValuePos : indexPos,
      width: layout === 'vertical' ? thickness : newMaxValuePos - newMinValuePos,
      height: layout === 'vertical' ? newMaxValuePos - newMinValuePos : thickness,
    };
  }

  return { bars: updatedBars, stackBounds: updatedBounds };
}

/**
 * Applies border-radius flags to a sorted stack of bars.
 *
 * Faces at the outer edges of the stack remain rounded; faces where two bars
 * touch internally are squared. When `stackGap` is non-zero every face keeps
 * its rounded corner because all bars are visually separated.
 *
 * @param bars - Bars with `roundTop`/`roundBottom` flags and position data
 * @param layout - The layout of the chart
 * @param stackGap - Pixel gap between adjacent bars (non-zero ⇒ all faces stay rounded)
 * @returns New array of bars with corrected `roundTop`/`roundBottom` flags
 */
function applyBorderRadiusLogic(
  bars: BarData[],
  layout: CartesianChartLayout,
  stackGap: number | undefined,
): BarData[] {
  if (bars.length === 0) return bars;

  // Sort from "lower coordinate" face to "higher coordinate" face along the value axis:
  // Vertical  → descending valuePos (largest Y first = closest to baseline)
  // Horizontal → ascending valuePos (smallest X first = closest to baseline)
  const sortedBars =
    layout === 'vertical'
      ? [...bars].sort((a, b) => b.valuePos - a.valuePos)
      : [...bars].sort((a, b) => a.valuePos - b.valuePos);

  return sortedBars.map((a, index) => {
    const barBefore = index > 0 ? sortedBars[index - 1] : null;
    const barAfter = index < sortedBars.length - 1 ? sortedBars[index + 1] : null;

    // shouldRoundLower: face with the smaller coordinate (top in vertical, left in horizontal)
    const shouldRoundLower =
      (layout === 'vertical' ? index === sortedBars.length - 1 : index === 0) ||
      Boolean(a.shouldApplyGap && stackGap) ||
      (!a.shouldApplyGap &&
        barAfter !== null &&
        barAfter.valuePos + barAfter.length !== a.valuePos);

    // shouldRoundHigher: face with the larger coordinate (bottom in vertical, right in horizontal)
    const shouldRoundHigher =
      (layout === 'vertical' ? index === 0 : index === sortedBars.length - 1) ||
      Boolean(a.shouldApplyGap && stackGap) ||
      (!a.shouldApplyGap && barBefore !== null && barBefore.valuePos !== a.valuePos + a.length);

    return {
      ...a,
      roundTop: Boolean(
        a.roundTop && (layout === 'vertical' ? shouldRoundLower : shouldRoundHigher),
      ),
      roundBottom: Boolean(
        a.roundBottom && (layout === 'vertical' ? shouldRoundHigher : shouldRoundLower),
      ),
    };
  });
}

/**
 * Threshold for treating a position as touching the baseline.
 * Positions within this distance are considered at the baseline for rounding purposes.
 */
export const EPSILON = 1e-4;

/**
 * Computes and clamps the value-axis baseline position in pixels.
 *
 * When `baseline` (data space) is omitted, the baseline is chosen heuristically from the scale domain:
 * - If the full domain is positive, use domain min.
 * - If the full domain is negative, use domain max.
 * - If the domain crosses zero, use `0`.
 * When `baseline` is set, that value is used as the data-space baseline instead.
 *
 * @param valueScale - Scale for the value axis
 * @param stackRect - Bounding rect of the stack in pixels
 * @param layout - Chart layout
 * @param baseline - Optional value-axis baseline in data space
 */
export function getBaselinePx(
  valueScale: ChartScaleFunction,
  stackRect: Rect,
  layout: CartesianChartLayout,
  baseline?: number,
): number {
  const [domainMin, domainMax] = valueScale.domain();
  const baselineInData = baseline ?? (domainMin >= 0 ? domainMin : domainMax <= 0 ? domainMax : 0);
  const baselinePos = valueScale(baselineInData);

  if (layout === 'vertical') {
    return Math.max(
      stackRect.y,
      Math.min(baselinePos ?? stackRect.y + stackRect.height, stackRect.y + stackRect.height),
    );
  }

  return Math.max(stackRect.x, Math.min(baselinePos ?? stackRect.x, stackRect.x + stackRect.width));
}

type SeriesGradientEntry = {
  seriesId: string;
  gradient: GradientDefinition;
  scale: ChartScaleFunction;
  stops: GradientStop[];
} | null;

function getStackBoundsForLayout(
  layout: CartesianChartLayout,
  indexPos: number,
  thickness: number,
  minValuePos: number,
  stackSize: number,
): Rect {
  if (layout === 'vertical') {
    return { x: indexPos, y: minValuePos, width: thickness, height: stackSize };
  }
  return { x: minValuePos, y: indexPos, width: stackSize, height: thickness };
}

function getStackSizeForLayout(layout: CartesianChartLayout, stackRect: Rect): number {
  return layout === 'vertical' ? stackRect.height : stackRect.width;
}

/**
 * Computes the positioned bar entries and bounding rect for a single stack at one category index.
 *
 * This is the pure computation extracted from `BarStack`'s `useMemo` so it can be tested
 * independently and reused across contexts.
 *
 * @param params.series - Series configs for this stack
 * @param params.seriesData - Stacked data for each series, keyed by series id
 * @param params.categoryIndex - Index of the category being rendered
 * @param params.indexPos - Pixel position along the categorical axis
 * @param params.thickness - Bar thickness in pixels
 * @param params.valueScale - Scale function for the value axis
 * @param params.seriesGradients - Precomputed gradient configs per series (null entries are skipped)
 * @param params.roundBaseline - Whether to round the face touching the baseline
 * @param params.layout - The layout of the chart
 * @param params.baseline - Value-axis baseline in data space
 * @param params.baselinePx - Pixel position of the value-axis baseline on the value axis
 * @param params.stackGap - Gap between adjacent bars in pixels
 * @param params.barMinSize - Minimum individual bar size in pixels
 * @param params.stackMinSize - Minimum total stack size in pixels
 * @param params.defaultFill - Fallback fill color when a series has no color or gradient
 * @returns Positioned bar entries and the stack's bounding rect
 */
export function getBars(params: {
  series: BarSeries[];
  seriesData: Record<string, ([number, number] | null)[]>;
  categoryIndex: number;
  categoryValue: number;
  indexPos: number;
  thickness: number;
  valueScale: ChartScaleFunction;
  seriesGradients: SeriesGradientEntry[];
  roundBaseline?: boolean;
  layout: CartesianChartLayout;
  baseline?: number;
  baselinePx: number;
  stackGap?: number;
  barMinSize?: number;
  stackMinSize?: number;
  defaultFill: string;
  borderRadius?: number;
  defaultFillOpacity?: number;
  defaultStroke?: string;
  defaultStrokeWidth?: number;
  defaultBarComponent?: BarComponent;
}) {
  const {
    series,
    seriesData,
    categoryIndex,
    categoryValue,
    indexPos,
    thickness,
    valueScale,
    seriesGradients,
    roundBaseline,
    layout,
    baseline: baselineParam,
    baselinePx,
    stackGap,
    barMinSize,
    stackMinSize,
    defaultFill,
    borderRadius,
    defaultFillOpacity,
    defaultStroke,
    defaultStrokeWidth,
    defaultBarComponent,
  } = params;

  const baseline = baselineParam ?? 0;

  let allBars: BarData[] = [];

  series.forEach((s) => {
    const data = seriesData[s.id];
    if (!data) return;

    const value = data[categoryIndex];
    if (value === null || value === undefined) return;

    const originalData = s.data;
    const originalValue = originalData?.[categoryIndex];
    // Only apply gap logic if the original data wasn't tuple format
    const shouldApplyGap = !Array.isArray(originalValue);

    // Sort to be in ascending order
    const [bottom, top] = [...value].sort((a, b) => a - b);

    const edgeBottom = valueScale(bottom) ?? baselinePx;
    const edgeTop = valueScale(top) ?? baselinePx;

    // In horizontal layout: roundTop is Right (edgeTop), roundBottom is Left (edgeBottom)
    // getBarPath already handles the mapping of roundTop/roundBottom to coordinates.
    // Use data-space baseline so faces at the axis baseline stay square when roundBaseline is off
    // (pixel gaps after stackGap can otherwise trip the pixel-only epsilon check).
    const roundTop =
      roundBaseline ||
      (Math.abs(top - baseline) >= EPSILON && Math.abs(edgeTop - baselinePx) >= EPSILON);
    const roundBottom =
      roundBaseline ||
      (Math.abs(bottom - baseline) >= EPSILON && Math.abs(edgeBottom - baselinePx) >= EPSILON);

    // Calculate length (measured along the value axis)
    const length = Math.abs(edgeBottom - edgeTop);
    const valuePos = Math.min(edgeBottom, edgeTop);

    // Skip bars that would have zero or negative height
    if (length <= 0) return;

    let barFill = s.color ?? defaultFill;

    // Evaluate gradient if provided (using precomputed stops)
    const seriesGradientConfig = seriesGradients.find((g) => g?.seriesId === s.id);
    if (seriesGradientConfig && originalValue !== null && originalValue !== undefined) {
      const axis = seriesGradientConfig.gradient.axis ?? 'y';

      let evalValue: number;
      if (axis === 'x') {
        // X-axis gradient: In vertical it's the index, in horizontal it's the value.
        evalValue =
          layout === 'vertical'
            ? categoryIndex
            : Array.isArray(originalValue)
              ? originalValue[1]
              : originalValue;
      } else {
        // Y-axis gradient: In vertical it's the value, in horizontal it's the index.
        evalValue =
          layout === 'vertical'
            ? Array.isArray(originalValue)
              ? originalValue[1]
              : originalValue
            : categoryIndex;
      }

      const evaluatedColor = evaluateGradientAtValue(
        seriesGradientConfig.stops,
        evalValue,
        seriesGradientConfig.scale,
      );
      if (evaluatedColor) {
        barFill = evaluatedColor;
      }
    }

    allBars.push({
      seriesId: s.id,
      valuePos,
      length,
      dataValue: value,
      fill: barFill,
      roundTop,
      roundBottom,
      shouldApplyGap,
      BarComponent: s.BarComponent,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      origin: 0,
    });
  });

  // Apply proportional gap distribution to maintain total stack length
  if (stackGap && allBars.length > 1) {
    allBars = applyStackGap(allBars, stackGap, layout, baseline, baselinePx);
  }

  // Apply barMinSize constraints
  if (barMinSize) {
    allBars = applyBarMinSize(allBars, barMinSize, baseline, baselinePx, layout);
  }

  allBars = applyBorderRadiusLogic(allBars, layout, stackGap);

  // Apply stackMinSize constraints
  if (stackMinSize && allBars.length > 0) {
    const minValuePos = Math.min(...allBars.map((bar) => bar.valuePos));
    const maxValuePos = Math.max(...allBars.map((bar) => bar.valuePos + bar.length));
    const stackSize = maxValuePos - minValuePos;
    const stackBounds = getStackBoundsForLayout(
      layout,
      indexPos,
      thickness,
      minValuePos,
      stackSize,
    );

    const result = applyStackMinSize(
      allBars,
      stackMinSize,
      stackSize,
      stackBounds,
      layout,
      indexPos,
      thickness,
      baseline,
      baselinePx,
    );
    allBars = result.bars;

    // Reapply border radius logic only if we actually scaled
    const newStackSize = getStackSizeForLayout(layout, result.stackBounds);
    if (newStackSize < stackMinSize) {
      allBars = applyBorderRadiusLogic(allBars, layout, stackGap);
    }
  }

  const initialBarMinSizes = getInitialBarMinSizes(allBars, barMinSize, stackMinSize);
  const barOrigins = getBarOrigins(
    allBars,
    initialBarMinSizes,
    stackGap ?? 0,
    baseline,
    baselinePx,
    layout,
  );

  return allBars.map((bar, i) => ({
    ...bar,
    x: layout === 'vertical' ? indexPos : bar.valuePos,
    y: layout === 'vertical' ? bar.valuePos : indexPos,
    width: layout === 'vertical' ? thickness : bar.length,
    height: layout === 'vertical' ? bar.length : thickness,
    dataX: layout === 'vertical' ? categoryValue : bar.dataValue,
    dataY: layout === 'vertical' ? bar.dataValue : categoryValue,
    origin: barOrigins[i],
    borderRadius,
    fillOpacity: defaultFillOpacity,
    stroke: defaultStroke,
    strokeWidth: defaultStrokeWidth,
    minSize: initialBarMinSizes[i],
    BarComponent: bar.BarComponent || defaultBarComponent,
  }));
}
