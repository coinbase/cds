import React from 'react';
import { figma } from '@figma/code-connect';

import { SidebarItem } from '../SidebarItem';

figma.connect(
  SidebarItem,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=252-12892',
  {
    imports: ["import { SidebarItem } from '@coinbase/cds-web/navigation/SidebarItem';"],
    variant: { type: 'default', state: 'default', active: 'true' },
    props: {
      title: figma.textContent('Label'),
    },

    example: (props) => <SidebarItem active icon="home" {...props} />,
  },
);
