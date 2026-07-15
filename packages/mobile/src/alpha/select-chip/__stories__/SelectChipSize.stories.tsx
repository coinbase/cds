import { useState } from 'react';

import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { SelectChip } from '../SelectChip';

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
      label="Select a value"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Choose an option"
      size={size}
      value={value}
    />
  );
};

/**
 * One-off t-shirt size stories for the alpha SelectChip (xs/s).
 * Do not fold these into SelectChip.stories.tsx — keeps visual review of sizing isolated.
 */
const SelectChipSizeScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Default (resolves to size s)">
        <MockSelectChip />
      </Example>
      <Example inline title="Deprecated compact (renders as size xs)">
        <MockSelectChip compact />
      </Example>
      <Example inline title='size="xs"'>
        <MockSelectChip size="xs" />
      </Example>
      <Example inline title='size="s"'>
        <MockSelectChip size="s" />
      </Example>
      <Example inline title='compact + size="s" (size wins)'>
        <MockSelectChip compact size="s" />
      </Example>
    </ExampleScreen>
  );
};

export default SelectChipSizeScreen;
