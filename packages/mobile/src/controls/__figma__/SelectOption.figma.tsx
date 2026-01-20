import React from 'react';
import { figma } from '@figma/code-connect';

import { SelectOption } from '../SelectOption';

figma.connect(
  SelectOption,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=244-11050&m=dev',
  {
    imports: ["import { SelectOption } from '@coinbase/cds-mobile/controls/SelectOption'"],
    props: {
      disabled: figma.boolean('disabled'),
      compact: figma.boolean('compact'),
      media: figma.boolean('show media', {
        true: figma.instance('media'),
        false: undefined,
      }),
      title: figma.boolean('show title', {
        true: figma.string('title string'),
        false: undefined,
      }),
      description: figma.boolean('show description', {
        true: figma.string('description string'),
        false: undefined,
      }),
      detail: figma.boolean('show detail', {
        true: 'Detail',
        false: undefined,
      }),
      accessory: figma.boolean('show accessory', {
        true: figma.instance('accessory'),
        false: undefined,
      }),
    },
    example: (props) => <SelectOption value="" {...props} />,
  },
);
