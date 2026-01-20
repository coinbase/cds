import { figma } from '@figma/code-connect';

import { Switch } from '../Switch';

figma.connect(
  Switch,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=155%3A9924',
  {
    imports: ["import { Switch } from '@coinbase/cds-web/controls/Switch'"],
    props: {
      children: figma.boolean('show label', {
        true: figma.string('↳ label'),
        false: undefined,
      }),
      checked: figma.boolean('checked'),
      disabled: figma.boolean('disabled'),
    },
    example: (props) => <Switch {...props} />,
  },
);
