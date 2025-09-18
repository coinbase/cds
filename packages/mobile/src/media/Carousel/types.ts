import type { Animated } from 'react-native';

import type { ScrollToEndFn, ScrollToParams } from '../../hooks/useScrollTo';

export type CarouselItemId = string | number;
export type CarouselLayoutMap = Record<CarouselItemId, number>;
export type CarouselScrollToId = (id: CarouselItemId, params?: ScrollToParams | undefined) => void;
export type CarouselRef = {
  dismissedItems: Set<CarouselItemId>;
  length: number;
  resetDismissedItems: () => void;
  scrollToId: CarouselScrollToId;
  scrollToEnd: ScrollToEndFn;
};
export type CarouselOnReady = (carouselRef: CarouselRef) => void;
export type CarouselDismissItemParams = {
  id: CarouselItemId;
  opacity: Animated.Value;
  width: Animated.Value;
  height: Animated.Value;
  callbackFn?: () => void;
};
export type CarouselDismissItemInternal = (params: CarouselDismissItemParams) => void;
export type CarouselDismissItem = (callbackFn?: (() => void) | undefined) => void;
export type CarouselItemContextValue = {
  id: CarouselItemId;
  dismiss: CarouselDismissItem;
};

export type CarouselUpdateLayoutMap = (value: CarouselLayoutMap) => void;
