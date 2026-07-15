import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { Button } from '../Button';

const meta: Meta = {
  title: 'Components/Buttons/ButtonSize',
  component: Button,
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
 * One-off t-shirt size stories for Button (xs/s/m/l).
 * Do not fold these into Button.stories.tsx — keeps visual review of sizing isolated.
 */
export const Size: Story = {
  render: () => (
    <VStack gap={3}>
      <LabeledExample title="Default (resolves to size l)">
        <Button onClick={console.log}>Default</Button>
      </LabeledExample>
      <LabeledExample title="Deprecated compact (renders as size s)">
        <Button compact onClick={console.log}>
          Compact
        </Button>
      </LabeledExample>
      <LabeledExample title='size="xs"'>
        <Button onClick={console.log} size="xs">
          Extra small
        </Button>
      </LabeledExample>
      <LabeledExample title='size="s"'>
        <Button onClick={console.log} size="s">
          Small
        </Button>
      </LabeledExample>
      <LabeledExample title='size="m"'>
        <Button onClick={console.log} size="m">
          Medium
        </Button>
      </LabeledExample>
      <LabeledExample title='size="l"'>
        <Button onClick={console.log} size="l">
          Large
        </Button>
      </LabeledExample>
      <LabeledExample title='compact + size="m" (size wins)'>
        <Button compact onClick={console.log} size="m">
          Compact + Medium
        </Button>
      </LabeledExample>
    </VStack>
  ),
};
