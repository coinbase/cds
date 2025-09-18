import { useCallback, useMemo, useRef, useState } from 'react';

import { type DateInputValidationError } from './DateInputValidationError';
import {
  type DateInputValidationApi,
  type DateInputValidationOptions,
  useDateInputValidation,
} from './useDateInputValidation';

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
      let dateString = newDateString;
      const newStringLength = dateString.length;
      const maxLength = intlDateFormat.dateStringFormat.length;

      if (newStringLength > maxLength || intlDateFormat.invalidDateFormatRegex.test(dateString))
        return;

      const newLastChar = dateString.charAt(newStringLength - 1);
      const isDeletion = newStringLength < inputValue.length;

      if (!isDeletion) {
        const expectSeparator = intlDateFormat.separatorIndices.includes(newStringLength - 1);

        // Add a separator as the user is typing if they miss one
        if (expectSeparator && newLastChar !== intlDateFormat.separator) {
          dateString = `${dateString.slice(0, -1)}${intlDateFormat.separator}${dateString.slice(
            -1,
          )}`;
        }

        const separatorCount = dateString.split(intlDateFormat.separator).length - 1;

        // Don't allow the user to type a separator unless we expect one
        if (!expectSeparator && newLastChar === intlDateFormat.separator) return;
        // Don't allow the user to type a duplicate separator or more than 2 separators
        if (
          intlDateFormat.duplicateSeparatorRegex.test(dateString) ||
          separatorCount > intlDateFormat.separatorIndices.length
        )
          return;
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
