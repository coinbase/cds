import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { Chip } from '../Chip';

const meta: Meta = {
  title: 'Components/Chips/ChipSize',
  component: Chip,
};

export default meta;
type Story = StoryObj;

const NoopFn = () => {};

const LabeledExample = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <VStack alignItems="flex-start" gap={1}>
    <Text as="p" color="fgMuted" font="label2">
      {title}
    </Text>
    {children}
  </VStack>
);

/**
 * One-off t-shirt size stories for the base Chip (xs/s).
 * Do not fold these into Chip.stories.tsx — keeps visual review of sizing isolated.
 */
export const Size: Story = {
  render: () => (
    <VStack gap={3}>
      <LabeledExample title="Default (resolves to size s)">
        <Chip onClick={NoopFn}>USD</Chip>
      </LabeledExample>
      <LabeledExample title="Deprecated compact (renders as size xs)">
        <Chip compact onClick={NoopFn}>
          USD
        </Chip>
      </LabeledExample>
      <LabeledExample title='size="xs"'>
        <Chip onClick={NoopFn} size="xs">
          USD
        </Chip>
      </LabeledExample>
      <LabeledExample title='size="s"'>
        <Chip onClick={NoopFn} size="s">
          USD
        </Chip>
      </LabeledExample>
      <LabeledExample title='compact + size="s" (size wins)'>
        <Chip compact onClick={NoopFn} size="s">
          USD
        </Chip>
      </LabeledExample>
    </VStack>
  ),
};
