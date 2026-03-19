import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { generateCalendarMonth } from '@coinbase/cds-common/dates/generateCalendarMonth';
import { getISOStringLocal } from '@coinbase/cds-common/dates/getISOStringLocal';
import { getMidnightDate } from '@coinbase/cds-common/dates/getMidnightDate';
import { getTimesFromDatesAndRanges } from '@coinbase/cds-common/dates/getTimesFromDatesAndRanges';
import { useLocale } from '@coinbase/cds-common/system/LocaleProvider';
import { accessibleOpacityDisabled } from '@coinbase/cds-common/tokens/interactable';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { Icon } from '../icons/Icon';
import { Grid } from '../layout/Grid';
import { HStack } from '../layout/HStack';
import {
  VStack,
  type VStackBaseProps,
  type VStackDefaultElement,
  type VStackProps,
} from '../layout/VStack';
import { Tooltip } from '../overlays/tooltip/Tooltip';
import { Pressable, type PressableBaseProps } from '../system/Pressable';
import type { StylesAndClassNames } from '../types';
import { Text } from '../typography/Text';

const CALENDAR_DAY_DIMENSION = 40;

const pressableCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const calendarPressableDefaultElement = 'button';

export type CalendarPressableDefaultElement = typeof calendarPressableDefaultElement;

export type CalendarPressableBaseProps = PressableBaseProps;

export type CalendarPressableProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  CalendarPressableBaseProps
>;

type CalendarPressableComponent = (<
  AsComponent extends React.ElementType = CalendarPressableDefaultElement,
>(
  props: CalendarPressableProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

const CalendarPressable: CalendarPressableComponent = memo(
  forwardRef<React.ReactElement<CalendarPressableBaseProps>, CalendarPressableBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        className,
        borderRadius = 1000,
        width = CALENDAR_DAY_DIMENSION,
        height = CALENDAR_DAY_DIMENSION,
        background = 'transparent',
        children,
        ...props
      }: CalendarPressableProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? calendarPressableDefaultElement) satisfies React.ElementType;

      return (
        <Pressable
          ref={ref}
          as={Component}
          background={background}
          borderRadius={borderRadius}
          className={cx(pressableCss, className)}
          height={height}
          width={width}
          {...props}
        >
          {children}
        </Pressable>
      );
    },
  ),
);

export type CalendarDayProps = {
  /** Date of this CalendarDay. */
  date: Date;
  /** Callback function fired when pressing this CalendarDay. */
  onClick?: (date: Date) => void;
  /** Toggle active styles. */
  active?: boolean;
  /** Disables user interaction. */
  disabled?: boolean;
  /** Toggle highlighted styles. */
  highlighted?: boolean;
  /** Toggle today's date styles. */
  isToday?: boolean;
  /** Toggle current month styles. */
  isCurrentMonth?: boolean;
  /** Tooltip content shown when hovering or focusing a disabled Calendar Day. */
  disabledError?: string;
  /** Accessibility hint announced for highlighted dates. */
  highlightedDateAccessibilityHint?: string;
  /** Custom class name for the date cell (CalendarPressable). */
  className?: string;
  /** Custom style for the date cell (CalendarPressable). */
  style?: React.CSSProperties;
};

export type CalendarBaseProps = Omit<VStackBaseProps, 'children'> & {
  /** Currently selected Calendar date. Date used to generate the Calendar month. Will be rendered with active styles. */
  selectedDate?: Date | null;
  /** Date used to generate the Calendar month when there is no value for the `selectedDate` prop, defaults to today. */
  seedDate?: Date;
  /** Callback function fired when pressing a Calendar date. */
  onPressDate?: (date: Date) => void;
  /** Disables user interaction. */
  disabled?: boolean;
  /** Hides the Calendar next and previous month arrows, but does not prevent navigating to the next or previous months via keyboard. This probably only makes sense to be used when `minDate` and `maxDate` are set to the first and last days of the same month. */
  hideControls?: boolean;
  /** Array of disabled dates, and date tuples for date ranges. Make sure to set `disabledDateError` as well. A number is created for every individual date within a tuple range, so do not abuse this with massive ranges. */
  disabledDates?: (Date | [Date, Date])[];
  /** Array of highlighted dates, and date tuples for date ranges. A number is created for every individual date within a tuple range, so do not abuse this with massive ranges. */
  highlightedDates?: (Date | [Date, Date])[];
  /** Minimum date allowed to be selected, inclusive. Dates before the `minDate` are disabled. All navigation to months before the `minDate` is disabled. */
  minDate?: Date;
  /** Maximum date allowed to be selected, inclusive. Dates after the `maxDate` are disabled. All navigation to months after the `maxDate` is disabled. */
  maxDate?: Date;
  /**
   * Tooltip content shown when hovering or focusing a disabled date, including dates before the `minDate` or after the `maxDate`.
   * @default 'Date unavailable'
   */
  disabledDateError?: string;
  /**
   * Accessibility label describing the Calendar next month arrow.
   * @default 'Go to next month'
   */
  nextArrowAccessibilityLabel?: string;
  /**
   * Accessibility label describing the Calendar previous month arrow.
   * @default 'Go to previous month'
   */
  previousArrowAccessibilityLabel?: string;
  /**
   * Accessibility hint announced for highlighted dates. Applied to all highlighted dates.
   * @default 'Highlighted'
   */
  highlightedDateAccessibilityHint?: string;
};

/**
 * Static class names for Calendar component parts.
 * Use these selectors to target specific elements with CSS.
 */
export const calendarClassNames = {
  /** Root element */
  root: 'cds-Calendar',
  /** Header section */
  header: 'cds-Calendar-header',
  /** Month and year title text element */
  title: 'cds-Calendar-title',
  /** Navigation controls element */
  navigation: 'cds-Calendar-navigation',
  /** Main content area */
  content: 'cds-Calendar-content',
  /** Individual date cell in a calendar grid */
  day: 'cds-Calendar-day',
} as const;

const getDayAccessibilityLabel = (date: Date, locale = 'en-US') =>
  `${date.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
  })} ${date.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  })}`;

const getDateWithOffset = (
  year: number,
  month: number,
  day: number,
  monthOffset: number = 0,
  yearOffset: number = 0,
  dayOffset: number = 0,
): Date => {
  const targetYear = year + yearOffset;
  const targetMonth = month - 1 + monthOffset;
  const targetDay = day + dayOffset;
  const lastDayOfTargetMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
  return new Date(targetYear, targetMonth, Math.min(targetDay, lastDayOfTargetMonth));
};

const CalendarDay = memo(
  forwardRef<HTMLButtonElement, CalendarDayProps>(
    (
      {
        date,
        active,
        disabled,
        highlighted,
        isToday,
        isCurrentMonth,
        onClick,
        disabledError = 'Date unavailable',
        highlightedDateAccessibilityHint,
        className,
        style,
      },
      ref,
    ) => {
      const { locale } = useLocale();
      const handleClick = useCallback(() => onClick?.(date), [date, onClick]);
      const baseLabel = getDayAccessibilityLabel(date, locale);
      const calendarDayButton = useMemo(
        () => (
          <CalendarPressable
            ref={ref}
            focusable
            accessibilityHint={highlighted ? highlightedDateAccessibilityHint : undefined}
            accessibilityLabel={baseLabel}
            aria-current={isToday ? 'date' : undefined}
            aria-pressed={active ? 'true' : undefined}
            background={active ? 'bgPrimary' : 'bg'}
            borderColor={isToday ? 'bgPrimary' : undefined}
            className={className}
            data-calendar-date={getISOStringLocal(date)}
            data-highlight={highlighted ? 'true' : undefined}
            disabled={disabled}
            onClick={disabled ? undefined : handleClick}
            style={style}
            tabIndex={date.getDate() === 1 ? undefined : -1}
          >
            <Text color={active ? 'fgInverse' : highlighted ? 'fgPrimary' : undefined} font="body">
              {date.getDate()}
            </Text>
          </CalendarPressable>
        ),
        [
          date,
          active,
          disabled,
          highlighted,
          highlightedDateAccessibilityHint,
          isToday,
          baseLabel,
          handleClick,
          ref,
          className,
          style,
        ],
      );
      if (!isCurrentMonth) return <div />;
      if (!disabled || (disabled && !disabledError)) return calendarDayButton;
      return (
        <Tooltip disablePortal content={disabledError}>
          {calendarDayButton}
        </Tooltip>
      );
    },
  ),
);

export type CalendarProps = CalendarBaseProps &
  StylesAndClassNames<typeof calendarClassNames> &
  Omit<VStackProps<VStackDefaultElement>, 'children' | 'ref'> & {
    className?: string;
    style?: React.CSSProperties;
  };

// These could be dynamically generated, but our Calendar and DatePicker aren't localized so there's no point
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const Calendar = memo(
  forwardRef<HTMLElement, CalendarProps>(
    (
      {
        selectedDate,
        seedDate,
        onPressDate,
        disabled,
        hideControls,
        disabledDates,
        highlightedDates,
        minDate,
        maxDate,
        disabledDateError = 'Date unavailable',
        className,
        style,
        classNames,
        styles,
        nextArrowAccessibilityLabel = 'Go to next month',
        previousArrowAccessibilityLabel = 'Go to previous month',
        highlightedDateAccessibilityHint = 'Highlighted',
        ...props
      },
      ref,
    ) => {
      const calendarRef = useRef<HTMLDivElement | null>(null);
      useImperativeHandle(ref, () => calendarRef.current as HTMLElement, []); // Merges forwarded ref with internal calendarRef

      const today = useMemo(() => getMidnightDate(new Date()), []);
      const [calendarSeedDate, setCalendarSeedDate] = useState(
        selectedDate || seedDate || new Date(),
      );
      const calendarMonth = useMemo(
        () => generateCalendarMonth(calendarSeedDate),
        [calendarSeedDate],
      );

      const selectedTime = useMemo(
        () => (selectedDate ? getMidnightDate(selectedDate).getTime() : null),
        [selectedDate],
      );

      const disabledTimes = useMemo(
        () => getTimesFromDatesAndRanges(disabledDates || []),
        [disabledDates],
      );

      const minTime = useMemo(() => minDate && getMidnightDate(minDate).getTime(), [minDate]);

      const maxTime = useMemo(() => maxDate && getMidnightDate(maxDate).getTime(), [maxDate]);

      const highlightedTimes = useMemo(
        () => getTimesFromDatesAndRanges(highlightedDates || []),
        [highlightedDates],
      );

      const handleGoNextMonth = useCallback(
        () => setCalendarSeedDate((s) => new Date(s.getFullYear(), s.getMonth() + 1, 1)),
        [setCalendarSeedDate],
      );

      const handleGoPreviousMonth = useCallback(
        () => setCalendarSeedDate((s) => new Date(s.getFullYear(), s.getMonth() - 1, 1)),
        [setCalendarSeedDate],
      );

      const disableGoNextMonth = useMemo(() => {
        if (disabled) return true;
        const firstDateOfNextMonth = new Date(
          calendarSeedDate.getFullYear(),
          calendarSeedDate.getMonth() + 1,
          1,
        );
        return maxTime ? maxTime <= firstDateOfNextMonth.getTime() : false;
      }, [maxTime, calendarSeedDate, disabled]);

      const disableGoPreviousMonth = useMemo(() => {
        if (disabled) return true;
        const lastDateOfPreviousMonth = new Date(
          calendarSeedDate.getFullYear(),
          calendarSeedDate.getMonth(),
          0,
        );
        return minTime ? minTime >= lastDateOfPreviousMonth.getTime() : false;
      }, [minTime, calendarSeedDate, disabled]);

      const handleCalendarFocus = useCallback(
        (event: KeyboardEvent) => {
          const focusedElement = document.activeElement as HTMLElement;
          const focusedDateString = focusedElement?.getAttribute('data-calendar-date');
          if (!focusedDateString || !calendarRef.current?.contains(focusedElement)) return;
          if (
            [
              'ArrowUp',
              'ArrowDown',
              'ArrowLeft',
              'ArrowRight',
              'PageUp',
              'PageDown',
              'Home',
              'End',
            ].includes(event.key)
          )
            event.preventDefault();
          const [year, month, day] = focusedDateString.split('-').map((s) => parseInt(s, 10));
          const focusedDate = new Date(year, month - 1, day);
          let newFocusDate: Date | null = null;
          if (event.key === 'ArrowUp') newFocusDate = new Date(year, month - 1, day - 7);
          if (event.key === 'ArrowDown') newFocusDate = new Date(year, month - 1, day + 7);
          if (event.key === 'ArrowLeft') newFocusDate = new Date(year, month - 1, day - 1);
          if (event.key === 'ArrowRight') newFocusDate = new Date(year, month - 1, day + 1);
          if (event.key === 'Home')
            newFocusDate = new Date(year, month - 1, day - focusedDate.getDay());
          if (event.key === 'End')
            newFocusDate = new Date(year, month - 1, day + (6 - focusedDate.getDay()));

          if (event.key === 'PageUp') {
            newFocusDate = event.shiftKey
              ? getDateWithOffset(year, month, day, 0, -1)
              : getDateWithOffset(year, month, day, -1, 0);
          }

          if (event.key === 'PageDown') {
            newFocusDate = event.shiftKey
              ? getDateWithOffset(year, month, day, 0, 1)
              : getDateWithOffset(year, month, day, 1, 0);
          }

          // Prevent keyboard focus navigation past minDate and maxDate months
          if (
            !newFocusDate ||
            (minDate &&
              (newFocusDate.getMonth() < minDate.getMonth() ||
                newFocusDate.getFullYear() < minDate.getFullYear())) ||
            (maxDate &&
              (newFocusDate.getMonth() > maxDate.getMonth() ||
                newFocusDate.getFullYear() > maxDate.getFullYear()))
          )
            return;
          if (
            newFocusDate.getMonth() !== focusedDate.getMonth() ||
            newFocusDate.getFullYear() !== focusedDate.getFullYear()
          )
            setCalendarSeedDate(newFocusDate);
          setTimeout(() => {
            const dateString = newFocusDate && getISOStringLocal(newFocusDate);
            calendarRef.current
              ?.querySelector<HTMLElement>(`[data-calendar-date="${dateString}"]`)
              ?.focus();
          }, 1);
        },
        [minDate, maxDate, setCalendarSeedDate],
      );

      useEffect(() => {
        window.addEventListener('keydown', handleCalendarFocus);
        return () => window.removeEventListener('keydown', handleCalendarFocus);
      }, [handleCalendarFocus]);

      return (
        <VStack
          ref={calendarRef}
          background="bg"
          borderRadius={400}
          className={cx(calendarClassNames.root, className, classNames?.root)}
          opacity={disabled ? accessibleOpacityDisabled : undefined}
          overflow="auto"
          padding={2}
          style={{ ...style, ...styles?.root }}
          width={360}
          {...props}
        >
          <HStack
            alignItems="center"
            className={cx(calendarClassNames.header, classNames?.header)}
            justifyContent="space-between"
            paddingBottom={2}
            paddingX={1.5}
            style={styles?.header}
          >
            <Text
              as="h3"
              className={cx(calendarClassNames.title, classNames?.title)}
              display="block"
              font="headline"
              style={styles?.title}
            >
              {calendarSeedDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </Text>
            {!hideControls && (
              <HStack
                className={cx(calendarClassNames.navigation, classNames?.navigation)}
                gap={1}
                marginEnd={-1}
                style={styles?.navigation}
              >
                <CalendarPressable
                  accessibilityLabel={previousArrowAccessibilityLabel}
                  background="bg"
                  disabled={disableGoPreviousMonth}
                  onClick={disableGoPreviousMonth ? undefined : handleGoPreviousMonth}
                >
                  <Icon color="fg" name="backArrow" size="s" />
                </CalendarPressable>
                <CalendarPressable
                  accessibilityLabel={nextArrowAccessibilityLabel}
                  background="bg"
                  disabled={disableGoNextMonth}
                  onClick={disableGoNextMonth ? undefined : handleGoNextMonth}
                >
                  <Icon color="fg" name="forwardArrow" size="s" />
                </CalendarPressable>
              </HStack>
            )}
          </HStack>
          <Grid
            className={cx(calendarClassNames.content, classNames?.content)}
            gap={1}
            justifyContent="space-between"
            style={styles?.content}
            templateColumns={`repeat(7, ${CALENDAR_DAY_DIMENSION}px)`}
          >
            {daysOfWeek.map((day) => (
              <VStack
                key={day}
                alignItems="center"
                height={CALENDAR_DAY_DIMENSION}
                justifyContent="center"
                width={CALENDAR_DAY_DIMENSION}
              >
                <Text font="body" userSelect="none">
                  {day.charAt(0)}
                </Text>
              </VStack>
            ))}
            {calendarMonth.map((date) => {
              const time = date.getTime();
              return (
                <CalendarDay
                  key={time}
                  active={time === selectedTime}
                  className={cx(calendarClassNames.day, classNames?.day)}
                  date={date}
                  disabled={
                    disabled ||
                    (minTime && time < minTime) ||
                    (maxTime && time > maxTime) ||
                    disabledTimes.includes(time)
                  }
                  disabledError={disabledDateError}
                  highlighted={highlightedTimes.includes(time)}
                  highlightedDateAccessibilityHint={highlightedDateAccessibilityHint}
                  isCurrentMonth={date.getMonth() === calendarSeedDate.getMonth()}
                  isToday={time === today.getTime()}
                  onClick={onPressDate}
                  style={styles?.day}
                />
              );
            })}
          </Grid>
        </VStack>
      );
    },
  ),
);
