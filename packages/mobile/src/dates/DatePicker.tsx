import { forwardRef, memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  type NativeSyntheticEvent,
  type StyleProp,
  type TextInput,
  type TextInputChangeEventData,
  type TextStyle,
  type View,
  type ViewStyle,
} from 'react-native';
import type { DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';

import { Button } from '../buttons/Button';
import { InputIconButton } from '../controls/InputIconButton';
import { Box, VStack } from '../layout';
import { Tray } from '../overlays/tray/Tray';
import { StickyFooter } from '../sticky-footer/StickyFooter';

import { Calendar, type CalendarBaseProps, type CalendarRefHandle } from './Calendar';
import { DateInput, type DateInputProps } from './DateInput';

export type DatePickerBaseProps = Pick<
  CalendarBaseProps,
  | 'disabled'
  | 'disabledDates'
  | 'disabledDateError'
  | 'highlightedDateAccessibilityHint'
  | 'highlightedDates'
  | 'maxDate'
  | 'minDate'
  | 'nextArrowAccessibilityLabel'
  | 'previousArrowAccessibilityLabel'
  | 'seedDate'
> & {
  /** Control the date value of the DatePicker. */
  date: Date | null;
  /** Callback function fired when the date changes, e.g. when a valid date is selected or unselected. */
  onChangeDate: (selectedDate: Date | null) => void;
  /** Control the error value of the DatePicker. */
  error: DateInputValidationError | null;
  /** Callback function fired when validation finds an error, e.g. required input fields and impossible or disabled dates. Will always be called after `onChangeDate`. */
  onErrorDate: (error: DateInputValidationError | null) => void;
  /** Callback function fired when the picker is opened. */
  onOpen?: () => void;
  /** Callback function fired when the picker is closed. Will always be called after `onCancel`, `onConfirm`, and `onChangeDate`. */
  onClose?: () => void;
  /** Callback function fired when the user selects a date using the picker. Interacting with the DateInput does not fire this callback. Will always be called before `onClose`. */
  onConfirm?: () => void;
  /** Callback function fired when the user closes the picker without selecting a date. Interacting with the DateInput does not fire this callback. Will always be called before `onClose`. */
  onCancel?: () => void;
  /**
   * Accessibility label describing the calendar IconButton, which opens the calendar when pressed.
   * @deprecated Use openCalendarAccessibilityLabel/closeCalendarAccessibilityLabel instead. This will be removed in a future major release.
   * @deprecationExpectedRemoval v9
   */
  calendarIconButtonAccessibilityLabel?: string;
  /**
   * Accessibility label for the calendar IconButton, which opens the calendar when pressed.
   * @default 'Open calendar'
   */
  openCalendarAccessibilityLabel?: string;
  /**
   * Accessibility label for the handle bar that closes the picker.
   * @default 'Close calendar without selecting a date'
   */
  closeCalendarAccessibilityLabel?: string;
};

export type DatePickerProps = DatePickerBaseProps &
  Omit<
    DateInputProps,
    | 'date'
    | 'separator'
    | 'onChangeDate'
    | 'disabledDates'
    | 'minDate'
    | 'maxDate'
    | 'disabledDateError'
    | 'style'
  > & {
    /** Callback function fired when the DateInput text value changes. Prefer to use `onChangeDate` instead. Will always be called before `onChangeDate`. This prop should only be used for edge cases, such as custom error handling.  */
    onChange?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    /**
     * Custom style to apply to the DateInput.
     * @deprecated Use `styles.dateInput` instead. This will be removed in a future major release.
     * @deprecationExpectedRemoval v9
     */
    dateInputStyle?: StyleProp<ViewStyle>;
    /**
     * Text to display on the confirm button.
     * @default 'Confirm'
     */
    confirmText?: string;
    /**
     * Accessibility hint for the confirm button.
     */
    confirmButtonAccessibilityHint?: string;
    /** Custom styles for the DateInput and Calendar subcomponents. */
    styles?: {
      dateInput?: DateInputProps['style'];
      calendar?: StyleProp<ViewStyle>;
      calendarHeader?: StyleProp<ViewStyle>;
      calendarTitle?: StyleProp<TextStyle>;
      calendarNavigation?: StyleProp<ViewStyle>;
      calendarContent?: StyleProp<ViewStyle>;
      calendarDay?: StyleProp<ViewStyle>;
    };
  };

export const DatePicker = memo(
  forwardRef<View, DatePickerProps>(
    (
      {
        date,
        styles,
        highlightedDates,
        highlightedDateAccessibilityHint,
        nextArrowAccessibilityLabel,
        previousArrowAccessibilityLabel,
        disabledDates,
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
        accessibilityHint = 'Enter date or select from calendar using the calendar button.',
        accessibilityLabel,
        accessibilityLabelledBy,
        calendarIconButtonAccessibilityLabel,
        openCalendarAccessibilityLabel = 'Open calendar',
        closeCalendarAccessibilityLabel = 'Close calendar without selecting a date',
        dateInputStyle,
        compact,
        variant,
        confirmText = 'Confirm',
        confirmButtonAccessibilityHint,
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
      const [showPicker, setShowPicker] = useState(false);
      const [calendarSelectedDate, setCalendarSelectedDate] = useState<Date | null>(null);
      const dateInputRef = useRef<TextInput | null>(null);
      const calendarButtonRef = useRef<View | null>(null);
      const calendarRef = useRef<CalendarRefHandle>(null);
      const closedByConfirmRef = useRef(false);
      /**
       * Be careful to preserve the correct event orders
       *   1. Selecting a date with the picker:                onOpen -> onConfirm -> onChangeDate -> onErrorDate -> onClose
       *   2. Closing the picker without selecting a date:     onOpen -> onCancel -> onClose
       *   3. Typing a date in a blank DateInput:                     onChange -> onChange -> ... -> onChangeDate -> onErrorDate
       *   4. Typing a date in a DateInput that already had a date:   onChange -> onChangeDate -> onChange -> onChange -> ... -> onChangeDate -> onErrorDate
       */

      const handleOpenPicker = useCallback(() => {
        onOpen?.();
        setCalendarSelectedDate(date); // Initialize with current date
        setShowPicker(true);
      }, [onOpen, date]);

      const handleConfirmPicker = useCallback(
        (selectedDate: Date) => {
          closedByConfirmRef.current = true;
          onConfirm?.();
          onChangeDate(selectedDate);
          if (error && error.type !== 'custom') {
            onErrorDate(null);
          }
        },
        [onChangeDate, onConfirm, error, onErrorDate],
      );

      const handleTrayCloseComplete = useCallback(() => {
        if (!closedByConfirmRef.current) {
          onCancel?.();
          setCalendarSelectedDate(null);
        }
        onClose?.();
        setShowPicker(false);
        closedByConfirmRef.current = false;
      }, [onCancel, onClose]);

      const handleCalendarDatePress = useCallback((selectedDate: Date) => {
        // Update local state, user must press confirm button
        setCalendarSelectedDate(selectedDate);
      }, []);

      const handleModalShow = useCallback(() => {
        calendarRef.current?.focusInitialDate();
      }, []);

      const dateInputCalendarButton = useMemo(
        () => (
          <VStack accessible={true} paddingEnd={0.5}>
            <InputIconButton
              ref={calendarButtonRef}
              disableInheritFocusStyle
              transparent
              accessibilityLabel={
                calendarIconButtonAccessibilityLabel ?? openCalendarAccessibilityLabel
              }
              disabled={disabled}
              name="calendarEmpty"
              onPress={handleOpenPicker}
              variant="secondary"
            />
          </VStack>
        ),
        [
          handleOpenPicker,
          openCalendarAccessibilityLabel,
          calendarIconButtonAccessibilityLabel,
          disabled,
        ],
      );

      return (
        <Box ref={ref} width={width}>
          <DateInput
            ref={dateInputRef}
            {...props}
            accessibilityHint={accessibilityHint}
            accessibilityLabel={accessibilityLabel}
            accessibilityLabelledBy={accessibilityLabelledBy}
            compact={compact}
            date={date}
            disabled={disabled}
            disabledDateError={disabledDateError}
            disabledDates={disabledDates}
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
            style={[dateInputStyle, styles?.dateInput]}
            variant={variant}
          />
          {showPicker && (
            <Tray
              accessibilityRole="none"
              footer={({ handleClose }) => (
                <StickyFooter paddingTop={3} paddingX={3} role="none">
                  <Button
                    block
                    compact
                    accessibilityHint={confirmButtonAccessibilityHint}
                    disabled={disabled || !calendarSelectedDate}
                    onPress={() => {
                      if (calendarSelectedDate) {
                        handleConfirmPicker(calendarSelectedDate);
                        handleClose();
                      }
                    }}
                  >
                    {confirmText}
                  </Button>
                </StickyFooter>
              )}
              handleBarAccessibilityLabel={closeCalendarAccessibilityLabel}
              handleBarVariant="inside"
              onCloseComplete={handleTrayCloseComplete}
              onOpenComplete={handleModalShow}
            >
              <Calendar
                ref={calendarRef}
                disabled={disabled}
                disabledDateError={disabledDateError}
                disabledDates={disabledDates}
                highlightedDateAccessibilityHint={highlightedDateAccessibilityHint}
                highlightedDates={highlightedDates}
                maxDate={maxDate}
                minDate={minDate}
                nextArrowAccessibilityLabel={nextArrowAccessibilityLabel}
                onPressDate={handleCalendarDatePress}
                paddingBottom={2}
                paddingX={3}
                previousArrowAccessibilityLabel={previousArrowAccessibilityLabel}
                seedDate={seedDate}
                selectedDate={calendarSelectedDate}
                styles={{
                  root: styles?.calendar,
                  header: styles?.calendarHeader,
                  title: styles?.calendarTitle,
                  navigation: styles?.calendarNavigation,
                  content: styles?.calendarContent,
                  day: styles?.calendarDay,
                }}
              />
            </Tray>
          )}
        </Box>
      );
    },
  ),
);

DatePicker.displayName = 'DatePicker';
