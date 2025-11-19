import { forwardRef, memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  type NativeSyntheticEvent,
  type StyleProp,
  type TextInput,
  type TextInputChangeEventData,
  type View,
  type ViewStyle,
} from 'react-native';
import NativeDatePicker from 'react-native-date-picker';
import { type DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';

import { InputIconButton } from '../controls/InputIconButton';
import { Box, VStack } from '../layout';

import { DateInput, type DateInputProps } from './DateInput';

export type DatePickerProps = {
  /** Control the date value of the DatePicker. */
  date: Date | null;
  /** Callback function fired when the date changes, e.g. when a valid date is selected or unselected. */
  onChangeDate: (selectedDate: Date | null) => void;
  /** Control the error value of the DatePicker. */
  error: DateInputValidationError | null;
  /** Callback function fired when validation finds an error, e.g. required input fields and impossible or disabled dates. Will always be called after `onChangeDate`. */
  onErrorDate: (error: DateInputValidationError | null) => void;
  /** Date that the react-native-date-picker keyboard control will open to when there is no value for the `date` prop, defaults to today. */
  seedDate?: Date;
  /** Disables user interaction. */
  disabled?: boolean;
  /** Minimum date allowed to be selected, inclusive. Dates before the `minDate` are disabled. All navigation to months before the `minDate` is disabled. */
  minDate?: Date;
  /** Maximum date allowed to be selected, inclusive. Dates after the `maxDate` are disabled. All navigation to months after the `maxDate` is disabled. */
  maxDate?: Date;
  /**
   * Error text to display when a disabled date is selected with the DateInput, including dates before the `minDate` or after the `maxDate`.
   * @default 'Date unavailable'
   */
  disabledDateError?: string;
  /** Callback function fired when the DateInput text value changes. Prefer to use `onChangeDate` instead. Will always be called before `onChangeDate`. This prop should only be used for edge cases, such as custom error handling.  */
  onChange?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  /** Callback function fired when the react-native-date-picker keyboard control is opened.  */
  onOpen?: () => void;
  /** Callback function fired when the react-native-date-picker keyboard control is closed. Will always be called after `onCancel`, `onConfirm`, and `onChangeDate`.  */
  onClose?: () => void;
  /** Callback function fired when the user selects a date using the react-native-date-picker keyboard control. Interacting with the DateInput does not fire this callback. Will always be called before `onClose`. */
  onConfirm?: () => void;
  /** Callback function fired when the user closes the react-native-date-picker keyboard control without selecting a date. Interacting with the DateInput does not fire this callback. Will always be called before `onClose`. */
  onCancel?: () => void;
  /**
   * Accessibility label describing the calendar IconButton, which opens the calendar when pressed.
   * @default 'Open calendar' / 'Close calendar'
   */
  calendarIconButtonAccessibilityLabel?: string;
  dateInputStyle?: StyleProp<ViewStyle>;
} & Omit<
  DateInputProps,
  | 'date'
  | 'separator'
  | 'onChangeDate'
  | 'disabledDates'
  | 'minDate'
  | 'maxDate'
  | 'disabledDateError'
  | 'style'
>;

export const DatePicker = memo(
  forwardRef<View, DatePickerProps>(
    (
      {
        date,
        onChangeDate,
        error,
        onErrorDate,
        required,
        disabled,
        seedDate,
        minDate,
        maxDate,
        requiredError = 'This field is required',
        invalidDateError = 'Please enter a valid date',
        disabledDateError = 'Date unavailable',
        label,
        accessibilityLabel,
        accessibilityLabelledBy,
        calendarIconButtonAccessibilityLabel,
        dateInputStyle,
        compact,
        variant,
        helperText,
        width = '100%',
        onOpen,
        onClose,
        onConfirm,
        onCancel,
        onChange,
        ...props
      },
      ref,
    ) => {
      const [showNativePicker, setShowNativePicker] = useState(false);
      const dateInputRef = useRef<TextInput | null>(null);

      const today = useMemo(() => new Date(), []);

      /**
       * Be careful to preserve the correct event orders
       *   1. Selecting a date with the native picker:                onOpen -> onConfirm -> onChangeDate -> onErrorDate -> onClose
       *   2. Closing the native picker without selecting a date:     onOpen -> onCancel -> onClose
       *   3. Typing a date in a blank DateInput:                     onChange -> onChange -> ... -> onChangeDate -> onErrorDate
       *   4. Typing a date in a DateInput that already had a date:   onChange -> onChangeDate -> onChange -> onChange -> ... -> onChangeDate -> onErrorDate
       */

      const handleOpenNativePicker = useCallback(() => {
        onOpen?.();
        setShowNativePicker(true);
      }, [onOpen]);

      const handleCloseNativePicker = useCallback(() => {
        onClose?.();
        setShowNativePicker(false);
      }, [onClose]);

      const handleConfirmNativePicker = useCallback(
        (date: Date) => {
          onConfirm?.();
          onChangeDate(date);
          if (error && error.type !== 'custom') onErrorDate(null);
          handleCloseNativePicker();
          dateInputRef.current?.focus();
        },
        [onChangeDate, onConfirm, error, onErrorDate, handleCloseNativePicker],
      );

      const handleCancelNativePicker = useCallback(() => {
        onCancel?.();
        handleCloseNativePicker();
      }, [onCancel, handleCloseNativePicker]);

      const dateInputCalendarButton = useMemo(
        () => (
          <VStack paddingEnd={0.5}>
            <InputIconButton
              disableInheritFocusStyle
              transparent
              accessibilityLabel={
                calendarIconButtonAccessibilityLabel ??
                (showNativePicker ? 'Close calendar' : 'Open calendar')
              }
              name="calendarEmpty"
              onPress={handleOpenNativePicker}
              variant="secondary"
            />
          </VStack>
        ),
        [handleOpenNativePicker, showNativePicker, calendarIconButtonAccessibilityLabel],
      );

      return (
        <Box ref={ref} width={width}>
          <DateInput
            ref={dateInputRef}
            {...props}
            accessibilityLabel={accessibilityLabel}
            accessibilityLabelledBy={accessibilityLabelledBy}
            compact={compact}
            date={date}
            disabled={disabled}
            disabledDateError={disabledDateError}
            end={dateInputCalendarButton}
            error={error}
            helperText={helperText}
            invalidDateError={invalidDateError}
            label={label}
            maxDate={maxDate}
            minDate={minDate}
            onChange={onChange}
            onChangeDate={onChangeDate}
            onErrorDate={onErrorDate}
            required={required}
            requiredError={requiredError}
            style={dateInputStyle}
            variant={variant}
          />
          {showNativePicker && (
            <NativeDatePicker
              modal
              date={date || seedDate || today}
              maximumDate={maxDate}
              minimumDate={minDate}
              mode="date"
              onCancel={handleCancelNativePicker}
              onConfirm={handleConfirmNativePicker}
              open={showNativePicker}
            />
          )}
        </Box>
      );
    },
  ),
);
