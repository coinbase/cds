import { useState } from 'react';
import { type DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';

import { VStack } from '../../layout/VStack';
import { DatePicker, type DatePickerProps } from '../DatePicker';

import { Note } from './Note';

export default {
  title: 'Components/Dates/DatePickerSize',
  component: DatePicker,
};

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

export const Sizes = () => {
  return (
    <VStack gap={8}>
      <VStack gap={2}>
        <Note>Default (renders as size=l)</Note>
        <ExampleDatePicker label="Default" />
      </VStack>
      <VStack gap={2}>
        <Note>Deprecated compact (renders as size=s)</Note>
        <ExampleDatePicker compact label="Compact" />
      </VStack>
      <VStack gap={2}>
        <Note>size=s</Note>
        <ExampleDatePicker label="Small" size="s" />
      </VStack>
      <VStack gap={2}>
        <Note>size=m</Note>
        <ExampleDatePicker label="Medium" size="m" />
      </VStack>
      <VStack gap={2}>
        <Note>size=l (default)</Note>
        <ExampleDatePicker label="Large" size="l" />
      </VStack>
      <VStack gap={2}>
        <Note>compact + size=m (size wins, renders as m)</Note>
        <ExampleDatePicker compact label="Size wins" size="m" />
      </VStack>
    </VStack>
  );
};
