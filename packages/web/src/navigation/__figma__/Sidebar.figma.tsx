import React from 'react';
import { figma } from '@figma/code-connect';

import { LogoMark } from '../../icons';
import { Sidebar } from '../Sidebar';

figma.connect(
  Sidebar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=252-13321&m=dev',
  {
    imports: [
      "import { Sidebar } from '@coinbase/cds-web/navigation/Sidebar'",
      "import { SidebarItem } from '@coinbase/cds-web/navigation/SidebarItem'",
      "import { LogoMark } from '@coinbase/cds-web/icons/LogoMark'",
    ],
    props: {
      type: figma.enum('type', {
        default: 'default',
        condensed: 'condensed',
        custom: 'custom',
      }),
      children: figma.children([
        'Home',
        'Assets',
        'Label',
        'Pay',
        'For you',
        'Earn',
        'Borrow',
        'Defi',
        'More',
        'Sidebar Item',
      ]),
      collapsed: figma.boolean('collapsed'),
    },
    example: ({ children, ...props }) => (
      // @ts-expect-error multiple children will be rendered based on figma instance
      <Sidebar logo={<LogoMark />} {...props}>
        {children}
      </Sidebar>
    ),
  },
);
