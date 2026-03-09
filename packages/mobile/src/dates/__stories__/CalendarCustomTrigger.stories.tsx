import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from '@coinbase/cds-common/system/LocaleProvider';

import { Accordion, AccordionItem } from '../../accordion';
import { Button } from '../../buttons/Button';
import { Chip } from '../../chips';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { Box } from '../../layout';
import { AnimatedCaret } from '../../motion/AnimatedCaret';
import { Tray } from '../../overlays/tray/Tray';
import { Calendar, type CalendarRefHandle } from '../Calendar';

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

const ExampleCalendarChip = () => {
  return (
    <ExampleScreen>
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

export default ExampleCalendarChip;
