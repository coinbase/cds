import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import { squareAssets } from '@coinbase/cds-common/internal/data/assets';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { Carousel } from '../../media/Carousel/Carousel';
import { Text } from '../../typography/Text';
import type { NudgeCardProps } from '../NudgeCard';
import { NudgeCard } from '../NudgeCard';

const styles = StyleSheet.create({
  customMediaStyles: {
    height: 60,
    width: 60,
  },
});

const exampleProps: NudgeCardProps = {
  title: "It's Onchain Summer!",
  description: 'Stand with crypto and mint your NFT. ',
  pictogram: 'coinbaseOneLogo',
  action: 'Join the movement',
  onActionPress: NoopFn,
};

const compactProps: NudgeCardProps = {
  title: 'Try this new thing',
  description: 'It will take you to the moon, I promise.',
  pictogram: 'wrapEth',
  onPress: NoopFn,
};

const longProps: NudgeCardProps = {
  action: 'Do the thing',
  title: 'Long title text that will overflow to the next line',
  description:
    'This is a super long description that will increase the height of the card to automagically fit the content.',
  numberOfLines: 4,
  pictogram: 'addWallet',
};

const exampleMediaProps: NudgeCardProps = {
  title: "It's Onchain Summer!",
  description: 'Stand with crypto and mint your NFT. ',
  action: 'Join the movement',
  onActionPress: NoopFn,
  media: (
    <Image
      accessibilityIgnoresInvertColors
      accessibilityLabel="placeholder"
      source={{ uri: squareAssets.human2 }}
      style={styles.customMediaStyles}
    />
  ),
};

const compactMediaProps: NudgeCardProps = {
  title: 'Try this new thing',
  description: 'It will take you to the moon, I promise. WAGMI!',
  action: undefined,
  onActionPress: undefined,
  media: (
    <Image
      accessibilityIgnoresInvertColors
      accessibilityLabel="placeholder"
      source={{ uri: squareAssets.human3 }}
      style={styles.customMediaStyles}
    />
  ),
};

const handleDismiss = () => {
  console.log('dismissed');
};

const NudgeCardScreen = () => {
  const [dismissed, setDismissed] = useState(false);
  const setDismissedToOff = useCallback(() => setDismissed(true), [setDismissed]);
  const windowWidth = useWindowDimensions().width;
  const carouselCardWidth = windowWidth - 48;
  return (
    <ExampleScreen>
      <Example title="Nudge Card">
        <VStack gap={2}>
          <NudgeCard {...exampleProps} />
          {!dismissed && <NudgeCard {...exampleProps} onDismissPress={setDismissedToOff} />}
          <NudgeCard {...exampleProps} mediaPosition="left" />
          {!dismissed && (
            <NudgeCard {...exampleProps} mediaPosition="left" onDismissPress={setDismissedToOff} />
          )}
        </VStack>
      </Example>
      <Example title="Compact">
        <NudgeCard {...compactProps} />
        <NudgeCard {...compactProps} onDismissPress={handleDismiss} />
        <NudgeCard {...compactProps} mediaPosition="left" />
        <NudgeCard {...compactProps} mediaPosition="left" onDismissPress={handleDismiss} />
      </Example>
      <Example title="Nudge Card Custom Media">
        <VStack gap={2}>
          <NudgeCard {...exampleMediaProps} />
          <NudgeCard {...exampleMediaProps} mediaPosition="left" />
          {!dismissed && <NudgeCard {...exampleMediaProps} onDismissPress={setDismissedToOff} />}
          <NudgeCard {...compactMediaProps} />
          <NudgeCard {...compactMediaProps} onDismissPress={handleDismiss} />
        </VStack>
      </Example>
      <Example title="Number of lines is 1">
        <NudgeCard {...exampleProps} numberOfLines={1} />
      </Example>
      <Example title="Long strings">
        <NudgeCard {...longProps} />
      </Example>
      <VStack gap={2} padding={3}>
        <Text font="title3">Carousel</Text>
        <Carousel
          gap={1}
          items={[
            <NudgeCard
              key="carouselItem1"
              width={carouselCardWidth}
              {...exampleProps}
              onDismissPress={handleDismiss}
            />,
            <NudgeCard
              key="carouselItem2"
              width={carouselCardWidth}
              {...exampleProps}
              onDismissPress={handleDismiss}
            />,
            <NudgeCard
              key="carouselItem3"
              width={carouselCardWidth}
              {...exampleProps}
              onDismissPress={handleDismiss}
            />,
            <NudgeCard
              key="carouselItem4"
              width={carouselCardWidth}
              {...exampleProps}
              onDismissPress={handleDismiss}
            />,
          ]}
        />
      </VStack>
      <Example title="Custom dimensions">
        <NudgeCard {...exampleProps} maxHeight={150} numberOfLines={1} width={250} />
        <NudgeCard {...compactProps} width={350} />
      </Example>
      <Example title="Custom nodes">
        <NudgeCard
          {...exampleProps}
          action={
            <HStack paddingBottom={1}>
              <Button compact onPress={NoopFn}>
                Custom action
              </Button>
            </HStack>
          }
          description={
            <Text color="fgMuted" font="body">
              Custom description
            </Text>
          }
          title={
            <Text color="fgPrimary" font="headline">
              Custom title
            </Text>
          }
        />
      </Example>
    </ExampleScreen>
  );
};

export default NudgeCardScreen;
