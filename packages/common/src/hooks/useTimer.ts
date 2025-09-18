import { useCallback, useEffect, useMemo, useRef } from 'react';

// timer for single execution
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
      isPausedRef.current = false;
    }
  }, []);

  const start = useCallback(
    (callback: () => void, duration: number) => {
      // clear existing timer
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
    }),
    [start, clear, pause, resume],
  );
};
