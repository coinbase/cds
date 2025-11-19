import { useState } from 'react';
import type { DimensionValue } from '@coinbase/cds-common';
import { type DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';

import { TextInput } from '../../controls/TextInput';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
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
  required?: boolean;
  calendarIconButtonAccessibilityLabel?: string;
  label?: string;
  width?: DimensionValue;
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

export default FullExample;
