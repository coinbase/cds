import React, { useRef } from 'react';
import { coinbaseOneLogo, svgs } from '@coinbase/cds-common/internal/data/assets';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { Carousel } from '../../carousel/Carousel';
import { CarouselItem } from '../../carousel/CarouselItem';
import { Pictogram } from '../../illustrations';
import { Box } from '../../layout';
import { VStack } from '../../layout/VStack';
import { RemoteImage } from '../../media/RemoteImage';
import { Text } from '../../typography';
import { MessagingCard } from '../MessagingCard';

const exampleProps = {
  title: 'Title',
  description: 'Description',
  width: 320,
} as const;

// Basic Types
export const BasicTypes = (): JSX.Element => {
  return (
    <VStack gap={2}>
      <MessagingCard
        {...exampleProps}
        description="This is an upsell card with primary background"
        height={100}
        media={
          <RemoteImage
            alt="Media"
            aria-hidden="true"
            height={100}
            resizeMode="cover"
            shape="rectangle"
            source={coinbaseOneLogo}
          />
        }
        mediaPlacement="end"
        title="Upsell Card"
        type="upsell"
      />
      <MessagingCard
        {...exampleProps}
        background="accentBoldRed"
        description="This is an upsell card with primary background"
        height={100}
        media={
          <RemoteImage
            alt="Media"
            aria-hidden="true"
            height={100}
            resizeMode="cover"
            shape="rectangle"
            source={svgs[0]}
          />
        }
        mediaPlacement="start"
        title="Upsell Card"
        type="upsell"
      />
      <MessagingCard
        {...exampleProps}
        description="This is a nudge card with alternate background"
        media={<Pictogram dimension="48x48" name="addToWatchlist" />}
        mediaPlacement="end"
        title="Nudge Card"
        type="nudge"
      />
      <MessagingCard
        {...exampleProps}
        description="This is a nudge card with alternate background"
        media={<Pictogram dimension="48x48" name="addToWatchlist" />}
        mediaPlacement="start"
        title="Nudge Card"
        type="nudge"
      />
    </VStack>
  );
};

// Features
export const Features = (): JSX.Element => {
  return (
    <VStack gap={2}>
      <MessagingCard
        {...exampleProps}
        description="Card with dismiss button"
        dismissButtonAccessibilityLabel="Close card"
        media={
          <RemoteImage
            alt="Media"
            aria-hidden="true"
            height={100}
            resizeMode="cover"
            shape="rectangle"
            source={coinbaseOneLogo}
          />
        }
        mediaPlacement="end"
        onDismiss={() => alert('Card dismissed!')}
        title="Dismissible Card"
        type="upsell"
      />
      <MessagingCard
        {...exampleProps}
        description="Card with a tag"
        media={
          <RemoteImage
            alt="Media"
            aria-hidden="true"
            height={108}
            resizeMode="cover"
            shape="rectangle"
            source={coinbaseOneLogo}
          />
        }
        mediaPlacement="end"
        tag="New"
        title="Tagged Card"
        type="upsell"
      />
      <MessagingCard
        {...exampleProps}
        actions={
          <Button compact variant="secondary">
            Action
          </Button>
        }
        description="Upsell card with action button"
        media={
          <RemoteImage
            alt="Media"
            aria-hidden="true"
            height={156}
            resizeMode="cover"
            shape="rectangle"
            source={coinbaseOneLogo}
          />
        }
        mediaPlacement="end"
        title="Upsell with Action"
        type="upsell"
      />
      <MessagingCard
        {...exampleProps}
        actions={
          <Button compact variant="secondary">
            Get Started
          </Button>
        }
        description="Complete upsell card with all features"
        dismissButtonAccessibilityLabel="Dismiss"
        media={
          <RemoteImage
            alt="Media"
            aria-hidden="true"
            height={184}
            resizeMode="cover"
            shape="rectangle"
            source={coinbaseOneLogo}
          />
        }
        mediaPlacement="end"
        onDismiss={() => alert('Dismissed')}
        tag="New"
        title="Complete Upsell Card"
        type="upsell"
        width={360}
      />
      <MessagingCard
        {...exampleProps}
        description="Card with custom dismiss button"
        dismissButton={
          <Box
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              paddingTop: 'var(--space-2)',
              paddingRight: 'var(--space-2)',
            }}
          >
            <IconButton
              accessibilityLabel="Custom dismiss"
              name="close"
              onClick={() => alert('Custom dismiss pressed!')}
              variant="secondary"
            />
          </Box>
        }
        media={
          <RemoteImage
            alt="Media"
            aria-hidden="true"
            height={100}
            resizeMode="cover"
            shape="rectangle"
            source={coinbaseOneLogo}
          />
        }
        mediaPlacement="end"
        title="Custom Dismiss Button"
        type="upsell"
      />
    </VStack>
  );
};

// Polymorphic and Interactive Examples
export const PolymorphicAndInteractive = (): JSX.Element => {
  const articleRef = useRef<HTMLElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <VStack gap={2}>
      <MessagingCard
        ref={articleRef}
        as="article"
        {...exampleProps}
        media={
          <RemoteImage
            alt="Media"
            aria-hidden="true"
            height={100}
            resizeMode="cover"
            shape="rectangle"
            source={coinbaseOneLogo}
          />
        }
        mediaPlacement="end"
        type="upsell"
      />
      <MessagingCard
        ref={anchorRef}
        renderAsPressable
        as="a"
        description="Clickable card with href"
        href="https://www.google.com"
        media={
          <RemoteImage
            alt="Media"
            aria-hidden="true"
            height={100}
            resizeMode="cover"
            shape="rectangle"
            source={coinbaseOneLogo}
          />
        }
        mediaPlacement="end"
        target="_blank"
        title="Interactive Card"
        type="upsell"
        width={320}
      />
      <MessagingCard
        ref={buttonRef}
        renderAsPressable
        as="button"
        description="Clickable card with onClick handler"
        media={
          <RemoteImage
            alt="Media"
            aria-hidden="true"
            height={100}
            resizeMode="cover"
            shape="rectangle"
            source={coinbaseOneLogo}
          />
        }
        mediaPlacement="end"
        onClick={() => alert('Card clicked!')}
        title="Interactive Card"
        type="upsell"
        width={320}
      />
    </VStack>
  );
};

// Text Content
export const TextContent = (): JSX.Element => {
  return (
    <VStack gap={2}>
      <MessagingCard
        {...exampleProps}
        description="This is a very long description text that demonstrates how the card handles longer content and wraps appropriately within the card layout"
        media={
          <RemoteImage
            alt="Media"
            aria-hidden="true"
            height={150}
            resizeMode="cover"
            shape="rectangle"
            source={coinbaseOneLogo}
          />
        }
        mediaPlacement="end"
        title="This is a very long title text that demonstrates text wrapping"
        type="upsell"
        width={320}
      />
      <MessagingCard
        description={
          <Text as="p" color="fgInverse" font="label2">
            Custom description with <strong>bold text</strong> and <em>italic text</em>
          </Text>
        }
        media={
          <RemoteImage
            alt="Media"
            aria-hidden="true"
            height={130}
            resizeMode="cover"
            shape="rectangle"
            source={coinbaseOneLogo}
          />
        }
        mediaPlacement="end"
        tag={
          <Text color="fgInverse" font="label2">
            Custom Tag
          </Text>
        }
        title={
          <Text color="fgInverse" font="title3">
            Custom Title
          </Text>
        }
        type="upsell"
        width={320}
      />
    </VStack>
  );
};

export const MultipleCards = (): JSX.Element => {
  const ref1 = useRef<HTMLAnchorElement>(null);
  const ref2 = useRef<HTMLButtonElement>(null);
  return (
    <Carousel styles={{ carousel: { gap: 16 } }}>
      <CarouselItem id="card1">
        <MessagingCard
          as="article"
          {...exampleProps}
          description="Non-interactive card"
          media={
            <RemoteImage
              alt="Media"
              aria-hidden="true"
              height={100}
              resizeMode="cover"
              shape="rectangle"
              source={coinbaseOneLogo}
            />
          }
          mediaPlacement="end"
          title="Card 1"
          type="upsell"
        />
      </CarouselItem>
      <CarouselItem id="card2">
        <MessagingCard
          ref={ref1}
          renderAsPressable
          as="a"
          description="Clickable card with href"
          href="https://www.google.com"
          media={<Pictogram dimension="64x64" name="addToWatchlist" />}
          mediaPlacement="end"
          tag="Link"
          target="_blank"
          title="Card 2"
          type="nudge"
        />
      </CarouselItem>
      <CarouselItem id="card3">
        <MessagingCard
          ref={ref2}
          renderAsPressable
          as="button"
          description="Card with onClick handler"
          media={
            <RemoteImage
              alt="Media"
              aria-hidden="true"
              height={108}
              resizeMode="cover"
              shape="rectangle"
              source={coinbaseOneLogo}
            />
          }
          mediaPlacement="end"
          onClick={() => console.log('clicked')}
          tag="Action"
          title="Card 3"
          type="upsell"
        />
      </CarouselItem>
    </Carousel>
  );
};

export default {
  title: 'Components/Cards/MessagingCard',
  component: MessagingCard,
};
