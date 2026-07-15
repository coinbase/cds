import { useState } from 'react';
import { type DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { DatePicker, type DatePickerProps } from '../DatePicker';

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
    <ExampleScreen>
      <Example title="Default (renders as size=l)">
        <ExampleDatePicker label="Default" openCalendarAccessibilityLabel="Default calendar" />
      </Example>
      <Example title="Deprecated compact (renders as size=s)">
        <ExampleDatePicker
          compact
          label="Compact"
          openCalendarAccessibilityLabel="Compact calendar"
        />
      </Example>
      <Example title="size=s">
        <ExampleDatePicker label="Small" openCalendarAccessibilityLabel="Small calendar" size="s" />
      </Example>
      <Example title="size=m">
        <ExampleDatePicker
          label="Medium"
          openCalendarAccessibilityLabel="Medium calendar"
          size="m"
        />
      </Example>
      <Example title="size=l (default)">
        <ExampleDatePicker label="Large" openCalendarAccessibilityLabel="Large calendar" size="l" />
      </Example>
      <Example title="compact + size=m (size wins, renders as m)">
        <ExampleDatePicker
          compact
          label="Size wins"
          openCalendarAccessibilityLabel="Size wins calendar"
          size="m"
        />
      </Example>
    </ExampleScreen>
  );
};
