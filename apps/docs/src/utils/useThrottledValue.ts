import { useCallback, useRef, useState } from 'react';

/**
 * A React hook that throttles value updates to improve performance by limiting the rate of updates.
 * This is useful for handling frequent value changes (e.g., scroll events, input changes, resize events)
 * where you want to process updates at a controlled rate rather than for every change.
 *
 * @template T - The type of the value being throttled
 * @param value - The current value to be throttled. Can be of any type.
 * @param delay - The minimum time (in milliseconds) that must pass between value updates.
 * @returns The throttled value, which updates at most once per delay interval.
 */
export const useThrottledValue = <T>(value: T, delay: number) => {
  // State to hold the most recently throttled value
  const [throttledValue, setThrottledValue] = useState(value);

  // Ref to track the timestamp of the last value update
  const lastExecutedAt = useRef(0);

  // Ref to store the timeout ID that ensures the final synchronization of the throttled value after the value has not changed for the delay period
  const throttleTimeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  // updates the throttled value and schedules a final update after the delay period if needed
  const updateThrottledValue = useCallback(
    (newValue: T) => {
      const now = Date.now();
      const timeElapsed = now - lastExecutedAt.current;

      if (timeElapsed >= delay) {
        // If the delay has passed since the last update, update immediately
        if (throttleTimeoutIdRef.current) {
          clearTimeout(throttleTimeoutIdRef.current);
          throttleTimeoutIdRef.current = undefined;
        }
        setThrottledValue(newValue);
        lastExecutedAt.current = now;
      } else if (!throttleTimeoutIdRef.current) {
        // If we're within the delay period and no timeout is scheduled,
        // schedule an update for when the delay period ends
        throttleTimeoutIdRef.current = setTimeout(() => {
          setThrottledValue(newValue);
          lastExecutedAt.current = Date.now();
          throttleTimeoutIdRef.current = undefined;
        }, delay - timeElapsed);
      }
      // Note: If a timeout is already pending, we ignore this update
      // to prevent multiple timeouts from being scheduled
    },
    [delay],
  );

  // Check for value changes and initiate throttling if needed
  if (value !== throttledValue) updateThrottledValue(value);

  return throttledValue;
};
