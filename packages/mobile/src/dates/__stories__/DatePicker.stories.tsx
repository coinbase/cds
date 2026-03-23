import { useState } from 'react';
import { type DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';

import { InputLabel } from '../../controls/InputLabel';
import { TextInput } from '../../controls/TextInput';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { HStack } from '../../layout';
import { VStack } from '../../layout/VStack';
import { Tooltip } from '../../overlays/tooltip/Tooltip';
import { Text } from '../../typography/Text';
import { DatePicker, type DatePickerProps } from '../DatePicker';

const today = new Date(new Date().setHours(0, 0, 0, 0));
const nextMonth15th = new Date(today.getFullYear(), today.getMonth() + 1, 15);
const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

const exampleProps = {
  invalidDateError: 'Please enter a valid date',
  disabledDateError: 'Date unavailable',
  requiredError: 'This field is required',
};

const ExampleDatePicker = ({
  date,
  ...props
}: { date?: Date | null } & Omit<
  DatePickerProps,
  'date' | 'error' | 'onChangeDate' | 'onErrorDate'
>) => {
  const [dateValue, setDateValue] = useState<Date | null>(date ?? null);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  return (
    <DatePicker
      {...exampleProps}
      {...props}
      date={dateValue}
      error={error}
      onChangeDate={setDateValue}
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
          label="Birthdate"
          openCalendarAccessibilityLabel="Birthdate calendar"
        />
      </Example>
      <Example title="Multiple pickers">
        <HStack gap={2}>
          <ExampleDatePicker
            label="Example 1"
            openCalendarAccessibilityLabel="Example 1 calendar"
            width="auto"
          />
          <ExampleDatePicker
            label="Example 2"
            openCalendarAccessibilityLabel="Example 2 calendar"
            width="auto"
          />
        </HStack>
      </Example>
      <Example title="TextInput and DatePicker (auto width)">
        <HStack gap={2}>
          <TextInput label="Example Text" placeholder="1" width="auto" />
          <ExampleDatePicker
            label="Example Date"
            openCalendarAccessibilityLabel="Example calendar"
            width="auto"
          />
        </HStack>
      </Example>
      <Example title="TextInput (50% width) and DatePicker">
        <HStack gap={2}>
          <TextInput label="Example Text" placeholder="1" width="50%" />
          <ExampleDatePicker
            label="Example Date"
            openCalendarAccessibilityLabel="Example calendar"
            width="auto"
          />
        </HStack>
      </Example>
      <Example title="DatePicker with labelNode">
        <ExampleDatePicker
          accessibilityLabel="Birthdate"
          labelNode={
            <HStack alignItems="center">
              <InputLabel>Birthdate</InputLabel>
              <Tooltip content="This will be visible to other users.">
                <Icon active color="fg" name="info" padding={0.75} size="xs" />
              </Tooltip>
            </HStack>
          }
          openCalendarAccessibilityLabel="Birthdate calendar"
        />
      </Example>
      <Example title="DatePicker fit-content width">
        <HStack flexWrap="wrap" gap={2}>
          <ExampleDatePicker
            label="Example Date"
            openCalendarAccessibilityLabel="Example calendar"
            width="fit-content"
          />
          <ExampleDatePicker
            label="Example Date 2"
            openCalendarAccessibilityLabel="Example calendar 2"
            width="fit-content"
          />
          <ExampleDatePicker
            label="Example Date 3"
            openCalendarAccessibilityLabel="Example calendar 3"
            width="fit-content"
          />
        </HStack>
      </Example>
      <Example title="DatePicker with seed date (next month)">
        <ExampleDatePicker
          label="Event date"
          openCalendarAccessibilityLabel="Seed date calendar"
          seedDate={nextMonth15th}
        />
      </Example>
      <Example title="DatePicker with pre-selected date (next month)">
        <ExampleDatePicker
          date={nextMonth15th}
          label="Event date"
          openCalendarAccessibilityLabel="Seed date calendar"
        />
      </Example>
      <Example title="DatePicker with minimum date of tomorrow">
        <ExampleDatePicker
          disabledDateError="Future dates only"
          invalidDateError="Future dates only"
          label="Future date"
          minDate={tomorrow}
        />
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
            labelNode={
              <HStack alignItems="center">
                <InputLabel>Date of birth</InputLabel>
                <Tooltip content="This will be visible to other users.">
                  <Icon active color="fg" name="info" padding={0.75} size="xs" />
                </Tooltip>
              </HStack>
            }
            openCalendarAccessibilityLabel="Date of birth calendar"
          />
          {/* Compact with required indicator */}
          <ExampleDatePicker
            compact
            accessibilityLabel="Start date"
            labelNode={
              <HStack alignItems="center" gap={0.5}>
                <InputLabel>Start date</InputLabel>
                <Text color="fgNegative" font="label1">
                  *
                </Text>
              </HStack>
            }
            openCalendarAccessibilityLabel="Start date calendar"
          />
          {/* Inside variant with optional indicator */}
          <ExampleDatePicker
            accessibilityLabel="End date"
            labelNode={
              <HStack alignItems="center" gap={1}>
                <InputLabel paddingY={0}>End date</InputLabel>
                <Text color="fgMuted" font="legal">
                  (optional)
                </Text>
              </HStack>
            }
            labelVariant="inside"
            openCalendarAccessibilityLabel="End date calendar"
          />
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default FullExample;
