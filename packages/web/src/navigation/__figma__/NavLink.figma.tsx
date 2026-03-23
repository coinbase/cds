import React from 'react';
import { figma } from '@figma/code-connect';

import { HStack } from '../../layout';
import { NavLink } from '../NavLink';

figma.connect(
  NavLink,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=240-16872&m=dev',
  {
    imports: ["import { NavLink } from '@coinbase/cds-web/navigation/NavLink'"],
    props: {
      children: figma.string('navLink string'),
      active: figma.enum('state', {
        active: true,
      }),
      // state: figma.enum("state", {
      //   active: "active",
      //   default: "default",
      //   focused: "focused",
      //   hover: "hover",
      //   pressed: "pressed",
      // }),
    },
    example: ({ children, ...props }) => <NavLink {...props}>{children}</NavLink>,
  },
);

figma.connect(
  NavLink,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=283-19790&m=dev',
  {
    imports: [
      "import { NavLink } from '@coinbase/cds-web/navigation/NavLink'",
      "import { HStack } from '@coinbase/cds-web/layout/HStack'",
    ],
    example: () => (
      <HStack gap={4}>
        <NavLink active>NavLink</NavLink>
        <NavLink>NavLink</NavLink>
        <NavLink>NavLink</NavLink>
        <NavLink>NavLink</NavLink>
        <NavLink>NavLink</NavLink>
        <NavLink>NavLink</NavLink>
      </HStack>
    ),
  },
);
