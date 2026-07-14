import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import type { TextInputProps } from '../TextInput';
import { TextInput } from '../TextInput';

const meta: Meta = {
  title: 'Components/Inputs/TextInputSize',
  component: TextInput,
};

export default meta;
type Story = StoryObj;

const MockTextInput = (props: TextInputProps) => {
  const [text, onChangeText] = useState(typeof props.value === 'string' ? props.value : '');

  return <TextInput onChange={(e) => onChangeText(e.target.value)} value={text} {...props} />;
};

const LabeledExample = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <VStack gap={1}>
    <Text as="p" color="fgMuted" font="label2">
      {title}
    </Text>
    {children}
  </VStack>
);

/**
 * One-off size density stories for TextInput (s/m/l).
 * Do not fold these into TextInput.stories.tsx — keeps visual review of density isolated.
 */
export const SizeDensity: Story = {
  render: () => (
    <VStack gap={3} maxWidth={400}>
      <LabeledExample title="Default (resolves to size l)">
        <MockTextInput label="Username" placeholder="john.doe@coinbase.com" />
      </LabeledExample>
      <LabeledExample title="Deprecated compact (legacy behavior)">
        <MockTextInput compact label="Username" placeholder="john.doe@coinbase.com" />
      </LabeledExample>
      <LabeledExample title='size="s"'>
        <MockTextInput label="Username" placeholder="john.doe@coinbase.com" size="s" />
      </LabeledExample>
      <LabeledExample title='size="m"'>
        <MockTextInput label="Username" placeholder="john.doe@coinbase.com" size="m" />
      </LabeledExample>
      <LabeledExample title='size="l"'>
        <MockTextInput label="Username" placeholder="john.doe@coinbase.com" size="l" />
      </LabeledExample>
      <LabeledExample title='compact + size="m" (size wins)'>
        <MockTextInput compact label="Username" placeholder="john.doe@coinbase.com" size="m" />
      </LabeledExample>
      <LabeledExample title='size="s" with outside label'>
        <MockTextInput label="Amount" placeholder="0.00" size="s" suffix="USD" />
      </LabeledExample>
      <LabeledExample title='size="s" with inside label (horizontal)'>
        <MockTextInput
          label="Username"
          labelVariant="inside"
          placeholder="john.doe@coinbase.com"
          size="s"
        />
      </LabeledExample>
      <LabeledExample title='size="m" with inside label (horizontal)'>
        <MockTextInput
          label="Username"
          labelVariant="inside"
          placeholder="john.doe@coinbase.com"
          size="m"
        />
      </LabeledExample>
      <LabeledExample title='size="l" with inside label (vertical)'>
        <MockTextInput
          label="Username"
          labelVariant="inside"
          placeholder="john.doe@coinbase.com"
          size="l"
        />
      </LabeledExample>
    </VStack>
  ),
};
