import { useRef } from 'react';
import { type View } from 'react-native';
import { assets, ethBackground } from '@coinbase/cds-common/internal/data/assets';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Carousel } from '../../carousel/Carousel';
import { CarouselItem } from '../../carousel/CarouselItem';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { RemoteImage } from '../../media/RemoteImage';
import { TextHeadline, TextLabel2, TextTitle3 } from '../../typography';
import { Text } from '../../typography/Text';
import type { MediaCardProps } from '../MediaCard';
import { MediaCard } from '../MediaCard';

const exampleProps: Omit<MediaCardProps, 'thumbnail'> = {
  title: 'Title',
  subtitle: 'Subtitle',
  description: 'Description',
};

const exampleThumbnail = (
  <RemoteImage
    accessibilityLabel="Ethereum thumbnail"
    shape="circle"
    size="l"
    source={ethBackground}
    testID="thumbnail"
  />
);

const exampleMedia = (
  <RemoteImage
    accessibilityLabel="Ethereum media"
    height="100%"
    resizeMode="cover"
    shape="rectangle"
    source={ethBackground}
    width="100%"
  />
);

const MediaCardScreen = () => {
  const ref = useRef<View>(null);
  return (
    <ExampleScreen>
      {/* Basic Examples */}
      <Example title="Default">
        <MediaCard ref={ref} {...exampleProps} thumbnail={exampleThumbnail} />
      </Example>

      <Example title="With Media">
        <MediaCard {...exampleProps} media={exampleMedia} thumbnail={exampleThumbnail} />
      </Example>

      {/* Media Placement */}
      <Example title="Media Placement Start">
        <MediaCard
          {...exampleProps}
          media={exampleMedia}
          mediaPlacement="start"
          thumbnail={exampleThumbnail}
        />
      </Example>

      <Example title="Media Placement End">
        <MediaCard
          {...exampleProps}
          media={exampleMedia}
          mediaPlacement="end"
          thumbnail={exampleThumbnail}
        />
      </Example>

      {/* Text Content */}
      <Example title="Long Text">
        <MediaCard
          description="This is a very long description text that demonstrates how the card handles longer content"
          media={exampleMedia}
          subtitle="This is a very long subtitle text that will get truncated"
          thumbnail={exampleThumbnail}
          title="This is a very long title text that will get truncated"
        />
      </Example>

      <Example title="Custom Content">
        <MediaCard
          description={
            <TextLabel2>
              Custom description with <Text font="headline">bold text</Text> and{' '}
              <Text font="label1">italic text</Text>
            </TextLabel2>
          }
          media={exampleMedia}
          subtitle={<TextHeadline color="fgPositive">Custom Subtitle</TextHeadline>}
          thumbnail={exampleThumbnail}
          title={<TextTitle3>Custom Title</TextTitle3>}
        />
      </Example>

      {/* Styling */}
      <Example title="With Layout Overrides">
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
      </Example>

      <Example title="With Root Style Override">
        <MediaCard
          {...exampleProps}
          media={exampleMedia}
          styles={{
            root: { borderWidth: 2, borderColor: 'blue' },
          }}
          thumbnail={exampleThumbnail}
        />
      </Example>

      {/* Interactive */}
      <Example title="Interactive with onPress">
        <MediaCard
          renderAsPressable
          accessibilityLabel="View interactive card details"
          description="Clickable card with onPress handler"
          media={exampleMedia}
          onPress={() => console.log('Card clicked!')}
          subtitle="Button"
          thumbnail={exampleThumbnail}
          title="Interactive Card"
        />
      </Example>

      {/* Multiple Cards */}
      <Example title="Multiple Cards">
        <Carousel styles={{ carousel: { gap: 16 } }}>
          <CarouselItem id="card1">
            <MediaCard {...exampleProps} media={exampleMedia} thumbnail={exampleThumbnail} />
          </CarouselItem>
          <CarouselItem id="card2">
            <MediaCard
              renderAsPressable
              accessibilityLabel="View Bitcoin details"
              description="Another card with different content"
              media={exampleMedia}
              onPress={NoopFn}
              subtitle="BTC"
              thumbnail={
                <RemoteImage
                  accessibilityLabel="Bitcoin thumbnail"
                  shape="circle"
                  size="l"
                  source={assets.btc.imageUrl}
                />
              }
              title="Bitcoin"
            />
          </CarouselItem>
          <CarouselItem id="card3">
            <MediaCard
              renderAsPressable
              accessibilityLabel="View Ethereum details"
              description="Card with onPress handler"
              onPress={NoopFn}
              subtitle="ETH"
              thumbnail={exampleThumbnail}
              title="Ethereum"
            />
          </CarouselItem>
        </Carousel>
      </Example>
    </ExampleScreen>
  );
};

export default MediaCardScreen;
