import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useTimer } from '../hooks/useTimer';

export type CarouselAutoplayOptions = {
  /**
   * Whether autoplay is enabled.
   */
  enabled: boolean;
  /**
   * The interval in milliseconds between auto-advances.
   */
  interval: number;
  /**
   * Callback fired when autoplay starts.
   */
  onStart?: () => void;
  /**
   * Callback fired when autoplay stops.
   */
  onStop?: () => void;
};

export type CarouselAutoplayState = {
  /**
   * Whether autoplay is actively running (enabled AND not stopped AND not paused).
   */
  isPlaying: boolean;
  /**
   * Whether autoplay has been stopped by the user.
   */
  isStopped: boolean;
  /**
   * Whether autoplay is temporarily paused due to user interaction (hover/touch).
   */
  isPaused: boolean;
};

export type CarouselAutoplayApi = {
  /**
   * Start autoplay. Resumes from paused progress if available.
   */
  start: () => void;
  /**
   * Stop autoplay. Preserves current progress for resuming later.
   */
  stop: () => void;
  /**
   * Toggle autoplay on/off.
   */
  toggle: () => void;
  /**
   * Reset the autoplay timer (e.g., after manual navigation).
   */
  reset: () => void;
  /**
   * Temporarily pause autoplay (e.g., on hover/touch). Does not change isStopped state.
   * Progress is preserved and will resume from where it left off.
   */
  pause: () => void;
  /**
   * Resume autoplay after interaction pause. Only resumes if not user-stopped.
   */
  resume: () => void;
  /**
   * Get the current remaining time. Useful for calculating progress in platform-native animations.
   */
  getRemainingTime: () => number;
  /**
   * Add a listener to be called when the autoplay timer completes.
   * Returns an unsubscribe function.
   */
  addCompletionListener: (callback: () => void) => () => void;
};

/**
 * Combined state and API returned by useCarouselAutoplay.
 */
export type CarouselAutoplay = CarouselAutoplayState & CarouselAutoplayApi;

/**
 * A hook for managing carousel autoplay state and timing.
 * Provides controls for starting, stopping, and resetting autoplay.
 */
export const useCarouselAutoplay = ({
  enabled,
  interval,
  onStart,
  onStop,
}: CarouselAutoplayOptions): CarouselAutoplay => {
  const timer = useTimer();
  const [isStopped, setIsStopped] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Use refs for synchronous checks to avoid stale closure issues
  const isPlayingRef = useRef(false);
  const isPausedRef = useRef(false);
  const isStoppedRef = useRef(false);

  // Listeners for timer completion
  const listenersRef = useRef<Set<() => void>>(new Set());

  const notifyListeners = useCallback(() => {
    // Snapshot listeners to avoid issues when Set is modified during iteration
    const listeners = [...listenersRef.current];
    listeners.forEach((listener) => listener());
  }, []);

  const addCompletionListener = useCallback((callback: () => void) => {
    listenersRef.current.add(callback);
    return () => {
      listenersRef.current.delete(callback);
    };
  }, []);

  const isPlaying = enabled && !isStopped && !isPaused;

  const getRemainingTime = useCallback(() => {
    return timer.getRemainingTime();
  }, [timer]);

  const startAutoplay = useCallback(
    (fromPausedProgress: boolean) => {
      if (!enabled || isStoppedRef.current || isPausedRef.current) return;

      const advance = () => {
        if (!isPlayingRef.current) return;
        notifyListeners();
      };

      if (fromPausedProgress) {
        timer.resume();
      } else {
        timer.start(advance, interval);
      }

      if (!isPlayingRef.current) {
        isPlayingRef.current = true;
        onStart?.();
      }
    },
    [enabled, interval, timer, onStart, notifyListeners],
  );

  const start = useCallback(() => {
    isStoppedRef.current = false;
    setIsStopped(false);
    // Start timer synchronously if not paused
    if (!isPausedRef.current && enabled) {
      startAutoplay(false);
    }
  }, [enabled, startAutoplay]);

  const stop = useCallback(() => {
    timer.pause();
    isStoppedRef.current = true;
    setIsStopped(true);
    if (isPlayingRef.current) {
      isPlayingRef.current = false;
      onStop?.();
    }
  }, [timer, onStop]);

  const toggle = useCallback(() => {
    if (isStoppedRef.current) {
      start();
    } else {
      stop();
    }
  }, [start, stop]);

  const reset = useCallback(() => {
    timer.reset();

    // Start a fresh timer with the full interval
    const advance = () => {
      if (!isPlayingRef.current) return;
      notifyListeners();
    };
    timer.start(advance, interval);

    // If paused, immediately pause the timer so getRemainingTime() returns the full interval
    if (isPausedRef.current) {
      timer.pause();
    }
  }, [timer, interval, notifyListeners]);

  const pause = useCallback(() => {
    if (!isPlayingRef.current) return;
    timer.pause();
    isPausedRef.current = true;
    setIsPaused(true);
  }, [timer]);

  const resume = useCallback(() => {
    if (isStoppedRef.current) return;
    // Update ref synchronously BEFORE starting timer
    isPausedRef.current = false;
    setIsPaused(false);
    // Start timer synchronously so getRemainingTime() returns correct value
    if (enabled) {
      const hasRemainingTime = timer.getRemainingTime() > 0;
      startAutoplay(hasRemainingTime);
    }
  }, [enabled, timer, startAutoplay]);

  // Handle initial mount and enabled changes
  // This runs on mount when enabled=true to start autoplay initially
  useEffect(() => {
    if (enabled && !isStoppedRef.current && !isPausedRef.current) {
      // Only start if not already playing (avoid double-start)
      if (!isPlayingRef.current) {
        startAutoplay(false);
      }
    }
    // Keep isPlayingRef in sync with derived state
    isPlayingRef.current = isPlaying;
  }, [enabled, isPlaying, startAutoplay]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      timer.clear();
    };
  }, [timer]);

  return useMemo<CarouselAutoplay>(
    () => ({
      isPlaying,
      isStopped,
      isPaused,
      start,
      stop,
      toggle,
      reset,
      pause,
      resume,
      getRemainingTime,
      addCompletionListener,
    }),
    [
      isPlaying,
      isStopped,
      isPaused,
      start,
      stop,
      toggle,
      reset,
      pause,
      resume,
      getRemainingTime,
      addCompletionListener,
    ],
  );
};
