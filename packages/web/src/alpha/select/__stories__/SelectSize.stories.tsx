import React, { useState } from 'react';

import { VStack } from '../../../layout/VStack';
import { Text } from '../../../typography/Text';
import { Select, type SelectOption } from '../Select';

export default {
  title: 'Components/Alpha/Select/SelectSize',
  component: Select,
};

const exampleOptions: SelectOption[] = [
  { value: '1', label: 'Apple' },
  { value: '2', label: 'Banana' },
  { value: '3', label: 'Cherry' },
];

const LabeledExample = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <VStack gap={1}>
    <Text as="p" color="fgMuted" font="label2">
      {title}
    </Text>
    {children}
  </VStack>
);

/**
 * One-off size density stories for the alpha Select (s/m/l).
 * Do not fold these into Select.stories.tsx — keeps visual review of density isolated.
 */
export const SizeDensity = () => {
  const [value, setValue] = useState<string | null>('1');
  const [multiValue, setMultiValue] = useState<string[]>(['1']);

  return (
    <VStack gap={3} maxWidth={400}>
      <LabeledExample title="Default (resolves to size l, 56px)">
        <Select
          label="Default"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Select…"
          value={value}
        />
      </LabeledExample>
      <LabeledExample title="Deprecated compact (legacy behavior, 40px)">
        <Select
          compact
          label="Compact"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Select…"
          value={value}
        />
      </LabeledExample>
      <LabeledExample title='size="s" (replaces compact, 40px)'>
        <Select
          label="Small"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Select…"
          size="s"
          value={value}
        />
      </LabeledExample>
      <LabeledExample title='size="m" (new, 48px)'>
        <Select
          label="Medium"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Select…"
          size="m"
          value={value}
        />
      </LabeledExample>
      <LabeledExample title='size="l" (default, 56px)'>
        <Select
          label="Large"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Select…"
          size="l"
          value={value}
        />
      </LabeledExample>
      <LabeledExample title='compact + size="m" (size wins, 48px)'>
        <Select
          compact
          label="Compact + Medium"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Select…"
          size="m"
          value={value}
        />
      </LabeledExample>
      <LabeledExample title='Multi-select size="s"'>
        <Select
          label="Multi small"
          onChange={(next) => setMultiValue(next as string[])}
          options={exampleOptions}
          placeholder="Select…"
          size="s"
          type="multi"
          value={multiValue}
        />
      </LabeledExample>
      <LabeledExample title='Multi-select size="m"'>
        <Select
          label="Multi medium"
          onChange={(next) => setMultiValue(next as string[])}
          options={exampleOptions}
          placeholder="Select…"
          size="m"
          type="multi"
          value={multiValue}
        />
      </LabeledExample>
      <LabeledExample title='Multi-select size="l"'>
        <Select
          label="Multi large"
          onChange={(next) => setMultiValue(next as string[])}
          options={exampleOptions}
          placeholder="Select…"
          size="l"
          type="multi"
          value={multiValue}
        />
      </LabeledExample>
    </VStack>
  );
};
