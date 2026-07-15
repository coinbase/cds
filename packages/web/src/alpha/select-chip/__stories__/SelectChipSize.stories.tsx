import { useState } from 'react';

import { VStack } from '../../../layout/VStack';
import { Text } from '../../../typography/Text';
import { SelectChip } from '../SelectChip';

export default {
  title: 'Components/Alpha/SelectChipSize',
  component: SelectChip,
};

const exampleOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
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
 * One-off size density story for the Alpha SelectChip (xs/s).
 * Do not fold this into SelectChip.stories.tsx — keeps visual review of density isolated.
 */
export const Size = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <VStack gap={3}>
      <LabeledExample title="Default (resolves to size s)">
        <SelectChip
          accessibilityLabel="Select a value"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Choose an option"
          value={value}
        />
      </LabeledExample>
      <LabeledExample title="Deprecated compact (legacy behavior, renders xs)">
        <SelectChip
          accessibilityLabel="Select a value"
          compact
          onChange={setValue}
          options={exampleOptions}
          placeholder="Choose an option"
          value={value}
        />
      </LabeledExample>
      <LabeledExample title='size="xs"'>
        <SelectChip
          accessibilityLabel="Select a value"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Choose an option"
          size="xs"
          value={value}
        />
      </LabeledExample>
      <LabeledExample title='size="s"'>
        <SelectChip
          accessibilityLabel="Select a value"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Choose an option"
          size="s"
          value={value}
        />
      </LabeledExample>
      <LabeledExample title='compact + size="s" (size wins)'>
        <SelectChip
          accessibilityLabel="Select a value"
          compact
          onChange={setValue}
          options={exampleOptions}
          placeholder="Choose an option"
          size="s"
          value={value}
        />
      </LabeledExample>
    </VStack>
  );
};
