import React from 'react';
import { figma } from '@figma/code-connect';

import { ContentCell } from '../ContentCell';

figma.connect(
  ContentCell,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=237-16238&m=dev',
  {
    imports: ["import { ContentCell } from '@coinbase/cds-web/cells/ContentCell'"],
    props: {
      selected: figma.enum('state', {
        selected: true,
      }),
      disabled: figma.boolean('disabled'),
      title: figma.boolean('title', {
        true: figma.string('title string'),
        false: undefined,
      }),
      subtitle: figma.boolean('show subtitle', {
        true: figma.string('subtitle string'),
        false: undefined,
      }),
      media: figma.instance('🔄 start'),
      meta: figma.boolean('show meta', {
        true: figma.string('meta string'),
        false: undefined,
      }),
      description: figma.boolean('show description', {
        true: figma.string('description string'),
        false: undefined,
      }),
      accessory: figma.boolean('show accessory', {
        true: 'arrow',
        false: undefined,
      }),
    },
    example: (props) => <ContentCell {...props} />,
  },
);
