/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react';
import { figma } from '@figma/code-connect';

import { DatePicker } from '../DatePicker';

figma.connect(
  DatePicker,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14743-53206&m=dev',
  {
    imports: ["import { DatePicker } from '@coinbase/cds-mobile/dates/DatePicker'"],
    props: {
      disabled: figma.boolean('disabled'),
      compact: figma.boolean('compact'),
      label: figma.string('label'),
      helperText: figma.nestedProps('.assistive text', {
        string: figma.textContent('Assistive text'),
      }),
    },
    example: ({ helperText, ...props }) => {
      const [date, setDate] = useState(null);
      const [error, setError] = useState(null);
      // @ts-expect-error not typed
      const handleChangeDate = (date) => {
        setDate(date);
      };
      // @ts-expect-error not typed
      const handleErrorDate = (error) => {
        setError(error);
      };
      return (
        <DatePicker
          date={date}
          error={error}
          helperText={helperText.string}
          onChangeDate={handleChangeDate}
          onErrorDate={handleErrorDate}
          {...props}
        />
      );
    },
  },
);
