import { useRef } from 'react';

import type { ValueChangeDirection } from './RollingNumber';

/**
 * Hook to track the direction of value changes for RollingNumber animations.
 * Returns 'up' when value increases, 'down' when value decreases, and 'none' on initial render or no change.
 *
 * Direction is calculated synchronously during render to ensure animations use the correct direction immediately.
 */
export function useValueChangeDirection({
  value,
  formatted,
}: {
  value: number;
  formatted: string;
}): ValueChangeDirection {
  const previousValue = useRef<number | null>(null);
  const previousFormatted = useRef<string | null>(null);
  const direction = useRef<ValueChangeDirection>('none');

  // Calculate direction synchronously during render
  const prev = previousValue.current;
  const prevFmt = previousFormatted.current;

  if (prev !== null && prevFmt !== null) {
    // Check if there's a meaningful change (similar to color pulse logic)
    const hasMeaningfulChange =
      !Number.isNaN(prev) && !Number.isNaN(value) && prev !== value && prevFmt !== formatted;

    if (hasMeaningfulChange) {
      direction.current = value > prev ? 'up' : 'down';
    }
  }

  // Update refs for next render
  previousValue.current = value;
  previousFormatted.current = formatted;

  return direction.current;
}
