import React, { useState } from 'react';
import { type DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';
import { LocaleProvider } from '@coinbase/cds-common/system/LocaleProvider';

import { InputLabel } from '../../controls/InputLabel';
import { Icon } from '../../icons';
import { HStack } from '../../layout';
import { Group } from '../../layout/Group';
import { VStack } from '../../layout/VStack';
import { Tooltip } from '../../overlays';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { DateInput } from '../DateInput';

import { Note } from './Note';

export default {
  title: 'Components/Dates/DateInput',
  component: DateInput,
};

const today = new Date(new Date(2024, 7, 18).setHours(0, 0, 0, 0));
const oneDayAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

const sharedProps = {
  invalidDateError: 'Please enter a valid date',
  disabledDateError: 'Date unavailable',
  requiredError: 'This field is required',
};

export const Examples = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const props = { date, onChangeDate: setDate, error, onErrorDate: setError };
  return (
    <Group gap={8} paddingEnd={8}>
      <VStack>
        <Note>DateInput</Note>
        <DateInput required {...sharedProps} {...props} />
      </VStack>
      <VStack>
        <Note>DateInput ES-es locale</Note>
        <LocaleProvider locale="ES-es">
          <DateInput {...sharedProps} {...props} />
        </LocaleProvider>
      </VStack>
      <VStack>
        <Note>DateInput dark mode</Note>
        <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
          <DateInput {...sharedProps} {...props} />
        </ThemeProvider>
      </VStack>
      <VStack>
        <Note>DateInput compact</Note>
        <DateInput compact {...sharedProps} {...props} />
      </VStack>
    </Group>
  );
};

Examples.parameters = { a11y: { disable: true } };

export const Props = () => {
  const [date, setDate] = useState<Date | null>(today);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const props = { date, onChangeDate: setDate, error, onErrorDate: setError };
  return (
    <Group gap={8} paddingEnd={8}>
      <VStack>
        <Note>
          DateInput with invalidDateError (always required)
          <br />
          <br />
          Enter an impossible month or day number to see the result
        </Note>
        <DateInput {...sharedProps} {...props} />
      </VStack>
      <VStack>
        <Note>DateInput with date</Note>
        <DateInput {...sharedProps} {...props} />
      </VStack>
      <VStack>
        <Note>
          DateInput with disabledDates and disabledDateError
          <br />
          <br />
          Enter the date of Aug 18, 2024 to see the result
        </Note>
        <DateInput {...sharedProps} {...props} disabledDates={[today]} />
      </VStack>
      <VStack>
        <Note>
          DateInput with minDate, maxDate, and disabledDateError
          <br />
          <br />
          Enter a date several days before or after Aug 18, 2024 to see the result
        </Note>
        <DateInput {...sharedProps} {...props} maxDate={today} minDate={oneDayAgo} />
      </VStack>
      <VStack>
        <Note>DateInput with separator</Note>
        <DateInput {...sharedProps} {...props} separator="-" />
      </VStack>
      <VStack>
        <Note>DateInput with labelNode</Note>
        <DateInput
          {...sharedProps}
          {...props}
          accessibilityLabel="Date of birth"
          labelNode={
            <InputLabel>
              <HStack alignItems="center" gap={1}>
                Date of birth
                <Tooltip content="This will be visible to other users.">
                  <Icon active color="fg" name="info" size="xs" tabIndex={0} />
                </Tooltip>
              </HStack>
            </InputLabel>
          }
        />
      </VStack>
      <VStack>
        <Note>DateInput with start, end, and placeholder</Note>
        <DateInput
          {...sharedProps}
          {...props}
          end={<Icon active name="camera" padding={2} size="m" />}
          placeholder="Hello world"
          start={<Icon name="blockchain" padding={2} size="m" />}
        />
      </VStack>
      <VStack>
        <Note>DateInput with disabled</Note>
        <DateInput disabled {...sharedProps} {...props} />
      </VStack>
      <VStack>
        <Note>DateInput with required</Note>
        <DateInput required {...sharedProps} {...props} />
      </VStack>
    </Group>
  );
};

Props.parameters = { a11y: { disable: true } };

export const CustomLabel = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const props = { date, onChangeDate: setDate, error, onErrorDate: setError };
  return (
    <VStack gap={2}>
      {/* Default with tooltip */}
      <DateInput
        {...sharedProps}
        {...props}
        accessibilityLabel="Date of birth"
        id="dob-tooltip"
        labelNode={
          <InputLabel htmlFor="dob-tooltip">
            <HStack alignItems="center" gap={1}>
              Date of birth
              <Tooltip content="This will be visible to other users.">
                <Icon active color="fg" name="info" size="xs" tabIndex={0} />
              </Tooltip>
            </HStack>
          </InputLabel>
        }
      />
      {/* Compact with required indicator */}
      <DateInput
        compact
        {...sharedProps}
        {...props}
        accessibilityLabel="Start date"
        labelNode={
          <InputLabel>
            <HStack alignItems="center" gap={0.5}>
              Start date
              <span style={{ color: 'var(--color-fgNegative)' }}>*</span>
            </HStack>
          </InputLabel>
        }
      />
      {/* Inside variant with optional indicator */}
      <DateInput
        {...sharedProps}
        {...props}
        accessibilityLabel="End date"
        id="end-date-inside"
        labelNode={
          <InputLabel htmlFor="end-date-inside" paddingY={0}>
            <HStack alignItems="center" gap={1}>
              End date
              <span style={{ color: 'var(--color-fgMuted)', fontSize: 'var(--font-legal)' }}>
                (optional)
              </span>
            </HStack>
          </InputLabel>
        }
        labelVariant="inside"
      />
    </VStack>
  );
};

CustomLabel.parameters = { a11y: { disable: true } };
