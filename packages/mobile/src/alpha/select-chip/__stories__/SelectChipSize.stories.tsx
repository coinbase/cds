import { useState } from 'react';

import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { SelectChip } from '../SelectChip';

const exampleOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
];

/**
 * One-off size density screen for the Alpha SelectChip (xs/s).
 * Do not fold this into AlphaSelectChip.stories.tsx — keeps visual review of density isolated.
 */
const SelectChipSizeScreen = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <ExampleScreen>
      <Example title="Default (resolves to size s)">
        <SelectChip
          accessibilityLabel="Select a value"
          label="Select a value"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Choose an option"
          value={value}
        />
      </Example>
      <Example title="Deprecated compact (legacy behavior, renders xs)">
        <SelectChip
          accessibilityLabel="Select a value"
          compact
          label="Select a value"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Choose an option"
          value={value}
        />
      </Example>
      <Example title='size="xs"'>
        <SelectChip
          accessibilityLabel="Select a value"
          label="Select a value"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Choose an option"
          size="xs"
          value={value}
        />
      </Example>
      <Example title='size="s"'>
        <SelectChip
          accessibilityLabel="Select a value"
          label="Select a value"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Choose an option"
          size="s"
          value={value}
        />
      </Example>
      <Example title='compact + size="s" (size wins)'>
        <SelectChip
          accessibilityLabel="Select a value"
          compact
          label="Select a value"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Choose an option"
          size="s"
          value={value}
        />
      </Example>
    </ExampleScreen>
  );
};

export default SelectChipSizeScreen;
