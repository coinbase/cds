import { useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import type { DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { gutter } from '@coinbase/cds-common/tokens/sizing';

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
import { Example, ExampleScreen } from '../examples/ExampleScreen';
import { useTheme } from '../hooks/useTheme';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';

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

/** Spacing token used for the gap between every composed control. */
const compositionGap = 1;

/**
 * Minimum controls per wrapped row, so each row always pairs at least two
 * controls and their natural heights can be compared against each other.
 */
const controlsPerRow = 2;

/**
 * Derives control widths from the live screen width minus the horizontal
 * padding `ExampleScreen` applies, so fixed-width controls always wrap into
 * rows of `controlsPerRow` instead of overflowing narrow devices.
 */
const useCompositionWidths = () => {
  const { width: screenWidth } = useWindowDimensions();
  const theme = useTheme();

  return useMemo(() => {
    const contentWidth = screenWidth - theme.space[gutter] * 2;
    const totalGap = theme.space[compositionGap] * (controlsPerRow - 1);

    return {
      contentWidth,
      controlWidth: Math.floor((contentWidth - totalGap) / controlsPerRow),
    };
  }, [screenWidth, theme]);
};

const InputRow = ({ size }: { size?: TextInputSize }) => {
  const { controlWidth } = useCompositionWidths();
  const [selectValue, setSelectValue] = useState<string | null>('1');
  const [comboboxValue, setComboboxValue] = useState<string | null>('1');
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [pickerDate, setPickerDate] = useState<Date | null>(null);
  const [pickerError, setPickerError] = useState<DateInputValidationError | null>(null);

  const selectStyle = useMemo(() => ({ width: controlWidth }), [controlWidth]);

  return (
    <HStack alignItems="flex-end" flexWrap="wrap" gap={compositionGap}>
      <Select
        label="Select"
        onChange={setSelectValue}
        options={selectOptions}
        placeholder="Choose"
        size={size}
        style={selectStyle}
        value={selectValue}
      />
      <Combobox
        label="Combobox"
        onChange={setComboboxValue}
        options={selectOptions}
        placeholder="Search"
        size={size}
        style={selectStyle}
        type="single"
        value={comboboxValue}
      />
      <TextInput
        label="Text"
        onChangeText={setText}
        placeholder="Name"
        size={size}
        value={text}
        width={controlWidth}
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
        width={controlWidth}
      />
      <SearchInput
        accessibilityLabel="Search"
        onChangeText={setSearch}
        onClear={() => setSearch('')}
        placeholder="Search"
        size={size}
        value={search}
        width={controlWidth}
      />
    </HStack>
  );
};

const ChipMixRow = ({ chipSize, controlSize }: { chipSize: ChipSize; controlSize: 'xs' | 's' }) => {
  const { contentWidth, controlWidth } = useCompositionWidths();
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabbedChipTabs[0]);
  const [chipSelectValue, setChipSelectValue] = useState<string | null>('usd');
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const includeTextInputs = chipSize === 's';

  return (
    <VStack gap={compositionGap}>
      {/*
       * TabbedChips wraps a horizontal ScrollView, which has no intrinsic height
       * as a flex-row child, so it gets its own full-width row rather than
       * sitting inside the wrapping HStack below.
       */}
      <TabbedChips
        activeTab={activeTab}
        onChange={setActiveTab}
        size={chipSize}
        tabs={tabbedChipTabs}
        width={contentWidth}
      />
      <HStack alignItems="center" flexWrap="wrap" gap={compositionGap}>
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
              width={controlWidth}
            />
            <SearchInput
              accessibilityLabel="Search"
              onChangeText={setSearch}
              onClear={() => setSearch('')}
              placeholder="Search"
              size="s"
              value={search}
              width={controlWidth}
            />
          </>
        )}
      </HStack>
    </VStack>
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
