import { useState } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { Calendar } from '../Calendar';

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
            calendarDayCell: {
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
    </ExampleScreen>
  );
};

export default CalendarScreen;
