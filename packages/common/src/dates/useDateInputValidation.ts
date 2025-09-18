import { useCallback, useMemo } from 'react';

import {
  DateInputValidationError,
  type DateInputValidationErrorType,
} from './DateInputValidationError';
import { getMidnightDate } from './getMidnightDate';
import { getTimesFromDatesAndRanges } from './getTimesFromDatesAndRanges';
import { type IntlDateFormat } from './IntlDateFormat';

const oneHundredYearsInMs = 3.156e12;

export type DateInputValidationOptions = {
  /** The DateInput's IntlDateFormat. */
  intlDateFormat: IntlDateFormat;
  /** If required, the `requiredError` will be displayed if a user blurs the input, without a date selected, after having typed into it. */
  required?: boolean;
  /** Array of disabled dates, and date tuples for date ranges. Make sure to set `disabledDateError` as well. A number is created for every individual date within a tuple range, so do not abuse this with massive ranges. */
  disabledDates?: (Date | [Date, Date])[];
  /** Minimum date allowed to be selected, inclusive. Dates before the `minDate` are disabled. Make sure to set `disabledDateError` as well. */
  minDate?: Date;
  /** Maximum date allowed to be selected, inclusive. Dates after the `maxDate` are disabled. Make sure to set `disabledDateError` as well. */
  maxDate?: Date;
  /**
   * Error text to display when `required` is true and a user blurs the input without a date selected, after having typed into it.
   * @default 'This field is required'
   */
  requiredError?: string;
  /**
   * Error text to display when an impossible date is selected, e.g. 99/99/2000. This should always be defined for accessibility. Also displays when a date is selected that is more than 100 years before the `minDate`, or more than 100 years after the `maxDate`.
   * @default 'Please enter a valid date'
   */
  invalidDateError?: string;
  /**
   * Error text to display when a disabled date is selected, including dates before the `minDate` or after the `maxDate`. However if the selected date is more than 100 years before the `minDate` or more than 100 years after the `maxDate`, the `invalidDateError` will be displayed instead.
   * @default 'Date unavailable'
   */
  disabledDateError?: string;
};

export type DateInputValidationApi = {
  /** Validates an IntlDateFormat date string against the DateInputValidationOptions like disabledDates, minDate, maxDate, and required. */
  validateDateInput: (dateString: string) => DateInputValidationError | null;
  /** Flat array of disabled date times set to midnight, generated from `disabledDates` option. */
  disabledTimes: number[];
  /** Date time set to midnight, generated from `minDate` option. */
  minTime: number | undefined;
  /** Date time set to midnight, generated from `maxDate` option. */
  maxTime: number | undefined;
};

export const useDateInputValidation = ({
  intlDateFormat,
  required,
  disabledDates,
  minDate,
  maxDate,
  requiredError = 'This field is required',
  invalidDateError = 'Please enter a valid date',
  disabledDateError = 'Date unavailable',
}: DateInputValidationOptions) => {
  const disabledTimes = useMemo(
    () => getTimesFromDatesAndRanges(disabledDates || []),
    [disabledDates],
  );

  const minTime = useMemo(() => minDate && getMidnightDate(minDate).getTime(), [minDate]);

  const maxTime = useMemo(() => maxDate && getMidnightDate(maxDate).getTime(), [maxDate]);

  const validateDateInput = useCallback(
    (dateString: string) => {
      // First evaluate the date string for any errors
      const date = intlDateFormat.date(dateString);
      const time = date?.getTime();
      let errorType: DateInputValidationErrorType | undefined;

      // Check if date string is fully formed if it's required
      if (required && dateString.length !== intlDateFormat.dateStringFormat.length)
        errorType = 'required';
      // Check if date is valid
      else if (!date || Number.isNaN(date)) errorType = 'invalid';
      else if (
        time &&
        ((minTime && time < minTime - oneHundredYearsInMs) ||
          (maxTime && time > maxTime + oneHundredYearsInMs))
      )
        errorType = 'invalid';
      // Check if date is disabled
      else if (
        time &&
        ((minTime && time < minTime) || (maxTime && time > maxTime) || disabledTimes.includes(time))
      )
        errorType = 'disabled';

      // Now assign the error message based on the error type and create the DateInputValidationError
      const defaultError = intlDateFormat.dateStringFormat;
      const errorMessages: {
        [key in DateInputValidationErrorType]: string | undefined;
      } = {
        required: requiredError,
        invalid: invalidDateError,
        disabled: disabledDateError,
      };

      const error = errorType
        ? new DateInputValidationError(errorType, errorMessages[errorType] || defaultError)
        : null;

      return error;
    },
    [
      intlDateFormat,
      required,
      disabledTimes,
      minTime,
      maxTime,
      requiredError,
      invalidDateError,
      disabledDateError,
    ],
  );

  const api = useMemo(
    () => ({
      validateDateInput,
      disabledTimes,
      minTime,
      maxTime,
    }),
    [validateDateInput, disabledTimes, minTime, maxTime],
  );

  return api;
};
