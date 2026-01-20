import React from 'react';
import { figma } from '@figma/code-connect';

import { NavigationTitle } from '../NavigationTitle';

figma.connect(
  NavigationTitle,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=1221-19383',
  {
    imports: ["import { NavigationTitle } from '@coinbase/cds-web/navigation/NavigationTitle'"],
    props: {
      children: figma.string('page title'),
    },
    example: ({ children }) => <NavigationTitle>{children}</NavigationTitle>,
  },
);
