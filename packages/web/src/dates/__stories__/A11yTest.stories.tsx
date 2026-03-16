import React, { useState } from 'react';
import { DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';

import { Box } from '../../layout/Box';
import { Group } from '../../layout/Group';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { Calendar } from '../Calendar';
import { DateInput } from '../DateInput';
import { DatePicker } from '../DatePicker';

export default {
  title: 'Components/Dates/A11yTest',
  component: Calendar,
  parameters: {
    a11y: {
      options: {
        rules: {
          'color-contrast': { enabled: false },
          'aria-required-children': { enabled: false },
        },
      },
    },
  },
};

const today = new Date(new Date(2024, 7, 18).setHours(0, 0, 0, 0));
const twoDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
const oneWeekLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
const nextMonth15th = new Date(today.getFullYear(), today.getMonth() + 1, 15);
const lastMonth15th = new Date(today.getFullYear(), today.getMonth() - 1, 15);

const dateInputSharedProps = {
  invalidDateError: 'Please enter a valid date',
  disabledDateError: 'Date unavailable',
  requiredError: 'This field is required',
  label: 'Birthdate',
  calendarIconButtonAccessibilityLabel: 'Birthdate calendar',
  helperTextErrorIconAccessibilityLabel: 'Error',
};

const calendarSharedProps = {
  disabledDateError: 'Date unavailable',
  maxDate: nextMonth15th,
  minDate: lastMonth15th,
  disabledDates: [[oneWeekAgo, twoDaysAgo] as [Date, Date], oneWeekLater],
  highlightedDates: [[oneWeekAgo, twoDaysAgo] as [Date, Date], oneWeekLater],
  nextArrowAccessibilityLabel: 'Next month',
  previousArrowAccessibilityLabel: 'Previous month',
};

const datePickerSharedProps = {
  label: 'Birthdate',
  calendarIconButtonAccessibilityLabel: 'Birthdate calendar',
  helperTextErrorIconAccessibilityLabel: 'Error',
  nextArrowAccessibilityLabel: 'Next month',
  previousArrowAccessibilityLabel: 'Previous month',
  invalidDateError: 'Please enter a valid date',
  disabledDateError: 'Date unavailable',
  requiredError: 'This field is required',
};

export const A11yTest = () => {
  const [date, setDate] = useState<Date | null>(today);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const [error2, setError2] = useState<DateInputValidationError | null>(
    new DateInputValidationError('custom', 'This is a custom error'),
  );
  const stateProps = { date, onChangeDate: setDate, error, onErrorDate: setError };
  return (
    <>
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <Group background="bg" gap={8} margin={-2} padding={2}>
          <Text font="title1">DateInput</Text>
          <DateInput {...dateInputSharedProps} {...stateProps} />
          <DateInput disabled {...dateInputSharedProps} {...stateProps} />
          <DateInput
            {...dateInputSharedProps}
            {...stateProps}
            error={error2}
            onErrorDate={setError2}
          />
          <Text font="title1">Calendar</Text>
          <Calendar selectedDate={date} {...calendarSharedProps} />
          <Calendar disabled selectedDate={date} {...calendarSharedProps} />
          <Text font="title1">DatePicker</Text>
          <DatePicker {...datePickerSharedProps} {...stateProps} />
          <DatePicker disabled {...datePickerSharedProps} {...stateProps} />
          <DatePicker
            disabled
            {...datePickerSharedProps}
            {...stateProps}
            error={error2}
            onErrorDate={setError2}
          />
          <DatePicker defaultOpen {...datePickerSharedProps} {...stateProps} />
        </Group>
      </ThemeProvider>
      <Box paddingTop={8} />
      <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <Group background="bg" gap={8} margin={-2} padding={2}>
          <Text font="title1">DateInput</Text>
          <DateInput {...dateInputSharedProps} {...stateProps} />
          <DateInput disabled {...dateInputSharedProps} {...stateProps} />
          <DateInput
            {...dateInputSharedProps}
            {...stateProps}
            error={error2}
            onErrorDate={setError2}
          />
          <Text font="title1">Calendar</Text>
          <Calendar selectedDate={date} {...calendarSharedProps} />
          <Calendar disabled selectedDate={date} {...calendarSharedProps} />
          <Text font="title1">DatePicker</Text>
          <DatePicker {...datePickerSharedProps} {...stateProps} />
          <DatePicker disabled {...datePickerSharedProps} {...stateProps} />
          <DatePicker
            disabled
            {...datePickerSharedProps}
            {...stateProps}
            error={error2}
            onErrorDate={setError2}
          />
          <DatePicker defaultOpen {...datePickerSharedProps} {...stateProps} />
        </Group>
      </ThemeProvider>
    </>
  );
};
