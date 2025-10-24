import { useCallback, useEffect, useRef, useState } from 'react';
import throttle from 'lodash/throttle';

type Options = {
  scrollThrottleWaitTime?: number;
  activeTarget?: HTMLElement | null;
  scrollPadding?: number;
  overflowThreshold?: number;
};

type ScrollDetails = { xPosition: number; containerWidth: number; contentWidth: number };

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
export const useHorizontalScroll = ({
  scrollThrottleWaitTime = 200,
  activeTarget,
  scrollPadding = 0,
  overflowThreshold = 5,
}: Options = {}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollDetails = useRef<ScrollDetails>({ xPosition: 0, containerWidth: 0, contentWidth: 0 });
  const [isScrollContentOffscreenLeft, setIsScrollContentOffscreenLeft] = useState(false);
  const [isScrollContentOffscreenRight, setIsScrollContentOffscreenRight] = useState(false);

  const checkScrollOverflow = useCallback(() => {
    if (!scrollRef.current) return;

    const scrollLeft = scrollRef.current.scrollLeft;
    const scrollWidth = scrollRef.current.scrollWidth;
    const clientWidth = scrollRef.current.clientWidth;
    const maxScroll = scrollWidth - clientWidth;

    // Content is offscreen left when scrolled past the threshold
    const isOffscreenLeft = scrollLeft > overflowThreshold;
    setIsScrollContentOffscreenLeft((prev) => (prev !== isOffscreenLeft ? isOffscreenLeft : prev));

    // Content is offscreen right when not scrolled to the end
    const isOffscreenRight = scrollLeft < maxScroll - overflowThreshold;
    setIsScrollContentOffscreenRight((prev) =>
      prev !== isOffscreenRight ? isOffscreenRight : prev,
    );
  }, [overflowThreshold]);

  const throttledHandleScroll = useRef(
    throttle(() => {
      if (!scrollRef.current) return;
      scrollDetails.current.xPosition = scrollRef.current.scrollLeft;
      checkScrollOverflow();
    }, scrollThrottleWaitTime),
  ).current;

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      throttledHandleScroll();
    },
    [throttledHandleScroll],
  );

  const updateScrollDimensions = useCallback(() => {
    if (!scrollRef.current) return;

    scrollDetails.current.containerWidth = scrollRef.current.clientWidth;
    scrollDetails.current.contentWidth = scrollRef.current.scrollWidth;
    scrollDetails.current.xPosition = scrollRef.current.scrollLeft;

    checkScrollOverflow();
  }, [checkScrollOverflow]);

  // Update dimensions on mount and when content changes
  useEffect(() => {
    updateScrollDimensions();

    // Use ResizeObserver to detect when content size changes
    if (!scrollRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      updateScrollDimensions();
    });

    resizeObserver.observe(scrollRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateScrollDimensions]);

  // Scroll to active target when it changes
  useEffect(() => {
    if (!activeTarget || !scrollRef.current) return;

    const container = scrollRef.current;
    // Use offsetLeft to get the actual position within the scrollable container
    const targetX = activeTarget.offsetLeft;
    const targetWidth = activeTarget.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;

    /** Check if active target is offscreen and only scroll if needed */
    const isOffscreenLeft = targetX < scrollLeft + scrollPadding;
    const isOffscreenRight = targetX + targetWidth > scrollLeft + containerWidth - scrollPadding;
    const isOffscreen = isOffscreenLeft || isOffscreenRight;

    if (isOffscreen) {
      let scrollToX = targetX;

      // Only apply left-scroll logic if we're actually scrolling left (not right)
      if (isOffscreenLeft) {
        scrollToX = Math.max(0, targetX - scrollPadding);
      } else if (isOffscreenRight) {
        scrollToX = targetX - scrollPadding;
      }
      container.scrollTo({ left: scrollToX, behavior: 'smooth' });
    }
  }, [activeTarget, scrollPadding]);

  useEffect(() => {
    return () => {
      throttledHandleScroll.cancel();
    };
  }, [throttledHandleScroll]);

  return {
    scrollRef,
    isScrollContentOffscreenLeft,
    isScrollContentOffscreenRight,
    handleScroll,
  };
};
