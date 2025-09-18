import React from 'react';
import { figma } from '@figma/code-connect';

import { AndroidNavigationBar } from '../AndroidNavigationBar';

figma.connect(
  AndroidNavigationBar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=10414%3A896',
  {
    props: {
      showsearch27799: figma.boolean('show search'),
      showhelpcenter176314: figma.boolean('show help center'),
      showsecondarycta24034: figma.boolean('show secondary cta'),
      shownotification24028: figma.boolean('show notification'),
      type156900: figma.instance('type'),
      showpagetitle80: figma.boolean('show page title'),
      showtabs24024: figma.boolean('show tabs'),
      showprimarycta24032: figma.boolean('show primary cta'),
      showbackarrow24022: figma.boolean('show back arrow'),
      device: figma.enum('device', {
        desktop: 'desktop',
        tablet: 'tablet',
        'responsive mobile': 'responsive-mobile',
      }),
    },
    example: () => <AndroidNavigationBar />,
  },
);
