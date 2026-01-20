import { useCallback, useState } from 'react';
import { DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';
import { LocaleProvider } from '@coinbase/cds-common/system/LocaleProvider';

import { InputLabel } from '../../controls/InputLabel';
import { TextInput } from '../../controls/TextInput';
import { Icon } from '../../icons';
import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Tooltip } from '../../overlays/tooltip/Tooltip';
import { ThemeProvider } from '../../system';
import { defaultTheme } from '../../themes/defaultTheme';
import { DatePicker } from '../DatePicker';

import { Note } from './Note';

export default {
  title: 'Components/Dates/DatePicker',
  component: DatePicker,
};

const today = new Date();
const twoDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
const fourDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4);
const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
const fourDaysLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4);
const oneWeekLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
const nextMonth15th = new Date(today.getFullYear(), today.getMonth() + 1, 15);
const lastMonth15th = new Date(today.getFullYear(), today.getMonth() - 1, 15);

const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const lastDayThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

const exampleProps = {
  maxDate: nextMonth15th,
  minDate: lastMonth15th,
  invalidDateError: 'Please enter a valid date',
  disabledDateError: 'Date unavailable',
  requiredError: 'This field is required',
};

export const Examples = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const props = { date, onChangeDate: setDate, error, onErrorDate: setError };
  return (
    <VStack gap={8}>
      <VStack>
        <Note>DatePicker</Note>
        <DatePicker helperText="" {...exampleProps} {...props} />
      </VStack>
      <VStack>
        <Note>DatePicker ES-es locale</Note>
        <LocaleProvider locale="ES-es">
          <DatePicker {...exampleProps} {...props} />
        </LocaleProvider>
      </VStack>
      <VStack>
        <Note>DatePicker dark mode</Note>
        <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
          <DatePicker {...exampleProps} {...props} />
        </ThemeProvider>
      </VStack>
      <VStack>
        <Note>DatePicker compact</Note>
        <DatePicker compact {...exampleProps} {...props} />
      </VStack>
      <VStack>
        <Note>DatePicker with labelNode</Note>
        <DatePicker
          {...exampleProps}
          {...props}
          accessibilityLabel="Date of birth"
          labelNode={
            <InputLabel>
              <HStack alignItems="center" gap={1}>
                Date of birth
                <Tooltip content="This will be visible to other users.">
                  <Icon active color="fg" name="info" size="xs" tabIndex={0} />
                </Tooltip>
              </HStack>
            </InputLabel>
          }
        />
      </VStack>
      <VStack>
        <Note>DatePicker and TextInput (auto width)</Note>
        <HStack gap={2}>
          <TextInput placeholder="1" />
          <DatePicker {...exampleProps} {...props} />
        </HStack>
      </VStack>
      <VStack>
        <Note>DatePicker and TextInput (30% width)</Note>
        <HStack gap={2}>
          <TextInput placeholder="1" width="30%" />
          <DatePicker {...exampleProps} {...props} />
        </HStack>
      </VStack>
      <Box height={100} />
    </VStack>
  );
};

Examples.parameters = { a11y: { disable: true } };

export const AccessibilityLabels = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const props = { date, onChangeDate: setDate, error, onErrorDate: setError };
  return (
    <VStack gap={8}>
      <VStack>
        <Note>
          DatePicker with all props (except disabled)
          <br />
          <br />
          minDate is {lastMonth15th.toLocaleDateString()}
          <br />
          maxDate is {nextMonth15th.toLocaleDateString()}
        </Note>
        <DatePicker
          required
          {...exampleProps}
          {...props}
          calendarIconButtonAccessibilityLabel="Birthdate calendar"
          disabledDates={[[oneWeekAgo, twoDaysAgo], today, oneWeekLater]}
          highlightedDates={[
            [fourDaysAgo, twoDaysAgo],
            [fourDaysLater, oneWeekLater],
          ]}
          label="Birthdate"
          nextArrowAccessibilityLabel="Next month"
          previousArrowAccessibilityLabel="Previous month"
        />
      </VStack>
      <VStack>
        <Note>
          DatePicker with all props (except disabled)
          <br />
          <br />
          minDate is {firstDayThisMonth.toLocaleDateString()}
          <br />
          maxDate is {lastDayThisMonth.toLocaleDateString()}
        </Note>
        <DatePicker
          required
          {...exampleProps}
          {...props}
          calendarIconButtonAccessibilityLabel="Birthdate calendar"
          disabledDates={[[oneWeekAgo, twoDaysAgo], today, oneWeekLater]}
          highlightedDates={[
            [fourDaysAgo, twoDaysAgo],
            [fourDaysLater, oneWeekLater],
          ]}
          label="Birthdate"
          maxDate={lastDayThisMonth}
          minDate={firstDayThisMonth}
          nextArrowAccessibilityLabel="Next month"
          previousArrowAccessibilityLabel="Previous month"
        />
      </VStack>
    </VStack>
  );
};

export const MultiplePickers = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startError, setStartError] = useState<DateInputValidationError | null>(null);
  const [endError, setEndError] = useState<DateInputValidationError | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<DateInputValidationError | null>(null);

  const handleStartDate = useCallback((date: Date | null) => {
    const suggestedEndDate = date
      ? new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5)
      : null;
    setStartDate(date);
    setEndDate(suggestedEndDate);
  }, []);

  const props = { date, onChangeDate: setDate, error, onErrorDate: setError };

  return (
    <VStack gap={8}>
      <VStack>
        <Note>
          When a value is selected on the first DatePicker we suggest a value for the second
          DatePicker accordingly.
          <br />
          <br />
          We use both DatePicker values to highlight a range of dates.
        </Note>
        <HStack gap={2}>
          <DatePicker
            {...exampleProps}
            date={startDate}
            error={startError}
            highlightedDates={startDate && endDate ? [[startDate, endDate]] : undefined}
            label="Start date"
            onChangeDate={handleStartDate}
            onErrorDate={setStartError}
          />
          <DatePicker
            {...exampleProps}
            date={endDate}
            disabledDates={startDate ? [startDate] : undefined}
            error={endError}
            highlightedDates={startDate && endDate ? [[startDate, endDate]] : undefined}
            label="End date"
            onChangeDate={setEndDate}
            onErrorDate={setEndError}
          />
        </HStack>
      </VStack>
      <VStack>
        <VStack>
          <Note>DatePicker fit-content</Note>
          <HStack flexWrap="wrap" gap={2}>
            <DatePicker width="fit-content" {...exampleProps} {...props} />
            <DatePicker width="fit-content" {...exampleProps} {...props} />
            <DatePicker width="fit-content" {...exampleProps} {...props} />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

MultiplePickers.parameters = { a11y: { disable: true } };

export const CustomErrors = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startError, setStartError] = useState<DateInputValidationError | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [endError, setEndError] = useState<DateInputValidationError | null>(null);

  const today = new Date(new Date(2024, 7, 18).setHours(0, 0, 0, 0));
  const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const seventhDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 7);
  const lastDayThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const disabledDates: [Date, Date][] = [[firstDayThisMonth, seventhDayThisMonth]];

  const updateEndDate = (endDate: Date | null, startDate: Date) => {
    setEndDate(endDate);
    setEndError(null);
    if (!endDate) return;
    // The time from startDate to endDate must be at least 5 days and less than 14 days
    const endDateMin = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 4,
    );
    const endDateMax = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 13,
    );

    let errorMessage: string | undefined;
    if (endDate < startDate) errorMessage = 'Must come after start date';
    else if (endDate < endDateMin) errorMessage = 'Must select at least 5 days';
    else if (endDate > endDateMax) errorMessage = 'Cannot select more than 14 days';

    if (errorMessage) setEndError(new DateInputValidationError('custom', errorMessage));
  };

  const handleChangeDateStart = (date: Date | null) => {
    setStartDate(date);
    if (!date) return;
    // Suggest an end date based on the new start date
    const suggestedEndDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
    const newEndDate = new Date(Math.min(suggestedEndDate.getTime(), lastDayThisMonth.getTime()));
    updateEndDate(newEndDate, date);
  };

  const handleChangeDateEnd = (date: Date | null) => {
    if (startDate) updateEndDate(date, startDate);
  };

  return (
    <>
      <Note>
        This is a complex example using many different props. We use multiple DatePickers together
        to allow a user to select a date range.
        <br />
        <br />
        We enforce that the time between the start date and end date must be at least 5 days but
        less than 14 days long, that the end date comes after the start date, and that all days are
        within the current month. We use the `onChange` prop to automatically suggest an end date of
        1 week after the start date, or the last of the month - whichever is sooner. We also
        explicitly disable 1 week at the beginning of the month.
      </Note>
      <HStack gap={2}>
        <DatePicker
          required
          date={startDate}
          disabledDateError="Date unavailable"
          disabledDates={disabledDates}
          error={startError}
          highlightedDates={startDate && endDate ? [[startDate, endDate]] : undefined}
          invalidDateError="Please enter a valid date"
          label="Start date"
          maxDate={lastDayThisMonth}
          minDate={firstDayThisMonth}
          onChangeDate={handleChangeDateStart}
          onErrorDate={setStartError}
          requiredError="This field is required"
        />
        <DatePicker
          required
          date={endDate}
          disabled={!startDate}
          disabledDateError="Date unavailable"
          disabledDates={startDate ? [...disabledDates, startDate] : disabledDates}
          error={endError}
          highlightedDates={
            startDate && endDate && startDate < endDate
              ? [[startDate, endDate]]
              : startDate
                ? [startDate]
                : undefined
          }
          invalidDateError="Please enter a valid date"
          label="End date"
          maxDate={lastDayThisMonth}
          minDate={firstDayThisMonth}
          onChangeDate={handleChangeDateEnd}
          onErrorDate={setEndError}
          requiredError="This field is required"
          variant={endError ? 'negative' : undefined}
        />
      </HStack>
    </>
  );
};

CustomErrors.parameters = { a11y: { disable: true } };

export const CustomLabel = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const props = { date, onChangeDate: setDate, error, onErrorDate: setError };
  return (
    <VStack gap={2}>
      {/* Default with tooltip */}
      <DatePicker
        {...exampleProps}
        {...props}
        accessibilityLabel="Date of birth"
        id="dob-tooltip"
        labelNode={
          <InputLabel htmlFor="dob-tooltip">
            <HStack alignItems="center" gap={1}>
              Date of birth
              <Tooltip content="This will be visible to other users.">
                <Icon active color="fg" name="info" size="xs" tabIndex={0} />
              </Tooltip>
            </HStack>
          </InputLabel>
        }
      />
      {/* Compact with required indicator */}
      <DatePicker
        compact
        {...exampleProps}
        {...props}
        accessibilityLabel="Start date"
        labelNode={
          <InputLabel>
            <HStack alignItems="center" gap={0.5}>
              Start date
              <span style={{ color: 'var(--color-fgNegative)' }}>*</span>
            </HStack>
          </InputLabel>
        }
      />
      {/* Inside variant with optional indicator */}
      <DatePicker
        {...exampleProps}
        {...props}
        accessibilityLabel="End date"
        id="end-date-inside"
        labelNode={
          <InputLabel htmlFor="end-date-inside" paddingY={0}>
            <HStack alignItems="center" gap={1}>
              End date
              <span style={{ color: 'var(--color-fgMuted)', fontSize: 'var(--font-legal)' }}>
                (optional)
              </span>
            </HStack>
          </InputLabel>
        }
        labelVariant="inside"
      />
      <Box height={300} />
    </VStack>
  );
};

CustomLabel.parameters = { a11y: { disable: true } };
