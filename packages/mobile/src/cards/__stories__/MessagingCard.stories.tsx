import { useRef } from 'react';
import { Alert, type View } from 'react-native';
import { StyleSheet } from 'react-native';
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
                accessibilityLabel="Media"
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
                accessibilityLabel="Media"
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
                accessibilityLabel="Media"
                height={120}
                resizeMode="cover"
                shape="rectangle"
                source={{ uri: coinbaseOneLogo }}
                width={90}
              />
            }
            mediaPlacement="end"
            onDismiss={() => Alert.alert('Card dismissed!')}
            title="Dismissible Card"
            type="upsell"
          />
          <MessagingCard
            {...exampleProps}
            description="Card with a tag"
            media={
              <RemoteImage
                accessibilityLabel="Media"
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
            actions={
              <Button compact variant="secondary">
                Action
              </Button>
            }
            description="Upsell card with action button"
            media={
              <RemoteImage
                accessibilityLabel="Media"
                height={156}
                resizeMode="cover"
                shape="rectangle"
                source={{ uri: coinbaseOneLogo }}
                width={120}
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
                accessibilityLabel="Media"
                height={186}
                resizeMode="cover"
                shape="rectangle"
                source={{ uri: coinbaseOneLogo }}
                width={130}
              />
            }
            mediaPlacement="end"
            onDismiss={() => Alert.alert('Dismissed')}
            tag="New"
            title="Complete Upsell Card"
            type="upsell"
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
                accessibilityLabel="Media"
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
        </VStack>
      </Example>

      {/* Interactive */}
      <Example title="Interactive with onPress">
        <MessagingCard
          ref={ref}
          renderAsPressable
          description="Clickable card with onPress handler"
          media={
            <RemoteImage
              accessibilityLabel="Media"
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
      </Example>

      {/* Text Content */}
      <Example title="Text Content">
        <VStack gap={2}>
          <MessagingCard
            {...exampleProps}
            description="This is a very long description text that demonstrates how the card handles longer content and wraps appropriately within the card layout"
            media={
              <RemoteImage
                accessibilityLabel="Media"
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
                accessibilityLabel="Media"
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

      <Example title="Multiple Cards">
        <Carousel styles={{ carousel: { gap: 16 } }}>
          <CarouselItem id="card1">
            <MessagingCard
              {...exampleProps}
              description="Non-interactive card"
              media={
                <RemoteImage
                  accessibilityLabel="Media"
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
              description="Clickable card with onPress"
              media={<Pictogram dimension="64x64" name="addToWatchlist" />}
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
              description="Card with onPress handler"
              media={
                <RemoteImage
                  accessibilityLabel="Media"
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
