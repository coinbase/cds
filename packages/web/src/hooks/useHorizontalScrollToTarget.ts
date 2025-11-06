import { useCallback, useEffect, useRef, useState } from 'react';
import throttle from 'lodash/throttle';

export type UseHorizontalScrollToTargetOptions = {
  scrollThrottleWaitTime?: number;
  activeTarget?: HTMLElement | null;
  scrollPadding?: number;
  overflowThreshold?: number;
};

/**
 * A hook for managing horizontal scrolling with overflow detection.
 * Useful for horizontally scrollable content that needs to show overflow indicators.
 * Optionally handles scrolling to an active target element.
 *
 * @param scrollThrottleWaitTime - Throttle time for scroll events (default: 200ms)
 * @param activeTarget - The active element to scroll to when it's offscreen
 * @param scrollPadding - Padding to add when scrolling to position elements (useful for paddles/overlays, default: 0)
 * @param overflowThreshold - Threshold for detecting if content is offscreen (default: 5px)
 */
export const useHorizontalScrollToTarget = ({
  scrollThrottleWaitTime = 200,
  activeTarget,
  scrollPadding = 0,
  overflowThreshold = 5,
}: UseHorizontalScrollToTargetOptions = {}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrollContentOffscreenLeft, setIsScrollContentOffscreenLeft] = useState(false);
  const [isScrollContentOffscreenRight, setIsScrollContentOffscreenRight] = useState(false);

  const checkScrollOverflow = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;

    setIsScrollContentOffscreenLeft(scrollLeft > overflowThreshold);
    setIsScrollContentOffscreenRight(scrollLeft < maxScroll - overflowThreshold);
  }, [overflowThreshold]);

  const throttledHandleScroll = useRef(
    throttle(checkScrollOverflow, scrollThrottleWaitTime),
  ).current;

  const handleScroll = useCallback(() => {
    throttledHandleScroll();
  }, [throttledHandleScroll]);

  // Set up ResizeObserver and cleanup throttle on unmount
  useEffect(() => {
    throttledHandleScroll();

    if (!scrollRef.current) return;

    const resizeObserver = new ResizeObserver(throttledHandleScroll);
    resizeObserver.observe(scrollRef.current);

    return () => {
      resizeObserver.disconnect();
      throttledHandleScroll.cancel();
    };
  }, [throttledHandleScroll]);

  // Scroll to active target when it changes
  useEffect(() => {
    if (!activeTarget || !scrollRef.current) return;

    const container = scrollRef.current;
    const targetX = activeTarget.offsetLeft;
    const targetWidth = activeTarget.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;

    const isOffscreenLeft = targetX < scrollLeft + scrollPadding;
    const isOffscreenRight = targetX + targetWidth > scrollLeft + containerWidth - scrollPadding;

    if (isOffscreenLeft || isOffscreenRight) {
      const scrollToX = isOffscreenLeft
        ? Math.max(0, targetX - scrollPadding)
        : targetX - scrollPadding;

      container.scrollTo({ left: scrollToX, behavior: 'smooth' });
    }
  }, [activeTarget, scrollPadding]);

  return {
    scrollRef,
    isScrollContentOffscreenLeft,
    isScrollContentOffscreenRight,
    handleScroll,
  };
};
