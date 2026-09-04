import type { Animated } from 'react-native';

import type { ScrollToEndFn, ScrollToFn, ScrollToParams } from '../../hooks/useScrollTo';

export type CarouselId = string | number;
export type CarouselScrollToId = (id: CarouselId, params?: ScrollToParams | undefined) => void;

export type CarouselRef = {
  dismissedItems: Set<CarouselId>;
  length: number;
  resetDismissedItems: () => void;
  scrollToId: CarouselScrollToId;
  scrollTo: ScrollToFn;
  scrollToEnd: ScrollToEndFn;
  currentIndex: number;
};

export type CarouselItemAnimatedStyles = {
  opacity: Animated.Value;
  width: Animated.Value;
  height: Animated.Value | undefined;
};

export type CarouselMountedItemInfo = {
  animatedStyles: CarouselItemAnimatedStyles;
  id: CarouselId;
  index: number;
};

export type CarouselMountedItemsInfo = Record<CarouselId, CarouselMountedItemInfo>;
export type CarouselOnItemMount = (params: CarouselItemAnimatedStyles) => void;
export type CarouselOnDismissItem = (id: CarouselId) => void;
export type CarouselOnDismissLastItem = (params: {
  id: CarouselId;
  resetDismissedItems: () => void;
}) => void;
export type CarouselHandleDismissItem = (callbackFn?: CarouselOnDismissItem) => void;
