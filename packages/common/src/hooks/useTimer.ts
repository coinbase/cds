import { useCallback, useEffect, useMemo, useRef } from 'react';

// Timer for single execution
export const useTimer = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const startTimeRef = useRef<number>(0);
  const remainingTimeRef = useRef<number>(0);
  const callbackRef = useRef<() => void>();
  const isPausedRef = useRef<boolean>(false);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    isPausedRef.current = false;
  }, []);

  const start = useCallback(
    (callback: () => void, duration: number) => {
      // Clear existing timer
      clear();

      timerRef.current = setTimeout(callback, duration);
      callbackRef.current = callback;
      startTimeRef.current = new Date().getTime();
      remainingTimeRef.current = duration;
    },
    [clear],
  );

  const pause = useCallback(() => {
    if (!isPausedRef.current) {
      const currentTime = new Date().getTime();
      clear();
      remainingTimeRef.current -= currentTime - startTimeRef.current;
      isPausedRef.current = true;
    }
    return remainingTimeRef.current;
  }, [clear]);

  const resume = useCallback(() => {
    if (callbackRef.current && isPausedRef.current) {
      start(callbackRef.current, remainingTimeRef.current);
      isPausedRef.current = false;
    }
  }, [start]);

  const getRemainingTime = useCallback(() => {
    if (isPausedRef.current) {
      return remainingTimeRef.current;
    }
    if (!timerRef.current) {
      return 0;
    }
    const elapsed = Date.now() - startTimeRef.current;
    return Math.max(0, remainingTimeRef.current - elapsed);
  }, []);

  const reset = useCallback(() => {
    clear();
    remainingTimeRef.current = 0;
    callbackRef.current = undefined;
    isPausedRef.current = false;
  }, [clear]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  return useMemo(
    () => ({
      start,
      clear,
      pause,
      resume,
      getRemainingTime,
      reset,
    }),
    [start, clear, pause, resume, getRemainingTime, reset],
  );
};
