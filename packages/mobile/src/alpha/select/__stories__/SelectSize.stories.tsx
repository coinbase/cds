import { useState } from 'react';

import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { Select, type SelectOption } from '../Select';

const exampleOptions: SelectOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

const DefaultExample = () => {
  const [value, setValue] = useState<string | null>('1');
  return (
    <Select
      label="Default"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Select…"
      value={value}
    />
  );
};

const CompactExample = () => {
  const [value, setValue] = useState<string | null>('1');
  return (
    <Select
      compact
      label="Compact"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Select…"
      value={value}
    />
  );
};

const SmallExample = () => {
  const [value, setValue] = useState<string | null>('1');
  return (
    <Select
      label="Small"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Select…"
      size="s"
      value={value}
    />
  );
};

const MediumExample = () => {
  const [value, setValue] = useState<string | null>('1');
  return (
    <Select
      label="Medium"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Select…"
      size="m"
      value={value}
    />
  );
};

const LargeExample = () => {
  const [value, setValue] = useState<string | null>('1');
  return (
    <Select
      label="Large"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Select…"
      size="l"
      value={value}
    />
  );
};

const CompactAndSizeExample = () => {
  const [value, setValue] = useState<string | null>('1');
  return (
    <Select
      compact
      label="Compact + Medium"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Select…"
      size="m"
      value={value}
    />
  );
};

const MultiSelectSizeExample = ({ size }: { size: 's' | 'm' | 'l' }) => {
  const [value, setValue] = useState<string[]>(['1']);
  return (
    <Select
      label={`Multi ${size}`}
      onChange={(next) => setValue(next as string[])}
      options={exampleOptions}
      placeholder="Select…"
      size={size}
      type="multi"
      value={value}
    />
  );
};

/**
 * One-off size density story for the alpha Select (s/m/l).
 * Do not fold these into AlphaSelect.stories.tsx — keeps visual review of density isolated.
 */
const SelectSizeScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default (resolves to size l, 56px)">
        <DefaultExample />
      </Example>
      <Example title="Deprecated compact (legacy behavior, 40px)">
        <CompactExample />
      </Example>
      <Example title='size="s" (replaces compact, 40px)'>
        <SmallExample />
      </Example>
      <Example title='size="m" (new, 48px)'>
        <MediumExample />
      </Example>
      <Example title='size="l" (default, 56px)'>
        <LargeExample />
      </Example>
      <Example title='compact + size="m" (size wins, 48px)'>
        <CompactAndSizeExample />
      </Example>
      <Example title='Multi-select size="s"'>
        <MultiSelectSizeExample size="s" />
      </Example>
      <Example title='Multi-select size="m"'>
        <MultiSelectSizeExample size="m" />
      </Example>
      <Example title='Multi-select size="l"'>
        <MultiSelectSizeExample size="l" />
      </Example>
    </ExampleScreen>
  );
};

export default SelectSizeScreen;
