import React, { useState } from 'react';
import type { DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import { Combobox } from '../alpha/combobox/Combobox';
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
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

export default {
  title: 'SizeComposition',
  component: TextInput,
};

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
  const [comboboxValue, setComboboxValue] = useState<string | null>('1');
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
        style={{ width: 160 }}
        value={selectValue}
      />
      <Combobox
        label="Combobox"
        onChange={setComboboxValue}
        options={selectOptions}
        placeholder="Search"
        size={size}
        style={{ width: 160 }}
        value={comboboxValue}
      />
      <TextInput
        label="Text"
        onChange={(e) => setText(e.target.value)}
        placeholder="Name"
        size={size}
        value={text}
        width={160}
      />
      <DatePicker
        {...dateSharedProps}
        date={pickerDate}
        error={pickerError}
        helperText=""
        label="Date"
        onChangeDate={setPickerDate}
        onErrorDate={setPickerError}
        size={size}
        width={160}
      />
      <SearchInput
        accessibilityLabel="Search"
        onChangeText={setSearch}
        onClear={() => setSearch('')}
        placeholder="Search"
        size={size}
        value={search}
        width={160}
      />
    </HStack>
  );
};

const ChipMixRow = ({
  chipSize,
  controlSize,
}: {
  chipSize: ChipSize;
  /** Matching small control size to mix alongside chips */
  controlSize: 'xs' | 's';
}) => {
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
      <InputChip onClick={() => {}} size={chipSize}>
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
            onChange={(e) => setText(e.target.value)}
            placeholder="Filter"
            size="s"
            value={text}
            width={140}
          />
          <SearchInput
            accessibilityLabel="Search"
            onChangeText={setSearch}
            onClear={() => setSearch('')}
            placeholder="Search"
            size="s"
            value={search}
            width={140}
          />
        </>
      )}
    </HStack>
  );
};

/**
 * Side-by-side composition of sized controls to verify natural height alignment in a row.
 */
export const SizeComposition = () => (
  <VStack gap={5}>
    <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        Inputs — size=&quot;s&quot;
      </Text>
      <InputRow size="s" />
    </VStack>
    <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        Inputs — size=&quot;m&quot;
      </Text>
      <InputRow size="m" />
    </VStack>
    <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        Inputs — default (size l)
      </Text>
      <InputRow />
    </VStack>
    <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        Chips + small controls — size=&quot;s&quot;
      </Text>
      <ChipMixRow chipSize="s" controlSize="s" />
    </VStack>
    <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        Chips + small controls — size=&quot;xs&quot;
      </Text>
      <ChipMixRow chipSize="xs" controlSize="xs" />
    </VStack>
  </VStack>
);

SizeComposition.parameters = { a11y: { disable: true } };
