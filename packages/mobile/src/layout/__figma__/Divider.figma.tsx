import React from 'react';
import { figma } from '@figma/code-connect';

import { Divider } from '../Divider';

figma.connect(
  Divider,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=283-19869&m=dev',
  {
    imports: ["import { Divider } from '@coinbase/cds-mobile/layout/Divider'"],
    props: {
      color: figma.enum('type', {
        line: 'bgLine',
        lineHeavy: 'bgLineHeavy',
      }),
    },
    example: (props) => <Divider {...props} />,
  },
);

figma.connect(
  Divider,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=60-654&m=dev',
  {
    imports: ["import { Divider } from '@coinbase/cds-mobile/layout/Divider'"],
    props: {
      color: figma.enum('type', {
        line: 'bgLine',
        lineHeavy: 'bgLineHeavy',
      }),
    },
    example: (props) => <Divider direction="vertical" {...props} />,
  },
);
