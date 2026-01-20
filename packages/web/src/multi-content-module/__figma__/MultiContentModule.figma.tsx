import React from 'react';
import { figma } from '@figma/code-connect';

import { MultiContentModule } from '../MultiContentModule';

figma.connect(
  MultiContentModule,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14727%3A26365',
  {
    imports: [
      "import { MultiContentModule } from '@coinbase/cds-web/multi-content-module/MultiContentModule'",
    ],
    props: {
      title: figma.string('headline'),
      description: figma.boolean('show description', {
        true: figma.string('description'),
        false: undefined,
      }),
      pictogram: figma.instance('↳ illustration type').getProps(),
      children: figma.instance('↳ content type'),
      action: figma.enum('action type', {
        button: figma.instance('action type'),
        'button group': figma.instance('action type'),
        'button + secondary content': figma.instance('action type'),
        none: undefined,
      }),
    },
    example: ({ pictogram, ...props }) => (
      <MultiContentModule pictogram={pictogram.name} {...props} />
    ),
  },
);
