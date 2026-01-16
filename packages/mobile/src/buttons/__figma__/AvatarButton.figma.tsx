import { figma } from '@figma/code-connect';

import { AvatarButton } from '../AvatarButton';

figma.connect(
  AvatarButton,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=276-23400&m=dev',
  {
    imports: ["import {AvatarButton} from '@coinbase/cds-mobile/buttons/AvatarButton'"],
    props: {
      //   state: figma.enum('state', {
      //     active: 'active',
      //     focus: 'focus',
      //     hover: 'hover',
      //     pressed: 'pressed',
      //     selected: 'selected',
      //   }),
      selected: figma.enum('state', {
        selected: true,
      }),
      compact: figma.boolean('compact'),
      loading: figma.boolean('disabled'),
    },
    example: (props) => <AvatarButton {...props} accessibilityLabel="Avatar button" name="A" />,
  },
);
