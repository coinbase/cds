import React, { useRef } from 'react';
import { Image, StyleSheet, type View } from 'react-native';
import { assets, ethBackground } from '@coinbase/cds-common/internal/data/assets';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Carousel } from '../../media';
import { RemoteImage } from '../../media/RemoteImage';
import { TextHeadline, TextLabel2, TextTitle3 } from '../../typography';
import { Text } from '../../typography/Text';
import { CardThumbnail } from '../CardThumbnail';
import type { MediaCardProps } from '../MediaCard';
import { MediaCard } from '../MediaCard';

const styles = StyleSheet.create({
  media: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const exampleProps: MediaCardProps = {
  title: 'Title',
  subtitle: 'Subtitle',
  description: 'Description',
  width: 320,
};

const exampleThumbnail = (
  <CardThumbnail accessibilityLabel="Ethereum" source={ethBackground} testID="thumbnail" />
);

const exampleMedia = (
  <RemoteImage
    accessibilityLabel="Media"
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
      <Example title="Default">
        <MediaCard ref={ref} {...exampleProps} />
      </Example>

      <Example title="With Thumbnail">
        <MediaCard {...exampleProps} thumbnail={exampleThumbnail} />
      </Example>

      <Example title="With Media">
        <MediaCard {...exampleProps} media={exampleMedia} />
      </Example>

      <Example title="With Thumbnail and Media">
        <MediaCard {...exampleProps} media={exampleMedia} thumbnail={exampleThumbnail} />
      </Example>

      <Example title="With Tag">
        <MediaCard {...exampleProps} tag="Tag" />
      </Example>

      <Example title="Complete">
        <MediaCard {...exampleProps} media={exampleMedia} tag="Tag" thumbnail={exampleThumbnail} />
      </Example>

      <Example title="Long Text">
        <MediaCard
          actionable
          description="This is a very long description text that demonstrates how the card handles longer content"
          media={exampleMedia}
          onPress={NoopFn}
          subtitle="This is a very long subtitle text that will get truncated"
          thumbnail={exampleThumbnail}
          title="This is a very long title text that will get truncated"
          width={320}
        />
      </Example>

      <Example title="Custom Overrides">
        <MediaCard
          {...exampleProps}
          media={exampleMedia}
          overrides={{
            title: { color: 'fgPositive' },
            subtitle: { font: 'label1' },
            description: { color: 'fgMuted' },
            tag: { colorScheme: 'blue' },
          }}
          tag="Custom Tag"
          thumbnail={exampleThumbnail}
        />
      </Example>

      <Example title="With Layout Overrides">
        <MediaCard
          {...exampleProps}
          media={exampleMedia}
          overrides={{
            layoutContainer: { gap: 3 },
            contentContainer: { padding: 3, gap: 2 },
            textContainer: { gap: 1 },
            headerContainer: { gap: 1 },
            title: { color: 'fg', font: 'headline' },
            subtitle: { color: 'fgMuted', font: 'label1' },
            description: { color: 'fgMuted', font: 'body' },
            mediaContainer: { borderRadius: 300 },
            tag: { colorScheme: 'green' },
          }}
          tag="New"
          thumbnail={exampleThumbnail}
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
          width={320}
        />
      </Example>

      <Example title="Without Media">
        <MediaCard {...exampleProps} thumbnail={exampleThumbnail} />
      </Example>

      <Example title="Interactive with onPress">
        <MediaCard
          actionable
          description="Clickable card with onPress handler"
          media={exampleMedia}
          onPress={() => console.log('Card clicked!')}
          subtitle="Button"
          tag="Action"
          thumbnail={exampleThumbnail}
          title="Interactive Card"
          width={320}
        />
      </Example>

      <Example title="Non-Interactive Explicit">
        <MediaCard
          {...exampleProps}
          actionable={false}
          media={exampleMedia}
          thumbnail={exampleThumbnail}
        />
      </Example>

      <Example title="Multiple Cards">
        <Carousel
          gap={1.5}
          items={[
            <MediaCard
              key="card1"
              {...exampleProps}
              media={exampleMedia}
              thumbnail={exampleThumbnail}
            />,
            <MediaCard
              key="card2"
              actionable
              description="Another card with different content"
              media={exampleMedia}
              onPress={NoopFn}
              subtitle="BTC"
              tag="Hot"
              thumbnail={<CardThumbnail source={assets.btc.imageUrl} />}
              title="Bitcoin"
              width={320}
            />,
            <MediaCard
              key="card3"
              actionable
              description="Card with onPress handler"
              onPress={NoopFn}
              subtitle="ETH"
              thumbnail={exampleThumbnail}
              title="Ethereum"
              width={320}
            />,
          ]}
        />
      </Example>
    </ExampleScreen>
  );
};

export default MediaCardScreen;
