import React, { useState } from 'react';
import { type DateInputValidationError } from '@cbhq/cds-common/dates/DateInputValidationError';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
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

export const FullExample = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  return (
    <ExampleScreen>
      <Example>
        <DatePicker
          required
          {...exampleProps}
          calendarIconButtonAccessibilityLabel="Birthdate calendar"
          date={date}
          error={error}
          label="Birthdate"
          onChangeDate={setDate}
          onErrorDate={setError}
        />
      </Example>
    </ExampleScreen>
  );
};

export default FullExample;
