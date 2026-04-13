import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  type StyleProp,
  StyleSheet,
  type TextStyle,
  type View,
  type ViewStyle,
} from 'react-native';
import { generateCalendarMonth } from '@coinbase/cds-common/dates/generateCalendarMonth';
import { getMidnightDate } from '@coinbase/cds-common/dates/getMidnightDate';
import { getTimesFromDatesAndRanges } from '@coinbase/cds-common/dates/getTimesFromDatesAndRanges';
import { useLocale } from '@coinbase/cds-common/system/LocaleProvider';
import { accessibleOpacityDisabled } from '@coinbase/cds-common/tokens/interactable';
import type { SharedProps } from '@coinbase/cds-common/types';

import { useA11y } from '../hooks/useA11y';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { useScreenReaderStatus } from '../hooks/useScreenReaderStatus';
import { Icon } from '../icons/Icon';
import { Box, type BoxBaseProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack, type VStackProps } from '../layout/VStack';
import { Tooltip } from '../overlays/tooltip/Tooltip';
import { Pressable, type PressableBaseProps } from '../system/Pressable';
import { Text } from '../typography/Text';

const CALENDAR_DAY_DIMENSION = 40;

// These could be dynamically generated, but our Calendar and DatePicker aren't localized so there's no point
const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

export type CalendarPressableBaseProps = PressableBaseProps & {
  borderRadius?: number;
  width?: number;
  height?: number;
  background?: 'transparent' | 'bg' | 'bgPrimary';
};

const CalendarPressable = memo(
  forwardRef<View, CalendarPressableBaseProps>(
    ({ background = 'transparent', borderRadius = 1000, children, ...props }, ref) => {
      return (
        <Pressable
          ref={ref}
          background={background}
          borderRadius={borderRadius}
          contentStyle={styles.pressable}
          height={CALENDAR_DAY_DIMENSION}
          width={CALENDAR_DAY_DIMENSION}
          {...props}
        >
          {children}
        </Pressable>
      );
    },
  ),
);

CalendarPressable.displayName = 'CalendarPressable';

export type CalendarDayProps = {
  /** Date of this CalendarDay. */
  date: Date;
  /** Callback function fired when pressing this CalendarDay. */
  onPress?: (date: Date) => void;
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
  /** Accessibility hint for the current day when it is not disabled. */
  todayAccessibilityHint?: string;
  /** Accessibility hint announced for highlighted dates. */
  highlightedDateAccessibilityHint?: string;
  /** Custom style for the date cell pressable wrapper */
  style?: StyleProp<ViewStyle>;
};

const getDayAccessibilityLabel = (date: Date, locale = 'en-US') =>
  `${date.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
  })} ${date.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  })}`;

const CalendarDay = memo(
  forwardRef<View, CalendarDayProps>(
    (
      {
        date,
        active,
        disabled,
        highlighted,
        isToday,
        isCurrentMonth,
        onPress,
        disabledError,
        todayAccessibilityHint,
        highlightedDateAccessibilityHint,
        style,
      },
      ref,
    ) => {
      const { locale } = useLocale();
      const handlePress = useCallback(() => onPress?.(date), [date, onPress]);
      const accessibilityLabel = useMemo(
        () => getDayAccessibilityLabel(date, locale),
        [date, locale],
      );
      const accessibilityState = useMemo(
        () => ({ disabled: !!disabled, selected: !!active }),
        [disabled, active],
      );

      // Period between phrases gives screen readers a clear pause (e.g. "Today. Date unavailable").
      const accessibilityHint = useMemo(() => {
        const hints = [
          isToday ? todayAccessibilityHint : undefined,
          highlighted ? highlightedDateAccessibilityHint : undefined,
          disabled ? disabledError : undefined,
        ]
          .filter(Boolean)
          .join('. ');
        return hints || undefined;
      }, [
        disabled,
        highlighted,
        isToday,
        todayAccessibilityHint,
        highlightedDateAccessibilityHint,
        disabledError,
      ]);

      const isScreenReaderEnabled = useScreenReaderStatus();

      // Expose disabled to the tooltip's accessibilityState so screen readers on both platforms
      // announce the day button as disabled. We only set disabled when a screen reader is active:
      // on some platforms a11y disabled is equivalent to the top-level disabled prop, so always
      // setting it would block tooltip interactivity for users not using SRs.
      const tooltipAccessibilityState = useMemo(
        () => ({ disabled: isScreenReaderEnabled }),
        [isScreenReaderEnabled],
      );

      if (!isCurrentMonth) {
        return (
          <Box aria-hidden={true} height={CALENDAR_DAY_DIMENSION} width={CALENDAR_DAY_DIMENSION} />
        );
      }

      const dayButton = (
        <CalendarPressable
          ref={ref}
          accessibilityHint={accessibilityHint}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="button"
          accessibilityState={accessibilityState}
          background={active && !disabled ? 'bgPrimary' : undefined}
          borderColor={isToday ? 'bgPrimary' : undefined}
          bordered={isToday}
          disabled={disabled}
          feedback={disabled ? 'none' : 'light'}
          onPress={handlePress}
          style={style}
        >
          <Text
            accessible={false}
            align="center"
            color={active && !disabled ? 'fgInverse' : highlighted ? 'fgPrimary' : undefined}
            font="body"
          >
            {date.getDate()}
          </Text>
        </CalendarPressable>
      );

      if (disabled) {
        return (
          <Tooltip
            accessibilityHint={accessibilityHint}
            accessibilityLabel={accessibilityLabel}
            accessibilityState={tooltipAccessibilityState}
            content={disabledError}
          >
            {dayButton}
          </Tooltip>
        );
      }

      return dayButton;
    },
  ),
);

CalendarDay.displayName = 'CalendarDay';

export type CalendarRefHandle = {
  /** Sets accessibility focus on the selected date, seed date, or today. */
  focusInitialDate: () => void;
};

export type CalendarBaseProps = SharedProps &
  Omit<BoxBaseProps, 'children'> & {
    /** Currently selected Calendar date. Date used to generate the Calendar month. Will be rendered with active styles. */
    selectedDate?: Date | null;
    /** Date used to generate the Calendar month when there is no value for the `selectedDate` prop, defaults to today. */
    seedDate?: Date;
    /** Callback function fired when pressing a Calendar date. */
    onPressDate?: (date: Date) => void;
    /** Disables user interaction. */
    disabled?: boolean;
    /** Hides the Calendar next and previous month arrows. This probably only makes sense to be used when `minDate` and `maxDate` are set to the first and last days of the same month. */
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
     * Accessibility hint for the current day when it is not disabled. Omit or leave default for non-localized usage.
     * @default 'Today'
     */
    todayAccessibilityHint?: string;
    /**
     * Accessibility hint announced for highlighted dates. Applied to all highlighted dates.
     * @default 'Highlighted'
     */
    highlightedDateAccessibilityHint?: string;
  };

export type CalendarProps = CalendarBaseProps &
  Omit<VStackProps, 'children' | 'ref'> & {
    /** Custom styles for individual elements of the Calendar component. */
    styles?: {
      /** Root container element */
      root?: StyleProp<ViewStyle>;
      /** Header row containing month label and navigation arrows */
      header?: StyleProp<ViewStyle>;
      /** Month and year title text element */
      title?: StyleProp<TextStyle>;
      /** Navigation controls element */
      navigation?: StyleProp<ViewStyle>;
      /** Container for the days-of-week header and the date grid */
      content?: StyleProp<ViewStyle>;
      /** Individual date cell element, basic ViewStyle applied to the pressable wrapper */
      day?: StyleProp<ViewStyle>;
    };
  };

export const Calendar = memo(
  forwardRef<CalendarRefHandle, CalendarProps>((_props, ref) => {
    const mergedProps = useComponentConfig('Calendar', _props);
    const {
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
      nextArrowAccessibilityLabel = 'Go to next month',
      previousArrowAccessibilityLabel = 'Go to previous month',
      todayAccessibilityHint = 'Today',
      highlightedDateAccessibilityHint = 'Highlighted',
      style,
      styles,
      ...props
    } = mergedProps;
    const { setA11yFocus, announceForA11y } = useA11y();
    const today = useMemo(() => getMidnightDate(new Date()), []);
    const todayTime = useMemo(() => today.getTime(), [today]);

    // Determine default calendar seed date: use whichever comes first between maxDate and today
    const defaultSeedDate = useMemo<Date>(() => {
      if (selectedDate) {
        return selectedDate;
      }
      if (seedDate) {
        return seedDate;
      }
      if (maxDate) {
        const maxDateTime = getMidnightDate(maxDate).getTime();
        const todayTime = today.getTime();
        return maxDateTime < todayTime ? maxDate : today;
      }
      return today;
    }, [selectedDate, seedDate, maxDate, today]);

    const [calendarSeedDate, setCalendarSeedDate] = useState<Date>(defaultSeedDate);

    const initialFocusRef = useRef<View>(null);
    const calendarMonth = useMemo(
      () => generateCalendarMonth(calendarSeedDate),
      [calendarSeedDate],
    );

    const selectedTime = useMemo(
      () => (selectedDate ? getMidnightDate(selectedDate).getTime() : null),
      [selectedDate],
    );

    const disabledTimes = useMemo(
      () => new Set(getTimesFromDatesAndRanges(disabledDates || [])),
      [disabledDates],
    );

    const focusTargetTime = useMemo(
      () => selectedTime || (seedDate ? getMidnightDate(seedDate).getTime() : null) || todayTime,
      [selectedTime, seedDate, todayTime],
    );

    useImperativeHandle(
      ref,
      () => ({
        focusInitialDate: () => {
          if (disabled || !initialFocusRef.current) {
            return;
          }
          setA11yFocus(initialFocusRef);
        },
      }),
      [disabled, setA11yFocus],
    );

    const minTime = useMemo(() => minDate && getMidnightDate(minDate).getTime(), [minDate]);

    const maxTime = useMemo(() => maxDate && getMidnightDate(maxDate).getTime(), [maxDate]);

    const highlightedTimes = useMemo(
      () => new Set(getTimesFromDatesAndRanges(highlightedDates || [])),
      [highlightedDates],
    );

    const handleGoNextMonth = useCallback(() => {
      setCalendarSeedDate((s) => {
        const next = new Date(s.getFullYear(), s.getMonth() + 1, 1);
        announceForA11y(next.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
        return next;
      });
    }, [setCalendarSeedDate, announceForA11y]);

    const handleGoPreviousMonth = useCallback(() => {
      setCalendarSeedDate((s) => {
        const prev = new Date(s.getFullYear(), s.getMonth() - 1, 1);
        announceForA11y(prev.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
        return prev;
      });
    }, [setCalendarSeedDate, announceForA11y]);

    const disableGoNextMonth = useMemo(() => {
      if (disabled) {
        return true;
      }
      const firstDateOfNextMonth = new Date(
        calendarSeedDate.getFullYear(),
        calendarSeedDate.getMonth() + 1,
        1,
      );
      return maxTime ? maxTime < firstDateOfNextMonth.getTime() : false;
    }, [maxTime, calendarSeedDate, disabled]);

    const disableGoPreviousMonth = useMemo(() => {
      if (disabled) {
        return true;
      }
      const lastDateOfPreviousMonth = new Date(
        calendarSeedDate.getFullYear(),
        calendarSeedDate.getMonth(),
        0,
      );
      return minTime ? minTime > lastDateOfPreviousMonth.getTime() : false;
    }, [minTime, calendarSeedDate, disabled]);

    // Split calendar month into weeks
    const calendarWeeks = useMemo(() => {
      const weeks: [string, Date[]][] = [];
      for (let i = 0; i < calendarMonth.length; i += DAYS_OF_WEEK.length) {
        const weekDates = calendarMonth.slice(i, i + DAYS_OF_WEEK.length);
        weeks.push([`week-${calendarMonth[i].getTime()}`, weekDates]);
      }
      return weeks;
    }, [calendarMonth]);

    const monthYearLabel = useMemo(
      () =>
        calendarSeedDate.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        }),
      [calendarSeedDate],
    );

    const previousArrowAccessibilityState = useMemo(
      () => ({ disabled: !!disableGoPreviousMonth }),
      [disableGoPreviousMonth],
    );
    const nextArrowAccessibilityState = useMemo(
      () => ({ disabled: !!disableGoNextMonth }),
      [disableGoNextMonth],
    );

    return (
      <VStack
        opacity={disabled ? accessibleOpacityDisabled : undefined}
        style={[style, styles?.root]}
        {...props}
      >
        <HStack
          alignItems="center"
          justifyContent="space-between"
          paddingBottom={2}
          paddingStart={1.5}
          style={styles?.header}
        >
          <Text accessibilityRole="header" font="headline" style={styles?.title}>
            {monthYearLabel}
          </Text>
          {!hideControls && (
            <HStack gap={1} style={styles?.navigation}>
              <CalendarPressable
                accessibilityLabel={previousArrowAccessibilityLabel}
                accessibilityRole="button"
                accessibilityState={previousArrowAccessibilityState}
                disabled={disableGoPreviousMonth}
                feedback="light"
                onPress={disableGoPreviousMonth ? undefined : handleGoPreviousMonth}
              >
                <Icon color="fg" name="backArrow" size="s" />
              </CalendarPressable>
              <CalendarPressable
                accessibilityLabel={nextArrowAccessibilityLabel}
                accessibilityRole="button"
                accessibilityState={nextArrowAccessibilityState}
                disabled={disableGoNextMonth}
                feedback="light"
                onPress={disableGoNextMonth ? undefined : handleGoNextMonth}
              >
                <Icon color="fg" name="forwardArrow" size="s" />
              </CalendarPressable>
            </HStack>
          )}
        </HStack>

        <VStack gap={1} style={styles?.content}>
          <HStack aria-hidden={true} gap={1} justifyContent="space-between" paddingBottom={1}>
            {DAYS_OF_WEEK.map((day) => (
              <Box
                key={day}
                alignItems="center"
                height={CALENDAR_DAY_DIMENSION}
                justifyContent="center"
                width={CALENDAR_DAY_DIMENSION}
              >
                <Text font="body" userSelect="none">
                  {day.charAt(0)}
                </Text>
              </Box>
            ))}
          </HStack>
          {calendarWeeks.map(([weekId, week]) => (
            <HStack key={weekId} gap={1} justifyContent="space-between">
              {week.map((date) => {
                const time = date.getTime();
                return (
                  <CalendarDay
                    key={time}
                    ref={time === focusTargetTime ? initialFocusRef : undefined}
                    active={time === selectedTime}
                    date={date}
                    disabled={
                      disabled ||
                      (minTime !== undefined && minTime !== null && time < minTime) ||
                      (maxTime !== undefined && maxTime !== null && time > maxTime) ||
                      disabledTimes.has(time)
                    }
                    disabledError={disabledDateError}
                    highlighted={highlightedTimes.has(time)}
                    highlightedDateAccessibilityHint={highlightedDateAccessibilityHint}
                    isCurrentMonth={date.getMonth() === calendarSeedDate.getMonth()}
                    isToday={time === todayTime}
                    onPress={onPressDate}
                    style={styles?.day}
                    todayAccessibilityHint={todayAccessibilityHint}
                  />
                );
              })}
            </HStack>
          ))}
        </VStack>
      </VStack>
    );
  }),
);

Calendar.displayName = 'Calendar';
