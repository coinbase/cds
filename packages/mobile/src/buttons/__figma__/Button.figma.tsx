import { figma } from '@figma/code-connect';

import { Button } from '../Button';

figma.connect(
  Button,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=89-3096&m=dev',
  {
    imports: ["import { Button } from '@coinbase/cds-mobile/buttons/Button';"],
    props: {
      variant: figma.enum('variant', {
        primary: 'primary',
        secondary: 'secondary',
        negative: 'negative',
      }),
      transparent: figma.boolean('transparent'),
      loading: figma.enum('state', {
        loading: true,
        default: false,
        hover: false,
        pressed: false,
        disabled: false,
      }),
      disabled: figma.enum('state', {
        disabled: true,
        default: false,
        hover: false,
        pressed: false,
        loading: false,
      }),
      compact: figma.boolean('compact'),
      block: figma.enum('width', {
        hug: false,
        full: true,
        flush: false,
      }),
      startIcon: figma.enum('icon', {
        leading: figma.instance('↳ icon').getProps(),
        trailing: undefined,
        none: undefined,
      }),
      endIcon: figma.enum('icon', {
        trailing: figma.instance('↳ icon').getProps(),
        leading: undefined,
        none: undefined,
      }),
      flush: figma.enum('width', {
        hug: undefined,
        full: undefined,
        flush: 'start',
      }),
    },
    example: ({ startIcon, endIcon, ...props }) => (
      <Button endIcon={endIcon.name} startIcon={startIcon.name} {...props}>
        Button
      </Button>
    ),
  },
);
