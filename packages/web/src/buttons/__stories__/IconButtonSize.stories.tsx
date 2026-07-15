import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { IconButton } from '../IconButton';

const meta: Meta = {
  title: 'Components/Buttons/IconButtonSize',
  component: IconButton,
};

export default meta;
type Story = StoryObj;

const LabeledExample = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <VStack alignItems="flex-start" gap={1}>
    <Text as="p" color="fgMuted" font="label2">
      {title}
    </Text>
    {children}
  </VStack>
);

/**
 * One-off t-shirt size stories for IconButton (xs/s/m/l).
 * Do not fold these into IconButton.stories.tsx — keeps visual review of sizing isolated.
 */
export const Size: Story = {
  render: () => (
    <VStack gap={3}>
      <LabeledExample title="Default (resolves to size s)">
        <IconButton name="gear" accessibilityLabel="Default" onClick={console.log} />
      </LabeledExample>
      <LabeledExample title="Deprecated compact (legacy behavior, renders as s)">
        <IconButton compact name="gear" accessibilityLabel="Compact" onClick={console.log} />
      </LabeledExample>
      <LabeledExample title='size="xs"'>
        <IconButton name="gear" accessibilityLabel="Extra small" size="xs" onClick={console.log} />
      </LabeledExample>
      <LabeledExample title='size="s"'>
        <IconButton name="gear" accessibilityLabel="Small" size="s" onClick={console.log} />
      </LabeledExample>
      <LabeledExample title='size="m"'>
        <IconButton name="gear" accessibilityLabel="Medium" size="m" onClick={console.log} />
      </LabeledExample>
      <LabeledExample title='size="l" (default)'>
        <IconButton name="gear" accessibilityLabel="Large" size="l" onClick={console.log} />
      </LabeledExample>
      <LabeledExample title='compact + size="m" (size wins, renders as m)'>
        <IconButton
          compact
          name="gear"
          accessibilityLabel="Compact + Medium"
          size="m"
          onClick={console.log}
        />
      </LabeledExample>
    </VStack>
  ),
};
