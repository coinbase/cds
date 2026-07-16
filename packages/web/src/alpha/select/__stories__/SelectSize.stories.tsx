import React, { useState } from 'react';
import { useMultiSelect } from '@coinbase/cds-common/select/useMultiSelect';
import type { Meta, StoryObj } from '@storybook/react';

import { VStack } from '../../../layout/VStack';
import { Text } from '../../../typography/Text';
import { Select, type SelectOption } from '../Select';

const meta: Meta = {
  title: 'Components/Alpha/SelectSize',
  component: Select,
};

export default meta;
type Story = StoryObj;

const exampleOptions: SelectOption[] = [
  { value: '1', label: 'Apple' },
  { value: '2', label: 'Banana' },
  { value: '3', label: 'Cherry' },
];

const MockSelect = ({
  label,
  compact,
  size,
}: {
  label: string;
  compact?: boolean;
  size?: 's' | 'm' | 'l';
}) => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <Select
      compact={compact}
      label={label}
      onChange={setValue}
      options={exampleOptions}
      placeholder="Select…"
      size={size}
      value={value}
    />
  );
};

const MockMultiSelect = ({ label, size }: { label: string; size?: 's' | 'm' | 'l' }) => {
  const { value, onChange } = useMultiSelect({ initialValue: ['1'] });

  return (
    <Select
      label={label}
      onChange={onChange}
      options={exampleOptions}
      placeholder="Select…"
      size={size}
      type="multi"
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
 * One-off t-shirt size stories for the alpha Select (s/m/l).
 * Do not fold these into Select.stories.tsx — keeps visual review of sizing isolated.
 */
export const Size: Story = {
  render: () => (
    <VStack gap={3} maxWidth={400}>
      <LabeledExample title="Default (resolves to size l)">
        <MockSelect label="Default" />
      </LabeledExample>
      <LabeledExample title="Deprecated compact (renders as size s)">
        <MockSelect compact label="Compact" />
      </LabeledExample>
      <LabeledExample title='size="s"'>
        <MockSelect label="Small" size="s" />
      </LabeledExample>
      <LabeledExample title='size="m"'>
        <MockSelect label="Medium" size="m" />
      </LabeledExample>
      <LabeledExample title='size="l"'>
        <MockSelect label="Large" size="l" />
      </LabeledExample>
      <LabeledExample title='compact + size="m" (size wins)'>
        <MockSelect compact label="Compact + Medium" size="m" />
      </LabeledExample>
      <LabeledExample title='Multi-select size="s"'>
        <MockMultiSelect label="Multi small" size="s" />
      </LabeledExample>
      <LabeledExample title='Multi-select size="m"'>
        <MockMultiSelect label="Multi medium" size="m" />
      </LabeledExample>
      <LabeledExample title='Multi-select size="l"'>
        <MockMultiSelect label="Multi large" size="l" />
      </LabeledExample>
    </VStack>
  ),
};
