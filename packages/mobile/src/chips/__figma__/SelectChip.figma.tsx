/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { figma } from '@figma/code-connect';

import { SelectOption } from '../../controls';
import { SelectChip } from '../SelectChip';

figma.connect(
  SelectChip,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=10177-5222&m=dev',
  {
    imports: ["import { SelectChip } from '@cbhq/cds-mobile/chips'"],
    props: {
      // state: figma.enum('state', {
      //   default: 'default',
      //   hovered: 'hovered',
      //   pressed: 'pressed',
      //   focused: 'focused',
      //   open: 'open',
      // }),
      disabled: figma.boolean('disabled'),
      active: figma.boolean('active'),
      compact: figma.boolean('compact'),
      start: figma.boolean('show start', {
        true: figma.instance('start'),
        false: undefined,
      }),
      end: figma.instance('end'),
    },
    example: (props) => {
      const options = ['USD', 'CAD', 'GBP', 'JPY'];
      const [value, setValue] = useState(options[0]);
      return (
        <SelectChip {...props} onChange={setValue} value={value}>
          {options.map((option) => (
            <SelectOption key={option} title={option} value={option} />
          ))}
        </SelectChip>
      );
    },
  },
);
