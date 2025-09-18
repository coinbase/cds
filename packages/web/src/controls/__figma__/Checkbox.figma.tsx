import React from 'react';
import { figma } from '@figma/code-connect';

import { Checkbox } from '../Checkbox';

figma.connect(
  Checkbox,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=155-9873&m=dev',
  {
    imports: ["import { Checkbox } from '@cbhq/cds-web/controls/Checkbox'"],
    props: {
      checked: figma.boolean('checked'),
      disabled: figma.boolean('disabled'),
      indeterminate: figma.boolean('indeterminate'),
      // state: figma.enum('state', {
      //   active: 'active',
      //   hover: 'hover',
      //   pressed: 'pressed',
      //   focus: 'focus',
      // }),
      // children: figma.string('label'), TODO: fix, Mele to deprecate string library},
    },
    example: ({ ...props }) => <Checkbox {...props}>Checkbox label</Checkbox>,
  },
);
