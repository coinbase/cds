import { useState } from 'react';
import type { DimensionValue } from '@coinbase/cds-common';
import { type DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';

import { InputLabel } from '../../controls/InputLabel';
import { TextInput } from '../../controls/TextInput';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { HStack } from '../../layout';
import { VStack } from '../../layout/VStack';
import { Tooltip } from '../../overlays/tooltip/Tooltip';
import { Text } from '../../typography/Text';
import { DatePicker } from '../DatePicker';

const today = new Date(new Date(2024, 7, 18).setHours(0, 0, 0, 0));
const nextMonth15th = new Date(today.getFullYear(), today.getMonth() + 1, 15);
const lastMonth15th = new Date(today.getFullYear(), today.getMonth() - 1, 15);

const exampleProps = {
  maxDate: nextMonth15th,
  minDate: lastMonth15th,
  invalidDateError: 'Please enter a valid date',
  disabledDateError: 'Date unavailable',
  requiredError: 'This field is required',
};

const ExampleDatePicker = (props: {
  labelNode?: React.ReactNode;
  required?: boolean;
  calendarIconButtonAccessibilityLabel?: string;
  label?: string;
  accessibilityLabel?: string;
  width?: DimensionValue;
  compact?: boolean;
  labelVariant?: 'outside' | 'inside';
}) => {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  return (
    <DatePicker
      {...exampleProps}
      {...props}
      date={date}
      error={error}
      onChangeDate={setDate}
      onErrorDate={setError}
    />
  );
};

export const FullExample = () => {
  return (
    <ExampleScreen>
      <Example title="Default">
        <ExampleDatePicker
          required
          calendarIconButtonAccessibilityLabel="Birthdate calendar"
          label="Birthdate"
        />
      </Example>
      <Example title="Multiple pickers">
        <HStack gap={2}>
          <ExampleDatePicker
            calendarIconButtonAccessibilityLabel="Example 1 calendar"
            label="Example 1"
            width="auto"
          />
          <ExampleDatePicker
            calendarIconButtonAccessibilityLabel="Example 2 calendar"
            label="Example 2"
            width="auto"
          />
        </HStack>
      </Example>
      <Example title="TextInput and DatePicker (auto width)">
        <HStack gap={2}>
          <TextInput label="Example Text" placeholder="1" width="auto" />
          <ExampleDatePicker
            calendarIconButtonAccessibilityLabel="Example calendar"
            label="Example Date"
            width="auto"
          />
        </HStack>
      </Example>
      <Example title="TextInput (50% width) and DatePicker">
        <HStack gap={2}>
          <TextInput label="Example Text" placeholder="1" width="50%" />
          <ExampleDatePicker
            calendarIconButtonAccessibilityLabel="Example calendar"
            label="Example Date"
            width="auto"
          />
        </HStack>
      </Example>
      <Example title="DatePicker with labelNode">
        <ExampleDatePicker
          accessibilityLabel="Birthdate"
          calendarIconButtonAccessibilityLabel="Birthdate calendar"
          labelNode={
            <HStack alignItems="center" gap={1}>
              <InputLabel>Birthdate</InputLabel>
              <Tooltip content="This will be visible to other users.">
                <Icon color="fgMuted" name="info" size="xs" />
              </Tooltip>
            </HStack>
          }
        />
      </Example>
      <Example title="DatePicker fit-content width">
        <HStack flexWrap="wrap" gap={2}>
          <ExampleDatePicker
            calendarIconButtonAccessibilityLabel="Example calendar"
            label="Example Date"
            width="fit-content"
          />
          <ExampleDatePicker
            calendarIconButtonAccessibilityLabel="Example calendar 2"
            label="Example Date 2"
            width="fit-content"
          />
          <ExampleDatePicker
            calendarIconButtonAccessibilityLabel="Example calendar 3"
            label="Example Date 3"
            width="fit-content"
          />
        </HStack>
      </Example>
    </ExampleScreen>
  );
};

export const CustomLabel = () => {
  return (
    <ExampleScreen>
      <Example title="DatePicker with custom label">
        <VStack gap={2}>
          {/* Default with tooltip */}
          <ExampleDatePicker
            accessibilityLabel="Date of birth"
            calendarIconButtonAccessibilityLabel="Date of birth calendar"
            labelNode={
              <HStack alignItems="center" gap={1}>
                <InputLabel>Date of birth</InputLabel>
                <Tooltip content="This will be visible to other users.">
                  <Icon color="fgMuted" name="info" size="xs" />
                </Tooltip>
              </HStack>
            }
          />
          {/* Compact with required indicator */}
          <ExampleDatePicker
            compact
            accessibilityLabel="Start date"
            calendarIconButtonAccessibilityLabel="Start date calendar"
            labelNode={
              <HStack alignItems="center" gap={0.5}>
                <InputLabel>Start date</InputLabel>
                <Text color="fgNegative" font="label1">
                  *
                </Text>
              </HStack>
            }
          />
          {/* Inside variant with optional indicator */}
          <ExampleDatePicker
            accessibilityLabel="End date"
            calendarIconButtonAccessibilityLabel="End date calendar"
            labelNode={
              <HStack alignItems="center" gap={1}>
                <InputLabel paddingY={0}>End date</InputLabel>
                <Text color="fgMuted" font="legal">
                  (optional)
                </Text>
              </HStack>
            }
            labelVariant="inside"
          />
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default FullExample;
