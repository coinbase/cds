import { useState } from 'react';
import { figma } from '@figma/code-connect';

import { ControlGroup } from '../ControlGroup';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';

figma.connect(
  RadioGroup,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=355-14414&m=dev',
  {
    imports: [
      "import { ControlGroup } from '@coinbase/cds-mobile/controls/ControlGroup'",
      "import { Radio } from '@coinbase/cds-mobile/controls/Radio'",
    ],
    props: {
      options: figma.enum('quantity', {
        '1': [{ value: '1', children: 'Label' }],
        '2': [{ value: '2', children: 'Label' }],
        '3': [{ value: '3', children: 'Label' }],
        '4': [{ value: '4', children: 'Label' }],
        '5': [{ value: '5', children: 'Label' }],
      }),
    },
    example: function Example({ options }) {
      const [value, setValue] = useState('1');
      const onChange = (value: string | undefined) => value && setValue(value);
      return (
        <ControlGroup
          ControlComponent={Radio}
          onChange={onChange}
          options={options}
          role="radiogroup"
          value={value}
        />
      );
    },
  },
);
