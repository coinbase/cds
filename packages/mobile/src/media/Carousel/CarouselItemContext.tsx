import { createContext } from 'react';

import type { CarouselItemContextValue } from './types';

/**
 * Used internally within CarouselItem component to provide access to id and dismiss.
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
export const CarouselItemContext = createContext<CarouselItemContextValue | undefined>(undefined);
