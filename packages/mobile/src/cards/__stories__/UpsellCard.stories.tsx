import React from 'react';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import { coinbaseOneLogo } from '@coinbase/cds-common/internal/data/assets';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { VStack } from '../../layout';
import { Carousel } from '../../media';
import { Text } from '../../typography/Text';
import { UpsellCard } from '../UpsellCard';

const styles = StyleSheet.create({
  image: {
    width: 130,
    height: 174,
    position: 'relative',
    left: 10,
  },
});

const exampleProps = {
  title: "It's Onchain Summer!",
  description: 'Stand with crypto and mint your NFT. ',
  media: (
    <Image
      accessibilityIgnoresInvertColors
      accessibilityLabel="Send a crypto gift illustration"
      source={{ uri: coinbaseOneLogo }}
      style={styles.image}
    />
  ),
  action: 'Join the movement',
  onActionPress: NoopFn,
  onDismissPress: NoopFn,
};

const compactProps = {
  title: "It's Onchain Summer!",
  description: 'Stand with crypto and mint your NFT. ',
  media: (
    <Image
      accessibilityIgnoresInvertColors
      accessibilityLabel="Send a crypto gift illustration"
      source={{ uri: coinbaseOneLogo }}
      style={styles.image}
    />
  ),
  onPress: NoopFn,
};

const UpsellCardScreen = () => {
  const theme = useTheme();
  const customTextNodeColor = `rgb(${theme.spectrum.gray0})`;
  const customTextNodeBackgroundColor = `rgb(${theme.spectrum.blue80})`;
  const customBackgroundColor = `rgb(${theme.spectrum.purple70})`;

  const defaultBackground = `rgb(${theme.spectrum.teal20})`;

  const windowWidth = useWindowDimensions().width;
  const carouselCardWidth = windowWidth - 48;

  return (
    <ExampleScreen>
      <Example title="Upsell Card">
        <UpsellCard {...exampleProps} dangerouslySetBackground={defaultBackground} />
      </Example>
      <Example title="Upsell Card Compact">
        <UpsellCard {...compactProps} dangerouslySetBackground={defaultBackground} />
      </Example>
      <Example title="Long action button text">
        <UpsellCard
          {...exampleProps}
          action="This is a very long action button text that will get truncated"
          dangerouslySetBackground={defaultBackground}
          description="This is a very long description text that will get truncated"
          title="This is a very long title text that will get truncated"
        />
      </Example>
      <Example title="Custom Text Nodes">
        <UpsellCard
          {...exampleProps}
          action={
            <Button compact flush="start" numberOfLines={1} onPress={NoopFn} variant="secondary">
              Sign up
            </Button>
          }
          dangerouslySetBackground={customTextNodeBackgroundColor}
          description={
            <Text dangerouslySetColor={customTextNodeColor} font="label2">
              Start your free 30 day trial of Coinbase One
            </Text>
          }
          title={
            <Text dangerouslySetColor={customTextNodeColor} font="headline">
              Coinbase One
            </Text>
          }
        />
      </Example>
      <Example title="Custom Background color">
        <UpsellCard
          {...exampleProps}
          dangerouslySetBackground={customBackgroundColor}
          description={
            <Text dangerouslySetColor={customTextNodeColor} font="label2">
              Start your free 30 day trial of Coinbase One
            </Text>
          }
          title={
            <Text dangerouslySetColor={customTextNodeColor} font="headline">
              Coinbase One
            </Text>
          }
        />
      </Example>
      <Example title="Custom Width">
        <UpsellCard {...exampleProps} dangerouslySetBackground={defaultBackground} width="100%" />
      </Example>
      <VStack gap={2} padding={3}>
        <Text font="title3">Carousel</Text>
        <Carousel
          gap={2}
          items={[
            <UpsellCard
              key="carouselItem1"
              {...exampleProps}
              dangerouslySetBackground={defaultBackground}
              width={carouselCardWidth}
            />,
            <UpsellCard
              key="carouselItem2"
              {...exampleProps}
              dangerouslySetBackground={defaultBackground}
              width={carouselCardWidth}
            />,
            <UpsellCard
              key="carouselItem3"
              {...exampleProps}
              dangerouslySetBackground={defaultBackground}
              width={carouselCardWidth}
            />,
          ]}
        />
      </VStack>
    </ExampleScreen>
  );
};

export default UpsellCardScreen;
