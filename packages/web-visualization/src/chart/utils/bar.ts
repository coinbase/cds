import type { Transition } from 'framer-motion';

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

/**
 * Minimum bar data required for stack layout computations.
 */
export type StackBarItem = {
  seriesId: string;
  valuePos: number;
  length: number;
  dataValue?: number | [number, number] | null;
  shouldApplyGap?: boolean;
};

/**
 * Axis-aligned bounding rect for a bar stack.
 */
export type StackBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * Applies proportional gap distribution to a stack of bars, maintaining total stack length.
 * Gaps are only inserted between bars that have `shouldApplyGap = true`.
 * Positive (above-baseline) and negative (below-baseline) groups are gapped independently.
 *
 * @param bars - Array of bar items with current valuePos and length
 * @param stackGap - Gap size in pixels between adjacent bars
 * @param barsGrowVertically - True for vertical layout (Y value axis), false for horizontal (X value axis)
 * @param baseline - Pixel position of the zero value on the value axis
 * @returns New array of bars with adjusted valuePos and length
 */
export function applyStackGap<T extends StackBarItem>(
  bars: T[],
  stackGap: number,
  barsGrowVertically: boolean,
  baseline: number,
): T[] {
  if (!stackGap || bars.length <= 1) return bars;

  const result = [...bars];

  const barsAboveBaseline = bars.filter((bar) => {
    const [bottom, top] = (bar.dataValue as [number, number]).sort((a, b) => a - b);
    return bottom >= 0 && top !== bottom && bar.shouldApplyGap;
  });
  const barsBelowBaseline = bars.filter((bar) => {
    const [bottom, top] = (bar.dataValue as [number, number]).sort((a, b) => a - b);
    return top <= 0 && bottom !== top && bar.shouldApplyGap;
  });

  const applyGapGroup = (group: T[], growing: boolean) => {
    if (group.length <= 1) return;

    const totalGapSpace = stackGap * (group.length - 1);
    const totalDataLength = group.reduce((sum, bar) => sum + bar.length, 0);
    const lengthReduction = totalGapSpace / totalDataLength;

    const sortedBars = growing
      ? [...group].sort((a, b) => b.valuePos - a.valuePos)
      : [...group].sort((a, b) => a.valuePos - b.valuePos);

    let currentEdge = baseline;
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
  applyGapGroup(barsAboveBaseline, barsGrowVertically);
  // Negative bars: grow down in vertical (increasing Y), grow left in horizontal (decreasing X)
  applyGapGroup(barsBelowBaseline, !barsGrowVertically);

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
 * @param barsGrowVertically - True for vertical layout, false for horizontal
 * @param baseline - Pixel position of the zero value on the value axis
 * @returns New array of bars with adjusted valuePos and length
 */
export function applyBarMinSize<T extends StackBarItem>(
  bars: T[],
  barMinSize: number,
  barsGrowVertically: boolean,
  baseline: number,
): T[] {
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
      const [bottom, top] = (bar.dataValue as [number, number]).sort((a, b) => a - b);
      return barsGrowVertically ? bottom >= 0 && top !== bottom : top <= 0 && top !== bottom;
    });
    const barsBelowBaseline = stackedSortedBars.filter((bar) => {
      const [bottom, top] = (bar.dataValue as [number, number]).sort((a, b) => a - b);
      return barsGrowVertically ? top <= 0 && top !== bottom : bottom >= 0 && top !== bottom;
    });

    // Restack bars above baseline (growing away from it in the positive direction)
    let currentAbove = baseline;
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

    // Restack bars below baseline (growing away from it in the negative direction)
    let currentBelow = baseline;
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
  }

  return expandedBars.map((bar) => {
    const newPos = newPositions.get(bar.seriesId);
    if (newPos) return { ...bar, valuePos: newPos.valuePos, length: newPos.length };
    return bar;
  });
}

/**
 * Computes per-bar initial animation origin positions for when `barMinSize` is set.
 *
 * Bars are stacked from the baseline in their respective directions so they start at
 * distinct, non-overlapping positions with the gap already applied:
 * - Positive bars: stack rightward (horizontal) / upward (vertical) from the baseline.
 * - Negative bars: stack leftward (horizontal) / downward (vertical) from the baseline.
 *
 * The bar closest to the baseline always gets index 0 and starts exactly at the baseline.
 *
 * @param bars - Array of bar items with final valuePos, length, and dataValue
 * @param barMinSize - Minimum bar size in pixels; also the initial animation size per bar
 * @param stackGap - Gap between adjacent bars in pixels
 * @param baseline - Pixel position of the zero value on the value axis
 * @param barsGrowVertically - True for vertical layout, false for horizontal
 * @returns Array of origin positions (one per bar, parallel to input), all defaulting to baseline
 */
export function getBarInitialOrigins<T extends StackBarItem>(
  bars: T[],
  barMinSize: number,
  stackGap: number,
  baseline: number,
  barsGrowVertically: boolean,
): number[] {
  const result = bars.map(() => baseline);
  if (!barMinSize || bars.length === 0) return result;

  const isPositive = (bar: T) => {
    const [lo, hi] = (bar.dataValue as [number, number]).sort((a, b) => a - b);
    return lo >= 0 && hi !== lo;
  };

  const isNegative = (bar: T) => {
    const [lo, hi] = (bar.dataValue as [number, number]).sort((a, b) => a - b);
    return hi <= 0 && hi !== lo;
  };

  // Positive bars: stack away from baseline in the positive direction.
  // Sort so the bar physically closest to the baseline gets idx=0.
  bars
    .map((bar, i) => ({ bar, i }))
    .filter(({ bar }) => isPositive(bar))
    .sort(
      (a, b) =>
        barsGrowVertically
          ? b.bar.valuePos - a.bar.valuePos // vertical: largest Y pixel = closest to bottom baseline
          : a.bar.valuePos - b.bar.valuePos, // horizontal: smallest X pixel = closest to left baseline
    )
    .forEach(({ i }, idx) => {
      result[i] = barsGrowVertically
        ? baseline - (idx + 1) * barMinSize - idx * stackGap // vertical: step upward (decreasing Y)
        : baseline + idx * (barMinSize + stackGap); // horizontal: step rightward (increasing X)
    });

  // Negative bars: stack away from baseline in the negative direction.
  bars
    .map((bar, i) => ({ bar, i }))
    .filter(({ bar }) => isNegative(bar))
    .sort(
      (a, b) =>
        barsGrowVertically
          ? a.bar.valuePos - b.bar.valuePos // vertical: smallest Y pixel = closest to top baseline
          : b.bar.valuePos + b.bar.length - (a.bar.valuePos + a.bar.length), // horizontal: largest right edge = closest to baseline
    )
    .forEach(({ i }, idx) => {
      result[i] = barsGrowVertically
        ? baseline + idx * (barMinSize + stackGap) // vertical: step downward (increasing Y)
        : baseline - (idx + 1) * barMinSize - idx * stackGap; // horizontal: step leftward (decreasing X)
    });

  return result;
}

/**
 * Computes the initial clip value-axis range [start, end] that covers the bounding box
 * of all bars at their stacked starting positions (as computed by `getBarInitialOrigins`).
 *
 * This is passed to `DefaultBarStack` so the clip animation starts in sync with the
 * individual bar animations — no bars leak outside the clip on frame 0.
 *
 * @param barInitialOrigins - Per-bar initial origins from `getBarInitialOrigins`
 * @param barMinSize - Minimum bar size in pixels
 * @returns [rangeStart, rangeEnd] or undefined when barMinSize is 0 / no bars
 */
export function getInitialValueRange(
  barInitialOrigins: number[],
  barMinSize: number,
): [number, number] | undefined {
  if (!barMinSize || barInitialOrigins.length === 0) return undefined;
  const rangeStart = Math.min(...barInitialOrigins);
  const rangeEnd = Math.max(...barInitialOrigins) + barMinSize;
  return [rangeStart, rangeEnd];
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
 * @param barsGrowVertically - True for vertical layout, false for horizontal
 * @param indexPos - Pixel position along the categorical (index) axis
 * @param thickness - Bar thickness in pixels
 * @param baseline - Pixel position of the zero value on the value axis
 * @returns Updated bars and stackBounds; unchanged if stackSize >= stackMinSize
 */
export function applyStackMinSize<T extends StackBarItem>(
  bars: T[],
  stackMinSize: number,
  stackSize: number,
  stackBounds: StackBounds,
  barsGrowVertically: boolean,
  indexPos: number,
  thickness: number,
  baseline: number,
): { bars: T[]; stackBounds: StackBounds } {
  if (!stackMinSize || stackSize >= stackMinSize) return { bars, stackBounds };
  if (bars.length === 0) return { bars, stackBounds };

  let updatedBars = [...bars];
  let updatedBounds = { ...stackBounds };

  if (bars.length === 1) {
    const bar = bars[0];
    const sizeIncrease = stackMinSize - bar.length;
    const [bottom, top] = (bar.dataValue as [number, number]).sort((a, b) => a - b);

    let newValuePos: number;
    const newLength = stackMinSize;

    if (bottom >= 0 && top !== bottom) {
      // Bar is on the positive side: vertical→expands upward (↑), horizontal→expands rightward (→)
      newValuePos = barsGrowVertically ? bar.valuePos - sizeIncrease : bar.valuePos;
    } else if (top <= 0 && top !== bottom) {
      // Bar is on the negative side: vertical→expands downward (↓), horizontal→expands leftward (←)
      newValuePos = barsGrowVertically ? bar.valuePos : bar.valuePos - sizeIncrease;
    } else {
      // Bar spans baseline or is zero: expand equally in both directions
      newValuePos = bar.valuePos - sizeIncrease / 2;
    }

    updatedBars = [{ ...bar, valuePos: newValuePos, length: newLength }];
    updatedBounds = {
      x: barsGrowVertically ? indexPos : newValuePos,
      y: barsGrowVertically ? newValuePos : indexPos,
      width: barsGrowVertically ? thickness : newLength,
      height: barsGrowVertically ? newLength : thickness,
    };
  } else {
    const totalBarLength = bars.reduce((sum, bar) => sum + bar.length, 0);
    const totalGapLength = stackSize - totalBarLength;
    const requiredBarLength = stackMinSize - totalGapLength;
    const barScaleFactor = requiredBarLength / totalBarLength;

    const sortedBars = [...bars].sort((a, b) => a.valuePos - b.valuePos);

    // For vertical: positive bars are above baseline (smaller Y), negative bars are below (larger Y)
    // For horizontal: positive bars are right of baseline (larger X), negative bars are left (smaller X)
    const barsOnPositiveSide = barsGrowVertically
      ? sortedBars.filter((bar) => bar.valuePos + bar.length <= baseline)
      : sortedBars.filter((bar) => bar.valuePos >= baseline);
    const barsOnNegativeSide = barsGrowVertically
      ? sortedBars.filter((bar) => bar.valuePos >= baseline)
      : sortedBars.filter((bar) => bar.valuePos + bar.length <= baseline);

    const newPositions = new Map<string, { valuePos: number; length: number }>();

    if (barsGrowVertically) {
      // Stack from baseline upward (decreasing valuePos) for positive bars
      let currentPos = baseline;
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
      let currentPosBelow = baseline;
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
      let currentPos = baseline;
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
      let currentPosLeft = baseline;
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
      x: barsGrowVertically ? indexPos : newMinValuePos,
      y: barsGrowVertically ? newMinValuePos : indexPos,
      width: barsGrowVertically ? thickness : newMaxValuePos - newMinValuePos,
      height: barsGrowVertically ? newMaxValuePos - newMinValuePos : thickness,
    };
  }

  return { bars: updatedBars, stackBounds: updatedBounds };
}

/**
 * Computes a bar's normalized [0, 1] position along the category axis, used for
 * stagger-delay calculations.
 *
 * Vertical charts stagger left-to-right (x axis); horizontal charts stagger
 * top-to-bottom (y axis). Returns 0 when the drawing area has no extent.
 *
 * @param barsGrowVertically - `true` for vertical layout, `false` for horizontal
 * @param x - Bar's left edge in pixels
 * @param y - Bar's top edge in pixels
 * @param drawingArea - Bounding box of the chart drawing area
 * @returns Normalized position in [0, 1]
 */
export function getNormalizedStagger(
  barsGrowVertically: boolean,
  x: number,
  y: number,
  drawingArea: { x: number; y: number; width: number; height: number },
): number {
  if (barsGrowVertically) {
    return drawingArea.width > 0 ? (x - drawingArea.x) / drawingArea.width : 0;
  }
  return drawingArea.height > 0 ? (y - drawingArea.y) / drawingArea.height : 0;
}

/**
 * Computes the starting rectangle for a bar's enter animation.
 *
 * The bar animates from a minimal size at the baseline toward its final dimensions.
 * `minSize` controls the initial extent along the value axis (the direction the bar grows).
 * `origin` overrides the default baseline (bottom edge for vertical, left edge for horizontal).
 *
 * @param x - Bar's final left edge in pixels
 * @param y - Bar's final top edge in pixels
 * @param width - Bar's final width in pixels
 * @param height - Bar's final height in pixels
 * @param origin - Explicit baseline coordinate, or `undefined` to use the natural baseline
 * @param minSize - Initial size along the value axis in pixels
 * @param barsGrowVertically - `true` for vertical layout, `false` for horizontal
 * @returns Initial `{ x, y, width, height }` for the bar path
 */
export function getBarInitialRect(
  x: number,
  y: number,
  width: number,
  height: number,
  origin: number | undefined,
  minSize: number,
  barsGrowVertically: boolean,
): { x: number; y: number; width: number; height: number } {
  const baseline = origin ?? (barsGrowVertically ? y + height : x);
  return {
    x: barsGrowVertically ? x : baseline,
    y: barsGrowVertically ? baseline : y,
    width: barsGrowVertically ? width : minSize,
    height: barsGrowVertically ? minSize : height,
  };
}

/**
 * Applies border-radius flags to a sorted stack of bars.
 *
 * Faces at the outer edges of the stack remain rounded; faces where two bars
 * touch internally are squared. When `stackGap` is non-zero every face keeps
 * its rounded corner because all bars are visually separated.
 *
 * @param bars - Bars with `roundTop`/`roundBottom` flags and position data
 * @param barsGrowVertically - `true` for vertical layout, `false` for horizontal
 * @param stackGap - Pixel gap between adjacent bars (non-zero ⇒ all faces stay rounded)
 * @returns New array of bars with corrected `roundTop`/`roundBottom` flags
 */
export function applyBorderRadiusLogic<
  T extends StackBarItem & { roundTop?: boolean; roundBottom?: boolean },
>(bars: T[], barsGrowVertically: boolean, stackGap: number | undefined): T[] {
  if (bars.length === 0) return bars;

  // Sort from "lower coordinate" face to "higher coordinate" face along the value axis:
  // Vertical  → descending valuePos (largest Y first = closest to baseline)
  // Horizontal → ascending valuePos (smallest X first = closest to baseline)
  const sortedBars = barsGrowVertically
    ? [...bars].sort((a, b) => b.valuePos - a.valuePos)
    : [...bars].sort((a, b) => a.valuePos - b.valuePos);

  return sortedBars.map((a, index) => {
    const barBefore = index > 0 ? sortedBars[index - 1] : null;
    const barAfter = index < sortedBars.length - 1 ? sortedBars[index + 1] : null;

    // shouldRoundLower: face with the smaller coordinate (top in vertical, left in horizontal)
    const shouldRoundLower =
      (barsGrowVertically ? index === sortedBars.length - 1 : index === 0) ||
      Boolean(a.shouldApplyGap && stackGap) ||
      (!a.shouldApplyGap &&
        barAfter !== null &&
        barAfter.valuePos + barAfter.length !== a.valuePos);

    // shouldRoundHigher: face with the larger coordinate (bottom in vertical, right in horizontal)
    const shouldRoundHigher =
      (barsGrowVertically ? index === 0 : index === sortedBars.length - 1) ||
      Boolean(a.shouldApplyGap && stackGap) ||
      (!a.shouldApplyGap && barBefore !== null && barBefore.valuePos !== a.valuePos + a.length);

    return {
      ...a,
      roundTop: Boolean(a.roundTop && (barsGrowVertically ? shouldRoundLower : shouldRoundHigher)),
      roundBottom: Boolean(
        a.roundBottom && (barsGrowVertically ? shouldRoundHigher : shouldRoundLower),
      ),
    };
  });
}
