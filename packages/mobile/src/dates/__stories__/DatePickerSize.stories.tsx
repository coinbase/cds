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

/**
 * One-off t-shirt size stories for DatePicker (s/m/l).
 * Do not fold these into DatePicker.stories.tsx — keeps visual review of sizing isolated.
 */
const DatePickerSizeScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default (resolves to size l)">
        <ExampleDatePicker label="Default" openCalendarAccessibilityLabel="Default calendar" />
      </Example>
      <Example title="Deprecated compact (renders as size s)">
        <ExampleDatePicker
          compact
          label="Compact"
          openCalendarAccessibilityLabel="Compact calendar"
        />
      </Example>
      <Example title='size="s"'>
        <ExampleDatePicker label="Small" openCalendarAccessibilityLabel="Small calendar" size="s" />
      </Example>
      <Example title='size="m"'>
        <ExampleDatePicker
          label="Medium"
          openCalendarAccessibilityLabel="Medium calendar"
          size="m"
        />
      </Example>
      <Example title='size="l"'>
        <ExampleDatePicker label="Large" openCalendarAccessibilityLabel="Large calendar" size="l" />
      </Example>
      <Example title='compact + size="m" (size wins)'>
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

export default DatePickerSizeScreen;
