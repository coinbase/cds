import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { VStack } from '../../../layout/VStack';
import { Text } from '../../../typography/Text';
import { SelectChip } from '../SelectChip';

const meta: Meta = {
  title: 'Components/Alpha/SelectChipSize',
  component: SelectChip,
};

export default meta;
type Story = StoryObj;

const exampleOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
];

const MockSelectChip = ({ compact, size }: { compact?: boolean; size?: 'xs' | 's' }) => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <SelectChip
      accessibilityLabel="Select a value"
      compact={compact}
      onChange={setValue}
      options={exampleOptions}
      placeholder="Choose an option"
      size={size}
      value={value}
    />
  );
};

const LabeledExample = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <VStack alignItems="flex-start" gap={1}>
    <Text as="p" color="fgMuted" font="label2">
      {title}
    </Text>
    {children}
  </VStack>
);

/**
 * One-off t-shirt size stories for the alpha SelectChip (xs/s).
 * Do not fold these into SelectChip.stories.tsx — keeps visual review of sizing isolated.
 */
export const Size: Story = {
  render: () => (
    <VStack gap={3}>
      <LabeledExample title="Default (resolves to size s)">
        <MockSelectChip />
      </LabeledExample>
      <LabeledExample title="Deprecated compact (renders as size xs)">
        <MockSelectChip compact />
      </LabeledExample>
      <LabeledExample title='size="xs"'>
        <MockSelectChip size="xs" />
      </LabeledExample>
      <LabeledExample title='size="s"'>
        <MockSelectChip size="s" />
      </LabeledExample>
      <LabeledExample title='compact + size="s" (size wins)'>
        <MockSelectChip compact size="s" />
      </LabeledExample>
    </VStack>
  ),
};
