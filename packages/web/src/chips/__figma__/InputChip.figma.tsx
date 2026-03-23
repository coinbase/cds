import { figma } from '@figma/code-connect';

import { InputChip } from '../InputChip';

figma.connect(
  InputChip,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=10177-5161&m=dev',
  {
    imports: ["import { InputChip } from '@coinbase/cds-web/chips/InputChip'"],
    props: {
      children: figma.textContent('value'),
      start: figma.boolean('show start', {
        true: figma.instance('start'),
        false: undefined,
      }),
      disabled: figma.enum('state', {
        disabled: true,
        default: false,
        focused: false,
        hovered: false,
        pressed: false,
      }),
      compact: figma.boolean('compact'),
      // NOTE: The Figma 'show label' property doesn't have a direct mapping.
      // To hide the label in React, omit the `children` prop or pass undefined.
    },
    example: (props) => <InputChip onClick={() => {}} {...props} />,
  },
);
