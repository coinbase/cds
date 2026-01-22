import { useRef, useState } from 'react';
import { Alert, type View } from 'react-native';
import { coinbaseOneLogo, svgs } from '@coinbase/cds-common/internal/data/assets';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { Carousel } from '../../carousel/Carousel';
import { CarouselItem } from '../../carousel/CarouselItem';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Pictogram } from '../../illustrations';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { RemoteImage } from '../../media/RemoteImage';
import { Text } from '../../typography/Text';
import { MessagingCard, type MessagingCardProps } from '../MessagingCard';

const exampleProps: MessagingCardProps = {
  title: 'Title',
  description: 'Description',
  mediaPlacement: 'end',
  type: 'nudge',
} as const;

const dismissibleCards = [
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

const DismissibleCardsExample = () => {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => new Set(prev).add(id));
  };

  const handleReset = () => {
    setDismissedIds(new Set());
  };

  const visibleCards = dismissibleCards.filter((card) => !dismissedIds.has(card.id));

  return (
    <Example title="Interactive Dismissible Cards">
      <VStack gap={2}>
        <VStack gap={2}>
          {visibleCards.map((card) => (
            <MessagingCard
              key={card.id}
              description={card.description}
              dismissButtonAccessibilityLabel={`Dismiss ${card.title}`}
              media={
                card.type === 'upsell' ? (
                  <RemoteImage
                    accessibilityLabel="Coinbase One promotional image"
                    height={100}
                    resizeMode="cover"
                    shape="rectangle"
                    source={{ uri: coinbaseOneLogo }}
                    width={80}
                  />
                ) : (
                  <Pictogram
                    accessibilityLabel="Add to watchlist"
                    dimension="48x48"
                    name="addToWatchlist"
                  />
                )
              }
              mediaPlacement="end"
              onDismissButtonPress={() => handleDismiss(card.id)}
              title={card.title}
              type={card.type}
            />
          ))}
          {visibleCards.length === 0 && (
            <Text color="fgNegative" font="label1">
              All cards dismissed!
            </Text>
          )}
        </VStack>
        <Button onPress={handleReset} variant="tertiary">
          Reset Cards
        </Button>
      </VStack>
    </Example>
  );
};

const MessagingCardScreen = () => {
  const ref = useRef<View>(null);
  return (
    <ExampleScreen>
      {/* Basic Types */}
      <Example title="Basic Types">
        <VStack gap={2}>
          <MessagingCard
            {...exampleProps}
            description="This is an upsell card with primary background"
            media={
              <RemoteImage
                accessibilityLabel="Coinbase One promotional image"
                height={120}
                resizeMode="cover"
                shape="rectangle"
                source={{ uri: coinbaseOneLogo }}
                width={90}
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
                accessibilityLabel="Promotional illustration"
                height={100}
                resizeMode="cover"
                shape="rectangle"
                source={svgs[0]}
                width={100}
              />
            }
            mediaPlacement="start"
            title="Upsell Card"
            type="upsell"
          />
          <MessagingCard
            {...exampleProps}
            description="This is a nudge card with alternate background"
            media={
              <Pictogram
                accessibilityLabel="Add to watchlist"
                dimension="48x48"
                name="addToWatchlist"
              />
            }
            mediaPlacement="end"
            title="Nudge Card"
            type="nudge"
          />
          <MessagingCard
            {...exampleProps}
            description="This is a nudge card with alternate background"
            media={
              <Pictogram
                accessibilityLabel="Add to watchlist"
                dimension="48x48"
                name="addToWatchlist"
              />
            }
            mediaPlacement="start"
            title="Nudge Card"
            type="nudge"
          />
        </VStack>
      </Example>

      {/* Features */}
      <Example title="Features">
        <VStack gap={2}>
          <MessagingCard
            {...exampleProps}
            description="Card with dismiss button"
            dismissButtonAccessibilityLabel="Close card"
            media={
              <RemoteImage
                accessibilityLabel="Coinbase One promotional image"
                height={120}
                resizeMode="cover"
                shape="rectangle"
                source={{ uri: coinbaseOneLogo }}
                width={90}
              />
            }
            mediaPlacement="end"
            onDismissButtonPress={() => Alert.alert('Card dismissed!')}
            title="Dismissible Card"
            type="upsell"
          />
          <MessagingCard
            {...exampleProps}
            description="Nudge card with dismiss button"
            dismissButtonAccessibilityLabel="Dismiss nudge"
            media={<Pictogram accessibilityLabel="Star" dimension="48x48" name="baseStar" />}
            mediaPlacement="end"
            onDismissButtonPress={() => Alert.alert('Card dismissed!')}
            title="Dismissible Nudge"
            type="nudge"
          />
          <MessagingCard
            {...exampleProps}
            description="Card with a tag"
            media={
              <RemoteImage
                accessibilityLabel="Coinbase One promotional image"
                height={120}
                resizeMode="cover"
                shape="rectangle"
                source={{ uri: coinbaseOneLogo }}
                width={90}
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
            media={<Pictogram accessibilityLabel="Key" dimension="48x48" name="key" />}
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
                accessibilityLabel="Coinbase One promotional image"
                height={156}
                resizeMode="cover"
                shape="rectangle"
                source={{ uri: coinbaseOneLogo }}
                width={120}
              />
            }
            mediaPlacement="end"
            onActionButtonPress={() => Alert.alert('Action pressed!')}
            title="Upsell with Action"
            type="upsell"
          />
          <MessagingCard
            {...exampleProps}
            action="Get Started"
            description="Nudge card with action button"
            media={<Pictogram accessibilityLabel="Wallet" dimension="48x48" name="wallet" />}
            mediaPlacement="end"
            onActionButtonPress={() => Alert.alert('Action pressed!')}
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
                accessibilityLabel="Coinbase One promotional image"
                height={186}
                resizeMode="cover"
                shape="rectangle"
                source={{ uri: coinbaseOneLogo }}
                width={130}
              />
            }
            mediaPlacement="end"
            onActionButtonPress={() => Alert.alert('Action pressed!')}
            onDismissButtonPress={() => Alert.alert('Dismissed')}
            tag="New"
            title="Complete Upsell Card"
            type="upsell"
          />
          <MessagingCard
            {...exampleProps}
            action="Learn More"
            description="Complete nudge card with all features"
            dismissButtonAccessibilityLabel="Dismiss"
            media={<Pictogram accessibilityLabel="Gift" dimension="48x48" name="giftbox" />}
            mediaPlacement="end"
            onActionButtonPress={() => Alert.alert('Action pressed!')}
            onDismissButtonPress={() => Alert.alert('Dismissed')}
            tag="New"
            title="Complete Nudge Card"
            type="nudge"
          />
          <MessagingCard
            {...exampleProps}
            action={
              <Button
                compact
                onPress={() => Alert.alert('Custom button pressed!')}
                variant="primary"
              >
                Custom Button
              </Button>
            }
            description="Upsell card with custom action button"
            media={
              <RemoteImage
                accessibilityLabel="Coinbase One promotional image"
                height={156}
                resizeMode="cover"
                shape="rectangle"
                source={{ uri: coinbaseOneLogo }}
                width={120}
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
                <Button compact onPress={() => Alert.alert('Primary pressed!')} variant="secondary">
                  Primary
                </Button>
                <Button
                  compact
                  onPress={() => Alert.alert('Secondary pressed!')}
                  variant="tertiary"
                >
                  Secondary
                </Button>
              </HStack>
            }
            description="Nudge card with multiple custom buttons"
            media={<Pictogram accessibilityLabel="Wallet" dimension="48x48" name="wallet" />}
            mediaPlacement="end"
            title="Multiple Action Buttons"
            type="nudge"
          />
          <MessagingCard
            {...exampleProps}
            description="Card with custom dismiss button"
            dismissButton={
              <HStack paddingEnd={1} paddingTop={1} position="absolute" right={0} top={0}>
                <IconButton
                  accessibilityLabel="Custom dismiss"
                  name="close"
                  onPress={() => Alert.alert('Custom dismiss pressed!')}
                  variant="secondary"
                />
              </HStack>
            }
            media={
              <RemoteImage
                accessibilityLabel="Coinbase One promotional image"
                height={120}
                resizeMode="cover"
                shape="rectangle"
                source={{ uri: coinbaseOneLogo }}
                width={90}
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
              <HStack paddingEnd={1} paddingTop={1} position="absolute" right={0} top={0}>
                <IconButton
                  accessibilityLabel="Custom dismiss"
                  name="close"
                  onPress={() => Alert.alert('Custom dismiss pressed!')}
                  variant="secondary"
                />
              </HStack>
            }
            media={<Pictogram accessibilityLabel="Rocket" dimension="48x48" name="baseRocket" />}
            mediaPlacement="end"
            title="Custom Dismiss Nudge"
            type="nudge"
          />
        </VStack>
      </Example>

      {/* Interactive */}
      <Example title="Interactive with onPress">
        <VStack gap={2}>
          <MessagingCard
            ref={ref}
            renderAsPressable
            accessibilityLabel="View interactive card details"
            description="Clickable card with onPress handler"
            media={
              <RemoteImage
                accessibilityLabel="Coinbase One promotional image"
                height={120}
                resizeMode="cover"
                shape="rectangle"
                source={{ uri: coinbaseOneLogo }}
                width={90}
              />
            }
            mediaPlacement="end"
            onPress={NoopFn}
            title="Interactive Card"
            type="upsell"
          />
          <MessagingCard
            renderAsPressable
            accessibilityLabel="View nudge details"
            description="Clickable nudge with onPress handler"
            media={<Pictogram accessibilityLabel="Rocket" dimension="48x48" name="baseRocket" />}
            mediaPlacement="end"
            onPress={NoopFn}
            title="Interactive Nudge"
            type="nudge"
          />
        </VStack>
      </Example>

      {/* Text Content */}
      <Example title="Text Content">
        <VStack gap={2}>
          <MessagingCard
            {...exampleProps}
            description="This is a very long description text that demonstrates how the card handles longer content and wraps appropriately within the card layout"
            media={
              <RemoteImage
                accessibilityLabel="Coinbase One promotional image"
                height={160}
                resizeMode="cover"
                shape="rectangle"
                source={{ uri: coinbaseOneLogo }}
                width={120}
              />
            }
            mediaPlacement="end"
            title="This is a very long title text that demonstrates text wrapping"
            type="upsell"
          />
          <MessagingCard
            description={
              <Text color="fgInverse" font="label2">
                Custom description with <Text font="headline">bold text</Text> and{' '}
                <Text font="label1">italic text</Text>
              </Text>
            }
            media={
              <RemoteImage
                accessibilityLabel="Coinbase One promotional image"
                height={140}
                resizeMode="cover"
                shape="rectangle"
                source={{ uri: coinbaseOneLogo }}
                width={100}
              />
            }
            mediaPlacement="end"
            tag={<Text font="headline">Custom Tag</Text>}
            title={<Text font="title3">Custom Title</Text>}
            type="upsell"
          />
        </VStack>
      </Example>

      {/* Interactive Dismissible Cards */}
      <DismissibleCardsExample />

      <Example title="Multiple Cards">
        <Carousel styles={{ carousel: { gap: 16 } }}>
          <CarouselItem id="card1">
            <MessagingCard
              {...exampleProps}
              description="Non-interactive card"
              media={
                <RemoteImage
                  accessibilityLabel="Coinbase One promotional image"
                  height={108}
                  resizeMode="cover"
                  shape="rectangle"
                  source={coinbaseOneLogo}
                  width={90}
                />
              }
              mediaPlacement="end"
              title="Card 1"
              type="upsell"
              width={320}
            />
          </CarouselItem>
          <CarouselItem id="card2">
            <MessagingCard
              {...exampleProps}
              renderAsPressable
              accessibilityLabel="View Card 2 details"
              description="Clickable card with onPress"
              media={
                <Pictogram
                  accessibilityLabel="Add to watchlist"
                  dimension="64x64"
                  name="addToWatchlist"
                />
              }
              mediaPlacement="end"
              onPress={NoopFn}
              tag="Link"
              title="Card 2"
              type="nudge"
              width={320}
            />
          </CarouselItem>
          <CarouselItem id="card3">
            <MessagingCard
              {...exampleProps}
              renderAsPressable
              accessibilityLabel="View Card 3 details"
              description="Card with onPress handler"
              media={
                <RemoteImage
                  accessibilityLabel="Coinbase One promotional image"
                  height={108}
                  resizeMode="cover"
                  shape="rectangle"
                  source={coinbaseOneLogo}
                  width={90}
                />
              }
              mediaPlacement="end"
              onPress={() => console.log('clicked')}
              tag="Action"
              title="Card 3"
              type="upsell"
              width={320}
            />
          </CarouselItem>
        </Carousel>
      </Example>
    </ExampleScreen>
  );
};

export default MessagingCardScreen;
