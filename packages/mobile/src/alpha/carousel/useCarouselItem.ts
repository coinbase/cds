import { useContext } from 'react';
import { isProduction, noop } from '@coinbase/cds-utils';

import type { CarouselItemContextValue } from './CarouselItem';
import { CarouselItemContext } from './CarouselItem';

/** Access the index and dismiss function for a CarouselItem.
 * @example
 * ```
 * const MyCarouselItem = () => {
 * const { id, dismiss } = useCarouselItem()
 *  return <Card onPress={dismiss}><Text>{`Carousel item ${id}`}</Text></Card>
 * }
 *
 * const MyCarousel = () => {
 *  return (
 *    <Carousel>
 *      <MyCarouselItem />
 *      <MyCarouselItem />
 *      <MyCarouselItem />
 *    </Carousel>
 * )
 * }
 * ```
 */
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
