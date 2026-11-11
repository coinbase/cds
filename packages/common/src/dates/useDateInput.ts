import { useCallback, useMemo, useRef, useState } from 'react';

import { type DateInputValidationError } from './DateInputValidationError';
import {
  type DateInputValidationApi,
  type DateInputValidationOptions,
  useDateInputValidation,
} from './useDateInputValidation';

const stripDateSeparators = (value: string, separator: string) => value.split(separator).join('');

/**
 * Place separators from the digits alone. A single keystroke used to insert a separator only when
 * its last character landed on a separator index, which drops a slash when Android delivers more
 * than one new digit in an event.
 */
const formatDateInputDigits = (
  digits: string,
  separator: string,
  separatorIndices: readonly number[],
) => {
  let formatted = '';

  for (const digit of digits) {
    if (separatorIndices.includes(formatted.length)) {
      formatted += separator;
    }
    formatted += digit;
  }

  return formatted;
};

export type DateInputOptions = {
  /** Control the date value of the DateInput. */
  date: Date | null;
  /** Callback function fired when the date changes, e.g. when a valid date is selected or unselected. */
  onChangeDate: (date: Date | null) => void;
  /** Control the error value of the DateInput. */
  error: DateInputValidationError | null;
  /** Callback function fired when validation finds an error, e.g. required input fields and impossible or disabled dates. Will always be called after `onChangeDate`. */
  onErrorDate: (error: DateInputValidationError | null) => void;
} & DateInputValidationOptions;

export type DateInputApi = {
  /** The DateInput's date string value. */
  inputValue: string;
  /** Callback that handles a DateInput's changing date string value. Updates the `inputValue` state and calls `onChangeDate` and `onErrorDate` as necessary. */
  onChangeDateInput: (newDateString: string) => void;
  /** The DateInput's placeholder value. */
  placeholder: string;
} & DateInputValidationApi;

/** Accepts DateInputOptions and returns a DateInputApi, which can be used to control a custom DateInput component. */
export const useDateInput = ({
  date,
  onChangeDate,
  error,
  onErrorDate,
  intlDateFormat,
  required,
  disabledDates,
  minDate,
  maxDate,
  requiredError,
  invalidDateError,
  disabledDateError,
}: DateInputOptions): DateInputApi => {
  const [previousDateProp, setPreviousDateProp] = useState(date);
  const [inputValue, setInputValue] = useState(date ? intlDateFormat.format(date) : '');
  const hadCompleteDateString = useRef(Boolean(date));

  // Sync internal inputValue state with external date prop state
  if (previousDateProp !== date) {
    hadCompleteDateString.current = Boolean(date);
    setPreviousDateProp(date);
    // Only resync the inputValue state if the new date prop is non-null.
    // This allows the user to backspace a completed date input, without
    // the inputValue being overridden by the date prop changing to null.
    if (date) setInputValue(intlDateFormat.format(date));
  }

  const placeholder = `   ${intlDateFormat.separator}   ${intlDateFormat.separator}`;

  const { validateDateInput, disabledTimes, minTime, maxTime } = useDateInputValidation({
    intlDateFormat,
    required,
    disabledDates,
    minDate,
    maxDate,
    requiredError,
    invalidDateError,
    disabledDateError,
  });

  /**
   * Be careful to preserve the correct event orders
   *   1. Typing a date in a blank DateInput:                     onChange -> onChange -> ... -> onChangeDate -> onErrorDate
   *   2. Typing a date in a DateInput that already had a date:   onChange -> onChangeDate -> onChange -> onChange -> ... -> onChangeDate -> onErrorDate
   */
  const onChangeDateInput = useCallback(
    (newDateString: string) => {
      const maxLength = intlDateFormat.dateStringFormat.length;

      if (
        newDateString.length > maxLength ||
        intlDateFormat.invalidDateFormatRegex.test(newDateString)
      )
        return;

      const { separator, separatorIndices } = intlDateFormat;
      const previousDigits = stripDateSeparators(inputValue, separator);
      const nextDigits = stripDateSeparators(newDateString, separator);
      // Compare digits, not string length. Android can drop a formatted value update, so the next
      // native string may be shorter than the React value even though the user typed another digit.
      // Removing a separator keeps the same digits and shortens the text, which is still a deletion.
      const removedSeparator =
        nextDigits === previousDigits && newDateString.length < inputValue.length;
      const isDeletion = nextDigits.length < previousDigits.length || removedSeparator;
      let dateString = newDateString;

      if (!isDeletion) {
        const formatted = formatDateInputDigits(nextDigits, separator, separatorIndices);

        if (nextDigits !== previousDigits) {
          const maxDigits = maxLength - separatorIndices.length;
          if (nextDigits.length > maxDigits) return;
          dateString = formatted;
        } else if (newDateString !== formatted) {
          const allowsTrailingSeparator =
            separatorIndices.includes(formatted.length) &&
            newDateString === `${formatted}${separator}`;
          if (!allowsTrailingSeparator) return;
        }
      }

      const isCompleteDateString = dateString.length === maxLength;

      // If we have a complete date string, generate a date and validate it
      if (isCompleteDateString) {
        const date = intlDateFormat.date(dateString);
        const newError = validateDateInput(dateString);
        onChangeDate(newError ? null : date);
        if (newError) onErrorDate(newError);
        else if (error && error.type !== 'custom') onErrorDate(null);
      } else {
        // If it's not a complete date string, but it was on the previous render, we can clear the date
        if (hadCompleteDateString.current) onChangeDate(null);
        // If we had an error with the previous complete date string, we can clear it now
        if (error && error.type !== 'custom') onErrorDate(null);
      }

      hadCompleteDateString.current = isCompleteDateString;

      // Update the input value with the coerced date string
      setInputValue(dateString);
    },
    [inputValue, intlDateFormat, error, validateDateInput, onChangeDate, onErrorDate],
  );

  const api = useMemo(
    () => ({
      inputValue,
      onChangeDateInput,
      intlDateFormat,
      placeholder,
      validateDateInput,
      disabledTimes,
      minTime,
      maxTime,
    }),
    [
      inputValue,
      onChangeDateInput,
      intlDateFormat,
      placeholder,
      validateDateInput,
      disabledTimes,
      minTime,
      maxTime,
    ],
  );

  return api;
};
