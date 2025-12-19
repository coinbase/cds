import { useRef } from 'react';

export type SingleDirection = 'up' | 'down';

/**
 * Track the direction of value changes for RollingNumber animations.
 * Returns 'up' when value increases, 'down' when value decreases, and undefined on initial render or no change.
 */
export function useValueChangeDirection(value: number): SingleDirection | undefined {
  const previousValue = useRef<number | null>(null);
  const direction = useRef<SingleDirection | undefined>(undefined);

  const prev = previousValue.current;

  if (prev !== null && !Number.isNaN(prev) && !Number.isNaN(value) && prev !== value) {
    direction.current = value > prev ? 'up' : 'down';
  }

  previousValue.current = value;

  return direction.current;
}
