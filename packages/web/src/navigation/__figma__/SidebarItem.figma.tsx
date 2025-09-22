import React from 'react';
import { figma } from '@figma/code-connect';

import { SidebarItem } from '../SidebarItem';

figma.connect(
  SidebarItem,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=252%3A12892',
  {
    imports: ["import { SidebarItem } from '@cbhq/cds-web/navigation/SidebarItem';"],
    props: {
      active: figma.boolean('active'),
      title: figma.boolean('show label', {
        true: figma.string('label text'),
        false: undefined,
      }),
      icon: figma.boolean('show start icon', {
        true: 'heart',
        false: undefined,
      }),
    },
    // @ts-expect-error not typed
    example: (props) => <SidebarItem {...props} />,
  },
);
