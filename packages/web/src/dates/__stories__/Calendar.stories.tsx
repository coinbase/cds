import React, { useState } from 'react';

import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Calendar } from '../Calendar';

import { Note } from './Note';

export default {
  title: 'Components/Dates/Calendar',
  component: Calendar,
};

const today = new Date(new Date(2024, 7, 18).setHours(0, 0, 0, 0));
const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
const twoDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
const oneWeekLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
const nextMonth15th = new Date(today.getFullYear(), today.getMonth() + 1, 15);
const lastMonth15th = new Date(today.getFullYear(), today.getMonth() - 1, 15);

const exampleProps = {
  maxDate: nextMonth15th,
  minDate: lastMonth15th,
  disabledDateError: 'Date unavailable',
};

export const Examples = () => {
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(today);
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(today);
  return (
    <VStack gap={8}>
      <VStack>
        <Note>Calendar</Note>
        <Calendar {...exampleProps} onPressDate={setSelectedDate1} selectedDate={selectedDate1} />
      </VStack>
      <VStack>
        <Note>Calendar dark mode</Note>
        <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
          <Calendar {...exampleProps} onPressDate={setSelectedDate2} selectedDate={selectedDate2} />
        </ThemeProvider>
      </VStack>
      <Box height={100} />
    </VStack>
  );
};

Examples.parameters = { a11y: { disable: true } };

export const Props = () => (
  <VStack gap={8}>
    <VStack>
      <Note>Calendar with no props</Note>
      <Calendar selectedDate={today} />
    </VStack>
    <VStack>
      <Note>Calendar with seedDate</Note>
      <Calendar seedDate={lastMonth15th} selectedDate={today} />
    </VStack>
    <VStack>
      <Note>Calendar with selectedDate</Note>
      <Calendar selectedDate={today} />
    </VStack>
    <VStack>
      <Note>Calendar with disabledDates and disabledDateError</Note>
      <Calendar
        disabledDateError="Date unavailable"
        disabledDates={[[oneWeekAgo, twoDaysAgo], today, oneWeekLater]}
        selectedDate={today}
      />
    </VStack>
    <VStack>
      <Note>Calendar with minDate, maxDate, and disabledDateError</Note>
      <Calendar
        disabledDateError="Date unavailable"
        maxDate={nextMonth15th}
        minDate={lastMonth15th}
        selectedDate={today}
      />
    </VStack>
    <VStack>
      <Note>Calendar with highlightedDates</Note>
      <Calendar
        highlightedDates={[[oneWeekAgo, twoDaysAgo], today, oneWeekLater]}
        selectedDate={today}
      />
    </VStack>
    <VStack>
      <Note>Calendar with disabledDates, highlightedDates, and disabledDateError</Note>
      <Calendar
        disabledDateError="Date unavailable"
        disabledDates={[[oneWeekAgo, twoDaysAgo], today, oneWeekLater]}
        highlightedDates={[[oneWeekAgo, twoDaysAgo], today, oneWeekLater]}
        selectedDate={today}
      />
    </VStack>
    <VStack>
      <Note>Calendar with hideControls</Note>
      <Calendar hideControls selectedDate={today} />
    </VStack>
    <VStack>
      <Note>Calendar when disabled</Note>
      <Calendar disabled selectedDate={today} />
    </VStack>
    <Box height={100} />
  </VStack>
);

Props.parameters = { a11y: { disable: true } };

export const SlotStyling = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  return (
    <>
      <style>{`
        .cds-Calendar-day[aria-pressed="true"] {
          background-color: var(--color-bgWarning);
          border-color: var(--color-bgWarning);
        }
        .cds-Calendar-day[aria-current="date"] {
          border-color: var(--color-accentBoldYellow);
        }
        .cds-Calendar-day[aria-disabled="true"] {
          background-color: var(--color-bgDisabled);
          border-color: var(--color-bgDisabled);
        }
        .cds-Calendar-day[aria-disabled="true"] span {
          color: var(--color-bgPositive);
        }
        .cds-Calendar-day[data-highlight="true"] {
          background-color: var(--color-bgPositiveWash);
          border-color: var(--color-bgPositive);
        }
        .cds-Calendar-day[data-highlight="true"] span {
          color: var(--color-fg);
        }
      `}</style>
      <VStack>
        <Note>Calendar with classNames and styles</Note>
        <Calendar
          {...exampleProps}
          disabledDates={[twoDaysAgo]}
          highlightedDates={[tomorrow]}
          onPressDate={setSelectedDate}
          selectedDate={selectedDate}
          styles={{
            root: {
              backgroundColor: 'var(--color-bgAlternate)',
              borderRadius: 16,
              borderColor: 'var(--color-bgLinePrimary)',
              borderWidth: 'medium',
            },
            header: {
              paddingBottom: 0,
              backgroundColor: 'var(--color-bgPositiveWash)',
              borderRadius: 16,
            },
            content: { paddingBottom: 8, paddingTop: 8 },
            day: { borderRadius: 8 },
          }}
        />
      </VStack>
    </>
  );
};

SlotStyling.parameters = { a11y: { disable: true } };
