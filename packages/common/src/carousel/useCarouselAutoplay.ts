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
   * Callback fired when autoplay should advance to the next item.
   */
  onAdvance: () => void;
  /**
   * Callback fired on progress update.
   */
  onProgressUpdate?: (progress: number) => void;
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
   * Reset the autoplay timer and progress to 0 (e.g., after manual navigation).
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
};

/**
 * A hook for managing carousel autoplay state and timing.
 *
 * Provides controls for starting, stopping, and resetting autoplay with
 * progress tracking via requestAnimationFrame for smooth animations.
 *
 * @param options - The options for carousel autoplay.
 * @param options.enabled - Whether autoplay is enabled.
 * @param options.interval - The interval in milliseconds between auto-advances.
 * @param options.onAdvance - Callback fired when autoplay should advance to the next item.
 * @param options.onProgressUpdate - Callback fired on each animation frame with progress (0-1).
 * @param options.onStart - Callback fired when autoplay starts.
 * @param options.onStop - Callback fired when autoplay stops.
 * @returns A tuple where the first element is the autoplay state and the second element is an API for controlling autoplay.
 *
 * @example
 * ```tsx
 * const [autoplayState, autoplayApi] = useCarouselAutoplay({
 *   enabled: true,
 *   interval: 3000,
 *   onAdvance: () => goToNextPage(),
 *   onProgressUpdate: (progress) => progressValue.set(progress),
 * });
 *
 * // State
 * autoplayState.isPlaying; // true when actively running
 * autoplayState.isStopped; // true when user has stopped autoplay
 * autoplayState.isPaused;  // true when temporarily paused (hover/touch)
 *
 * // User controls (toggle button)
 * autoplayApi.start();  // Resume autoplay
 * autoplayApi.stop();   // Stop autoplay (preserves progress)
 * autoplayApi.toggle(); // Toggle autoplay on/off
 * autoplayApi.reset();  // Reset timer and progress to 0
 *
 * // Interaction controls (hover/touch)
 * autoplayApi.pause();  // Temporarily pause (on pointer enter / touch start)
 * autoplayApi.resume(); // Resume after pause (on pointer leave / touch end)
 * ```
 */
export const useCarouselAutoplay = ({
  enabled,
  interval,
  onAdvance,
  onProgressUpdate,
  onStart,
  onStop,
}: CarouselAutoplayOptions): [CarouselAutoplayState, CarouselAutoplayApi] => {
  const timer = useTimer();
  const [isStopped, setIsStopped] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  // Stores the requestAnimationFrame ID so we can immediately cancel the animation on pause/stop/unmount
  // This prevents the animation from continuing
  const animationFrameIdRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const pausedProgressRef = useRef<number>(0);
  const isPlayingRef = useRef(false);

  const isPlaying = enabled && !isStopped && !isPaused;

  isPlayingRef.current = isPlaying;

  const cancelProgressAnimation = useCallback(
    (resetProgress: boolean) => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = 0;
      }
      if (resetProgress) {
        pausedProgressRef.current = 0;
        onProgressUpdate?.(0);
      }
    },
    [onProgressUpdate],
  );

  const pauseProgressAnimation = useCallback(() => {
    if (animationFrameIdRef.current) {
      const elapsed = performance.now() - startTimeRef.current;
      pausedProgressRef.current = Math.min(elapsed / interval, 1);
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = 0;
    }
  }, [interval]);

  const startProgressAnimation = useCallback(
    (fromPausedProgress: boolean) => {
      if (!onProgressUpdate) return;

      const initialProgress = fromPausedProgress ? pausedProgressRef.current : 0;

      startTimeRef.current = performance.now() - initialProgress * interval;

      const updateProgress = () => {
        const elapsed = performance.now() - startTimeRef.current;
        const progress = Math.min(elapsed / interval, 1);
        onProgressUpdate(progress);

        if (progress < 1) {
          animationFrameIdRef.current = requestAnimationFrame(updateProgress);
        }
      };

      animationFrameIdRef.current = requestAnimationFrame(updateProgress);
    },
    [interval, onProgressUpdate],
  );

  const startAutoplay = useCallback(
    (fromPausedProgress: boolean) => {
      if (!enabled || isStopped || isPaused) return;

      const advance = () => {
        if (!isPlayingRef.current) return;
        pausedProgressRef.current = 0;
        cancelProgressAnimation(true);
        onAdvance();
        startProgressAnimation(false);
        timer.start(advance, interval);
      };

      const remainingTime = fromPausedProgress
        ? interval * (1 - pausedProgressRef.current)
        : interval;

      cancelProgressAnimation(false);
      startProgressAnimation(fromPausedProgress);
      timer.start(advance, remainingTime);

      if (!isPlayingRef.current) {
        isPlayingRef.current = true;
        onStart?.();
      }
    },
    [
      enabled,
      isStopped,
      isPaused,
      onAdvance,
      interval,
      timer,
      cancelProgressAnimation,
      startProgressAnimation,
      onStart,
    ],
  );

  const start = useCallback(() => {
    setIsStopped(false);
  }, []);

  const stop = useCallback(() => {
    pauseProgressAnimation();
    timer.pause();
    setIsStopped(true);
    if (isPlayingRef.current) {
      isPlayingRef.current = false;
      onStop?.();
    }
  }, [pauseProgressAnimation, timer, onStop]);

  const toggle = useCallback(() => {
    if (isStopped) {
      start();
    } else {
      stop();
    }
  }, [isStopped, start, stop]);

  const reset = useCallback(() => {
    pausedProgressRef.current = 0;
    onProgressUpdate?.(0);
  }, [onProgressUpdate]);

  const pause = useCallback(() => {
    if (!isPlaying) return;
    pauseProgressAnimation();
    timer.pause();
    setIsPaused(true);
  }, [isPlaying, pauseProgressAnimation, timer]);

  const resume = useCallback(() => {
    if (isStopped) return;
    setIsPaused(false);
  }, [isStopped]);

  // Start autoplay when isPlaying is true
  useEffect(() => {
    if (isPlaying) {
      const shouldResumeFromProgress = pausedProgressRef.current > 0;
      startAutoplay(shouldResumeFromProgress);
    }
  }, [isPlaying, startAutoplay]);

  // Cleanup timer and animation frame on unmount
  useEffect(() => {
    return () => {
      timer.clear();
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [timer]);

  const state = useMemo<CarouselAutoplayState>(
    () => ({
      isPlaying,
      isStopped,
      isPaused,
    }),
    [isPlaying, isStopped, isPaused],
  );

  const api = useMemo<CarouselAutoplayApi>(
    () => ({
      start,
      stop,
      toggle,
      reset,
      pause,
      resume,
    }),
    [start, stop, toggle, reset, pause, resume],
  );

  return [state, api];
};
