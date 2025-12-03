import React, { memo, useCallback, useMemo, useRef } from 'react';
import { useIndexCounter } from '@coinbase/cds-common/hooks/useIndexCounter';
import { svgs } from '@coinbase/cds-common/internal/data/assets';

import { Button } from '../../buttons';
import { Card } from '../../cards';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
import { Text } from '../../typography/Text';
import { Carousel } from '../Carousel/Carousel';
import type { CarouselRef } from '../Carousel/types';
import { useCarousel } from '../Carousel/useCarousel';
import { useCarouselItem } from '../Carousel/useCarouselItem';
import { RemoteImage } from '../RemoteImage';

import { ProgressBarsExample } from './CarouselAlphaExample';

const ExampleCarouselItem = memo(({ svgId = 1 }: { svgId?: number }) => {
  const { dismiss } = useCarouselItem();
  return (
    <Card onPress={() => dismiss()} padding={2}>
      <Text ellipsize="tail" font="label1">
        Label
      </Text>
      <Text color="fgMuted" ellipsize="tail" font="headline" numberOfLines={2} paddingBottom={0.5}>
        Title
      </Text>
      <RemoteImage
        height={120}
        resizeMode="cover"
        shape="squircle"
        source={svgs[svgId]}
        width={120}
      />
    </Card>
  );
});

const SimpleExample = () => {
  return (
    <Example title="Carousel">
      <Carousel
        items={[
          <ExampleCarouselItem key="item1" svgId={3} />,
          <ExampleCarouselItem key="item2" svgId={2} />,
          <ExampleCarouselItem key="item3" svgId={4} />,
          <ExampleCarouselItem key="item4" svgId={2} />,
          <ExampleCarouselItem key="item5" svgId={1} />,
          <ExampleCarouselItem key="item6" svgId={2} />,
        ]}
      />
    </Example>
  );
};

const UpdateOnMountExample = () => {
  const handleOnReady = useCallback(({ scrollToId }: CarouselRef) => {
    scrollToId('item3', { animated: false });
  }, []);

  return (
    <Example title="Carousel - snap to index on mount">
      <Carousel
        items={[
          <ExampleCarouselItem key="item1" svgId={4} />,
          <ExampleCarouselItem key="item2" svgId={3} />,
          <ExampleCarouselItem key="item3" svgId={2} />,
          <ExampleCarouselItem key="item4" svgId={5} />,
          <ExampleCarouselItem key="item5" svgId={2} />,
          <ExampleCarouselItem key="item6" svgId={2} />,
        ]}
        onReady={handleOnReady}
      />
    </Example>
  );
};

const TriggerViaButton = () => {
  const carousel = useCarousel();
  const triggerScrollTo = useCallback(() => {
    carousel.current.scrollToId('item3');
  }, [carousel]);

  return (
    <Example title="Carousel - trigger scrollTo via button">
      <Button onPress={triggerScrollTo}>Test scrollTo</Button>
      <Carousel
        carouselRef={carousel}
        items={[
          <ExampleCarouselItem key="item1" svgId={1} />,
          <ExampleCarouselItem key="item2" svgId={2} />,
          <ExampleCarouselItem key="item3" svgId={3} />,
          <ExampleCarouselItem key="item4" svgId={4} />,
          <ExampleCarouselItem key="item5" svgId={5} />,
          <ExampleCarouselItem key="item6" svgId={2} />,
        ]}
      />
    </Example>
  );
};

const DynamicItemsExample = () => {
  const carousel = useCarousel();
  const triggerScrollToEnd = useRef(false);

  const onIncrement = useCallback(() => {
    triggerScrollToEnd.current = true;
  }, []);

  const { activeIndex: itemsLength, handleIncrement } = useIndexCounter({
    length: 100,
    startIndex: 4,
    onIncrement,
  });

  const handleScrollToEnd = useCallback(() => {
    carousel.current.scrollToEnd();
  }, [carousel]);

  const onContentSizeChange = useCallback(() => {
    if (triggerScrollToEnd.current) {
      handleScrollToEnd();
      triggerScrollToEnd.current = false;
    }
  }, [handleScrollToEnd]);

  const items = useMemo(() => {
    return Array.from({ length: itemsLength }).map((_, index) => {
      return <ExampleCarouselItem key={`add-item-example-${index}`} />;
    });
  }, [itemsLength]);

  return (
    <Example title="Carousel - dynamic items">
      <HStack alignItems="flex-start" gap={2} paddingBottom={2}>
        <Button compact onPress={handleIncrement}>
          Add item
        </Button>
        <Button compact onPress={handleScrollToEnd}>
          Scroll to end
        </Button>
      </HStack>
      <Carousel carouselRef={carousel} items={items} onContentSizeChange={onContentSizeChange} />
    </Example>
  );
};

const CarouselScreen = () => {
  return (
    <ExampleScreen>
      <ProgressBarsExample />
      <DynamicItemsExample />
      <SimpleExample />
      <UpdateOnMountExample />
      <TriggerViaButton />
    </ExampleScreen>
  );
};

export default CarouselScreen;
ExampleCarouselItem.displayName = 'ExampleCarouselItem';
