import { useRef, useState } from 'react';
import { useMultiSelect } from '@coinbase/cds-common/select/useMultiSelect';

import { Button } from '../../../buttons';
import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { Icon } from '../../../icons/Icon';
import { VStack } from '../../../layout';
import { Text } from '../../../typography/Text';
import type { SelectOptionList } from '../../select';
import type { SelectOption } from '../../select/Select';
import { Combobox, type ComboboxControlComponent, type ComboboxRef } from '../Combobox';
import { DefaultComboboxControl } from '../DefaultComboboxControl';

// Basic option sets
const multiSelectOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
  { value: '6', label: 'Option 6' },
  { value: '7', label: 'Option 7' },
  { value: '8', label: 'Option 8' },
  { value: '9', label: 'Option 9' },
  { value: '10', label: 'Option 10' },
  { value: '11', label: 'Option 11' },
  { value: '12', label: 'Option 12' },
  { value: '13', label: 'Option 13' },
  { value: '14', label: 'Option 14' },
  { value: '15', label: 'Option 15' },
  { value: '16', label: 'Option 16' },
  { value: '17', label: 'Option 17' },
  { value: '18', label: 'Option 18' },
  { value: '19', label: 'Option 19' },
  { value: '20', label: 'Option 20' },
];

const singleSelectOptions = [
  { value: null, label: 'Remove selection' },
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

// Rich option sets for various examples
const fruitOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'lemon', label: 'Lemon' },
];

const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States', description: 'North America' },
  { value: 'ca', label: 'Canada', description: 'North America' },
  { value: 'mx', label: 'Mexico', description: 'North America' },
  { value: 'uk', label: 'United Kingdom', description: 'Europe' },
  { value: 'fr', label: 'France', description: 'Europe' },
  { value: 'de', label: 'Germany', description: 'Europe' },
  { value: 'jp', label: 'Japan', description: 'Asia' },
  { value: 'cn', label: 'China', description: 'Asia' },
];

const cryptoOptions: SelectOption[] = [
  { value: 'btc', label: 'Bitcoin', description: 'BTC • Digital Gold' },
  { value: 'eth', label: 'Ethereum', description: 'ETH • Smart Contracts' },
  { value: 'usdc', label: 'USD Coin', description: 'USDC • Stablecoin' },
  { value: 'usdt', label: 'Tether', description: 'USDT • Stablecoin' },
  { value: 'sol', label: 'Solana', description: 'SOL • High Performance' },
  { value: 'ada', label: 'Cardano', description: 'ADA • Academic Approach' },
];

const teamOptions: SelectOption[] = [
  { value: 'john', label: 'John Smith', description: 'Engineering' },
  { value: 'jane', label: 'Jane Doe', description: 'Design' },
  { value: 'bob', label: 'Bob Johnson', description: 'Product' },
  { value: 'alice', label: 'Alice Williams', description: 'Engineering' },
  { value: 'charlie', label: 'Charlie Brown', description: 'Marketing' },
];

// Example Components
const DefaultExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: ['1'] });

  return (
    <Combobox
      label="Multi Select"
      onChange={onChange}
      options={multiSelectOptions}
      placeholder="Search..."
      type="multi"
      value={value}
    />
  );
};

const SingleSelectExample = () => {
  const [singleValue, setSingleValue] = useState<string | null>(null);

  return (
    <Combobox
      label="Single Select"
      onChange={setSingleValue}
      options={singleSelectOptions}
      placeholder="Search..."
      value={singleValue}
    />
  );
};

const NoLabelExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      onChange={onChange}
      options={multiSelectOptions}
      placeholder="Search..."
      type="multi"
      value={value}
    />
  );
};

const InitialValuesExample = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['apple', 'banana', 'cherry'],
  });

  return (
    <Combobox
      label="Pre-selected fruits"
      onChange={onChange}
      options={fruitOptions}
      placeholder="Search fruits..."
      type="multi"
      value={value}
    />
  );
};

const AlignmentsExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: ['apple', 'banana', 'cherry'] });

  return (
    <VStack gap={2}>
      <Combobox
        label="Default align - start"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Search fruits..."
        type="multi"
        value={value}
      />
      <Combobox
        align="center"
        label="Center align"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Search fruits..."
        type="multi"
        value={value}
      />
      <Combobox
        align="end"
        label="End align"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Search fruits..."
        type="multi"
        value={value}
      />
      <Combobox
        compact
        label="Compact align - start"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Search fruits..."
        type="multi"
        value={value}
      />
      <Combobox
        compact
        align="center"
        label="Compact align - center"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Search fruits..."
        type="multi"
        value={value}
      />
      <Combobox
        compact
        align="end"
        label="Compact align - end"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Search fruits..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

const SingleAlignmentsExample = () => {
  const [value, setValue] = useState<string | null>('1');

  return (
    <VStack gap={2}>
      <Combobox
        label="Default align - start"
        onChange={setValue}
        options={singleSelectOptions}
        placeholder="Empty value"
        type="single"
        value={value}
      />
      <Combobox
        align="center"
        label="Center align"
        onChange={setValue}
        options={singleSelectOptions}
        placeholder="Empty value"
        type="single"
        value={value}
      />
      <Combobox
        align="end"
        label="End align"
        onChange={setValue}
        options={singleSelectOptions}
        placeholder="Empty value"
        type="single"
        value={value}
      />
      <Combobox
        compact
        label="Compact align - start"
        onChange={setValue}
        options={singleSelectOptions}
        placeholder="Empty value"
        type="single"
        value={value}
      />
      <Combobox
        compact
        align="center"
        label="Compact align - center"
        onChange={setValue}
        options={singleSelectOptions}
        placeholder="Empty value"
        type="single"
        value={value}
      />
      <Combobox
        compact
        align="end"
        label="Compact align - end"
        onChange={setValue}
        options={singleSelectOptions}
        placeholder="Empty value"
        type="single"
        value={value}
      />
    </VStack>
  );
};

const ControlledSearchExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });
  const [searchText, setSearchText] = useState('');

  return (
    <VStack gap={2}>
      <Text color="fgMuted">Current search: &quot;{searchText}&quot;</Text>
      <Combobox
        label="Controlled search"
        onChange={onChange}
        onSearch={setSearchText}
        options={fruitOptions}
        placeholder="Type to search..."
        searchText={searchText}
        type="multi"
        value={value}
      />
      <Button compact onPress={() => setSearchText('apple')}>
        Set search to &quot;apple&quot;
      </Button>
    </VStack>
  );
};

const AccessibilityLabelExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      accessibilityLabel="Custom accessibility label"
      label="Accessible combobox"
      onChange={onChange}
      options={fruitOptions}
      placeholder="Has accessibility label..."
      type="multi"
      value={value}
    />
  );
};

const WithDescriptionsExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      label="Select countries"
      onChange={onChange}
      options={countryOptions}
      placeholder="Search countries..."
      type="multi"
      value={value}
    />
  );
};

const HideSearchInputExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: ['apple', 'banana', 'cherry'] });

  return (
    <Combobox
      hideSearchInput
      label="Hide search input"
      onChange={onChange}
      options={fruitOptions}
      placeholder="Search..."
      type="multi"
      value={value}
    />
  );
};

const CryptoAssetsExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      label="Select assets"
      onChange={onChange}
      options={cryptoOptions}
      placeholder="Search crypto..."
      type="multi"
      value={value}
    />
  );
};

const CustomFilterExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  const customFilterFunction = (options: SelectOptionList<'multi'>, searchText: string) => {
    const search = searchText.toLowerCase();
    return (options as SelectOption[]).filter((option) => {
      const label = typeof option.label === 'string' ? option.label.toLowerCase() : '';
      const description =
        typeof option.description === 'string' ? option.description.toLowerCase() : '';
      return label.startsWith(search) || description.startsWith(search);
    });
  };

  return (
    <VStack gap={2}>
      <Text color="fgMuted" fontSize="caption">
        Only matches start of words
      </Text>
      <Combobox
        filterFunction={customFilterFunction}
        label="Custom filter"
        onChange={onChange}
        options={cryptoOptions}
        placeholder="Type to filter..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

const DisabledExample = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['apple', 'banana'],
  });

  return (
    <Combobox
      disabled
      label="Disabled combobox"
      onChange={onChange}
      options={fruitOptions}
      placeholder="Cannot interact..."
      type="multi"
      value={value}
    />
  );
};

const CompactExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      compact
      label="Compact size"
      onChange={onChange}
      options={fruitOptions}
      placeholder="Compact combobox..."
      type="multi"
      value={value}
    />
  );
};

export const CompactSingleSelect = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <VStack gap={4}>
      <Combobox
        compact
        label="Compact size"
        onChange={setValue}
        options={singleSelectOptions}
        placeholder="Compact combobox..."
        type="single"
        value={value}
      />
    </VStack>
  );
};

const RegularSizeExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      label="Regular size"
      onChange={onChange}
      options={fruitOptions}
      placeholder="Regular combobox..."
      type="multi"
      value={value}
    />
  );
};

const HelperTextExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      helperText="Select up to 5 team members for this project"
      label="Team members"
      onChange={onChange}
      options={teamOptions}
      placeholder="Search team members..."
      type="multi"
      value={value}
    />
  );
};

const DefaultVariantExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      label="Default"
      onChange={onChange}
      options={fruitOptions}
      placeholder="Default style..."
      type="multi"
      value={value}
    />
  );
};

const PositiveVariantExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      label="Positive"
      onChange={onChange}
      options={fruitOptions}
      placeholder="Success style..."
      type="multi"
      value={value}
      variant="positive"
    />
  );
};

const NegativeVariantExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      label="Negative"
      onChange={onChange}
      options={fruitOptions}
      placeholder="Error style..."
      type="multi"
      value={value}
      variant="negative"
    />
  );
};

const PrimaryVariantExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      label="Primary"
      onChange={onChange}
      options={fruitOptions}
      placeholder="Primary style..."
      type="multi"
      value={value}
      variant="primary"
    />
  );
};

const WithStartIconExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      label="With icon"
      onChange={onChange}
      options={cryptoOptions}
      placeholder="Search crypto..."
      startNode={<Icon name="search" size="s" />}
      type="multi"
      value={value}
    />
  );
};

const WithEndIconExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      endNode={<Icon name="filter" size="s" />}
      label="Custom end icon"
      onChange={onChange}
      options={fruitOptions}
      placeholder="Custom icon..."
      type="multi"
      value={value}
    />
  );
};

const MaxSelectedDisplayExample = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape'],
  });

  return (
    <Combobox
      label="Limited display"
      maxSelectedOptionsToShow={3}
      onChange={onChange}
      options={fruitOptions}
      placeholder="Shows max 3 selections..."
      type="multi"
      value={value}
    />
  );
};

const HiddenOptionsLabelExample = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['us', 'ca', 'mx', 'uk', 'fr', 'de'],
  });

  return (
    <Combobox
      hiddenSelectedOptionsLabel="countries"
      label="Countries"
      maxSelectedOptionsToShow={3}
      onChange={onChange}
      options={countryOptions}
      placeholder="Select countries..."
      type="multi"
      value={value}
    />
  );
};

const SelectAllExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      label="With select all"
      onChange={onChange}
      options={fruitOptions}
      placeholder="Can select all..."
      selectAllLabel="Select all fruits"
      type="multi"
      value={value}
    />
  );
};

const ClearAllExample = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['apple', 'banana', 'cherry'],
  });

  return (
    <Combobox
      clearAllLabel="Clear selection"
      label="With clear all"
      onChange={onChange}
      options={fruitOptions}
      placeholder="Can clear all..."
      type="multi"
      value={value}
    />
  );
};

const EmptyOptionsExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      emptyOptionsLabel="No matching fruits found"
      label="Empty state"
      onChange={onChange}
      options={[]}
      placeholder="No options available..."
      type="multi"
      value={value}
    />
  );
};

const DisabledOptionsExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  const mixedOptions: SelectOption[] = fruitOptions.map((option, index) => ({
    ...option,
    disabled: index % 3 === 0,
  }));

  return (
    <Combobox
      label="Mixed enabled/disabled"
      onChange={onChange}
      options={mixedOptions}
      placeholder="Some options disabled..."
      type="multi"
      value={value}
    />
  );
};

const LongListExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  const longOptions: SelectOption[] = Array.from({ length: 50 }, (_, i) => ({
    value: `option${i}`,
    label: `Option ${i + 1}`,
    description: `Description for option ${i + 1}`,
  }));

  return (
    <Combobox
      label="Many options"
      onChange={onChange}
      options={longOptions}
      placeholder="Search from 50 options..."
      type="multi"
      value={value}
    />
  );
};

const ValueMonitoringExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={3}>
      <Combobox
        label="Monitor selections"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Select to see values..."
        type="multi"
        value={value}
      />
      <VStack background="bgSecondary" borderRadius={400} gap={2} padding={3}>
        <Text fontSize="label1" fontWeight="label1">
          Selected values:
        </Text>
        <Text color="fgMuted" fontSize="caption">
          {value.length > 0 ? value.join(', ') : 'None selected'}
        </Text>
      </VStack>
    </VStack>
  );
};

const MultipleInstancesExample = () => {
  const fruits = useMultiSelect({ initialValue: [] });
  const countries = useMultiSelect({ initialValue: [] });
  const crypto = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={3}>
      <Combobox
        label="Fruits"
        onChange={fruits.onChange}
        options={fruitOptions}
        placeholder="Select fruits..."
        type="multi"
        value={fruits.value}
      />
      <Combobox
        label="Countries"
        onChange={countries.onChange}
        options={countryOptions}
        placeholder="Select countries..."
        type="multi"
        value={countries.value}
      />
      <Combobox
        label="Cryptocurrencies"
        onChange={crypto.onChange}
        options={cryptoOptions}
        placeholder="Select crypto..."
        type="multi"
        value={crypto.value}
      />
    </VStack>
  );
};

const ImperativeRefExample = () => {
  const comboboxRef = useRef<ComboboxRef>(null);
  const { value, onChange } = useMultiSelect({ initialValue: [] });
  return (
    <VStack gap={3}>
      <Button compact onPress={() => comboboxRef.current?.setOpen?.(true)}>
        Open
      </Button>
      <Button compact onPress={() => comboboxRef.current?.setOpen?.(false)}>
        Close
      </Button>
      <Text color="fg">{comboboxRef.current?.open ? 'Open' : 'Closed'}</Text>
      <Combobox
        ref={comboboxRef}
        label="Imperative ref"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Select fruits..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

const OptionsWithAccessoryExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });
  const optionsWithAccessory: SelectOption[] = fruitOptions.slice(0, 5).map((option) => ({
    ...option,
    accessory: <Icon color="fg" name="star" />,
  }));
  return (
    <Combobox
      label="Options with accessory"
      onChange={onChange}
      options={optionsWithAccessory}
      placeholder="Select fruits..."
      type="multi"
      value={value}
    />
  );
};

const OptionsWithMediaExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });
  const optionsWithMedia: SelectOption[] = fruitOptions.slice(0, 5).map((option) => ({
    ...option,
    media: <Icon color="fg" name="star" />,
  }));
  return (
    <Combobox
      label="Options with media"
      onChange={onChange}
      options={optionsWithMedia}
      placeholder="Select fruits..."
      type="multi"
      value={value}
    />
  );
};

const DynamicOptionsExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });
  const [options, setOptions] = useState(fruitOptions.slice(0, 5));

  const addOption = () => {
    const remaining = fruitOptions.filter(
      (fruit) => !options.some((opt) => opt.value === fruit.value),
    );
    if (remaining.length > 0) {
      setOptions([...options, remaining[0]]);
    }
  };

  return (
    <VStack gap={3}>
      <Combobox
        label="Dynamic options"
        onChange={onChange}
        options={options}
        placeholder="Options can change..."
        type="multi"
        value={value}
      />
      <Button compact onPress={addOption}>
        Add more options
      </Button>
    </VStack>
  );
};

const CustomComponent: ComboboxControlComponent = (props) => {
  return <DefaultComboboxControl {...props} searchText={`${props.value?.length ?? 0}`} />;
};

const CustomControlExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      ComboboxControlComponent={CustomComponent}
      label="Custom control - search field always shows the number of selected options"
      onChange={onChange}
      options={fruitOptions}
      type="multi"
      value={value}
    />
  );
};

const TestIdentifierExample = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <Combobox
      label="With test ID"
      onChange={onChange}
      options={fruitOptions}
      placeholder="Has test ID..."
      testID="fruit-combobox"
      type="multi"
      value={value}
    />
  );
};

const BorderlessExample = () => {
  const [singleValue, setSingleValue] = useState<string | null>('1');
  const { value: multiValue, onChange: multiOnChange } = useMultiSelect({
    initialValue: ['apple'],
  });

  return (
    <VStack gap={4}>
      <Combobox
        bordered={false}
        label="Borderless single select"
        onChange={setSingleValue}
        options={singleSelectOptions}
        placeholder="Search..."
        type="single"
        value={singleValue}
      />
      <Combobox
        bordered={false}
        label="Borderless multi select"
        onChange={multiOnChange}
        options={fruitOptions}
        placeholder="Search fruits..."
        type="multi"
        value={multiValue}
      />
    </VStack>
  );
};

// Main component with all examples
const Default = () => {
  return (
    <ExampleScreen>
      <Example title="Default">
        <DefaultExample />
      </Example>
      <Example title="Single Select">
        <SingleSelectExample />
      </Example>
      <Example title="No Label">
        <NoLabelExample />
      </Example>
      <Example title="Alignments">
        <AlignmentsExample />
      </Example>
      <Example title="Single select alignments">
        <SingleAlignmentsExample />
      </Example>
      <Example title="Pre-selected values">
        <InitialValuesExample />
      </Example>
      <Example title="Controlled search">
        <ControlledSearchExample />
      </Example>
      <Example title="Custom accessibility label">
        <AccessibilityLabelExample />
      </Example>
      <Example title="Options with descriptions">
        <WithDescriptionsExample />
      </Example>
      <Example title="Hide search input">
        <HideSearchInputExample />
      </Example>
      <Example title="Crypto assets">
        <CryptoAssetsExample />
      </Example>
      <Example title="Custom filter logic">
        <CustomFilterExample />
      </Example>
      <Example title="Disabled state">
        <DisabledExample />
      </Example>
      <Example title="Compact size">
        <CompactExample />
      </Example>
      <Example title="Compact single select">
        <CompactSingleSelect />
      </Example>
      <Example title="Regular size (for comparison)">
        <RegularSizeExample />
      </Example>
      <Example title="With helper text">
        <HelperTextExample />
      </Example>
      <Example title="Default variant">
        <DefaultVariantExample />
      </Example>
      <Example title="Positive variant">
        <PositiveVariantExample />
      </Example>
      <Example title="Negative variant">
        <NegativeVariantExample />
      </Example>
      <Example title="Primary variant">
        <PrimaryVariantExample />
      </Example>
      <Example title="With start icon">
        <WithStartIconExample />
      </Example>
      <Example title="With end icon">
        <WithEndIconExample />
      </Example>
      <Example title="Limited display (max 3)">
        <MaxSelectedDisplayExample />
      </Example>
      <Example title="Custom hidden label">
        <HiddenOptionsLabelExample />
      </Example>
      <Example title="With select all option">
        <SelectAllExample />
      </Example>
      <Example title="With clear all option">
        <ClearAllExample />
      </Example>
      <Example title="No options available">
        <EmptyOptionsExample />
      </Example>
      <Example title="Some disabled options">
        <DisabledOptionsExample />
      </Example>
      <Example title="Large dataset">
        <LongListExample />
      </Example>
      <Example title="Monitor selections">
        <ValueMonitoringExample />
      </Example>
      <Example title="Multiple comboboxes">
        <MultipleInstancesExample />
      </Example>
      <Example title="Imperative ref">
        <ImperativeRefExample />
      </Example>
      <Example title="Options with accessory">
        <OptionsWithAccessoryExample />
      </Example>
      <Example title="Options with media">
        <OptionsWithMediaExample />
      </Example>
      <Example title="Dynamic options">
        <DynamicOptionsExample />
      </Example>
      <Example title="Custom control">
        <CustomControlExample />
      </Example>
      <Example title="With test ID">
        <TestIdentifierExample />
      </Example>
      <Example title="Borderless">
        <BorderlessExample />
      </Example>
    </ExampleScreen>
  );
};

export default Default;
