import React from 'react';
import { figma } from '@figma/code-connect';

import { ProgressCircle } from '../ProgressCircle';

figma.connect(
  ProgressCircle,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=64-917&m=dev',
  {
    imports: [
      "import { ProgressCircle } from '@coinbase/cds-mobile/visualizations/ProgressCircle'",
    ],
    props: {
      hideText: figma.boolean('progress label', {
        true: undefined,
        false: true,
      }),
      weight: figma.enum('weight', {
        normal: 'normal',
        heavy: 'heavy',
        thin: 'thin',
      }),
      progress: figma.enum('progress', {
        '100%': 1,
        '75%': 0.75,
        '50%': 0.5,
        '25%': 0.25,
      }),
    },
    example: (props) => <ProgressCircle {...props} />,
  },
);
