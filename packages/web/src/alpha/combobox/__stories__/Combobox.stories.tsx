import { useRef, useState } from 'react';
import { useMultiSelect } from '@coinbase/cds-common/select/useMultiSelect';
import { css } from '@linaria/core';

import { Button } from '../../../buttons/Button';
import { Icon } from '../../../icons/Icon';
import { HStack } from '../../../layout/HStack';
import { VStack } from '../../../layout/VStack';
import { Text } from '../../../typography/Text';
import type { SelectOptionList } from '../../select';
import type { SelectOption } from '../../select/Select';
import {
  Combobox,
  type ComboboxControlComponent,
  type ComboboxRef,
  DefaultComboboxControl,
} from '../';

export default {
  title: 'Components/Alpha/Combobox',
  component: Combobox,
};

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
  { value: 'mango', label: 'Mango' },
  { value: 'orange', label: 'Orange' },
  { value: 'papaya', label: 'Papaya' },
  { value: 'raspberry', label: 'Raspberry' },
  { value: 'strawberry', label: 'Strawberry' },
];

const singleFruitOptions: SelectOption[] = [
  { value: null, label: 'Remove selection' },
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
];

const longLabelOptions: SelectOption[] = [
  {
    value: 'apple',
    label:
      'Apple is a very long label that should test how the component handles extensive label content',
  },
  {
    value: 'banana',
    label:
      'Banana is a very long label that should test how the component handles extensive label content',
  },
  {
    value: 'cherry',
    label:
      'Cherry is a very long label that should test how the component handles extensive label content',
  },
  {
    value: 'date',
    label:
      'Date is a very long label that should test how the component handles extensive label content',
  },
  {
    value: 'elderberry',
    label:
      'Elderberry is a very long label that should test how the component handles extensive label content',
  },
  {
    value: 'fig',
    label:
      'Fig is a very long label that should test how the component handles extensive label content',
  },
  {
    value: 'grape',
    label:
      'Grape is a very long label that should test how the component handles extensive label content',
  },
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
  { value: 'in', label: 'India', description: 'Asia' },
  { value: 'br', label: 'Brazil', description: 'South America' },
  { value: 'ar', label: 'Argentina', description: 'South America' },
  { value: 'au', label: 'Australia', description: 'Oceania' },
];

const cryptoOptions: SelectOption[] = [
  { value: 'btc', label: 'Bitcoin', description: 'BTC • Digital Gold' },
  { value: 'eth', label: 'Ethereum', description: 'ETH • Smart Contracts' },
  { value: 'usdc', label: 'USD Coin', description: 'USDC • Stablecoin' },
  { value: 'usdt', label: 'Tether', description: 'USDT • Stablecoin' },
  { value: 'bnb', label: 'BNB', description: 'BNB • Exchange Token' },
  { value: 'xrp', label: 'XRP', description: 'XRP • Payments' },
  { value: 'sol', label: 'Solana', description: 'SOL • High Performance' },
  { value: 'ada', label: 'Cardano', description: 'ADA • Academic Approach' },
  { value: 'doge', label: 'Dogecoin', description: 'DOGE • Meme Coin' },
  { value: 'avax', label: 'Avalanche', description: 'AVAX • Subnets' },
];

const teamOptions: SelectOption[] = [
  { value: 'john', label: 'John Smith', description: 'Engineering' },
  { value: 'jane', label: 'Jane Doe', description: 'Design' },
  { value: 'bob', label: 'Bob Johnson', description: 'Product' },
  { value: 'alice', label: 'Alice Williams', description: 'Engineering' },
  { value: 'charlie', label: 'Charlie Brown', description: 'Marketing' },
  { value: 'diana', label: 'Diana Prince', description: 'Sales' },
  { value: 'eve', label: 'Eve Anderson', description: 'Engineering' },
  { value: 'frank', label: 'Frank Miller', description: 'Support' },
];

const customControlCss = css`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 4px;
`;

const customDropdownCss = css`
  border: 2px solid #667eea;
  border-radius: 12px;
`;

export const BasicUsage = () => {
  const { value, onChange } = useMultiSelect({ initialValue: ['apple', 'banana'] });

  return (
    <VStack gap={4}>
      <Combobox
        label="Select fruits"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Search and select fruits..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const SingleSelect = () => {
  const [value, setValue] = useState<string | null>('apple');

  return (
    <VStack gap={4}>
      <Combobox
        label="Select fruits"
        onChange={setValue}
        options={singleFruitOptions}
        placeholder="Search and select fruits..."
        value={value}
      />
    </VStack>
  );
};

export const MultipleComboboxes = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });
  const { value: insideValue, onChange: insideOnChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        label="Fruits"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Search fruits..."
        type="multi"
        value={value}
      />
      <Combobox
        label="Inside"
        onChange={insideOnChange}
        options={fruitOptions}
        placeholder="Search fruits..."
        type="multi"
        value={insideValue}
      />
    </VStack>
  );
};

export const EmptySelectedValues = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: [],
  });

  return (
    <VStack gap={4}>
      <Combobox
        label="Pre-selected fruits"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Search fruits..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const OptionsWithLongLabels = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        label="Options with long labels"
        onChange={onChange}
        options={longLabelOptions}
        placeholder="Search fruits..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const OptionsWithLongLabelsSingleSelect = () => {
  const [value, setValue] = useState<string | null>('apple');

  return (
    <VStack gap={4}>
      <Combobox
        label="Options with long labels"
        onChange={setValue}
        options={longLabelOptions}
        placeholder="Search fruits..."
        type="single"
        value={value}
      />
    </VStack>
  );
};

export const LongPlaceholder = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        label="Long placeholder"
        onChange={onChange}
        options={fruitOptions}
        placeholder="This is a very long placeholder text that should test how the component handles extensive placeholder content"
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const ControlledSearch = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });
  const [searchText, setSearchText] = useState('');

  return (
    <VStack gap={4}>
      <Text>Current search: &quot;{searchText}&quot;</Text>
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
      <Button onClick={() => setSearchText('apple')}>Set search to &quot;apple&quot;</Button>
    </VStack>
  );
};

export const UncontrolledSearch = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        defaultSearchText="ban"
        label="Default search text"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Search..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const ControlledOpen = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });
  const [open, setOpen] = useState(false);

  return (
    <VStack gap={4}>
      <HStack gap={2}>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Button onClick={() => setOpen(false)}>Close</Button>
        <Text color="fg">{open ? 'Open' : 'Closed'}</Text>
      </HStack>
      <Combobox
        label="Controlled dropdown"
        onChange={onChange}
        open={open}
        options={fruitOptions}
        placeholder="Controlled state..."
        setOpen={setOpen}
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const DefaultOpen = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        defaultOpen
        label="Opens by default"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Already open..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const WithDescriptions = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        label="Select countries"
        onChange={onChange}
        options={countryOptions}
        placeholder="Search countries..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const HideSearchInput = () => {
  const [singleValue, setSingleValue] = useState<string | null>(null);
  const { value: multiValue, onChange: multiOnChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        hideSearchInput
        label="Hide search input - multi"
        onChange={multiOnChange}
        options={fruitOptions}
        placeholder="Empty value"
        type="multi"
        value={multiValue}
      />
      <Combobox
        hideSearchInput
        label="Hide search input - single"
        onChange={setSingleValue}
        options={fruitOptions}
        placeholder="Empty value"
        type="single"
        value={singleValue}
      />
    </VStack>
  );
};

export const CustomFilter = () => {
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
    <VStack gap={4}>
      <Text color="fgMuted" fontSize="caption">
        Custom filter: Only matches start of words
      </Text>
      <Combobox
        filterFunction={customFilterFunction}
        label="Custom filter logic"
        onChange={onChange}
        options={cryptoOptions}
        placeholder="Type to filter..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const CustomOnSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searching, setIsSearching] = useState(false);
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  const handleSearch = (searchText: string) => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchValue(searchText);
    }, 3000);
    setSearchText(searchText);
  };

  return (
    <VStack gap={4}>
      <Text fontSize="body">{searching ? 'Searching...' : 'Not searching'}</Text>
      <Text fontSize="body">Search value: {searchValue}</Text>
      <Combobox
        onChange={onChange}
        onSearch={handleSearch}
        options={fruitOptions}
        placeholder="Search..."
        searchText={searchText}
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const Disabled = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['apple', 'banana'],
  });

  return (
    <VStack gap={4}>
      <Combobox
        disabled
        label="Disabled combobox"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Cannot interact..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const Compact = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        compact
        label="Compact size"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Compact combobox..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const CompactSingleSelect = () => {
  const [value, setValue] = useState<string | null>('apple');

  return (
    <VStack gap={4}>
      <Combobox
        compact
        label="Compact size"
        onChange={setValue}
        options={singleFruitOptions}
        placeholder="Compact combobox..."
        type="single"
        value={value}
      />
    </VStack>
  );
};

export const HelperText = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        helperText="Select up to 5 team members for this project"
        label="Team members"
        onChange={onChange}
        options={teamOptions}
        placeholder="Search team members..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const Variants = () => {
  const { value: value1, onChange: onChange1 } = useMultiSelect({ initialValue: [] });
  const { value: value2, onChange: onChange2 } = useMultiSelect({ initialValue: [] });
  const { value: value3, onChange: onChange3 } = useMultiSelect({ initialValue: [] });
  const { value: value4, onChange: onChange4 } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        label="Default variant"
        onChange={onChange1}
        options={fruitOptions}
        placeholder="Default style..."
        type="multi"
        value={value1}
      />
      <Combobox
        label="Positive variant"
        onChange={onChange2}
        options={fruitOptions}
        placeholder="Success style..."
        type="multi"
        value={value2}
        variant="positive"
      />
      <Combobox
        label="Negative variant"
        onChange={onChange3}
        options={fruitOptions}
        placeholder="Error style..."
        type="multi"
        value={value3}
        variant="negative"
      />
      <Combobox
        label="Primary variant"
        onChange={onChange4}
        options={fruitOptions}
        placeholder="Primary style..."
        type="multi"
        value={value4}
        variant="primary"
      />
    </VStack>
  );
};

export const StartNode = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        label="With icon"
        onChange={onChange}
        options={cryptoOptions}
        placeholder="Search crypto..."
        startNode={<Icon name="search" size="s" />}
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const EndNode = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        endNode={<Icon name="filter" size="s" />}
        label="Custom end icon"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Custom icon..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const MaxSelectedDisplay = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape'],
  });

  return (
    <VStack gap={4}>
      <Combobox
        label="Limited display"
        maxSelectedOptionsToShow={3}
        onChange={onChange}
        options={fruitOptions}
        placeholder="Shows max 3 selections..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const HiddenOptionsLabel = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['us', 'ca', 'mx', 'uk', 'fr', 'de'],
  });

  return (
    <VStack gap={4}>
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
    </VStack>
  );
};

export const RemoveOptionLabel = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['apple', 'banana'],
  });

  return (
    <VStack gap={4}>
      <Combobox
        label="Custom remove label"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Custom remove label"
        removeSelectedOptionAccessibilityLabel="Delete"
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const AccessibilityLabel = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        accessibilityLabel="Custom dropdown accessibility label"
        controlAccessibilityLabel="Custom control accessibility label"
        label="Custom accessibility label"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Has accessibility label..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const SelectAll = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        label="With select all"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Can select all..."
        selectAllLabel="Select all fruits"
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const HideSelectAll = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        hideSelectAll
        label="No select all"
        onChange={onChange}
        options={fruitOptions}
        placeholder="No select all option..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const ClearAll = () => {
  const { value, onChange } = useMultiSelect({
    initialValue: ['apple', 'banana', 'cherry'],
  });

  return (
    <VStack gap={4}>
      <Combobox
        clearAllLabel="Clear selection"
        label="With clear all"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Can clear all..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const EmptyOptions = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        emptyOptionsLabel="No matching fruits found"
        label="Custom empty message"
        onChange={onChange}
        options={[]}
        placeholder="No options available..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const PersistentDropdown = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Text color="fgMuted" fontSize="caption">
        Click outside will not close dropdown
      </Text>
      <Combobox
        disableClickOutsideClose
        label="Persistent dropdown"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Stays open..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const CustomStyles = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        label="Styled combobox"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Custom styles..."
        styles={{
          root: { padding: '8px' },
          control: { borderRadius: '12px', border: '2px solid #667eea' },
          dropdown: { borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
          option: { padding: '12px' },
          optionLabel: { fontWeight: 'bold' },
        }}
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const CustomClasses = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        classNames={{
          root: 'custom-root',
          control: customControlCss,
          dropdown: customDropdownCss,
        }}
        label="Custom CSS classes"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Custom classes..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const TestIdentifier = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        label="With test ID"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Has test ID..."
        testID="fruit-combobox"
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const OptionsWithMedia = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  const optionsWithIcons: SelectOption[] = fruitOptions.slice(0, 5).map((option) => ({
    ...option,
    media: <Icon color="fgMuted" name="star" size="s" />,
  }));

  return (
    <VStack gap={4}>
      <Combobox
        label="Options with icons"
        onChange={onChange}
        options={optionsWithIcons}
        placeholder="Icons in options..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const OptionsWithAccessory = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  const optionsWithBadges: SelectOption[] = teamOptions.map((option) => ({
    ...option,
    accessory: (
      <Text color="fgMuted" fontSize="caption">
        {option.description}
      </Text>
    ),
  }));

  return (
    <VStack gap={4}>
      <Combobox
        label="Team with badges"
        onChange={onChange}
        options={optionsWithBadges}
        placeholder="Select team members..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const OptionsWithEnd = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  const optionsWithEnd: SelectOption[] = cryptoOptions.slice(0, 5).map((option) => ({
    ...option,
    end: (
      <Text color="fgMuted" fontSize="caption">
        {String(option.value).toUpperCase()}
      </Text>
    ),
  }));

  return (
    <VStack gap={4}>
      <Combobox
        label="Crypto assets"
        onChange={onChange}
        options={optionsWithEnd}
        placeholder="Select assets..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const DisabledOptions = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  const mixedOptions: SelectOption[] = fruitOptions.map((option, index) => ({
    ...option,
    disabled: index % 3 === 0,
  }));

  return (
    <VStack gap={4}>
      <Combobox
        label="Some disabled options"
        onChange={onChange}
        options={mixedOptions}
        placeholder="Some options disabled..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const LongList = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  const longOptions: SelectOption[] = Array.from({ length: 100 }, (_, i) => ({
    value: `option${i}`,
    label: `Option ${i + 1}`,
    description: `Description for option ${i + 1}`,
  }));

  return (
    <VStack gap={4}>
      <Combobox
        label="Large dataset"
        onChange={onChange}
        options={longOptions}
        placeholder="Search from 100 options..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const NoResults = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });
  const [searchText, setSearchText] = useState('xyz');

  return (
    <VStack gap={4}>
      <Combobox
        emptyOptionsLabel="No results found for your search"
        label="No matches"
        onChange={onChange}
        onSearch={setSearchText}
        options={fruitOptions}
        placeholder="Try searching..."
        searchText={searchText}
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const ValueMonitoring = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
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

export const ChangeHandler = () => {
  const [value, setValue] = useState<string[]>([]);
  const [lastChange, setLastChange] = useState<string>('');

  const handleChange = (newValue: string | string[] | null) => {
    const arrayValue = Array.isArray(newValue) ? newValue : [newValue];
    setValue(arrayValue as string[]);
    setLastChange(`Changed to: ${JSON.stringify(newValue)}`);
  };

  return (
    <VStack gap={4}>
      <Combobox
        label="Track changes"
        onChange={handleChange}
        options={fruitOptions}
        placeholder="Select to track changes..."
        type="multi"
        value={value}
      />
      <Text color="fgMuted" fontSize="caption">
        {lastChange || 'No changes yet'}
      </Text>
    </VStack>
  );
};

export const RefImperativeHandle = () => {
  const comboboxRef = useRef<ComboboxRef>(null);
  const { value, onChange } = useMultiSelect({ initialValue: [] });
  return (
    <VStack gap={4}>
      <HStack gap={2}>
        <Button onClick={() => comboboxRef.current?.setOpen?.(true)}>Open</Button>
        <Button onClick={() => comboboxRef.current?.setOpen?.(false)}>Close</Button>
        <Text color="fg">{comboboxRef.current?.open ? 'Open' : 'Closed'}</Text>
      </HStack>
      <Combobox
        ref={comboboxRef}
        onChange={onChange}
        options={fruitOptions}
        placeholder="Select fruits..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const MultipleInstances = () => {
  const fruits = useMultiSelect({ initialValue: [] });
  const countries = useMultiSelect({ initialValue: [] });
  const crypto = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
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

export const DynamicOptions = () => {
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
    <VStack gap={4}>
      <Combobox
        label="Dynamic options"
        onChange={onChange}
        options={options}
        placeholder="Options can change..."
        type="multi"
        value={value}
      />
      <Button compact onClick={addOption}>
        Add more options
      </Button>
    </VStack>
  );
};

const CustomComponent: ComboboxControlComponent = (props) => {
  return <DefaultComboboxControl {...props} searchText={`${props.value?.length ?? 0}`} />;
};

export const CustomControlComponent = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  return (
    <VStack gap={4}>
      <Combobox
        ComboboxControlComponent={CustomComponent}
        label="Custom control component - search field always shows the number of selected options"
        onChange={onChange}
        options={fruitOptions}
        placeholder="Select fruits..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const StressTest = () => {
  const { value, onChange } = useMultiSelect({ initialValue: [] });

  const hugeOptions: SelectOption[] = Array.from({ length: 1000 }, (_, i) => ({
    value: `item${i}`,
    label: `Item ${i + 1}`,
    description: `Category ${Math.floor(i / 100) + 1}`,
  }));

  return (
    <VStack gap={4}>
      <Text color="fgMuted" fontSize="caption">
        1000 options with search
      </Text>
      <Combobox
        label="Performance test"
        onChange={onChange}
        options={hugeOptions}
        placeholder="Search 1000 items..."
        type="multi"
        value={value}
      />
    </VStack>
  );
};

export const Borderless = () => {
  const [singleValue, setSingleValue] = useState<string | null>('apple');
  const { value: multiValue, onChange: multiOnChange } = useMultiSelect({
    initialValue: ['apple'],
  });

  return (
    <VStack gap={4}>
      <Combobox
        bordered={false}
        label="Borderless single select"
        onChange={setSingleValue}
        options={singleFruitOptions}
        placeholder="Search fruits..."
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
