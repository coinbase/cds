import { useContext } from 'react';
import { isProduction, noop } from '@coinbase/cds-utils';

import { CarouselItemContext } from './CarouselItemContext';
import type { CarouselItemContextValue } from './types';

/** Access the index and dismiss function for a CarouselItem. */
export const useCarouselItem = (): CarouselItemContextValue => {
  const context = useContext(CarouselItemContext);
  if (context === undefined) {
    if (!isProduction()) {
      console.error('useCarouselItem: Cannot use `useCarouselItem` outside of Carousel component.');
    }
    return { id: '-1', dismiss: noop };
  }
  return context;
};
