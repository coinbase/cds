import React from 'react';
import { figma } from '@figma/code-connect';

import { Fallback } from '../Fallback';

figma.connect(
  Fallback,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=731-14951&m=dev',
  {
    imports: ["import { Fallback } from '@coinbase/cds-mobile/layout/Fallback'"],
    props: {
      shape: figma.enum('shape', {
        circle: 'circle',
        rectangle: 'rectangle',
      }),
      width: figma.enum('shape', {
        circle: 32,
        rectangle: 150,
      }),
    },
    example: (props) => <Fallback height={32} {...props} />,
  },
);
