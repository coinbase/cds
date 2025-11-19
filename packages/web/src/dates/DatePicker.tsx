import { forwardRef, memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  animateDropdownOpacityInConfig,
  animateDropdownOpacityOutConfig,
  animateDropdownTransformInConfig,
  animateDropdownTransformOutConfig,
} from '@coinbase/cds-common/animation/dropdown';
import { type DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';
import { getISOStringLocal } from '@coinbase/cds-common/dates/getISOStringLocal';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';
import { type AnimationProps, m as motion } from 'framer-motion';

import { InputIconButton } from '../controls/InputIconButton';
import { Box, VStack } from '../layout';
import { getMotionProps } from '../motion/useMotionProps';
import { Popover } from '../overlays/popover/Popover';
import {
  type PopoverContentPositionConfig,
  type PopoverProps,
} from '../overlays/popover/PopoverProps';

import { Calendar, type CalendarProps } from './Calendar';
import { DateInput, type DateInputProps } from './DateInput';

const MotionVStack = motion(VStack);

export type DatePickerProps = {
  /** Control the date value of the DatePicker. */
  date: Date | null;
  /** Callback function fired when the date changes, e.g. when a valid date is selected or unselected. */
  onChangeDate: (selectedDate: Date | null) => void;
  /** Control the error value of the DatePicker. */
  error: DateInputValidationError | null;
  /** Callback function fired when validation finds an error, e.g. required input fields and impossible or disabled dates. Will always be called after `onChangeDate`. */
  onErrorDate: (error: DateInputValidationError | null) => void;
  /** Disables user interaction. */
  disabled?: boolean;
  /** Array of disabled dates, and date tuples for date ranges. Make sure to set `disabledDateError` as well. A number is created for every individual date within a tuple range, so do not abuse this with massive ranges. */
  disabledDates?: (Date | [Date, Date])[];
  /** Minimum date allowed to be selected, inclusive. Dates before the `minDate` are disabled. All navigation to months before the `minDate` is disabled. */
  minDate?: Date;
  /** Maximum date allowed to be selected, inclusive. Dates after the `maxDate` are disabled. All navigation to months after the `maxDate` is disabled. */
  maxDate?: Date;
  /**
   * Error text to display when a disabled date is selected with the DateInput, including dates before the `minDate` or after the `maxDate`. Also used as the tooltip content shown when hovering or focusing a disabled date on the Calendar.
   * @default 'Date unavailable'
   */
  disabledDateError?: string;
  /** Control the default open state of the Calendar popover. */
  defaultOpen?: boolean;
  /** Callback function fired when the DateInput text value changes. Prefer to use `onChangeDate` instead. Will always be called before `onChangeDate`. This prop should only be used for edge cases, such as custom error handling.  */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Callback function fired when the Calendar popover is opened.  */
  onOpen?: () => void;
  /** Callback function fired when the Calendar popover is closed. Will always be called after `onCancel`, `onConfirm`, and `onChangeDate`.  */
  onClose?: () => void;
  /** Callback function fired when the user selects a date using the Calendar popover. Interacting with the DateInput does not fire this callback. Will always be called before `onClose`. */
  onConfirm?: () => void;
  /** Callback function fired when the user closes the Calendar popover without selecting a date. Interacting with the DateInput does not fire this callback. Will always be called before `onClose`. */
  onCancel?: () => void;
  /**
   * If `true`, the focus trap will restore focus to the previously focused element when it unmounts.
   *
   * WARNING: If you disable this, you need to ensure that focus is restored properly so it doesn't end up on the body
   * @default true
   */
  restoreFocusOnUnmount?: boolean;
  /**
   * Accessibility label describing the calendar IconButton, which opens the calendar when pressed.
   * @default 'Open calendar' / 'Close calendar'
   */
  calendarIconButtonAccessibilityLabel?: string;
  calendarStyle?: React.CSSProperties;
  calendarClassName?: string;
  dateInputStyle?: React.CSSProperties;
  dateInputClassName?: string;
} & Omit<
  DateInputProps,
  | 'date'
  | 'separator'
  | 'onChangeDate'
  | 'disabledDates'
  | 'minDate'
  | 'maxDate'
  | 'disabledDateError'
  | 'className'
  | 'style'
> &
  Pick<
    CalendarProps,
    | 'seedDate'
    | 'highlightedDates'
    | 'nextArrowAccessibilityLabel'
    | 'previousArrowAccessibilityLabel'
    | 'className'
    | 'style'
  > &
  Pick<PopoverProps, 'showOverlay'>;

const calendarAnimation: AnimationProps = getMotionProps({
  enterConfigs: [
    animateDropdownOpacityInConfig,
    { ...animateDropdownTransformInConfig, property: 'y' },
  ],
  exitConfigs: [
    animateDropdownOpacityOutConfig,
    { ...animateDropdownTransformOutConfig, property: 'y' },
  ],
  exit: 'exit',
});

const calendarPopoverPosition: PopoverContentPositionConfig = {
  placement: 'bottom-start',
  offsetGap: 16,
};

export const DatePicker = memo(
  forwardRef<HTMLDivElement, DatePickerProps>(
    (
      {
        date,
        onChangeDate,
        error,
        onErrorDate,
        required,
        disabled,
        seedDate,
        disabledDates,
        highlightedDates,
        minDate,
        maxDate,
        requiredError = 'This field is required',
        invalidDateError = 'Please enter a valid date',
        disabledDateError = 'Date unavailable',
        label,
        restoreFocusOnUnmount = true,
        accessibilityLabel,
        accessibilityLabelledBy,
        calendarIconButtonAccessibilityLabel,
        nextArrowAccessibilityLabel,
        previousArrowAccessibilityLabel,
        compact,
        variant,
        helperText,
        showOverlay,
        defaultOpen = false,
        calendarStyle,
        calendarClassName,
        dateInputStyle,
        dateInputClassName,
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
      const [showCalendar, setShowCalendar] = useState<boolean>(defaultOpen);
      const calendarRef = useRef<HTMLDivElement | null>(null);

      /**
       * Be careful to preserve the correct event orders
       *   1. Selecting a date with the Calendar:                     onOpen -> onConfirm -> onChangeDate -> onErrorDate -> onClose
       *   2. Closing the Calendar without selecting a date:          onOpen -> onCancel -> onClose
       *   3. Typing a date in a blank DateInput:                     onChange -> onChange -> ... -> onChangeDate -> onErrorDate
       *   4. Typing a date in a DateInput that already had a date:   onChange -> onChangeDate -> onChange -> onChange -> ... -> onChangeDate -> onErrorDate
       */

      const handleOpenCalendar = useCallback(
        (event: React.MouseEvent) => {
          event.stopPropagation(); // Prevents DateInput's IconButton click event from propagating to the DateInput's TextInput
          onOpen?.();
          setShowCalendar(true);
          // Handle setting focus after opening the Calendar Popover - defaults to selectedDate, then seedDate, then today, then first of month
          setTimeout(() => {
            const dateString = getISOStringLocal(date || seedDate || new Date());
            const element = calendarRef.current?.querySelector<HTMLElement>(
              `[data-calendar-date="${dateString}"]`,
            );
            if (element) element.focus();
            else calendarRef.current?.querySelector<HTMLElement>('[data-calendar-date]')?.focus();
          }, 10);
        },
        [date, seedDate, onOpen],
      );

      const handleCloseCalendar = useCallback(() => {
        onClose?.();
        setShowCalendar(false);
      }, [onClose]);

      const handleCancelCalendar = useCallback(() => {
        onCancel?.();
        handleCloseCalendar();
      }, [onCancel, handleCloseCalendar]);

      const handleConfirmCalendarDate = useCallback(
        (date: Date | null) => {
          onConfirm?.();
          onChangeDate(date);
          if (error && error.type !== 'custom') onErrorDate(null);
          // Wait to close the calendar for a bit, so we can see the selected date change
          setTimeout(() => {
            handleCloseCalendar();
          }, 10);
        },
        [onConfirm, onChangeDate, error, onErrorDate, handleCloseCalendar],
      );

      const dateInputCalendarButton = useMemo(
        () => (
          <VStack paddingEnd={0.5}>
            <InputIconButton
              disableInheritFocusStyle
              transparent
              accessibilityLabel={
                calendarIconButtonAccessibilityLabel ??
                (showCalendar ? 'Close calendar' : 'Open calendar')
              }
              name="calendarEmpty"
              onClick={handleOpenCalendar}
              variant="secondary"
            />
          </VStack>
        ),
        [handleOpenCalendar, showCalendar, calendarIconButtonAccessibilityLabel],
      );

      const dateInput = useMemo(
        () => (
          <DateInput
            {...props}
            accessibilityLabel={accessibilityLabel}
            accessibilityLabelledBy={accessibilityLabelledBy}
            className={dateInputClassName}
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
            style={dateInputStyle}
            variant={variant}
          />
        ),
        [
          date,
          onChangeDate,
          error,
          onErrorDate,
          required,
          compact,
          disabled,
          dateInputCalendarButton,
          requiredError,
          invalidDateError,
          disabledDates,
          minDate,
          maxDate,
          disabledDateError,
          onChange,
          label,
          accessibilityLabel,
          accessibilityLabelledBy,
          helperText,
          variant,
          dateInputClassName,
          dateInputStyle,
          props,
        ],
      );

      const calendar = useMemo(
        () => (
          <MotionVStack
            background
            borderRadius={400}
            elevation={2}
            overflow="auto"
            role="menu"
            tabIndex={0}
            zIndex={zIndex.dropdown}
            {...calendarAnimation}
          >
            <Calendar
              ref={calendarRef}
              className={calendarClassName}
              disabled={disabled}
              disabledDateError={disabledDateError}
              disabledDates={disabledDates}
              highlightedDates={highlightedDates}
              maxDate={maxDate}
              minDate={minDate}
              nextArrowAccessibilityLabel={nextArrowAccessibilityLabel}
              onPressDate={handleConfirmCalendarDate}
              previousArrowAccessibilityLabel={previousArrowAccessibilityLabel}
              seedDate={seedDate}
              selectedDate={date}
              style={calendarStyle}
            />
          </MotionVStack>
        ),
        [
          date,
          disabled,
          seedDate,
          disabledDates,
          highlightedDates,
          minDate,
          maxDate,
          disabledDateError,
          handleConfirmCalendarDate,
          calendarRef,
          calendarStyle,
          calendarClassName,
          nextArrowAccessibilityLabel,
          previousArrowAccessibilityLabel,
        ],
      );

      return (
        <Box ref={ref} width={width}>
          <Popover
            block
            respectNegativeTabIndex
            content={calendar}
            contentPosition={calendarPopoverPosition}
            onClose={handleCancelCalendar}
            restoreFocusOnUnmount={restoreFocusOnUnmount}
            showOverlay={showOverlay}
            visible={showCalendar}
          >
            {dateInput}
          </Popover>
        </Box>
      );
    },
  ),
);
