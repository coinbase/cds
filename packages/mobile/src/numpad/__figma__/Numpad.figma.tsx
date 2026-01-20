import React from 'react';
import { figma } from '@figma/code-connect';

import { Button } from '../../buttons';
import { HStack } from '../../layout';
import { Numpad } from '../Numpad';

figma.connect(
  Numpad,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14012%3A4589',
  {
    imports: [
      "import { Numpad } from '@coinbase/cds-mobile/numpad/Numpad'",
      "import { HStack } from '@coinbase/cds-mobile/layout/HStack'",
    ],
    props: {
      disabled: figma.boolean('disabled'),
      accessory: figma.enum('accessory', {
        none: undefined,
        '1-accessory': <Button variant="secondary">Button</Button>,
        '2-accessory': (
          <HStack justifyContent="space-between">
            <Button variant="secondary">Button</Button>
            <Button variant="secondary">Button</Button>
          </HStack>
        ),
        '3-accessory': (
          <HStack justifyContent="space-between">
            <Button variant="secondary">Button</Button>
            <Button variant="secondary">Button</Button>
            <Button variant="secondary">Button</Button>
          </HStack>
        ),
      }),
      action: figma.boolean('show action button', {
        true: <Button>Button</Button>,
        false: undefined,
      }),
    },
    example: ({ accessory, action, ...props }) => (
      <Numpad {...props} accessory={accessory} action={action} onPress={() => {}} />
    ),
  },
);
