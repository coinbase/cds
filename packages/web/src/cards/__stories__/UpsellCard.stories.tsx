import React, { type JSX } from 'react';
import { coinbaseOneLogo } from '@coinbase/cds-common/internal/data/assets';

import { Button } from '../../buttons';
import { HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { UpsellCard, type UpsellCardProps } from '../UpsellCard';

const onClickConsole = console.log;

const exampleProps = {
  title: 'Headline',
  description: 'Check out the most popular assets',
  action: 'Buy Bitcoin now',
  media: <img alt="" data-testid="media" src={coinbaseOneLogo as string} width={120} />,
  background: 'bgPrimaryWash',
  onActionPress: onClickConsole,
  onDismissPress: onClickConsole,
} satisfies UpsellCardProps;

const compactProps = {
  title: 'Headline',
  description: 'Check out the most popular assets',
  media: <img alt="" data-testid="media" src={coinbaseOneLogo as string} width={120} />,
  background: 'bgPrimaryWash',
  onClick: onClickConsole,
} satisfies UpsellCardProps;

export const Default = (): JSX.Element => <UpsellCard {...exampleProps} />;

export const Compact = (): JSX.Element => <UpsellCard {...compactProps} />;

export const Vertical = (): JSX.Element => (
  <VStack gap={1.5}>
    <UpsellCard {...exampleProps} />
    <UpsellCard {...exampleProps} />
  </VStack>
);

export const Horizontal = (): JSX.Element => (
  <HStack gap={1.5}>
    <UpsellCard {...exampleProps} />
    <UpsellCard {...exampleProps} />
  </HStack>
);

export const LongText = (): JSX.Element => (
  <UpsellCard
    {...exampleProps}
    action="This is a really long action"
    description="This is a really long description for the UpsellCard component"
    title="This is a really long title."
  />
);

export const CustomTextNodes = (): JSX.Element => {
  return (
    <UpsellCard
      {...exampleProps}
      action={
        <Button
          compact
          flush="start"
          numberOfLines={1}
          onClick={onClickConsole}
          variant="secondary"
        >
          Sign up
        </Button>
      }
      description={
        <Text as="p" color="fgInverse" display="block" font="label2">
          Start your free 30 day trial of Coinbase One
        </Text>
      }
      style={{ backgroundColor: 'rgb(var(--blue80))' }}
      title={
        <Text as="h3" color="fgInverse" display="block" font="headline">
          Coinbase One
        </Text>
      }
    />
  );
};

export const CustomBackground = (): JSX.Element => {
  return <UpsellCard {...exampleProps} style={{ backgroundColor: 'rgb(var(--yellow20))' }} />;
};

export const CustomWidth = (): JSX.Element => <UpsellCard {...exampleProps} width="100%" />;

export const Carousel = (): JSX.Element => (
  <HStack gap={2} overflow="scroll">
    <UpsellCard {...exampleProps} />
    <UpsellCard {...exampleProps} />
    <UpsellCard {...exampleProps} />
    <UpsellCard {...exampleProps} />
  </HStack>
);

export default {
  title: 'Components/Cards/UpsellCard',
  component: UpsellCard,
};
