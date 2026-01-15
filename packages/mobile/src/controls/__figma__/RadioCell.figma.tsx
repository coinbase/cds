import { figma } from '@figma/code-connect';

import { RadioCell } from '../RadioCell';

figma.connect(
  RadioCell,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=54927-2624',
  {
    imports: ["import { RadioCell } from '@coinbase/cds-mobile/controls/RadioCell'"],
    props: {
      title: figma.string('title text'),
      description: figma.boolean('description', {
        true: figma.string('description text'),
        false: undefined,
      }),
    },
    example: ({ ...props }) => <RadioCell {...props} />,
  },
);

figma.connect(
  RadioCell,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=54927-2624',
  {
    imports: ["import { RadioCell } from '@coinbase/cds-mobile/controls/RadioCell'"],
    variant: {
      selected: true,
    },
    props: {
      title: figma.string('title text'),
      description: figma.boolean('description', {
        true: figma.string('description text'),
        false: undefined,
      }),
    },
    example: ({ ...props }) => <RadioCell checked {...props} />,
  },
);

figma.connect(
  RadioCell,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=54927-2624',
  {
    imports: ["import { RadioCell } from '@coinbase/cds-mobile/controls/RadioCell'"],
    variant: {
      state: 'disabled',
    },
    props: {
      title: figma.string('title text'),
      description: figma.boolean('description', {
        true: figma.string('description text'),
        false: undefined,
      }),
    },
    example: ({ ...props }) => <RadioCell disabled {...props} />,
  },
);

figma.connect(
  RadioCell,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=54927-2624',
  {
    imports: ["import { RadioCell } from '@coinbase/cds-mobile/controls/RadioCell'"],
    variant: {
      state: 'disabled',
      selected: true,
    },
    props: {
      title: figma.string('title text'),
      description: figma.boolean('description', {
        true: figma.string('description text'),
        false: undefined,
      }),
    },
    example: ({ ...props }) => <RadioCell checked disabled {...props} />,
  },
);
