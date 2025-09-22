import React from 'react';
import { figma } from '@figma/code-connect';

import { Alert } from '../Alert';

figma.connect(
  Alert,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=35-698&m=dev',
  {
    imports: ["import { Alert } from '@cbhq/cds-mobile/overlays/Alert'"],
    props: {
      body: figma.string('body'),
      title: figma.string('title'),
      pictogram: figma.boolean('illustration', {
        true: figma.instance('spotsquare'),
        false: undefined,
      }),
      dismissActionLabel: figma.enum('footer', {
        'single action': '',
        stacked: 'Button',
      }),
      preferredActionVariant: figma.enum('type', {
        default: 'primary',
        destructive: 'negative',
      }),
    },
    // @ts-expect-error pictogram mapping issue
    example: ({ ...props }) => <Alert {...props} preferredActionLabel="Button" />,
  },
);
