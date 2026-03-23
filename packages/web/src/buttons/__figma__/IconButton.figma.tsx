import React from 'react';
import { figma } from '@figma/code-connect';

import { IconButton } from '../IconButton';

figma.connect(
  IconButton,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=47-358&m=dev',
  {
    imports: ["import {IconButton} from '@coinbase/cds-web/buttons/IconButton'"],
    props: {
      variant: figma.enum('variant', {
        primary: 'primary',
        secondary: 'secondary',
      }),
      disabled: figma.enum('state', {
        disabled: true,
        default: false,
        hover: false,
        pressed: false,
        loading: false,
      }),
      compact: figma.boolean('compact'),
      transparent: figma.boolean('transparent'),
    },
    example: ({ ...props }) => <IconButton name="add" {...props} />,
  },
);
