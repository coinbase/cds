import React, { useContext } from 'react';
import type { CarouselAutoplay } from '@coinbase/cds-common';
import type { Rect } from '@coinbase/cds-common/types';

export type CarouselContextValue = {
  registerItem: (id: string, state: Rect) => void;
  unregisterItem: (id: string) => void;
  /**
   * Set of item IDs that are currently visible in the carousel viewport.
   */
  visibleCarouselItems: Set<string>;
};

export const CarouselContext = React.createContext<CarouselContextValue | undefined>(undefined);

export const useCarouselContext = (): CarouselContextValue => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarouselContext must be used within a Carousel component');
  }
  return context;
};

export type CarouselAutoplayContextValue = Omit<
  CarouselAutoplay,
  'remainingTime' | 'addCompletionListener'
> & {
  /**
   * Whether autoplay is enabled via props.
   */
  isEnabled: boolean;
  /**
   * The autoplay interval duration in milliseconds.
   */
  interval: number;
};

export const CarouselAutoplayContext = React.createContext<
  CarouselAutoplayContextValue | undefined
>(undefined);

export const useCarouselAutoplayContext = (): CarouselAutoplayContextValue => {
  const context = useContext(CarouselAutoplayContext);
  if (!context) {
    throw new Error('useCarouselAutoplayContext must be used within a Carousel component');
  }
  return context;
};
