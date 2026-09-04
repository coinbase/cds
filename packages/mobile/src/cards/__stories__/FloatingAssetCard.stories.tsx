import React from 'react';
import { Image, StyleSheet } from 'react-native';
import {
  ethBackground,
  floatingAssetCardCustomImage,
} from '@coinbase/cds-common/internal/data/assets';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Carousel } from '../../media';
import { Text } from '../../typography/Text';
import type { FloatingAssetCardProps } from '../FloatingAssetCard';
import { FloatingAssetCard } from '../FloatingAssetCard';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const exampleProps: FloatingAssetCardProps = {
  title: 'Title',
  description: 'Description',
  subtitle: 'Subtitle',
  media: (
    <Image
      accessibilityIgnoresInvertColors
      source={{
        uri: ethBackground,
      }}
      style={styles.image}
    />
  ),
  onPress: NoopFn,
};

const FloatingAssetCardScreen = () => {
  return (
    <ExampleScreen>
      <Example title="FloatingAssetCard">
        <FloatingAssetCard {...exampleProps} />
      </Example>
      <Example title="FloatingAssetCard large">
        <FloatingAssetCard {...exampleProps} size="l" />
      </Example>
      <Example title="FloatingAssetCard with long text">
        <FloatingAssetCard
          {...exampleProps}
          description="This is a really long description. This is a really long description. This is a really long description. This is a really long description."
          size="l"
          subtitle="This is a really long subtitle"
          title="This is a really long Title. This is a really long Title. This is a really long Title. This is a really long Title."
        />
      </Example>
      <Example title="FloatingAssetCard with custom nodes">
        <FloatingAssetCard
          {...exampleProps}
          description={
            <Text color="fgMuted" font="label2">
              Description
            </Text>
          }
          media={
            <Image
              accessibilityIgnoresInvertColors
              source={{
                uri: floatingAssetCardCustomImage,
              }}
              style={styles.image}
            />
          }
          subtitle={null}
          title={<Text font="headline">Title</Text>}
        />
      </Example>
      <Example title="Carousel">
        <Carousel
          gap={1.5}
          items={[
            <FloatingAssetCard key="carouselItem1" {...exampleProps} />,
            <FloatingAssetCard key="carouselItem2" {...exampleProps} />,
            <FloatingAssetCard key="carouselItem3" {...exampleProps} size="l" />,
          ]}
        />
      </Example>
    </ExampleScreen>
  );
};

export default FloatingAssetCardScreen;
