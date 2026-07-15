import React, { useState } from 'react';
import { type DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';
import type { Meta, StoryObj } from '@storybook/react';

import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { DatePicker, type DatePickerProps } from '../DatePicker';

const meta: Meta = {
  title: 'Components/Dates/DatePickerSize',
  component: DatePicker,
};

export default meta;
type Story = StoryObj;

const exampleProps = {
  invalidDateError: 'Please enter a valid date',
  disabledDateError: 'Date unavailable',
  requiredError: 'This field is required',
};

const ExampleDatePicker = ({
  date,
  ...props
}: { date?: Date | null } & Omit<
  DatePickerProps,
  'date' | 'error' | 'onChangeDate' | 'onErrorDate'
>) => {
  const [dateValue, setDateValue] = useState<Date | null>(date ?? null);
  const [error, setError] = useState<DateInputValidationError | null>(null);

  return (
    <DatePicker
      {...exampleProps}
      {...props}
      date={dateValue}
      error={error}
      onChangeDate={setDateValue}
      onErrorDate={setError}
    />
  );
};

const LabeledExample = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <VStack alignItems="flex-start" gap={1}>
    <Text as="p" color="fgMuted" font="label2">
      {title}
    </Text>
    {children}
  </VStack>
);

/**
 * One-off t-shirt size stories for DatePicker (s/m/l).
 * Do not fold these into DatePicker.stories.tsx — keeps visual review of sizing isolated.
 */
export const Size: Story = {
  render: () => (
    <VStack gap={3} maxWidth={400}>
      <LabeledExample title="Default (resolves to size l)">
        <ExampleDatePicker label="Default" />
      </LabeledExample>
      <LabeledExample title="Deprecated compact (renders as size s)">
        <ExampleDatePicker compact label="Compact" />
      </LabeledExample>
      <LabeledExample title='size="s"'>
        <ExampleDatePicker label="Small" size="s" />
      </LabeledExample>
      <LabeledExample title='size="m"'>
        <ExampleDatePicker label="Medium" size="m" />
      </LabeledExample>
      <LabeledExample title='size="l"'>
        <ExampleDatePicker label="Large" size="l" />
      </LabeledExample>
      <LabeledExample title='compact + size="m" (size wins)'>
        <ExampleDatePicker compact label="Size wins" size="m" />
      </LabeledExample>
    </VStack>
  ),
};
