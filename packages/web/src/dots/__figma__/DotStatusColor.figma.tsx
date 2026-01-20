import React from 'react';
import { figma } from '@figma/code-connect';

import { DotStatusColor } from '../DotStatusColor';

figma.connect(
  DotStatusColor,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=155%3A11983',
  {
    imports: ["import { DotStatusColor } from '@cbhq/cds-web/dots/DotStatusColor'"],
    props: {
      variant: figma.enum('variant', {
        positive: 'positive',
        negative: 'negative',
        primary: 'primary',
        foregroundMuted: 'foregroundMuted',
      }),
      size: figma.enum('size', {
        l: 'l',
        m: 'm',
        s: 's',
        xs: 'xs',
      }),
    },
    example: (props) => <DotStatusColor {...props} />,
  },
);
