import { useMemo, useState } from 'react';
import { figma } from '@figma/code-connect';

import { TabNavigation } from '../TabNavigation';

figma.connect(
  TabNavigation,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=240-8930&m=dev',
  {
    imports: ["import { TabNavigation } from '@coinbase/cds-web/tabs/TabNavigation'"],
    props: {
      tab1: figma.nestedProps('1 Primary Tab', {
        count: figma.boolean('dot count', {
          true: 1,
          false: undefined,
        }),
        label: figma.textContent('Label'),
        id: figma.textContent('Label'),
      }),
      tab2: figma.nestedProps('2 Primary Tab', {
        count: figma.boolean('dot count', {
          true: 1,
          false: undefined,
        }),
        label: figma.textContent('Label'),
        id: figma.textContent('Label'),
      }),
      tab3: figma.nestedProps('3 Primary Tab', {
        count: figma.boolean('dot count', {
          true: 1,
          false: undefined,
        }),
        label: figma.textContent('Label'),
        id: figma.textContent('Label'),
      }),
      tab4: figma.nestedProps('4 Primary Tab', {
        count: figma.boolean('dot count', {
          true: 1,
          false: undefined,
        }),
        label: figma.textContent('Label'),
        id: figma.textContent('Label'),
      }),
      tab5: figma.nestedProps('5 Primary Tab', {
        count: figma.boolean('dot count', {
          true: 1,
          false: undefined,
        }),
        label: figma.textContent('Label'),
        id: figma.textContent('Label'),
      }),
      tab6: figma.nestedProps('6 Primary Tab', {
        count: figma.boolean('dot count', {
          true: 1,
          false: undefined,
        }),
        label: figma.textContent('Label'),
        id: figma.textContent('Label'),
      }),
    },
    example: function Example() {
      const tabs = useMemo(
        () => [
          { id: 'first_primary_tab', label: 'Primary tab', count: 1 },
          { id: 'second_primary_tab', label: 'Primary tab' },
          { id: 'third_primary_tab', label: 'Primary tab' },
          { id: 'fourth_primary_tab', label: 'Primary tab' },
          { id: 'fifth_primary_tab', label: 'Primary tab' },
        ],
        [],
      );
      const [value, setValue] = useState(tabs[0].id);
      return <TabNavigation onChange={setValue} tabs={tabs} value={value} />;
    },
  },
);
