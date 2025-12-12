import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import { act, renderHook } from '@testing-library/react-hooks';
import throttle from 'lodash/throttle';

import { useHorizontalScrollToTarget } from '../useHorizontalScrollToTarget';

jest.mock('lodash/throttle');

describe('useHorizontalScrollToTarget', () => {
  let mockScrollView: ScrollView;
  let mockActiveTarget: View;
  let throttledFn: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Mock throttle to return the function immediately
    throttledFn = jest.fn();
    // @ts-expect-error - Testing internal ref assignment
    throttledFn.cancel = jest.fn();
    (throttle as jest.Mock).mockImplementation((fn) => {
      throttledFn.mockImplementation(fn);
      return throttledFn;
    });

    // Create mock ScrollView
    mockScrollView = {
      scrollTo: jest.fn(),
    } as unknown as ScrollView;

    // Create mock active target View
    mockActiveTarget = {
      measureLayout: jest.fn((parent, callback) => {
        callback(100, 0, 50); // x, y, width
      }),
    } as unknown as View;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('initialization', () => {
    it('should return initial values', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget());

      expect(result.current.scrollRef).toBeDefined();
      expect(result.current.isScrollContentOverflowing).toBe(false);
      expect(result.current.isScrollContentOffscreenRight).toBe(false);
      expect(result.current.isScrollContentOffscreenLeft).toBe(false);
      expect(result.current.handleScroll).toBeDefined();
      expect(result.current.handleScrollContainerLayout).toBeDefined();
      expect(result.current.handleScrollContentSizeChange).toBeDefined();
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
    it('should detect content overflowing when content width > container width', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget({ overflowThreshold: 1 }));

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(1000);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
      });

      expect(result.current.isScrollContentOverflowing).toBe(true);
    });

    it('should not detect overflow when content width <= container width', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget({ overflowThreshold: 1 }));

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(400);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
      });

      expect(result.current.isScrollContentOverflowing).toBe(false);
    });

    it('should detect content offscreen left when scrolled', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget({ overflowThreshold: 1 }));

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(1000);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
        throttledFn(10); // xPosition = 10
      });

      expect(result.current.isScrollContentOffscreenLeft).toBe(true);
      expect(result.current.isScrollContentOffscreenRight).toBe(true);
    });

    it('should detect content offscreen right when scrolled', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget({ overflowThreshold: 1 }));

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(1000);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
        throttledFn(490); // Near max scroll (maxScroll = 500, so 490 < 500 - 1 = true)
      });

      expect(result.current.isScrollContentOffscreenLeft).toBe(true);
      expect(result.current.isScrollContentOffscreenRight).toBe(true); // 490 < 500 - 1
    });

    it('should not detect overflow when at start', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget({ overflowThreshold: 1 }));

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(1000);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
        throttledFn(0);
      });

      expect(result.current.isScrollContentOffscreenLeft).toBe(false);
      expect(result.current.isScrollContentOffscreenRight).toBe(true);
    });

    it('should not detect overflow when at end', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget({ overflowThreshold: 1 }));

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(1000);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
        throttledFn(500); // Max scroll
      });

      expect(result.current.isScrollContentOffscreenLeft).toBe(true);
      expect(result.current.isScrollContentOffscreenRight).toBe(false);
    });

    it('should use custom overflowThreshold', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget({ overflowThreshold: 10 }));

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(1000);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
        throttledFn(5); // Below threshold
      });

      expect(result.current.isScrollContentOffscreenLeft).toBe(false);
    });
  });

  describe('scroll handling', () => {
    it('should call throttled function on scroll', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget());

      act(() => {
        const scrollEvent = {
          nativeEvent: { contentOffset: { x: 100, y: 0 } },
        } as NativeSyntheticEvent<NativeScrollEvent>;
        result.current.handleScroll(scrollEvent);
      });

      expect(throttledFn).toHaveBeenCalledWith(100);
    });

    it('should update scroll position in throttled function', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget());

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(1000);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
        const scrollEvent = {
          nativeEvent: { contentOffset: { x: 150, y: 0 } },
        } as NativeSyntheticEvent<NativeScrollEvent>;
        result.current.handleScroll(scrollEvent);
      });

      expect(throttledFn).toHaveBeenCalledWith(150);
    });
  });

  describe('layout handling', () => {
    it('should update container width on layout change', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget());

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(1000);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 600 } },
        } as LayoutChangeEvent);
      });

      expect(result.current.isScrollContentOverflowing).toBe(true);
    });

    it('should call checkScrollState after layout change', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget());

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(1000);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
      });

      expect(result.current.isScrollContentOverflowing).toBe(true);
    });
  });

  describe('content size change handling', () => {
    it('should update content width on size change', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget());

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
        result.current.handleScrollContentSizeChange(800);
      });

      expect(result.current.isScrollContentOverflowing).toBe(true);
    });

    it('should call checkScrollState after content size change', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget());

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
        result.current.handleScrollContentSizeChange(300);
      });

      expect(result.current.isScrollContentOverflowing).toBe(false);
    });
  });

  describe('active target scrolling', () => {
    it('should scroll to active target when offscreen left', () => {
      const { result, rerender } = renderHook(
        ({ activeTarget }) => useHorizontalScrollToTarget({ activeTarget }),
        { initialProps: { activeTarget: null } },
      );

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(1000);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
        throttledFn(150); // Current scroll position
        (mockActiveTarget.measureLayout as jest.Mock).mockImplementation((parent, callback) => {
          callback(50, 0, 50); // x position is offscreen left (50 < 150)
        });
      });

      // @ts-expect-error - Type inference issue with renderHook
      rerender({ activeTarget: mockActiveTarget });

      expect(mockActiveTarget.measureLayout).toHaveBeenCalled();
      expect(mockScrollView.scrollTo).toHaveBeenCalledWith({
        x: 50,
        y: 0,
        animated: true,
      });
    });

    it('should scroll to active target when offscreen right', () => {
      const { result, rerender } = renderHook(
        ({ activeTarget }) => useHorizontalScrollToTarget({ activeTarget }),
        { initialProps: { activeTarget: null } },
      );

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(1000);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
        throttledFn(0); // Current scroll position
        (mockActiveTarget.measureLayout as jest.Mock).mockImplementation((parent, callback) => {
          callback(600, 0, 50); // x + width (650) > scrollLeft (0) + containerWidth (500)
        });
      });

      // @ts-expect-error - Type inference issue with renderHook
      rerender({ activeTarget: mockActiveTarget });

      expect(mockActiveTarget.measureLayout).toHaveBeenCalled();
      expect(mockScrollView.scrollTo).toHaveBeenCalledWith({
        x: 600,
        y: 0,
        animated: true,
      });
    });

    it('should not scroll when target is visible', () => {
      const { result, rerender } = renderHook(
        ({ activeTarget }) => useHorizontalScrollToTarget({ activeTarget }),
        { initialProps: { activeTarget: null } },
      );

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(1000);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
        throttledFn(100); // Current scroll position
        (mockActiveTarget.measureLayout as jest.Mock).mockImplementation((parent, callback) => {
          callback(200, 0, 50); // Visible: 200 >= 100 and 250 <= 500
        });
      });

      // @ts-expect-error - Type inference issue with renderHook
      rerender({ activeTarget: mockActiveTarget });

      expect(mockActiveTarget.measureLayout).toHaveBeenCalled();
      expect(mockScrollView.scrollTo).not.toHaveBeenCalled();
    });

    it('should use autoScrollOffset when scrolling', () => {
      const { result, rerender } = renderHook(
        ({ activeTarget, autoScrollOffset }) =>
          useHorizontalScrollToTarget({ activeTarget, autoScrollOffset }),
        { initialProps: { activeTarget: null, autoScrollOffset: 0 } },
      );

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(1000);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
        throttledFn(150);
        (mockActiveTarget.measureLayout as jest.Mock).mockImplementation((parent, callback) => {
          callback(50, 0, 50);
        });
      });

      // @ts-expect-error - Type inference issue with renderHook
      rerender({ activeTarget: mockActiveTarget, autoScrollOffset: 20 });

      expect(mockScrollView.scrollTo).toHaveBeenCalledWith({
        x: 30, // 50 - 20
        y: 0,
        animated: true,
      });
    });

    it('should handle null activeTarget', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget({ activeTarget: null }));

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
      });

      expect(mockScrollView.scrollTo).not.toHaveBeenCalled();
    });

    it('should handle null scrollRef with activeTarget', () => {
      const { result } = renderHook(() =>
        useHorizontalScrollToTarget({ activeTarget: mockActiveTarget }),
      );

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = null;
      });

      expect(mockActiveTarget.measureLayout).not.toHaveBeenCalled();
    });
  });

  describe('cleanup', () => {
    it('should cancel throttle on unmount', () => {
      const { unmount } = renderHook(() => useHorizontalScrollToTarget());

      unmount();

      // @ts-expect-error - Testing internal ref assignment
      expect(throttledFn.cancel).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should handle content width equal to container width', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget());

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(500);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
        throttledFn(0);
      });

      expect(result.current.isScrollContentOverflowing).toBe(false);
      expect(result.current.isScrollContentOffscreenLeft).toBe(false);
      expect(result.current.isScrollContentOffscreenRight).toBe(false);
    });

    it('should handle content width less than container width', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget());

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(300);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
        throttledFn(0);
      });

      expect(result.current.isScrollContentOverflowing).toBe(false);
      expect(result.current.isScrollContentOffscreenLeft).toBe(false);
      expect(result.current.isScrollContentOffscreenRight).toBe(false);
    });

    it('should handle fractional scroll positions', () => {
      const { result } = renderHook(() => useHorizontalScrollToTarget({ overflowThreshold: 1 }));

      act(() => {
        // @ts-expect-error - Testing internal ref assignment
        result.current.scrollRef.current = mockScrollView;
        result.current.handleScrollContentSizeChange(1000);
        result.current.handleScrollContainerLayout({
          nativeEvent: { layout: { width: 500 } },
        } as LayoutChangeEvent);
        throttledFn(0.5); // Fractional value
      });

      expect(result.current.isScrollContentOffscreenLeft).toBe(false);
    });
  });
});
