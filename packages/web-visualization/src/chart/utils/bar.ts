import type { Transition } from 'framer-motion';

import { defaultTransition } from './transition';

/**
 * A bar-specific transition that extends Transition with stagger support.
 * When `staggerDelay` is provided, bars will animate with increasing delays
 * based on their horizontal position (leftmost starts first, rightmost last).
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
 * @param normalizedX - The bar's normalized x position (0 = left edge, 1 = right edge)
 * @returns A standard Transition with computed delay
 */
export const withStaggerDelayTransition = (
  transition: BarTransition,
  normalizedX: number,
): Transition => {
  const { staggerDelay, ...baseTransition } = transition;
  if (!staggerDelay) return transition;
  return {
    ...baseTransition,
    delay: (baseTransition?.delay ?? 0) + normalizedX * staggerDelay,
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
