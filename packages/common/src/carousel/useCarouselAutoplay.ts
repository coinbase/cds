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
  /**
   * Remaining time in milliseconds until the next advance.
   * Use this with totalTime to calculate progress for platform-native animations.
   */
  remainingTime: number;
  /**
   * Total interval duration in milliseconds.
   * Use this with remainingTime to calculate progress for platform-native animations.
   */
  totalTime: number;
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
 * A hook for managing carousel autoplay state and timing.
 *
 * Provides controls for starting, stopping, and resetting autoplay.
 * Progress tracking is delegated to platform-native animation libraries
 * (framer-motion for web, react-spring for mobile) via remainingTime/totalTime.
 *
 * @param options - The options for carousel autoplay.
 * @param options.enabled - Whether autoplay is enabled.
 * @param options.interval - The interval in milliseconds between auto-advances.
 * @param options.onStart - Callback fired when autoplay starts.
 * @param options.onStop - Callback fired when autoplay stops.
 * @returns A tuple where the first element is the autoplay state and the second element is an API for controlling autoplay.
 *
 * @example
 * ```tsx
 * const [autoplayState, autoplayApi] = useCarouselAutoplay({
 *   enabled: true,
 *   interval: 3000,
 * });
 *
 * // Subscribe to timer completion
 * useEffect(() => {
 *   const unsubscribe = autoplayApi.addCompletionListener(() => {
 *     goToNextPage();
 *   });
 *   return unsubscribe;
 * }, [autoplayApi, goToNextPage]);
 *
 * // State
 * autoplayState.isPlaying;     // true when actively running
 * autoplayState.isStopped;     // true when user has stopped autoplay
 * autoplayState.isPaused;      // true when temporarily paused (hover/touch)
 * autoplayState.remainingTime; // ms remaining until next advance
 * autoplayState.totalTime;     // total interval duration in ms
 *
 * // Calculate progress for animations
 * const progress = 1 - (autoplayState.remainingTime / autoplayState.totalTime);
 *
 * // User controls (toggle button)
 * autoplayApi.start();  // Resume autoplay
 * autoplayApi.stop();   // Stop autoplay (preserves progress)
 * autoplayApi.toggle(); // Toggle autoplay on/off
 * autoplayApi.reset();  // Reset timer to beginning
 *
 * // Interaction controls (hover/touch)
 * autoplayApi.pause();  // Temporarily pause (on pointer enter / touch start)
 * autoplayApi.resume(); // Resume after pause (on pointer leave / touch end)
 * ```
 */
export const useCarouselAutoplay = ({
  enabled,
  interval,
  onStart,
  onStop,
}: CarouselAutoplayOptions): [CarouselAutoplayState, CarouselAutoplayApi] => {
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
    listenersRef.current.forEach((listener) => listener());
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

  const state = useMemo<CarouselAutoplayState>(
    () => ({
      isPlaying,
      isStopped,
      isPaused,
      remainingTime: timer.getRemainingTime(),
      totalTime: interval,
    }),
    [isPlaying, isStopped, isPaused, timer, interval],
  );

  const api = useMemo<CarouselAutoplayApi>(
    () => ({
      start,
      stop,
      toggle,
      reset,
      pause,
      resume,
      getRemainingTime,
      addCompletionListener,
    }),
    [start, stop, toggle, reset, pause, resume, getRemainingTime, addCompletionListener],
  );

  return [state, api];
};
