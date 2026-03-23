import React from 'react';
import { figma } from '@figma/code-connect';

import { LogoMark } from '../LogoMark';

figma.connect(
  LogoMark,
  'https://www.figma.com/design/46lNmiV1z8I888My5kNq7R/%E2%9C%A8-Logos?node-id=1268-157',
  {
    imports: ["import { LogoMark } from '@coinbase/cds-mobile/icons/LogoMark'"],
    props: {
      size: figma.enum('size', {
        'l (32)': 32,
        'm (24)': 24,
        's (16)': 16,
      }),
      foreground: figma.enum('color', {
        primary: undefined,
        foreground: true,
      }),
    },
    example: (props) => <LogoMark {...props} />,
  },
);
