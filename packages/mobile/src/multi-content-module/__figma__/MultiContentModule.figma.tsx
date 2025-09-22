import React from 'react';
import { figma } from '@figma/code-connect';

import { MultiContentModule } from '../MultiContentModule';

figma.connect(
  MultiContentModule,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14727%3A26365',
  {
    imports: [
      "import { MultiContentModule } from '@cbhq/cds-mobile/multi-content-module/MultiContentModule';",
    ],
    props: {
      title: figma.string('headline'),
      description: figma.boolean('show description', {
        true: figma.string('description'),
        false: undefined,
      }),
      pictogram: figma.boolean('show illustration', {
        true: figma.instance('↳ illustration type'),
        false: undefined,
      }),
      children: figma.instance('↳ content type'),
      action: figma.boolean('show action', {
        true: figma.instance('↳ action type'),
        false: undefined,
      }),
    },
    example: ({ ...props }) => <MultiContentModule {...props} />,
  },
);
