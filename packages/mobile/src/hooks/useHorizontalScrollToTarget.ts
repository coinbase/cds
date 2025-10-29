import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import throttle from 'lodash/throttle';

export type UseHorizontalScrollToTargetOptions = {
  scrollThrottleWaitTime?: number;
  activeTarget?: View | null;
};

type ScrollDetails = { xPosition: number; containerWidth: number; contentWidth: number };

/**
 * A hook for managing horizontal scrolling with overflow detection.
 * Useful for horizontally scrollable content that needs to show overflow indicators.
 * Optionally handles scrolling to an active target element.
 */
export const useHorizontalScrollToTarget = ({
  scrollThrottleWaitTime = 200,
  activeTarget,
}: UseHorizontalScrollToTargetOptions = {}) => {
  const scrollRef = useRef<ScrollView>(null);
  const scrollDetails = useRef<ScrollDetails>({ xPosition: 0, containerWidth: 0, contentWidth: 0 });
  const [isScrollContentOverflowing, setIsScrollContentOverflowing] = useState(false);
  const [isScrollContentOffscreenRight, setIsScrollContentOffscreenRight] = useState(false);

  const checkScrollState = useCallback(() => {
    const { xPosition, containerWidth, contentWidth } = scrollDetails.current;
    const maxScroll = contentWidth - containerWidth;

    setIsScrollContentOverflowing(contentWidth > containerWidth);
    setIsScrollContentOffscreenRight(xPosition < maxScroll - 1); // -1 offset for fractional values
  }, []);

  const throttledHandleScroll = useRef(
    throttle((xPosition: number) => {
      scrollDetails.current.xPosition = xPosition;
      checkScrollState();
    }, scrollThrottleWaitTime),
  ).current;

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      throttledHandleScroll(event.nativeEvent.contentOffset.x);
    },
    [throttledHandleScroll],
  );

  const handleScrollContainerLayout = useCallback(
    (event: LayoutChangeEvent) => {
      scrollDetails.current.containerWidth = event.nativeEvent.layout.width;
      checkScrollState();
    },
    [checkScrollState],
  );

  const handleScrollContentSizeChange = useCallback(
    (contentWidth: number) => {
      scrollDetails.current.contentWidth = contentWidth;
      checkScrollState();
    },
    [checkScrollState],
  );

  useEffect(() => {
    if (activeTarget && scrollRef.current) {
      // @ts-expect-error Type 'ScrollView' is not assignable to type 'Readonly<NativeMethods>'.
      activeTarget.measureLayout(scrollRef.current, (x, _y, width) => {
        const { xPosition, containerWidth } = scrollDetails.current;
        const isOffscreenLeft = x < xPosition;
        const isOffscreenRight = x + width - xPosition > containerWidth;

        if (isOffscreenLeft || isOffscreenRight) {
          scrollRef.current?.scrollTo({ x, y: 0, animated: true });
        }
      });
    }

    return () => throttledHandleScroll.cancel();
  }, [activeTarget, throttledHandleScroll]);

  return {
    scrollRef,
    isScrollContentOverflowing,
    isScrollContentOffscreenRight,
    handleScroll,
    handleScrollContainerLayout,
    handleScrollContentSizeChange,
  };
};
