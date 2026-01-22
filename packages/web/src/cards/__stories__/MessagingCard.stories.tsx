import React, { useRef, useState } from 'react';
import { coinbaseOneLogo, svgs } from '@coinbase/cds-common/internal/data/assets';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { Carousel } from '../../carousel/Carousel';
import { CarouselItem } from '../../carousel/CarouselItem';
import { Pictogram } from '../../illustrations';
import { Box, HStack } from '../../layout';
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
            alt="Coinbase One promotional image"
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
            alt="Promotional illustration"
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
            alt="Coinbase One promotional image"
            height={100}
            resizeMode="cover"
            shape="rectangle"
            source={coinbaseOneLogo}
          />
        }
        mediaPlacement="end"
        onDismissButtonClick={() => alert('Card dismissed!')}
        title="Dismissible Card"
        type="upsell"
      />
      <MessagingCard
        {...exampleProps}
        description="Nudge card with dismiss button"
        dismissButtonAccessibilityLabel="Dismiss nudge"
        media={<Pictogram dimension="48x48" name="baseStar" />}
        mediaPlacement="end"
        onDismissButtonClick={() => alert('Card dismissed!')}
        title="Dismissible Nudge"
        type="nudge"
      />
      <MessagingCard
        {...exampleProps}
        description="Card with a tag"
        media={
          <RemoteImage
            alt="Coinbase One promotional image"
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
        description="Nudge card with a tag"
        media={<Pictogram dimension="48x48" name="key" />}
        mediaPlacement="end"
        tag="New"
        title="Tagged Nudge"
        type="nudge"
      />
      <MessagingCard
        {...exampleProps}
        action="Action"
        description="Upsell card with action button"
        media={
          <RemoteImage
            alt="Coinbase One promotional image"
            height={156}
            resizeMode="cover"
            shape="rectangle"
            source={coinbaseOneLogo}
          />
        }
        mediaPlacement="end"
        onActionButtonClick={() => alert('Action clicked!')}
        title="Upsell with Action"
        type="upsell"
      />
      <MessagingCard
        {...exampleProps}
        action="Get Started"
        description="Nudge card with action button"
        media={<Pictogram dimension="48x48" name="wallet" />}
        mediaPlacement="end"
        onActionButtonClick={() => alert('Action clicked!')}
        title="Nudge with Action"
        type="nudge"
      />
      <MessagingCard
        {...exampleProps}
        action="Get Started"
        description="Complete upsell card with all features"
        dismissButtonAccessibilityLabel="Dismiss"
        media={
          <RemoteImage
            alt="Coinbase One promotional image"
            height={184}
            resizeMode="cover"
            shape="rectangle"
            source={coinbaseOneLogo}
          />
        }
        mediaPlacement="end"
        onActionButtonClick={() => alert('Action clicked!')}
        onDismissButtonClick={() => alert('Dismissed')}
        tag="New"
        title="Complete Upsell Card"
        type="upsell"
        width={360}
      />
      <MessagingCard
        {...exampleProps}
        action="Learn More"
        description="Complete nudge card with all features"
        dismissButtonAccessibilityLabel="Dismiss"
        media={<Pictogram dimension="48x48" name="giftbox" />}
        mediaPlacement="end"
        onActionButtonClick={() => alert('Action clicked!')}
        onDismissButtonClick={() => alert('Dismissed')}
        tag="New"
        title="Complete Nudge Card"
        type="nudge"
        width={360}
      />
      <MessagingCard
        {...exampleProps}
        action={
          <Button compact onClick={() => alert('Custom button clicked!')} variant="primary">
            Custom Button
          </Button>
        }
        description="Upsell card with custom action button"
        media={
          <RemoteImage
            alt="Coinbase One promotional image"
            height={156}
            resizeMode="cover"
            shape="rectangle"
            source={coinbaseOneLogo}
          />
        }
        mediaPlacement="end"
        title="Custom Action Button"
        type="upsell"
      />
      <MessagingCard
        {...exampleProps}
        action={
          <HStack gap={1}>
            <Button compact onClick={() => alert('Primary clicked!')} variant="secondary">
              Primary
            </Button>
            <Button compact onClick={() => alert('Secondary clicked!')} variant="tertiary">
              Secondary
            </Button>
          </HStack>
        }
        description="Nudge card with multiple custom buttons"
        media={<Pictogram dimension="48x48" name="wallet" />}
        mediaPlacement="end"
        title="Multiple Action Buttons"
        type="nudge"
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
            alt="Coinbase One promotional image"
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
      <MessagingCard
        {...exampleProps}
        description="Nudge with custom dismiss button"
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
        media={<Pictogram dimension="48x48" name="baseRocket" />}
        mediaPlacement="end"
        title="Custom Dismiss Nudge"
        type="nudge"
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
            alt="Coinbase One promotional image"
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
        aria-label="View interactive card details"
        as="a"
        description="Clickable card with href"
        href="https://www.google.com"
        media={
          <RemoteImage
            alt="Coinbase One promotional image"
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
        renderAsPressable
        aria-label="View nudge details"
        as="a"
        description="Clickable nudge with href"
        href="https://www.google.com"
        media={<Pictogram dimension="48x48" name="baseRocket" />}
        mediaPlacement="end"
        target="_blank"
        title="Interactive Nudge"
        type="nudge"
        width={320}
      />
      <MessagingCard
        ref={buttonRef}
        renderAsPressable
        aria-label="View interactive card details"
        as="button"
        description="Clickable card with onClick handler"
        media={
          <RemoteImage
            alt="Coinbase One promotional image"
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
      <MessagingCard
        renderAsPressable
        aria-label="View nudge details"
        as="button"
        description="Clickable nudge with onClick handler"
        media={<Pictogram dimension="48x48" name="key" />}
        mediaPlacement="end"
        onClick={() => alert('Card clicked!')}
        title="Interactive Nudge"
        type="nudge"
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
            alt="Coinbase One promotional image"
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
            alt="Coinbase One promotional image"
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

// Interactive Dismissible Cards
const cards = [
  {
    id: '1',
    title: 'Welcome to Coinbase',
    description: 'Get started with your crypto journey',
    type: 'upsell' as const,
  },
  {
    id: '2',
    title: 'Complete your profile',
    description: 'Add your details to unlock more features',
    type: 'nudge' as const,
  },
  {
    id: '3',
    title: 'Enable notifications',
    description: 'Stay updated on market movements',
    type: 'upsell' as const,
  },
  {
    id: '4',
    title: 'Invite friends',
    description: 'Earn rewards when friends join',
    type: 'nudge' as const,
  },
];

export const DismissibleCards = (): JSX.Element => {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => new Set(prev).add(id));
  };

  const handleReset = () => {
    setDismissedIds(new Set());
  };

  const visibleCards = cards.filter((card) => !dismissedIds.has(card.id));

  return (
    <VStack gap={2}>
      <HStack flexWrap="wrap" gap={2}>
        {visibleCards.map((card) => (
          <MessagingCard
            key={card.id}
            description={card.description}
            dismissButtonAccessibilityLabel={`Dismiss ${card.title}`}
            media={
              card.type === 'upsell' ? (
                <RemoteImage
                  alt="Coinbase One promotional image"
                  height={100}
                  resizeMode="cover"
                  shape="rectangle"
                  source={coinbaseOneLogo}
                />
              ) : (
                <Pictogram dimension="48x48" name="addToWatchlist" />
              )
            }
            mediaPlacement="end"
            onDismissButtonClick={() => handleDismiss(card.id)}
            title={card.title}
            type={card.type}
            width={360}
          />
        ))}
        {visibleCards.length === 0 && (
          <Text color="fgNegative" font="label1">
            All cards dismissed!
          </Text>
        )}
      </HStack>
      <Button onClick={handleReset} variant="tertiary">
        Reset Cards
      </Button>
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
              alt="Coinbase One promotional image"
              height={108}
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
          aria-label="View Card 2 details"
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
          aria-label="View Card 3 details"
          as="button"
          description="Card with onClick handler"
          media={
            <RemoteImage
              alt="Coinbase One promotional image"
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
