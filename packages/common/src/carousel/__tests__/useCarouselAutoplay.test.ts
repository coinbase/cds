import { act, renderHook } from '@testing-library/react-hooks';

import type { CarouselAutoplayOptions } from '../useCarouselAutoplay';
import { useCarouselAutoplay } from '../useCarouselAutoplay';

describe('useCarouselAutoplay', () => {
  const defaultOptions: CarouselAutoplayOptions = {
    enabled: true,
    interval: 3000,
  };

  describe('initial state', () => {
    it('should return initial state with isPlaying true when enabled', () => {
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));
      const autoplay = result.current;

      expect(autoplay.isPlaying).toBe(true);
      expect(autoplay.isStopped).toBe(false);
      expect(autoplay.isPaused).toBe(false);

      expect(autoplay).toHaveProperty('start');
      expect(autoplay).toHaveProperty('stop');
      expect(autoplay).toHaveProperty('toggle');
      expect(autoplay).toHaveProperty('reset');
      expect(autoplay).toHaveProperty('getRemainingTime');
      expect(autoplay).toHaveProperty('addCompletionListener');
    });

    it('should return initial state with isPlaying false when not enabled', () => {
      const { result } = renderHook(() =>
        useCarouselAutoplay({ ...defaultOptions, enabled: false }),
      );
      const autoplay = result.current;

      expect(autoplay.isPlaying).toBe(false);
      expect(autoplay.isStopped).toBe(false);
    });
  });

  describe('start', () => {
    it('should set isPlaying to true when called after stop', () => {
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      act(() => {
        result.current.stop();
      });
      expect(result.current.isPlaying).toBe(false);
      expect(result.current.isStopped).toBe(true);

      act(() => {
        result.current.start();
      });
      expect(result.current.isPlaying).toBe(true);
      expect(result.current.isStopped).toBe(false);
    });
  });

  describe('stop', () => {
    it('should set isStopped to true and isPlaying to false', () => {
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      act(() => {
        result.current.stop();
      });

      expect(result.current.isPlaying).toBe(false);
      expect(result.current.isStopped).toBe(true);
    });

    it('should call onStop callback when stopping', () => {
      const onStop = jest.fn();
      const { result } = renderHook(() => useCarouselAutoplay({ ...defaultOptions, onStop }));

      act(() => {
        result.current.stop();
      });

      expect(onStop).toHaveBeenCalledTimes(1);
    });
  });

  describe('toggle', () => {
    it('should toggle from playing to stopped', () => {
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      expect(result.current.isPlaying).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isPlaying).toBe(false);
      expect(result.current.isStopped).toBe(true);
    });

    it('should toggle from stopped to playing', () => {
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      act(() => {
        result.current.stop();
      });
      expect(result.current.isStopped).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isPlaying).toBe(true);
      expect(result.current.isStopped).toBe(false);
    });
  });

  describe('reset', () => {
    it('should restart the timer when playing', () => {
      jest.useFakeTimers();
      const listener = jest.fn();
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      // Subscribe to completion
      act(() => {
        result.current.addCompletionListener(listener);
      });

      // Advance halfway
      act(() => {
        jest.advanceTimersByTime(1500);
      });

      // Reset should restart the timer
      act(() => {
        result.current.reset();
      });

      // After another 1500ms, listener should NOT have been called yet
      // because we reset the timer
      act(() => {
        jest.advanceTimersByTime(1500);
      });

      expect(listener).not.toHaveBeenCalled();

      // After another 1500ms (total 3000ms from reset), listener should be called
      act(() => {
        jest.advanceTimersByTime(1500);
      });

      expect(listener).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });
  });

  describe('addCompletionListener', () => {
    it('should call listener after interval elapses', () => {
      jest.useFakeTimers();
      const listener = jest.fn();
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      act(() => {
        result.current.addCompletionListener(listener);
      });

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(listener).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });

    it('should call listener repeatedly when reset is called after each advance', () => {
      jest.useFakeTimers();
      const listener = jest.fn();
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      act(() => {
        result.current.addCompletionListener(listener);
      });

      // First advance
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(listener).toHaveBeenCalledTimes(1);

      // Reset to restart timer (simulates what goToPage does)
      act(() => {
        result.current.reset();
      });

      // Second advance
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(listener).toHaveBeenCalledTimes(2);

      // Reset again
      act(() => {
        result.current.reset();
      });

      // Third advance
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(listener).toHaveBeenCalledTimes(3);

      jest.useRealTimers();
    });

    it('should not call listener when stopped', () => {
      jest.useFakeTimers();
      const listener = jest.fn();
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      act(() => {
        result.current.addCompletionListener(listener);
      });

      act(() => {
        result.current.stop();
      });

      act(() => {
        jest.advanceTimersByTime(10000);
      });

      expect(listener).not.toHaveBeenCalled();

      jest.useRealTimers();
    });

    it('should support multiple listeners', () => {
      jest.useFakeTimers();
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      act(() => {
        result.current.addCompletionListener(listener1);
        result.current.addCompletionListener(listener2);
      });

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });

    it('should unsubscribe when calling returned function', () => {
      jest.useFakeTimers();
      const listener = jest.fn();
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      let unsubscribe: () => void;
      act(() => {
        unsubscribe = result.current.addCompletionListener(listener);
      });

      // Unsubscribe before timer fires
      act(() => {
        unsubscribe();
      });

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(listener).not.toHaveBeenCalled();

      jest.useRealTimers();
    });
  });

  describe('timing info', () => {
    it('should provide getRemainingTime function', () => {
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));
      expect(typeof result.current.getRemainingTime).toBe('function');
    });

    it('should return decreasing remaining time as timer progresses', () => {
      jest.useFakeTimers();
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      const initialRemaining = result.current.getRemainingTime();
      expect(initialRemaining).toBeLessThanOrEqual(3000);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      const remainingAfter1s = result.current.getRemainingTime();
      expect(remainingAfter1s).toBeLessThan(initialRemaining);

      jest.useRealTimers();
    });
  });

  describe('enabled prop changes', () => {
    it('should start autoplay when enabled changes from false to true', () => {
      const onStart = jest.fn();
      const { result, rerender } = renderHook((props) => useCarouselAutoplay(props), {
        initialProps: { ...defaultOptions, enabled: false, onStart },
      });

      expect(onStart).not.toHaveBeenCalled();
      expect(result.current.isPlaying).toBe(false);

      rerender({ ...defaultOptions, enabled: true, onStart });

      expect(result.current.isPlaying).toBe(true);
    });

    it('should not auto-stop when enabled changes to false (user must call stop)', () => {
      const { result, rerender } = renderHook((props) => useCarouselAutoplay(props), {
        initialProps: defaultOptions,
      });

      expect(result.current.isPlaying).toBe(true);

      rerender({ ...defaultOptions, enabled: false });

      expect(result.current.isPlaying).toBe(false);
      expect(result.current.isStopped).toBe(false);
    });
  });

  describe('state consistency', () => {
    it('should maintain referential stability for API methods', () => {
      const { result, rerender } = renderHook(() => useCarouselAutoplay(defaultOptions));
      const initialAutoplay = result.current;

      rerender();
      const rerenderAutoplay = result.current;

      expect(initialAutoplay.start).toBe(rerenderAutoplay.start);
      expect(initialAutoplay.stop).toBe(rerenderAutoplay.stop);
      expect(initialAutoplay.toggle).toBe(rerenderAutoplay.toggle);
    });

    it('should return new object when state changes', () => {
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));
      const initialAutoplay = result.current;

      act(() => {
        result.current.stop();
      });

      const newAutoplay = result.current;
      expect(initialAutoplay).not.toBe(newAutoplay);
    });
  });

  describe('edge cases', () => {
    it('should handle rapid start/stop calls', () => {
      const onStart = jest.fn();
      const onStop = jest.fn();
      const { result } = renderHook(() =>
        useCarouselAutoplay({ ...defaultOptions, onStart, onStop }),
      );

      act(() => {
        result.current.stop();
        result.current.start();
        result.current.stop();
        result.current.start();
      });

      expect(result.current.isPlaying).toBe(true);
    });

    it('should handle zero interval gracefully', () => {
      expect(() => {
        renderHook(() => useCarouselAutoplay({ ...defaultOptions, interval: 0 }));
      }).not.toThrow();
    });

    it('should cleanup on unmount', () => {
      const { unmount } = renderHook(() => useCarouselAutoplay(defaultOptions));

      jest.useFakeTimers();

      unmount();

      expect(() => {
        act(() => {
          jest.advanceTimersByTime(10000);
        });
      }).not.toThrow();

      jest.useRealTimers();
    });
  });

  describe('pause and resume', () => {
    it('should pause and resume correctly', () => {
      jest.useFakeTimers();
      const listener = jest.fn();
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      act(() => {
        result.current.addCompletionListener(listener);
      });

      // Advance halfway
      act(() => {
        jest.advanceTimersByTime(1500);
      });

      // Pause
      act(() => {
        result.current.pause();
      });
      expect(result.current.isPaused).toBe(true);
      expect(result.current.isPlaying).toBe(false);

      // Time passes while paused - listener should not be called
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      expect(listener).not.toHaveBeenCalled();

      // Resume
      act(() => {
        result.current.resume();
      });
      expect(result.current.isPaused).toBe(false);
      expect(result.current.isPlaying).toBe(true);

      // After remaining time, listener should be called
      act(() => {
        jest.advanceTimersByTime(1500);
      });
      expect(listener).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });

    it('should not resume if stopped', () => {
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      act(() => {
        result.current.stop();
      });

      act(() => {
        result.current.resume();
      });

      expect(result.current.isPlaying).toBe(false);
      expect(result.current.isStopped).toBe(true);
    });
  });
});
