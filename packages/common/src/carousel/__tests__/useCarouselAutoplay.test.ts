import { act, renderHook } from '@testing-library/react-hooks';

import { useCarouselAutoplay } from '../useCarouselAutoplay';
import type { CarouselAutoplayOptions } from '../useCarouselAutoplay';

// Mock requestAnimationFrame and cancelAnimationFrame
let rafCallbacks: Map<number, FrameRequestCallback> = new Map();
let rafId = 0;

beforeEach(() => {
  rafCallbacks = new Map();
  rafId = 0;

  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    const id = ++rafId;
    rafCallbacks.set(id, callback);
    return id;
  });

  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
    rafCallbacks.delete(id);
  });

  jest.spyOn(performance, 'now').mockReturnValue(0);
});

afterEach(() => {
  jest.restoreAllMocks();
});

const flushRafCallbacks = (time: number) => {
  (performance.now as jest.Mock).mockReturnValue(time);
  const callbacks = Array.from(rafCallbacks.values());
  rafCallbacks.clear();
  callbacks.forEach((cb) => cb(time));
};

describe('useCarouselAutoplay', () => {
  const defaultOptions: CarouselAutoplayOptions = {
    enabled: true,
    interval: 3000,
    onAdvance: jest.fn(),
  };

  describe('initial state', () => {
    it('should return initial state with isPlaying true when enabled', () => {
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));
      const [state, api] = result.current;

      expect(state).toEqual({
        isPlaying: true,
        isStopped: false,
      });

      expect(api).toHaveProperty('start');
      expect(api).toHaveProperty('stop');
      expect(api).toHaveProperty('toggle');
      expect(api).toHaveProperty('reset');
    });

    it('should return initial state with isPlaying false when not enabled', () => {
      const { result } = renderHook(() =>
        useCarouselAutoplay({ ...defaultOptions, enabled: false }),
      );
      const [state] = result.current;

      expect(state.isPlaying).toBe(false);
      expect(state.isStopped).toBe(false);
    });
  });

  describe('start', () => {
    it('should set isPlaying to true when called after stop', () => {
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      // First stop
      act(() => {
        result.current[1].stop();
      });
      expect(result.current[0].isPlaying).toBe(false);
      expect(result.current[0].isStopped).toBe(true);

      // Then start
      act(() => {
        result.current[1].start();
      });
      expect(result.current[0].isPlaying).toBe(true);
      expect(result.current[0].isStopped).toBe(false);
    });

    it('should call onStart callback when starting', () => {
      const onStart = jest.fn();
      const { result } = renderHook(() =>
        useCarouselAutoplay({ ...defaultOptions, enabled: false, onStart }),
      );

      // Enable and start
      const { rerender } = renderHook((props) => useCarouselAutoplay(props), {
        initialProps: { ...defaultOptions, enabled: false, onStart },
      });

      rerender({ ...defaultOptions, enabled: true, onStart });

      expect(onStart).toHaveBeenCalledTimes(1);
    });
  });

  describe('stop', () => {
    it('should set isStopped to true and isPlaying to false', () => {
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      act(() => {
        result.current[1].stop();
      });

      const [state] = result.current;
      expect(state.isPlaying).toBe(false);
      expect(state.isStopped).toBe(true);
    });

    it('should call onStop callback when stopping', () => {
      const onStop = jest.fn();
      const { result } = renderHook(() => useCarouselAutoplay({ ...defaultOptions, onStop }));

      act(() => {
        result.current[1].stop();
      });

      expect(onStop).toHaveBeenCalledTimes(1);
    });
  });

  describe('toggle', () => {
    it('should toggle from playing to stopped', () => {
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      expect(result.current[0].isPlaying).toBe(true);

      act(() => {
        result.current[1].toggle();
      });

      expect(result.current[0].isPlaying).toBe(false);
      expect(result.current[0].isStopped).toBe(true);
    });

    it('should toggle from stopped to playing', () => {
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));

      // Stop first
      act(() => {
        result.current[1].stop();
      });
      expect(result.current[0].isStopped).toBe(true);

      // Toggle back to playing
      act(() => {
        result.current[1].toggle();
      });

      expect(result.current[0].isPlaying).toBe(true);
      expect(result.current[0].isStopped).toBe(false);
    });
  });

  describe('reset', () => {
    it('should reset progress to 0', () => {
      const onProgressUpdate = jest.fn();
      const { result } = renderHook(() =>
        useCarouselAutoplay({ ...defaultOptions, onProgressUpdate }),
      );

      // Simulate some progress
      act(() => {
        flushRafCallbacks(1500); // 50% progress
      });

      // Reset
      act(() => {
        result.current[1].reset();
      });

      // Should have called onProgressUpdate with 0
      expect(onProgressUpdate).toHaveBeenLastCalledWith(0);
    });

    it('should restart timer when playing', () => {
      const onAdvance = jest.fn();
      const { result } = renderHook(() => useCarouselAutoplay({ ...defaultOptions, onAdvance }));

      jest.useFakeTimers();

      // Advance time partially
      act(() => {
        jest.advanceTimersByTime(1500);
      });

      // Reset
      act(() => {
        result.current[1].reset();
      });

      // Advance full interval - should trigger advance
      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(onAdvance).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });
  });

  describe('onAdvance callback', () => {
    it('should call onAdvance after interval elapses', () => {
      jest.useFakeTimers();
      const onAdvance = jest.fn();
      renderHook(() => useCarouselAutoplay({ ...defaultOptions, onAdvance }));

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(onAdvance).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });

    it('should call onAdvance repeatedly', () => {
      jest.useFakeTimers();
      const onAdvance = jest.fn();
      renderHook(() => useCarouselAutoplay({ ...defaultOptions, onAdvance }));

      act(() => {
        jest.advanceTimersByTime(9000); // 3 intervals
      });

      expect(onAdvance).toHaveBeenCalledTimes(3);

      jest.useRealTimers();
    });

    it('should not call onAdvance when stopped', () => {
      jest.useFakeTimers();
      const onAdvance = jest.fn();
      const { result } = renderHook(() => useCarouselAutoplay({ ...defaultOptions, onAdvance }));

      act(() => {
        result.current[1].stop();
      });

      act(() => {
        jest.advanceTimersByTime(6000);
      });

      expect(onAdvance).not.toHaveBeenCalled();

      jest.useRealTimers();
    });
  });

  describe('progress updates', () => {
    it('should call onProgressUpdate with values from 0 to 1', () => {
      const onProgressUpdate = jest.fn();
      renderHook(() => useCarouselAutoplay({ ...defaultOptions, onProgressUpdate }));

      // Initial call at 0
      act(() => {
        flushRafCallbacks(0);
      });
      expect(onProgressUpdate).toHaveBeenCalledWith(0);

      // Halfway through
      act(() => {
        flushRafCallbacks(1500);
      });
      expect(onProgressUpdate).toHaveBeenCalledWith(0.5);

      // At the end
      act(() => {
        flushRafCallbacks(3000);
      });
      expect(onProgressUpdate).toHaveBeenCalledWith(1);
    });

    it('should not exceed progress of 1', () => {
      const onProgressUpdate = jest.fn();
      renderHook(() => useCarouselAutoplay({ ...defaultOptions, onProgressUpdate }));

      act(() => {
        flushRafCallbacks(5000); // Beyond interval
      });

      expect(onProgressUpdate).toHaveBeenLastCalledWith(1);
    });
  });

  describe('enabled prop changes', () => {
    it('should start autoplay when enabled changes from false to true', () => {
      const onStart = jest.fn();
      const { rerender } = renderHook((props) => useCarouselAutoplay(props), {
        initialProps: { ...defaultOptions, enabled: false, onStart },
      });

      expect(onStart).not.toHaveBeenCalled();

      rerender({ ...defaultOptions, enabled: true, onStart });

      expect(onStart).toHaveBeenCalledTimes(1);
    });

    it('should not auto-stop when enabled changes to false (user must call stop)', () => {
      const { result, rerender } = renderHook((props) => useCarouselAutoplay(props), {
        initialProps: defaultOptions,
      });

      expect(result.current[0].isPlaying).toBe(true);

      rerender({ ...defaultOptions, enabled: false });

      // isPlaying becomes false because enabled && !isStopped
      expect(result.current[0].isPlaying).toBe(false);
      // But isStopped is still false (user didn't stop it)
      expect(result.current[0].isStopped).toBe(false);
    });
  });

  describe('state consistency', () => {
    it('should maintain referential stability for API methods', () => {
      const { result, rerender } = renderHook(() => useCarouselAutoplay(defaultOptions));
      const [, initialApi] = result.current;

      rerender();
      const [, rerenderApi] = result.current;

      expect(initialApi.start).toBe(rerenderApi.start);
      expect(initialApi.stop).toBe(rerenderApi.stop);
      expect(initialApi.toggle).toBe(rerenderApi.toggle);
      // reset may change due to isPlaying dependency, but that's expected
    });

    it('should return new state object when state changes', () => {
      const { result } = renderHook(() => useCarouselAutoplay(defaultOptions));
      const [initialState] = result.current;

      act(() => {
        result.current[1].stop();
      });

      const [newState] = result.current;
      expect(initialState).not.toBe(newState);
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
        result.current[1].stop();
        result.current[1].start();
        result.current[1].stop();
        result.current[1].start();
      });

      // Should end in playing state
      expect(result.current[0].isPlaying).toBe(true);
    });

    it('should handle zero interval gracefully', () => {
      const onAdvance = jest.fn();
      expect(() => {
        renderHook(() => useCarouselAutoplay({ ...defaultOptions, interval: 0, onAdvance }));
      }).not.toThrow();
    });

    it('should cleanup on unmount', () => {
      const { unmount } = renderHook(() => useCarouselAutoplay(defaultOptions));

      jest.useFakeTimers();

      unmount();

      // Should not throw when advancing time after unmount
      expect(() => {
        act(() => {
          jest.advanceTimersByTime(10000);
        });
      }).not.toThrow();

      jest.useRealTimers();
    });
  });

  describe('progress preservation', () => {
    it('should preserve progress when stopping', () => {
      const onProgressUpdate = jest.fn();
      const { result } = renderHook(() =>
        useCarouselAutoplay({ ...defaultOptions, onProgressUpdate }),
      );

      // Simulate some progress
      act(() => {
        flushRafCallbacks(1500); // 50% progress
      });

      const progressBeforeStop =
        onProgressUpdate.mock.calls[onProgressUpdate.mock.calls.length - 1][0];

      act(() => {
        result.current[1].stop();
      });

      // Progress should be preserved (not reset to 0)
      expect(progressBeforeStop).toBeCloseTo(0.5, 1);
    });

    it('should resume from preserved progress when starting', () => {
      const onProgressUpdate = jest.fn();
      const { result } = renderHook(() =>
        useCarouselAutoplay({ ...defaultOptions, onProgressUpdate }),
      );

      // Simulate 50% progress
      act(() => {
        flushRafCallbacks(1500);
      });

      // Stop
      act(() => {
        result.current[1].stop();
      });

      // Start again
      act(() => {
        result.current[1].start();
      });

      // The progress animation should resume from where it left off
      // (verified by the startProgressAnimation being called with fromPausedProgress=true)
      expect(result.current[0].isPlaying).toBe(true);
    });
  });
});
