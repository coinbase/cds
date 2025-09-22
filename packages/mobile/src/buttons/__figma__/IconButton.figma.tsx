import { figma } from '@figma/code-connect';

import { IconButton } from '../IconButton';

figma.connect(
  IconButton,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=47-358&m=dev',
  {
    imports: ["import {IconButton} from '@cbhq/cds-mobile/buttons/IconButton';"],
    props: {
      // name: figma.instance('icon'),
      variant: figma.enum('variant', {
        primary: 'primary',
        secondary: 'secondary',
      }),
      disabled: figma.boolean('disabled'),
      compact: figma.boolean('compact'),
      transparent: figma.boolean('transparent'),
      // state: figma.enum('state', {
      //   default: 'default',
      //   hover: 'hover',
      //   pressed: 'pressed',
      //   loading: 'loading', // TODO: Is this even possible?
      // }),
    },
    example: ({ ...props }) => <IconButton name="add" {...props} />,
  },
);
