import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Platform } from 'react-native';
import type { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { animateOpacityConfig, animateSizeConfig } from '@coinbase/cds-common/animation/carousel';

import { convertMotionConfig } from '../../animation/convertMotionConfig';
import type { ScrollToFn } from '../../hooks/useScrollTo';

import type { CarouselDismissItemParams, CarouselItemId } from './types';

const opacityConfig = convertMotionConfig(animateOpacityConfig);

/** Height and Width config */
const sizeConfig = convertMotionConfig(animateSizeConfig);

export const useDismissCarouselItem = (itemsLength: number, scrollTo: ScrollToFn) => {
  const isAnimating = useRef(false);
  /** Array of CarouselItem indexes that have been dismissed. */
  const [dismissedItems, setDismissedItems] = useState<Set<CarouselItemId>>(() => new Set());
  /** If there is only one CarouselItem left which has yet to be dismissed. This will have additional height animation */
  const isLastDismissableItem = dismissedItems.size === itemsLength - 1;
  const resetDismissedItems = useCallback(() => {
    setDismissedItems(new Set());
  }, []);

  const dismiss = useCallback(
    ({ height, id, opacity, width, callbackFn }: CarouselDismissItemParams) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      const opacityMotion = Animated.timing(opacity, opacityConfig);
      const widthMotion = Animated.timing(width, sizeConfig);
      const heightMotion = Animated.timing(height, sizeConfig);
      Animated.parallel([opacityMotion, isLastDismissableItem ? heightMotion : widthMotion]).start(
        () => {
          isAnimating.current = false;
          setDismissedItems((prev) => new Set(prev).add(id));
          callbackFn?.();
        },
      );
    },
    [isLastDismissableItem],
  );

  const contentOffset = useRef(0);
  const [scrollViewSize, setScrollViewSize] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (
      Platform.OS !== 'android' ||
      !contentWidth ||
      scrollViewSize + contentOffset.current <= contentWidth
    ) {
      return;
    }

    // if content size is smaller than the offset plus scrollView size, then scroll back to
    // contentSize minus scrollView size to fix all the content inside.
    scrollTo({ x: Math.max(0, contentWidth - scrollViewSize), animated: true });
  }, [contentWidth, scrollTo, scrollViewSize]);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => setScrollViewSize(event.nativeEvent.layout.width),
    [],
  );
  const onContentSizeChange = useCallback((width: number) => setContentWidth(width), []);
  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    contentOffset.current = event.nativeEvent.contentOffset.x;
  }, []);

  return useMemo(
    () => ({
      dismiss,
      dismissedItems,
      resetDismissedItems,
      onLayout,
      onContentSizeChange,
      onScroll,
    }),
    [dismiss, dismissedItems, resetDismissedItems, onLayout, onContentSizeChange, onScroll],
  );
};
