import { useRef } from 'react';
import { noop } from '@coinbase/cds-utils';

import type { CarouselRef } from './types';

/**
 * Useful if you need to access internal data or methods from Carousel outside of its immediate children.
 * @returns Object with internal data/methods from Carousel component.
 * @example
 * ```
 * const carouselRef = useCarousel()
 * const handlePress = () => carouselRef.current.scrollToId('item1');
 * <Button onPress={handlePress}>Press me</Button>
 * <Carousel carouselRef={carouselRef} />
 * ```
 */
export const useCarousel = () => {
  // Includes fallback data to avoid having to do ref.current?.scrollToId.
  return useRef<CarouselRef>({
    dismissedItems: new Set(),
    length: 0,
    resetDismissedItems: noop,
    scrollToId: noop,
    scrollToEnd: noop,
  });
};
