import React from 'react';
import { squareAssets } from '@coinbase/cds-common/internal/data/assets';

import { Button } from '../../buttons/Button';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { RemoteImage } from '../../media';
import { Text } from '../../typography/Text';
import type { NudgeCardProps } from '../NudgeCard';
import { NudgeCard } from '../NudgeCard';

const exampleProps: NudgeCardProps = {
  title: "It's Onchain Summer!",
  description: 'Stand with crypto and mint your NFT. ',
  pictogram: 'key',
  action: 'Join the movement',
  onActionPress: () => {},
};

const compactProps: NudgeCardProps = {
  title: 'Try this new thing',
  description: 'It will take you to the moon, I promise. WAGMI!',
  pictogram: 'key',
  action: undefined,
  onActionPress: undefined,
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
  onActionPress: () => {},
  media: <RemoteImage alt="Person illustration" source={squareAssets.human2} width={60} />,
};

const compactMediaProps: NudgeCardProps = {
  title: 'Try this new thing',
  description: 'It will take you to the moon, I promise. WAGMI!',
  action: undefined,
  onActionPress: undefined,
  media: <RemoteImage alt="Person illustration" source={squareAssets.human3} width={60} />,
};

export const Default = () => (
  <VStack gap={2}>
    <NudgeCard {...exampleProps} />
    <NudgeCard {...exampleProps} onDismissPress={() => {}} />
    <NudgeCard {...exampleProps} mediaPosition="left" />
    <NudgeCard {...exampleProps} mediaPosition="left" onDismissPress={() => {}} />
  </VStack>
);

export const Compact = () => (
  <VStack gap={2}>
    <NudgeCard {...compactProps} />
    <NudgeCard {...compactProps} onDismissPress={() => {}} />
    <NudgeCard {...compactProps} mediaPosition="left" />{' '}
    <NudgeCard {...compactProps} mediaPosition="left" onDismissPress={() => {}} />
  </VStack>
);

export const CustomMedia = () => (
  <VStack gap={2}>
    <NudgeCard {...exampleMediaProps} />
    <NudgeCard {...exampleMediaProps} onDismissPress={() => {}} />
    <NudgeCard {...compactMediaProps} />
    <NudgeCard {...compactMediaProps} onDismissPress={() => {}} />
    <NudgeCard {...exampleMediaProps} mediaPosition="left" />
    <NudgeCard {...exampleMediaProps} mediaPosition="left" onDismissPress={() => {}} />
  </VStack>
);

export const LongText = () => (
  <HStack gap={2}>
    <NudgeCard {...longProps} />
    <NudgeCard
      description="I'll get truncated after one line"
      numberOfLines={1}
      pictogram="addCard"
      title="I can be multiple lines long even if my description is not"
    />
  </HStack>
);

export const VerticallyStacked = () => (
  <VStack gap={2}>
    <NudgeCard {...exampleProps} />
    <NudgeCard {...exampleProps} />
    <NudgeCard {...exampleProps} />
  </VStack>
);

export const Carousel = () => (
  <HStack gap={2} overflow="scroll">
    <NudgeCard {...exampleProps} onDismissPress={() => {}} />
    <NudgeCard {...longProps} numberOfLines={3} onDismissPress={() => {}} />
    <NudgeCard {...exampleProps} />
  </HStack>
);

export const CustomDimensions = () => (
  <VStack gap={2}>
    <NudgeCard
      {...exampleProps}
      height={150}
      minHeight={150}
      minWidth={250}
      numberOfLines={1}
      width={250}
    />
    <NudgeCard {...exampleProps} minWidth={380} numberOfLines={1} width={380} />
    <NudgeCard {...exampleProps} maxHeight={150} maxWidth={250} numberOfLines={1} />
    <NudgeCard {...exampleProps} width="100%" />
    <NudgeCard {...exampleProps} mediaPosition="left" width="100%" />
  </VStack>
);

export const CustomTextNodes = () => (
  <NudgeCard
    {...exampleProps}
    action={
      <HStack paddingBottom={1}>
        <Button compact onClick={() => {}}>
          Custom action
        </Button>
      </HStack>
    }
    description={
      <Text as="p" color="fgMuted" display="block" font="body">
        Custom description
      </Text>
    }
    title={
      <Text as="h3" color="fgPrimary" display="block" font="headline">
        Custom title
      </Text>
    }
  />
);

export default {
  title: 'Components/Cards/NudgeCard',
  component: Default,
};
