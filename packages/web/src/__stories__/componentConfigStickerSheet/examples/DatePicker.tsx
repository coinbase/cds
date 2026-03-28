import { memo, useState } from 'react';
import { type DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';
import { DatePicker } from '@coinbase/cds-web/dates/DatePicker';
import { VStack } from '@coinbase/cds-web/layout/VStack';

export const DatePickerExample = memo(() => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [dateError, setDateError] = useState<DateInputValidationError | null>(null);
  return (
    <VStack style={{ gap: 16 }} width="100%">
      <DatePicker
        compact
        closeCalendarAccessibilityLabel="Close calendar"
        date={date}
        error={dateError}
        label="Birthdate"
        nextArrowAccessibilityLabel="Next month"
        onChangeDate={setDate}
        onErrorDate={setDateError}
        openCalendarAccessibilityLabel="Open calendar"
        previousArrowAccessibilityLabel="Previous month"
      />
      <DatePicker
        closeCalendarAccessibilityLabel="Close calendar"
        date={date}
        error={dateError}
        label="Birthdate"
        labelVariant="inside"
        nextArrowAccessibilityLabel="Next month"
        onChangeDate={setDate}
        onErrorDate={setDateError}
        openCalendarAccessibilityLabel="Open calendar"
        previousArrowAccessibilityLabel="Previous month"
      />
      <DatePicker
        closeCalendarAccessibilityLabel="Close calendar"
        date={date}
        error={dateError}
        label="Birthdate"
        nextArrowAccessibilityLabel="Next month"
        onChangeDate={setDate}
        onErrorDate={setDateError}
        openCalendarAccessibilityLabel="Open calendar"
        previousArrowAccessibilityLabel="Previous month"
      />
    </VStack>
  );
});
