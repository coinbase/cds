import React, { useState } from 'react';
import type { DateInputValidationError } from '@coinbase/cds-common/dates/DateInputValidationError';
import { LocaleProvider } from '@coinbase/cds-common/system/LocaleProvider';

import { InputLabel } from '../../controls/InputLabel';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { HStack } from '../../layout';
import { Group } from '../../layout/Group';
import { Tooltip } from '../../overlays';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { DateInput } from '../DateInput';

const today = new Date(new Date(2024, 7, 18).setHours(0, 0, 0, 0));
const oneDayAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

const sharedProps = {
  invalidDateError: 'Please enter a valid date',
  disabledDateError: 'Date unavailable',
  requiredError: 'This field is required',
};

export const Examples = () => {
  const [date, setDate] = useState<Date | null>(today);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const props = { date, onChangeDate: setDate, error, onErrorDate: setError };
  return (
    <ExampleScreen>
      <Example>
        <Group gap={8} paddingEnd={8}>
          <DateInput {...sharedProps} {...props} />
          <LocaleProvider locale="ES-es">
            <DateInput {...sharedProps} {...props} />
          </LocaleProvider>
          <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
            <DateInput {...sharedProps} {...props} />
          </ThemeProvider>
          <DateInput compact {...sharedProps} {...props} />
          <DateInput {...sharedProps} {...props} maxDate={today} minDate={oneDayAgo} />
          <DateInput {...sharedProps} {...props} separator="-" />
          <DateInput
            {...sharedProps}
            {...props}
            label="Date of birth"
            labelNode={
              <HStack alignItems="center" gap={1}>
                <InputLabel>Date of birth</InputLabel>
                <Tooltip content="This will be visible to other users.">
                  <Icon color="fgMuted" name="info" size="xs" />
                </Tooltip>
              </HStack>
            }
          />
          <DateInput
            {...sharedProps}
            {...props}
            end={<Icon active name="camera" padding={2} size="m" />}
            placeholder="Hello world"
            start={<Icon name="blockchain" padding={2} size="m" />}
          />
          <DateInput disabled {...sharedProps} {...props} />
          <DateInput required {...sharedProps} {...props} />
        </Group>
      </Example>
    </ExampleScreen>
  );
};

export default Examples;
