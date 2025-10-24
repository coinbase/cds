import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import throttle from 'lodash/throttle';

type Options = {
  scrollThrottleWaitTime?: number;
  activeTarget?: View | null;
};

type ScrollDetails = { xPosition: number; containerWidth: number; contentWidth: number };

/**
 * A hook for managing horizontal scrolling with overflow detection.
 * Useful for horizontally scrollable content that needs to show overflow indicators.
 * Optionally handles scrolling to an active target element.
 */
export const useHorizontalScroll = ({
  scrollThrottleWaitTime = 200,
  activeTarget,
}: Options = {}) => {
  const scrollRef = useRef<ScrollView>(null);
  const scrollDetails = useRef<ScrollDetails>({ xPosition: 0, containerWidth: 0, contentWidth: 0 });
  const [isScrollContentOverflowing, setIsScrollContentOverflowing] = useState(false);
  const [isScrollContentOffscreenRight, setIsScrollContentOffscreenRight] = useState(false);

  const checkIsContentOverflowing = useCallback(() => {
    const isOverflowing = scrollDetails.current.contentWidth > scrollDetails.current.containerWidth;

    setIsScrollContentOverflowing((prevState) =>
      prevState === isOverflowing ? prevState : isOverflowing,
    );
  }, []);

  const checkIsContentOffscreenRight = useCallback(() => {
    const isOffscreenRight =
      scrollDetails.current.xPosition + scrollDetails.current.containerWidth + 1 < // +1 offset to account for fractional values
      scrollDetails.current.contentWidth;

    setIsScrollContentOffscreenRight((prevState) =>
      prevState === isOffscreenRight ? prevState : isOffscreenRight,
    );
  }, []);

  const throttledHandleScroll = useRef(
    throttle((xPosition: number) => {
      scrollDetails.current.xPosition = xPosition;

      checkIsContentOffscreenRight();
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

      checkIsContentOverflowing();
      checkIsContentOffscreenRight();
    },
    [checkIsContentOffscreenRight, checkIsContentOverflowing],
  );

  const handleScrollContentSizeChange = useCallback(
    (contentWidth: number) => {
      scrollDetails.current.contentWidth = contentWidth;

      checkIsContentOverflowing();
      checkIsContentOffscreenRight();
    },
    [checkIsContentOffscreenRight, checkIsContentOverflowing],
  );

  useEffect(() => {
    return () => {
      throttledHandleScroll.cancel();
    };
  }, [throttledHandleScroll]);

  useEffect(() => {
    if (!activeTarget || !scrollRef.current) return;

    // @ts-expect-error Type 'ScrollView' is not assignable to type 'Readonly<NativeMethods>'.
    activeTarget.measureLayout(scrollRef.current, (x, _y, width) => {
      /** Check if active target is offscreen and only scroll if needed */
      const isOffscreenLeft = x < scrollDetails.current.xPosition;
      const isOffscreenRight =
        x + width - scrollDetails.current.xPosition > scrollDetails.current.containerWidth;
      const isOffscreen = isOffscreenLeft || isOffscreenRight;

      if (isOffscreen) {
        scrollRef.current?.scrollTo({ x, y: 0, animated: true });
      }
    });
  }, [activeTarget]);

  return {
    scrollRef,
    isScrollContentOverflowing,
    isScrollContentOffscreenRight,
    handleScroll,
    handleScrollContainerLayout,
    handleScrollContentSizeChange,
  };
};
