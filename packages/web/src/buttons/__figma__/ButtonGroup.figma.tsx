import React from 'react';
import { figma } from '@figma/code-connect';

import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';

figma.connect(
  ButtonGroup,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=283-19617&m=dev',
  {
    imports: ["import {ButtonGroup} from '@cbhq/cds-web/buttons/ButtonGroup'"],
    props: {
      direction: figma.enum('orientation', {
        stacked: 'vertical',
        'side-by-side': 'horizontal',
      }),
      children: figma.enum('# of actions', {
        '2': (
          <>
            <Button variant="primary">Button</Button>
            <Button variant="secondary">Button</Button>
          </>
        ),
        '3': (
          <>
            <Button variant="primary">Button</Button>
            <Button variant="secondary">Button</Button>
            <Button variant="negative">Button</Button>
          </>
        ),
      }),
    },
    example: ({ children, ...props }) => <ButtonGroup {...props}>{children}</ButtonGroup>,
  },
);
