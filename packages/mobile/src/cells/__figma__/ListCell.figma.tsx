import { figma } from '@figma/code-connect';

import { ListCell } from '../ListCell';

figma.connect(
  ListCell,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=236-27897&m=dev',
  {
    imports: ["import { ListCell } from '@coinbase/cds-mobile/cells/ListCell'"],
    props: {
      selected: figma.enum('state', {
        selected: true,
      }),
      disabled: figma.boolean('disabled'),
      compact: figma.boolean('compact'),
      media: figma.boolean('show media', {
        true: figma.instance('media'),
        false: undefined,
      }),
      title: figma.boolean('show title', {
        true: figma.textContent('Title'),
        false: undefined,
      }),
      description: figma.boolean('show description', {
        true: figma.textContent('Description'),
        false: undefined,
      }),
      action: figma.boolean('show end', {
        true: figma.instance('end'),
        false: undefined,
      }),
      accessory: figma.boolean('show accessory', {
        true: 'more',
        false: undefined,
      }),
    },
    example: (props) => <ListCell {...props} />,
  },
);

figma.connect(
  ListCell,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=236-28162&m=dev',
  {
    imports: ["import { ListCell } from '@coinbase/cds-mobile/cells/ListCell'"],
    props: {
      selected: figma.enum('state', {
        selected: true,
      }),
      disabled: figma.boolean('disabled'),
      compact: figma.boolean('compact'),
      media: figma.boolean('show media', {
        true: figma.instance('media'),
        false: undefined,
      }),
      title: figma.boolean('show title', {
        true: figma.textContent('Title'),
        false: undefined,
      }),
      description: figma.boolean('show description', {
        true: figma.textContent('Description'),
        false: undefined,
      }),
      intermediary: figma.boolean('show sparkline', {
        true: figma.children('Sparkline'),
        false: undefined,
      }),
      detail: figma.boolean('show detail', {
        true: figma.string('detail string'),
        false: undefined,
      }),
      subdetail: figma.boolean('show subDetail', {
        true: figma.string('subDetail string'),
        false: undefined,
      }),
      accessory: figma.boolean('show accessory', {
        true: 'more',
        false: undefined,
      }),
    },
    example: (props) => <ListCell {...props} />,
  },
);
