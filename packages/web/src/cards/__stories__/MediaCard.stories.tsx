import React, { useRef } from 'react';
import { assets, ethBackground } from '@coinbase/cds-common/internal/data/assets';

import { Carousel } from '../../carousel/Carousel';
import { CarouselItem } from '../../carousel/CarouselItem';
import { VStack } from '../../layout/VStack';
import { RemoteImage } from '../../media/RemoteImage';
import { TextHeadline, TextLabel2, TextTitle3 } from '../../typography';
import { MediaCard } from '../MediaCard';

const exampleProps = {
  title: 'Title',
  subtitle: 'Subtitle',
  description: 'Description',
  width: 320,
} as const;

const exampleThumbnail = (
  <RemoteImage alt="Ethereum thumbnail" shape="circle" size="l" source={ethBackground} />
);

const exampleMedia = (
  <RemoteImage
    alt="Ethereum background"
    height="100%"
    resizeMode="cover"
    shape="rectangle"
    src={ethBackground}
    width="100%"
  />
);

// Basic Examples
export const Basic = (): JSX.Element => {
  return (
    <VStack gap={2}>
      <MediaCard {...exampleProps} thumbnail={exampleThumbnail} />
      <MediaCard {...exampleProps} media={exampleMedia} thumbnail={exampleThumbnail} />
    </VStack>
  );
};

// Media Placement
export const MediaPlacement = (): JSX.Element => {
  return (
    <VStack gap={2}>
      <MediaCard
        {...exampleProps}
        media={exampleMedia}
        mediaPlacement="start"
        thumbnail={exampleThumbnail}
      />
      <MediaCard
        {...exampleProps}
        media={exampleMedia}
        mediaPlacement="end"
        thumbnail={exampleThumbnail}
      />
    </VStack>
  );
};

// Polymorphic and Interactive Examples
export const PolymorphicAndInteractive = (): JSX.Element => {
  const articleRef = useRef<HTMLElement>(null);
  const anchorPressableRef = useRef<HTMLAnchorElement>(null);
  const buttonPressableRef = useRef<HTMLButtonElement>(null);
  return (
    <VStack gap={2}>
      <MediaCard
        ref={articleRef}
        as="article"
        {...exampleProps}
        media={exampleMedia}
        thumbnail={exampleThumbnail}
      />
      <MediaCard
        ref={anchorPressableRef}
        renderAsPressable
        accessibilityLabel="View interactive card details"
        as="a"
        description="Clickable card with href"
        href="https://www.google.com"
        media={exampleMedia}
        subtitle="Link"
        thumbnail={exampleThumbnail}
        title="Interactive Card"
        width={320}
      />
      <MediaCard
        ref={buttonPressableRef}
        renderAsPressable
        accessibilityLabel="View interactive card details"
        as="button"
        description="Clickable card with onClick handler"
        media={exampleMedia}
        onClick={() => alert('Card clicked!')}
        subtitle="Button"
        thumbnail={exampleThumbnail}
        title="Interactive Card"
        width={320}
      />
    </VStack>
  );
};

// Text Content
export const TextContent = (): JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <VStack gap={2}>
      <MediaCard
        ref={buttonRef}
        renderAsPressable
        accessibilityLabel="View card with long text content"
        as="button"
        description="This is a very long description text that demonstrates how the card handles longer content"
        media={exampleMedia}
        subtitle="This is a very long subtitle text that will get truncated"
        thumbnail={exampleThumbnail}
        title="This is a very long title text that will get truncated"
        width={320}
      />
      <MediaCard
        description={
          <TextLabel2 as="p">
            Custom description with <strong>bold text</strong> and <em>italic text</em>
          </TextLabel2>
        }
        media={exampleMedia}
        subtitle={
          <TextHeadline as="p" color="fgPositive">
            Custom Subtitle
          </TextHeadline>
        }
        thumbnail={exampleThumbnail}
        title={<TextTitle3 as="p">Custom Title</TextTitle3>}
        width={320}
      />
    </VStack>
  );
};

// Styling
export const Styling = (): JSX.Element => {
  return (
    <VStack gap={2}>
      <MediaCard
        {...exampleProps}
        media={exampleMedia}
        styles={{
          layoutContainer: { gap: 3 },
          contentContainer: { padding: 3, gap: 2 },
          textContainer: { gap: 1 },
          headerContainer: { gap: 1 },
          mediaContainer: { borderRadius: 300 },
        }}
        thumbnail={exampleThumbnail}
      />
      <MediaCard
        {...exampleProps}
        media={exampleMedia}
        styles={{
          root: { borderWidth: 2, borderColor: 'blue' },
        }}
        thumbnail={exampleThumbnail}
      />
      <MediaCard
        {...exampleProps}
        classNames={{
          root: 'custom-root-class',
        }}
        media={exampleMedia}
        thumbnail={exampleThumbnail}
      />
    </VStack>
  );
};

// Multiple Cards
export const MultipleCards = (): JSX.Element => {
  const ref = useRef<HTMLAnchorElement>(null);
  const ref2 = useRef<HTMLButtonElement>(null);
  return (
    <Carousel styles={{ carousel: { gap: 16 } }}>
      <CarouselItem id="card1">
        <MediaCard
          as="article"
          {...exampleProps}
          media={exampleMedia}
          thumbnail={exampleThumbnail}
        />
      </CarouselItem>
      <CarouselItem id="card2">
        <MediaCard
          ref={ref}
          renderAsPressable
          accessibilityLabel="View Bitcoin details"
          as="a"
          description="Another card with different content"
          href="https://www.google.com"
          media={exampleMedia}
          subtitle="BTC"
          thumbnail={
            <RemoteImage
              alt="Bitcoin thumbnail"
              shape="circle"
              size="l"
              source={assets.btc.imageUrl}
            />
          }
          title="Bitcoin"
          width={320}
        />
      </CarouselItem>
      <CarouselItem id="card3">
        <MediaCard
          ref={ref2}
          renderAsPressable
          accessibilityLabel="View Ethereum details"
          as="button"
          description="Card with onClick handler"
          onClick={() => console.log('clicked')}
          subtitle="ETH"
          thumbnail={exampleThumbnail}
          title="Ethereum"
          width={320}
        />
      </CarouselItem>
    </Carousel>
  );
};

export default {
  title: 'Components/Cards/MediaCard',
  component: MediaCard,
};
