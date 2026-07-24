import { useState } from 'react';
import type { DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import { Select } from '../alpha/select/Select';
import { SelectChip } from '../alpha/select-chip/SelectChip';
import { TabbedChips } from '../alpha/tabbed-chips/TabbedChips';
import { Button } from '../buttons/Button';
import { IconButton } from '../buttons/IconButton';
import type { ChipSize } from '../chips/ChipProps';
import { InputChip } from '../chips/InputChip';
import { SearchInput } from '../controls/SearchInput';
import { TextInput, type TextInputSize } from '../controls/TextInput';
import { DatePicker } from '../dates/DatePicker';
import { Example, ExampleScreen } from '../examples/ExampleScreen';
import { HStack } from '../layout/HStack';

const dateSharedProps = {
  invalidDateError: 'Please enter a valid date',
  disabledDateError: 'Date unavailable',
  requiredError: 'This field is required',
};

const selectOptions = [
  { value: '1', label: 'Apple' },
  { value: '2', label: 'Banana' },
  { value: '3', label: 'Cherry' },
];

const chipSelectOptions = [
  { value: 'usd', label: 'USD' },
  { value: 'eur', label: 'EUR' },
  { value: 'btc', label: 'BTC' },
];

const tabbedChipTabs = sampleTabs.slice(0, 4);

const InputRow = ({ size }: { size?: TextInputSize }) => {
  const [selectValue, setSelectValue] = useState<string | null>('1');
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [pickerDate, setPickerDate] = useState<Date | null>(null);
  const [pickerError, setPickerError] = useState<DateInputValidationError | null>(null);

  return (
    <HStack alignItems="flex-end" flexWrap="wrap" gap={2}>
      <Select
        label="Select"
        onChange={setSelectValue}
        options={selectOptions}
        placeholder="Choose"
        size={size}
        style={{ width: 140 }}
        value={selectValue}
      />
      <TextInput
        label="Text"
        onChangeText={setText}
        placeholder="Name"
        size={size}
        value={text}
        width={140}
      />
      <DatePicker
        {...dateSharedProps}
        date={pickerDate}
        error={pickerError}
        helperText=""
        label="Date"
        onChangeDate={setPickerDate}
        onErrorDate={setPickerError}
        openCalendarAccessibilityLabel="Open date picker calendar"
        size={size}
        width={140}
      />
      <SearchInput
        accessibilityLabel="Search"
        onChangeText={setSearch}
        onClear={() => setSearch('')}
        placeholder="Search"
        size={size}
        value={search}
        width={140}
      />
    </HStack>
  );
};

const ChipMixRow = ({ chipSize, controlSize }: { chipSize: ChipSize; controlSize: 'xs' | 's' }) => {
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabbedChipTabs[0]);
  const [chipSelectValue, setChipSelectValue] = useState<string | null>('usd');
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const includeTextInputs = chipSize === 's';

  return (
    <HStack alignItems="center" flexWrap="wrap" gap={2}>
      <TabbedChips
        activeTab={activeTab}
        onChange={setActiveTab}
        size={chipSize}
        tabs={tabbedChipTabs}
        width={280}
      />
      <InputChip onPress={() => {}} size={chipSize}>
        USD
      </InputChip>
      <SelectChip
        onChange={setChipSelectValue}
        options={chipSelectOptions}
        placeholder="Asset"
        size={chipSize}
        value={chipSelectValue}
      />
      <Button size={controlSize}>Action</Button>
      <IconButton accessibilityLabel="Settings" name="gear" size={controlSize} />
      {includeTextInputs && (
        <>
          <TextInput
            accessibilityLabel="Filter"
            onChangeText={setText}
            placeholder="Filter"
            size="s"
            value={text}
            width={120}
          />
          <SearchInput
            accessibilityLabel="Search"
            onChangeText={setSearch}
            onClear={() => setSearch('')}
            placeholder="Search"
            size="s"
            value={search}
            width={120}
          />
        </>
      )}
    </HStack>
  );
};

/**
 * Side-by-side composition of sized controls to verify natural height alignment in a row.
 */
const SizeCompositionScreen = () => (
  <ExampleScreen>
    <Example title='Inputs — size="s"'>
      <InputRow size="s" />
    </Example>
    <Example title='Inputs — size="m"'>
      <InputRow size="m" />
    </Example>
    <Example title="Inputs — default (size l)">
      <InputRow />
    </Example>
    <Example title='Chips + small controls — size="s"'>
      <ChipMixRow chipSize="s" controlSize="s" />
    </Example>
    <Example title='Chips + small controls — size="xs"'>
      <ChipMixRow chipSize="xs" controlSize="xs" />
    </Example>
  </ExampleScreen>
);

export default SizeCompositionScreen;
