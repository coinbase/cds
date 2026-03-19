import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from '@coinbase/cds-common/system/LocaleProvider';

import { Accordion, AccordionItem } from '../../accordion';
import { Button } from '../../buttons/Button';
import { Chip } from '../../chips';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { Icon } from '../../icons';
import { Box } from '../../layout';
import { AnimatedCaret } from '../../motion/AnimatedCaret';
import { Tray } from '../../overlays/tray/Tray';
import { Calendar, type CalendarRefHandle } from '../Calendar';

const today = new Date(new Date().setHours(0, 0, 0, 0));
const nextMonth15th = new Date(today.getFullYear(), today.getMonth() + 1, 15);
const lastMonth15th = new Date(today.getFullYear(), today.getMonth() - 1, 15);
const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
const twoDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);

// Generate all weekend date ranges for a wide range (10 years before and after)
const getWeekendDates = (centerDate: Date): [Date, Date][] => {
  const weekends: [Date, Date][] = [];

  // Cover 10 years before and after to ensure all weekends are disabled
  const startDate = new Date(centerDate.getFullYear() - 10, 0, 1);
  const endDate = new Date(centerDate.getFullYear() + 10, 11, 31);

  // Find the first Saturday in the range
  const currentDate = new Date(startDate);
  const dayOfWeek = currentDate.getDay();
  const daysUntilSaturday = dayOfWeek === 6 ? 0 : (6 - dayOfWeek + 7) % 7;
  currentDate.setDate(currentDate.getDate() + daysUntilSaturday);

  // Iterate through weekends, jumping 7 days at a time
  while (currentDate <= endDate) {
    const saturday = new Date(currentDate);
    const sunday = new Date(currentDate);
    sunday.setDate(sunday.getDate() + 1);

    // Add the weekend as a date range tuple
    weekends.push([saturday, sunday]);

    // Jump to next Saturday (7 days later)
    currentDate.setDate(currentDate.getDate() + 7);
  }

  return weekends;
};

// Compute weekends once at module level
const disabledWeekend = getWeekendDates(today);

const DATE_ACCORDION_ITEM_KEY = 'date';

const formatDateLabel = (date: Date | null, locale: string): string => {
  if (!date) {
    return 'Select date';
  }
  return date.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

type CalendarTrayTriggerProps = {
  formattedLabel: string;
  onOpen: () => void;
  showPicker: boolean;
};

const CalendarTrayExample = memo(function CalendarTrayExample({
  renderTrigger,
}: {
  renderTrigger: (props: CalendarTrayTriggerProps) => React.ReactNode;
}) {
  const { locale } = useLocale();
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [calendarSelectedDate, setCalendarSelectedDate] = useState<Date | null>(null);
  const calendarRef = useRef<CalendarRefHandle>(null);

  const handleOpenPicker = useCallback(() => {
    setCalendarSelectedDate(date);
    setShowPicker(true);
  }, [date]);

  const handleClosePicker = useCallback(() => {
    setShowPicker(false);
  }, []);

  const handleCancelPicker = useCallback(() => {
    setCalendarSelectedDate(null);
    handleClosePicker();
  }, [handleClosePicker]);

  const handleCalendarDatePress = useCallback((selectedDate: Date) => {
    setCalendarSelectedDate(selectedDate);
  }, []);

  const handleModalShow = useCallback(() => {
    calendarRef.current?.focusInitialDate();
  }, []);

  const handleConfirmCalendar = useCallback(() => {
    if (calendarSelectedDate) {
      setDate(calendarSelectedDate);
      handleClosePicker();
    }
  }, [calendarSelectedDate, handleClosePicker]);

  const trayFooter = useMemo(
    () => (
      <Box paddingTop={3} paddingX={3}>
        <Button
          block
          compact
          accessibilityHint={!calendarSelectedDate ? 'Select a date first' : undefined}
          accessibilityLabel="Confirm date selection"
          disabled={!calendarSelectedDate}
          onPress={handleConfirmCalendar}
        >
          Confirm
        </Button>
      </Box>
    ),
    [calendarSelectedDate, handleConfirmCalendar],
  );

  const formattedLabel = formatDateLabel(date, locale);

  const triggerProps = useMemo<CalendarTrayTriggerProps>(
    () => ({
      formattedLabel,
      onOpen: handleOpenPicker,
      showPicker,
    }),
    [formattedLabel, handleOpenPicker, showPicker],
  );

  return (
    <>
      {renderTrigger(triggerProps)}
      {showPicker && (
        <Tray
          accessibilityRole="none"
          footer={trayFooter}
          handleBarAccessibilityLabel="Close calendar"
          handleBarVariant="inside"
          onCloseComplete={handleCancelPicker}
          onOpenComplete={handleModalShow}
        >
          <Calendar
            ref={calendarRef}
            onPressDate={handleCalendarDatePress}
            paddingBottom={2}
            paddingX={2}
            selectedDate={calendarSelectedDate}
          />
        </Tray>
      )}
    </>
  );
});

const CalendarChipWithTrayExample = () => {
  const renderTrigger = useCallback(
    ({ formattedLabel, onOpen, showPicker }: CalendarTrayTriggerProps) => (
      <Box alignSelf="flex-start">
        <Chip
          compact
          accessibilityLabel={formattedLabel}
          end={<AnimatedCaret active color="fg" rotate={showPicker ? 0 : 180} size="xs" />}
          onPress={onOpen}
        >
          {formattedLabel}
        </Chip>
      </Box>
    ),
    [],
  );
  return <CalendarTrayExample renderTrigger={renderTrigger} />;
};

const CalendarChipWithTrayButtonExample = () => {
  const renderTrigger = useCallback(
    ({ formattedLabel, onOpen }: CalendarTrayTriggerProps) => (
      <Button compact accessibilityLabel={formattedLabel} onPress={onOpen}>
        {formattedLabel}
      </Button>
    ),
    [],
  );
  return <CalendarTrayExample renderTrigger={renderTrigger} />;
};

const CalendarAccordionExample = () => {
  const { locale } = useLocale();
  const [date, setDate] = useState<Date | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const expanded = activeKey === DATE_ACCORDION_ITEM_KEY;
  const calendarRef = useRef<CalendarRefHandle>(null);

  const handleDatePress = useCallback((selectedDate: Date) => {
    setDate(selectedDate);
    setActiveKey(null);
  }, []);

  useEffect(() => {
    if (expanded) {
      const id = requestAnimationFrame(() => {
        calendarRef.current?.focusInitialDate();
      });
      return () => cancelAnimationFrame(id);
    }
  }, [expanded]);

  return (
    <Accordion activeKey={activeKey} setActiveKey={setActiveKey}>
      <AccordionItem
        itemKey={DATE_ACCORDION_ITEM_KEY}
        media={<Icon color="fg" name="calendarEmpty" />}
        subtitle={formatDateLabel(date, locale)}
        title="Date"
      >
        {expanded ? (
          <Calendar ref={calendarRef} onPressDate={handleDatePress} selectedDate={date} />
        ) : null}
      </AccordionItem>
    </Accordion>
  );
};

const CalendarScreen = () => {
  const [basicDate, setBasicDate] = useState<Date | null>(today);
  const [noSelectionDate, setNoSelectionDate] = useState<Date | null>(null);
  const [seedDateDate, setSeedDateDate] = useState<Date | null>(null);
  const [minMaxDate, setMinMaxDate] = useState<Date | null>(today);
  const [futureDatesDate, setFutureDatesDate] = useState<Date | null>(null);
  const [highlightedDate, setHighlightedDate] = useState<Date | null>(today);
  const [disabledDatesDate, setDisabledDatesDate] = useState<Date | null>(null);
  const [rangeDate, setRangeDate] = useState<Date | null>(today);
  const [hiddenControlsDate, setHiddenControlsDate] = useState<Date | null>(today);

  const highlightedRange: [Date, Date] = [yesterday, nextWeek];
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const { color } = useTheme();

  return (
    <ExampleScreen>
      <Example title="Basic">
        <Calendar onPressDate={setBasicDate} selectedDate={basicDate} />
      </Example>

      <Example title="No selection">
        <Calendar onPressDate={setNoSelectionDate} selectedDate={noSelectionDate} />
      </Example>

      <Example title="With seedDate (different month)">
        <Calendar
          onPressDate={setSeedDateDate}
          seedDate={nextMonth15th}
          selectedDate={seedDateDate}
        />
      </Example>

      <Example title="With min/max dates">
        <Calendar
          disabledDateError="Date is outside allowed range"
          maxDate={nextMonth15th}
          minDate={lastMonth15th}
          onPressDate={setMinMaxDate}
          selectedDate={minMaxDate}
        />
      </Example>

      <Example title="Future dates only">
        <Calendar
          disabledDateError="Past dates are not available"
          minDate={today}
          onPressDate={setFutureDatesDate}
          selectedDate={futureDatesDate}
        />
      </Example>

      <Example title="With highlighted dates">
        <Calendar
          highlightedDates={[yesterday, today, nextWeek]}
          onPressDate={setHighlightedDate}
          selectedDate={highlightedDate}
        />
      </Example>

      <Example title="With disabled dates">
        <Calendar
          disabledDateError="Weekends are not available"
          disabledDates={disabledWeekend}
          onPressDate={setDisabledDatesDate}
          seedDate={today}
          selectedDate={disabledDatesDate}
        />
      </Example>

      <Example title="With date range">
        <Calendar
          highlightedDates={[highlightedRange]}
          onPressDate={setRangeDate}
          selectedDate={rangeDate}
        />
      </Example>

      <Example title="Hidden controls">
        <Calendar
          hideControls
          maxDate={lastDayOfMonth}
          minDate={firstDayOfMonth}
          onPressDate={setHiddenControlsDate}
          selectedDate={hiddenControlsDate}
        />
      </Example>

      <Example title="Disabled">
        <Calendar disabled selectedDate={today} />
      </Example>

      <Example title="Slot styling">
        <Calendar
          disabledDateError="Date unavailable"
          disabledDates={[twoDaysAgo]}
          highlightedDates={[tomorrow]}
          maxDate={nextMonth15th}
          minDate={lastMonth15th}
          onPressDate={setBasicDate}
          selectedDate={basicDate}
          styles={{
            root: {
              borderColor: color.bgLineHeavy,
              borderRadius: 16,
              borderWidth: 1,
              padding: 12,
            },
            header: {
              backgroundColor: color.bgPositiveWash,
              borderRadius: 16,
              paddingBottom: 0,
            },
            content: { paddingVertical: 8 },
            day: {
              borderColor: color.bgNegative,
              borderWidth: 1,
            },
            navigation: {
              borderColor: color.bgLineHeavy,
              borderRadius: 8,
              borderStyle: 'dashed',
              borderWidth: 1,
            },
          }}
        />
      </Example>

      <Example title="With tray (Chip trigger)">
        <CalendarChipWithTrayExample />
      </Example>

      <Example title="With tray (Button trigger)">
        <CalendarChipWithTrayButtonExample />
      </Example>

      <Example title="With Accordion (select to collapse)">
        <CalendarAccordionExample />
      </Example>
    </ExampleScreen>
  );
};

export default CalendarScreen;
