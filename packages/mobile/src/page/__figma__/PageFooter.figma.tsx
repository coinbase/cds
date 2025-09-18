import React from 'react';
import { figma } from '@figma/code-connect';

import { PageFooter } from '../PageFooter';

figma.connect(
  PageFooter,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=17685%3A3266',
  {
    imports: ["import { PageFooter } from '@cbhq/cds-mobile/page/PageFooter';"],
    props: {
      action: figma.children('ButtonGroup'),
    },
    example: ({ action }) => <PageFooter action={action} />,
  },
);
