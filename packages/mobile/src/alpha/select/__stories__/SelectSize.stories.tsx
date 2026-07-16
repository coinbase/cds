import { useState } from 'react';
import { useMultiSelect } from '@coinbase/cds-common/select/useMultiSelect';

import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { Select, type SelectOption } from '../Select';

const exampleOptions: SelectOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
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

/**
 * One-off t-shirt size stories for the alpha Select (s/m/l).
 * Do not fold these into Select.stories.tsx — keeps visual review of sizing isolated.
 */
const SelectSizeScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default (resolves to size l)">
        <MockSelect label="Default" />
      </Example>
      <Example title="Deprecated compact (renders as size s)">
        <MockSelect compact label="Compact" />
      </Example>
      <Example title='size="s"'>
        <MockSelect label="Small" size="s" />
      </Example>
      <Example title='size="m"'>
        <MockSelect label="Medium" size="m" />
      </Example>
      <Example title='size="l"'>
        <MockSelect label="Large" size="l" />
      </Example>
      <Example title='compact + size="m" (size wins)'>
        <MockSelect compact label="Compact + Medium" size="m" />
      </Example>
      <Example title='Multi-select size="s"'>
        <MockMultiSelect label="Multi small" size="s" />
      </Example>
      <Example title='Multi-select size="m"'>
        <MockMultiSelect label="Multi medium" size="m" />
      </Example>
      <Example title='Multi-select size="l"'>
        <MockMultiSelect label="Multi large" size="l" />
      </Example>
    </ExampleScreen>
  );
};

export default SelectSizeScreen;
