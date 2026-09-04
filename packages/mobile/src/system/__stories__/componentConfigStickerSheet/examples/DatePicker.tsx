import React, { memo, useState } from 'react';
import type { DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';

import { DatePicker } from '../../../../dates/DatePicker';

export const DatePickerExample = memo(() => {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<DateInputValidationError | null>(null);

  return (
    <DatePicker
      date={date}
      error={error}
      label="Date"
      onChangeDate={setDate}
      onErrorDate={setError}
      openCalendarAccessibilityLabel="Date calendar"
    />
  );
});
