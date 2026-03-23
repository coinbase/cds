import React from 'react';
import { figma } from '@figma/code-connect';

import { StickyFooter } from '../StickyFooter';

figma.connect(
  StickyFooter,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=10340-69579&m=dev',
  {
    imports: ["import {StickyFooter} from '@coinbase/cds-mobile/sticky-footer/StickyFooter'"],
    props: {
      // showlegaltext1391921: figma.boolean('show legal text'),
      // buttons: figma.enum('buttons', {
      //   'single primary': 'single-primary',
      //   'single secondary': 'single-secondary',
      //   stacked: 'stacked',
      //   'stacked with transparent button': 'stacked-with-transparent-button',
      //   'side-by-side': 'side-by-side',
      //   none: 'none',
      // }),
      elevated: figma.boolean('floating'),
      // compact: figma.boolean('compact'),
      children: figma.children(['Button', 'ButtonGroup']),
    },
    example: (props) => <StickyFooter elevated={props.elevated}>{props.children}</StickyFooter>,
  },
);
