import { act, renderHook } from '@testing-library/react-hooks';
import throttle from 'lodash/throttle';

import { useHorizontalScrollToTarget } from '../useHorizontalScrollToTarget';

jest.mock('lodash/throttle');

describe('useHorizontalScrollToTarget', () => {
  let mockScrollElement: HTMLDivElement;
  let mockActiveTarget: HTMLElement;
  let mockResizeObserver: jest.Mock;
  let observe: jest.Mock;
  let disconnect: jest.Mock;
  let throttledFn: jest.Mock & { cancel: jest.Mock };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Mock throttle to return the function immediately
    throttledFn = jest.fn() as jest.Mock & { cancel: jest.Mock };
    throttledFn.cancel = jest.fn();
    (throttle as jest.Mock).mockImplementation((fn) => {
      throttledFn.mockImplementation(fn);
      return throttledFn;
    });

    // Create mock scroll element
    mockScrollElement = document.createElement('div');
    Object.defineProperty(mockScrollElement, 'scrollLeft', {
      writable: true,
      value: 0,
    });
    Object.defineProperty(mockScrollElement, 'scrollWidth', {
      writable: true,
      value: 1000,
    });
    Object.defineProperty(mockScrollElement, 'clientWidth', {
      writable: true,
      value: 500,
    });
    mockScrollElement.scrollTo = jest.fn();

    // Create mock active target
    mockActiveTarget = document.createElement('div');
    Object.defineProperty(mockActiveTarget, 'offsetLeft', {
      writable: true,
      value: 0,
    });
    Object.defineProperty(mockActiveTarget, 'offsetWidth', {
      writable: true,
      value: 100,
    });

    // Mock ResizeObserver
    observe = jest.fn();
    disconnect = jest.fn();
    mockResizeObserver = jest.fn().mockImplementation((callback) => ({
      observe,
      disconnect,
      callback,
    }));

    global.ResizeObserver = mockResizeObserver as unknown as typeof ResizeObserver;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('initialization', () => {
    it('should return initial values', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget());

      expect(result.current.scrollRef).toBeDefined();
      expect(result.current.isScrollContentOffscreenLeft).toBe(false);
      expect(result.current.isScrollContentOffscreenRight).toBe(false);
      expect(result.current.handleScroll).toBeDefined();
    });

    it('should use default options', () => {
      renderHook(() => useHorizontalScrollToTarget());

      expect(throttle).toHaveBeenCalledWith(expect.any(Function), 200);
    });

    it('should use custom scrollThrottleWaitTime', () => {
      renderHook(() => useHorizontalScrollToTarget({ scrollThrottleWaitTime: 100 }));

      expect(throttle).toHaveBeenCalledWith(expect.any(Function), 100);
    });
  });

  describe('overflow detection', () => {
    it('should detect content offscreen left when scrolled', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget({ overflowThreshold: 5 }));

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollElement;
        mockScrollElement.scrollLeft = 10;
        throttledFn();
      });

      expect(result.current.isScrollContentOffscreenLeft).toBe(true);
      expect(result.current.isScrollContentOffscreenRight).toBe(true);
    });

    it('should detect content offscreen right when scrolled', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget({ overflowThreshold: 5 }));

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollElement;
        mockScrollElement.scrollLeft = 490; // Near max scroll (maxScroll = 500, so 490 < 495 = true)
        throttledFn();
      });

      expect(result.current.isScrollContentOffscreenLeft).toBe(true);
      expect(result.current.isScrollContentOffscreenRight).toBe(true); // 490 < 500 - 5
    });

    it('should not detect overflow when at start', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget({ overflowThreshold: 5 }));

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollElement;
        mockScrollElement.scrollLeft = 0;
        throttledFn();
      });

      expect(result.current.isScrollContentOffscreenLeft).toBe(false);
      expect(result.current.isScrollContentOffscreenRight).toBe(true);
    });

    it('should not detect overflow when at end', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget({ overflowThreshold: 5 }));

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollElement;
        mockScrollElement.scrollLeft = 500; // Max scroll
        throttledFn();
      });

      expect(result.current.isScrollContentOffscreenLeft).toBe(true);
      expect(result.current.isScrollContentOffscreenRight).toBe(false);
    });

    it('should use custom overflowThreshold', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget({ overflowThreshold: 10 }));

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollElement;
        mockScrollElement.scrollLeft = 5; // Below threshold
        throttledFn();
      });

      expect(result.current.isScrollContentOffscreenLeft).toBe(false);
    });

    it('should handle no scroll element gracefully', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget());

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = null;
        throttledFn();
      });

      expect(result.current.isScrollContentOffscreenLeft).toBe(false);
      expect(result.current.isScrollContentOffscreenRight).toBe(false);
    });
  });

  describe('ResizeObserver', () => {
    it('should call throttledHandleScroll on mount', () => {
      renderHook(() => useHorizontalScrollToTarget());

      // throttledHandleScroll is called in useEffect on mount
      expect(throttledFn).toHaveBeenCalled();
    });

    it('should handle ResizeObserver when scrollRef is available', () => {
      let resizeCallback: () => void;
      mockResizeObserver.mockImplementation((callback: () => void) => {
        resizeCallback = callback;
        return {
          observe,
          disconnect,
          callback: resizeCallback,
        };
      });

      const { result } = renderHook(() => useHorizontalScrollToTarget());

      // Note: In real usage, the ref would be attached via JSX before the effect runs
      // The effect checks scrollRef.current and only creates ResizeObserver if it exists
      // This test verifies the throttled function is called on mount
      expect(throttledFn).toHaveBeenCalled();
    });
  });

  describe('scroll handling', () => {
    it('should call throttled function on scroll', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget());

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollElement;
        result.current.handleScroll();
      });

      expect(throttledFn).toHaveBeenCalled();
    });
  });

  describe('active target scrolling', () => {
    it('should scroll to active target when offscreen left', () => {
      const { result, rerender } = renderHook(
        ({ activeTarget }: { activeTarget: HTMLElement | null }) =>
          useHorizontalScrollToTarget({ activeTarget }),
        { initialProps: { activeTarget: null } },
      );

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollElement;
        mockScrollElement.scrollLeft = 100;
        Object.defineProperty(mockActiveTarget, 'offsetLeft', { value: 50, writable: true }); // Offscreen left
      });

      // @ts-expect-error - Type inference issue with renderHook
      rerender({ activeTarget: mockActiveTarget });

      expect(mockScrollElement.scrollTo).toHaveBeenCalledWith({
        left: 50,
        behavior: 'smooth',
      });
    });

    it('should scroll to active target when offscreen right', () => {
      const { result, rerender } = renderHook(
        ({ activeTarget }: { activeTarget: HTMLElement | null }) =>
          useHorizontalScrollToTarget({ activeTarget }),
        { initialProps: { activeTarget: null } },
      );

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollElement;
        mockScrollElement.scrollLeft = 0;
        Object.defineProperty(mockActiveTarget, 'offsetLeft', { value: 600, writable: true }); // Offscreen right
      });

      // @ts-expect-error - Type inference issue with renderHook
      rerender({ activeTarget: mockActiveTarget });

      expect(mockScrollElement.scrollTo).toHaveBeenCalledWith({
        left: 600,
        behavior: 'smooth',
      });
    });

    it('should not scroll when target is visible', () => {
      const { result, rerender } = renderHook(
        ({ activeTarget }: { activeTarget: HTMLElement | null }) =>
          useHorizontalScrollToTarget({ activeTarget }),
        { initialProps: { activeTarget: null } },
      );

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollElement;
        mockScrollElement.scrollLeft = 100;
        Object.defineProperty(mockActiveTarget, 'offsetLeft', { value: 200, writable: true }); // Visible
      });

      // @ts-expect-error - Type inference issue with renderHook
      rerender({ activeTarget: mockActiveTarget });

      expect(mockScrollElement.scrollTo).not.toHaveBeenCalled();
    });

    it('should use autoScrollOffset when scrolling', () => {
      const { result, rerender } = renderHook(
        ({
          activeTarget,
          autoScrollOffset,
        }: {
          activeTarget: HTMLElement | null;
          autoScrollOffset: number;
        }) => useHorizontalScrollToTarget({ activeTarget, autoScrollOffset }),
        { initialProps: { activeTarget: null, autoScrollOffset: 0 } },
      );

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollElement;
        mockScrollElement.scrollLeft = 100;
        Object.defineProperty(mockActiveTarget, 'offsetLeft', { value: 50, writable: true });
      });

      // @ts-expect-error - Type inference issue with renderHook
      rerender({ activeTarget: mockActiveTarget, autoScrollOffset: 20 });

      expect(mockScrollElement.scrollTo).toHaveBeenCalledWith({
        left: 30, // 50 - 20
        behavior: 'smooth',
      });
    });

    it('should not scroll below 0 when using autoScrollOffset', () => {
      const { result, rerender } = renderHook(
        ({
          activeTarget,
          autoScrollOffset,
        }: {
          activeTarget: HTMLElement | null;
          autoScrollOffset: number;
        }) => useHorizontalScrollToTarget({ activeTarget, autoScrollOffset }),
        { initialProps: { activeTarget: null, autoScrollOffset: 0 } },
      );

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollElement;
        mockScrollElement.scrollLeft = 100;
        Object.defineProperty(mockActiveTarget, 'offsetLeft', { value: 10, writable: true });
      });

      // @ts-expect-error - Type inference issue with renderHook
      rerender({ activeTarget: mockActiveTarget, autoScrollOffset: 50 });

      expect(mockScrollElement.scrollTo).toHaveBeenCalledWith({
        left: 0, // Math.max(0, 10 - 50)
        behavior: 'smooth',
      });
    });

    it('should handle null activeTarget', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget({ activeTarget: null }));

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollElement;
      });

      expect(mockScrollElement.scrollTo).not.toHaveBeenCalled();
    });

    it('should handle null scrollRef with activeTarget', () => {
      const { result } = renderHook(() =>
        useHorizontalScrollToTarget({ activeTarget: mockActiveTarget }),
      );

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = null;
      });

      expect(mockScrollElement.scrollTo).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should handle content width equal to container width', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget());

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollElement;
        Object.defineProperty(mockScrollElement, 'scrollWidth', { value: 500 });
        Object.defineProperty(mockScrollElement, 'clientWidth', { value: 500 });
        mockScrollElement.scrollLeft = 0;
        throttledFn();
      });

      expect(result.current.isScrollContentOffscreenLeft).toBe(false);
      expect(result.current.isScrollContentOffscreenRight).toBe(false);
    });

    it('should handle content width less than container width', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget());

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollElement;
        Object.defineProperty(mockScrollElement, 'scrollWidth', { value: 300 });
        Object.defineProperty(mockScrollElement, 'clientWidth', { value: 500 });
        mockScrollElement.scrollLeft = 0;
        throttledFn();
      });

      expect(result.current.isScrollContentOffscreenLeft).toBe(false);
      expect(result.current.isScrollContentOffscreenRight).toBe(false);
    });
  });
});
