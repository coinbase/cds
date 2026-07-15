import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { InputChip } from '../InputChip';

const meta: Meta = {
  title: 'Components/Chips/InputChipSize',
  component: InputChip,
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
 * One-off t-shirt size stories for InputChip (xs/s).
 * Do not fold these into InputChip.stories.tsx — keeps visual review of sizing isolated.
 */
export const Size: Story = {
  render: () => (
    <VStack gap={3}>
      <LabeledExample title="Default (resolves to size s)">
        <InputChip onClick={NoopFn}>USD</InputChip>
      </LabeledExample>
      <LabeledExample title="Deprecated compact (renders as size xs)">
        <InputChip compact onClick={NoopFn}>
          USD
        </InputChip>
      </LabeledExample>
      <LabeledExample title='size="xs"'>
        <InputChip onClick={NoopFn} size="xs">
          USD
        </InputChip>
      </LabeledExample>
      <LabeledExample title='size="s"'>
        <InputChip onClick={NoopFn} size="s">
          USD
        </InputChip>
      </LabeledExample>
      <LabeledExample title='compact + size="s" (size wins)'>
        <InputChip compact onClick={NoopFn} size="s">
          USD
        </InputChip>
      </LabeledExample>
    </VStack>
  ),
};
