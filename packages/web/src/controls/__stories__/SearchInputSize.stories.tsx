import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import type { SearchInputProps } from '../SearchInput';
import { SearchInput } from '../SearchInput';

const meta: Meta = {
  title: 'Components/Inputs/SearchInputSize',
  component: SearchInput,
};

export default meta;
type Story = StoryObj;

const MockSearchInput = (props: Partial<SearchInputProps>) => {
  const [value, setValue] = useState(typeof props.value === 'string' ? props.value : 'Search term');

  return (
    <SearchInput
      accessibilityLabel="Search"
      onChangeText={setValue}
      onClear={() => setValue('')}
      placeholder="Search..."
      value={value}
      {...props}
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
 * One-off t-shirt size stories for SearchInput (s/m/l).
 * Do not fold these into SearchInput.stories.tsx — keeps visual review of sizing isolated.
 */
export const Size: Story = {
  render: () => (
    <VStack gap={3} maxWidth={400}>
      <LabeledExample title="Default (resolves to size l)">
        <MockSearchInput />
      </LabeledExample>
      <LabeledExample title="Deprecated compact (renders as size s)">
        <MockSearchInput compact />
      </LabeledExample>
      <LabeledExample title='size="s"'>
        <MockSearchInput size="s" />
      </LabeledExample>
      <LabeledExample title='size="m"'>
        <MockSearchInput size="m" />
      </LabeledExample>
      <LabeledExample title='size="l"'>
        <MockSearchInput size="l" />
      </LabeledExample>
      <LabeledExample title='compact + size="m" (size wins)'>
        <MockSearchInput compact size="m" />
      </LabeledExample>
    </VStack>
  ),
};
