import { figma } from '@figma/code-connect';

import { SegmentedTab } from '../SegmentedTab';
import { SegmentedTabs } from '../SegmentedTabs';

figma.connect(
  SegmentedTabs,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=20859-2979&m=dev',
  {
    imports: ["import { SegmentedTabs } from '@coinbase/cds-web/tabs/SegmentedTabs'"],
    variant: { tabs: '2 tabs' },
    props: {
      activeTab: figma.enum('active state', {
        left: { id: '1', label: 'Title' },
        right: { id: '2', label: 'Title' },
      }),
      disabled: figma.boolean('disabled'),
    },
    example: (props) => (
      <SegmentedTabs
        onChange={() => {}}
        tabs={[
          { id: '1', label: 'Title' },
          { id: '2', label: 'Title' },
        ]}
        {...props}
      />
    ),
  },
);

figma.connect(
  SegmentedTabs,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=20859-2979&m=dev',
  {
    imports: ["import { SegmentedTabs } from '@coinbase/cds-web/tabs/SegmentedTabs'"],
    variant: { tabs: '3 tabs' },
    props: {
      activeTab: figma.enum('active state', {
        left: { id: '1', label: 'Title' },
        center: { id: '2', label: 'Title' },
        right: { id: '3', label: 'Title' },
      }),
      disabled: figma.boolean('disabled'),
    },
    example: (props) => (
      <SegmentedTabs
        onChange={() => {}}
        tabs={[
          { id: '1', label: 'Title' },
          { id: '2', label: 'Title' },
          { id: '3', label: 'Title' },
        ]}
        {...props}
      />
    ),
  },
);

figma.connect(
  SegmentedTabs,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=20859-3073&m=dev',
  {
    imports: ["import { SegmentedTab } from '@coinbase/cds-web/tabs/SegmentedTab'"],
    props: {
      id: figma.string('title'),
      label: figma.string('title'),
    },
    example: (props) => <SegmentedTab {...props} />,
  },
);
