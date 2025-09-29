/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { figma } from '@figma/code-connect';

import { TabbedChips } from '../TabbedChips';

figma.connect(
  TabbedChips,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=10188%3A4476',
  {
    imports: ["import { TabbedChips } from '@coinbase/cds-mobile/chips/TabbedChips';"],
    props: {
      overflow: figma.boolean('overflowing'),
      platform: figma.enum('platform', {
        mobile: 'mobile',
        desktop: 'desktop',
      }),
      compact: figma.boolean('compact'),
    },
    example: () => {
      const tabs = [
        {
          id: '0',
          label: '0',
        },
        {
          id: '1',
          label: '1',
        },
        {
          id: '2',
          label: '2',
        },
        {
          id: '3',
          label: '3',
        },
        {
          id: '4',
          label: '4',
        },
        {
          id: '5',
          label: '5',
        },
        {
          id: '6',
          label: '6',
        },
        {
          id: '7',
          label: '7',
        },
        {
          id: '8',
          label: '8',
        },
        {
          id: '9',
          label: '9',
        },
      ];

      const [value, setValue] = useState(tabs[0].id);
      return <TabbedChips onChange={setValue} tabs={tabs} value={value} />;
    },
  },
);
