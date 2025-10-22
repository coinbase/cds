import { figma } from '@figma/code-connect';

import { InputChip } from '../InputChip';

figma.connect(
  InputChip,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=10177-5161&m=dev',
  {
    imports: ["import { InputChip } from '@coinbase/cds-web/chips/InputChip'"],
    props: {
      children: figma.string('value'),
      start: figma.boolean('show start', {
        true: figma.instance('start'),
        false: undefined,
      }),
      // state: figma.enum('state', {
      //   default: 'default',
      //   focused: 'focused',
      //   hovered: 'hovered',
      //   pressed: 'pressed',
      // }),
      disabled: figma.boolean('disabled'),
      compact: figma.boolean('compact'),
    },
    example: (props) => <InputChip onClick={() => {}} {...props} />,
  },
);
