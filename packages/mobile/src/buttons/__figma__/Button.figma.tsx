import { figma } from '@figma/code-connect';

import { Button } from '../Button';

figma.connect(
  Button,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=89-3096&m=dev',
  {
    imports: ["import { Button } from '@cbhq/cds-mobile/buttons/Button';"],
    props: {
      variant: figma.enum('variant', {
        primary: 'primary',
        secondary: 'secondary',
        negative: 'negative',
      }),
      transparent: figma.boolean('transparent'),
      loading: figma.boolean('loading'),
      disabled: figma.boolean('disabled'),
      compact: figma.boolean('compact'),
      block: figma.boolean('block'),
      startIcon: figma.boolean('show startIcon', {
        true: figma.instance('↳ start icon'),
        false: undefined,
      }),
      endIcon: figma.boolean('show endIcon', {
        true: figma.instance('↳ end icon'),
        false: undefined,
      }),
      flush: figma.boolean('flush', {
        true: 'start',
        false: undefined,
      }),
      // state: figma.enum('state', {
      //   default: 'default',
      //   hover: 'hover',
      //   pressed: 'pressed',
      // }), // TODO: Is this even possible?
      // children: figma.string('string'), TODO: fix, Mele to deprecate string library
    },
    example: ({ ...props }) => <Button {...props}>Button</Button>,
  },
);
