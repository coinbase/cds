import React, { useCallback, useEffect, useState } from 'react';
import { feedImages } from '@cbhq/cds-common/internal/data/feedImages';

import type { CarouselId } from '../../alpha/carousel/Carousel';
import { Carousel } from '../../alpha/carousel/Carousel';
import { useCarousel } from '../../alpha/carousel/useCarousel';
import type { AnnouncementCardProps } from '../../cards/AnnouncementCard';
import { AnnouncementCard } from '../../cards/AnnouncementCard';
import { Divider } from '../../layout/Divider';

export function CarouselItem({ pictogram, spotSquare, ...props }: AnnouncementCardProps) {
  const handleOnPress = useCallback(() => {
    console.log('pressed card');
  }, []);

  return (
    <AnnouncementCard
      description="You can fit up to fifty two chararcters on 2 lines"
      onPress={handleOnPress}
      pictogram={pictogram}
      spotSquare={spotSquare}
      title="Title/Headline"
      {...props}
    />
  );
}

export function CarouselItemImage({ image, ...props }: { image: string } & AnnouncementCardProps) {
  const handleOnPress = useCallback(() => {
    console.log('pressed card');
  }, []);

  return (
    <AnnouncementCard
      description="You can fit up to fifty two chararcters on 2 lines"
      image={image}
      onPress={handleOnPress}
      title="Title/Headline"
      {...props}
    />
  );
}

export function ProgressBarsExample() {
  const carouselRef = useCarousel();
  const [currentCarouselRef, setCurrentCarouselRef] = useState(carouselRef.current);
  const onDismissItem = useCallback(
    (id: CarouselId) => {
      setCurrentCarouselRef(carouselRef.current);
      console.log('onDismissItem', id);
    },
    [carouselRef],
  );

  const onDismissLastItem = useCallback(() => {
    console.log('onDismissLastItem');
  }, []);

  useEffect(() => {
    setCurrentCarouselRef(carouselRef.current);
  }, [carouselRef]);

  const handleOnMomentumScrollEnd = useCallback(() => {
    setCurrentCarouselRef(carouselRef.current);
  }, [carouselRef]);

  const accessibilityLabel = `${currentCarouselRef.currentIndex + 1} of ${
    currentCarouselRef.length
  }, Title/Headline`;

  return (
    <>
      <Carousel
        showDismiss
        showProgress
        carouselRef={carouselRef}
        dismissButtonAccessibilityLabel="Close"
        items={[
          <CarouselItem
            key="item1"
            accessibilityLabel={accessibilityLabel}
            spotSquare="sparkleToken"
          />,
          <CarouselItem
            key="item2"
            accessibilityLabel={accessibilityLabel}
            pictogram="addressBook"
          />,
          <CarouselItem
            key="item3"
            accessibilityLabel={accessibilityLabel}
            spotSquare="announcementAdvancedTrading"
          />,
          <CarouselItem
            key="item4"
            accessibilityLabel={accessibilityLabel}
            pictogram="worldwide"
          />,
        ]}
        onDismissItem={onDismissItem}
        onDismissLastItem={onDismissLastItem}
        onMomentumScrollEnd={handleOnMomentumScrollEnd}
      />
      <Divider />
      <Carousel
        showProgress
        items={feedImages.map((item, index) => (
          <CarouselItemImage
            key={item}
            accessibilityLabel={`${index + 1} of ${feedImages.length}, Title/Headline`}
            image={item}
          />
        ))}
        onDismissItem={onDismissItem}
        onDismissLastItem={onDismissLastItem}
      />
      <Divider />
    </>
  );
}
