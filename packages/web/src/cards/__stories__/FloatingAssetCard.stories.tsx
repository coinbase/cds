import React, { type JSX } from 'react';
import {
  ethBackground,
  floatingAssetCardCustomImage,
} from '@coinbase/cds-common/internal/data/assets';

import { HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { FloatingAssetCard } from '../FloatingAssetCard';

const onClickConsole = console.log;

const exampleProps = {
  title: 'Title',
  description: 'Description',
  subtitle: 'Subtitle',
  media: (
    <img
      alt=""
      aria-hidden="true"
      height="100%"
      src={ethBackground}
      style={{ objectFit: 'cover', cursor: 'pointer' }}
      width="100%"
    />
  ),
  onClick: onClickConsole,
} as const;

export const Default = (): JSX.Element => {
  return (
    <VStack>
      <FloatingAssetCard {...exampleProps} />
    </VStack>
  );
};

export const Vertical = (): JSX.Element => {
  return (
    <VStack gap={1}>
      <FloatingAssetCard {...exampleProps} />
      <FloatingAssetCard {...exampleProps} size="l" />
    </VStack>
  );
};

export const Horizontal = (): JSX.Element => {
  return (
    <HStack gap={1}>
      <FloatingAssetCard {...exampleProps} />
      <FloatingAssetCard {...exampleProps} size="l" />
    </HStack>
  );
};

export const LongText = (): JSX.Element => {
  return (
    <VStack>
      <FloatingAssetCard
        {...exampleProps}
        description="This is a really long description. This is a really long description. This is a really long description"
        subtitle="This is a really long subtitle"
        title="This is a really long Title. This is a really long Title. This is a really long Title"
      />
    </VStack>
  );
};

export const Custom = (): JSX.Element => {
  return (
    <VStack>
      <FloatingAssetCard
        {...exampleProps}
        description={
          <Text as="p" color="fgMuted" display="block" font="label2">
            2 min read
          </Text>
        }
        media={
          <img
            alt=""
            aria-hidden="true"
            height="100%"
            src={floatingAssetCardCustomImage}
            style={{ objectFit: 'cover', cursor: 'pointer' }}
            width="100%"
          />
        }
        subtitle={null}
        title="Benefits of staking"
      />
    </VStack>
  );
};

export const Carousel = (): JSX.Element => (
  <HStack gap={2} overflow="scroll">
    <FloatingAssetCard {...exampleProps} />
    <FloatingAssetCard {...exampleProps} />
    <FloatingAssetCard {...exampleProps} size="l" />
  </HStack>
);

export default {
  title: 'Components/Cards/FloatingAssetCard',
  component: FloatingAssetCard,
};
