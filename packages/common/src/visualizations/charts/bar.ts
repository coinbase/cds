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
