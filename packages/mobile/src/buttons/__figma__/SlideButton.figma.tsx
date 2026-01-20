import { figma } from '@figma/code-connect';

import { SlideButton } from '../SlideButton';

figma.connect(
  SlideButton,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=49598-10283&m=dev',
  {
    imports: ["import { SlideButton } from '@coinbase/cds-mobile/buttons/SlideButton'"],
    props: {
      checked: figma.enum('Position', {
        // TODO: fix falsy values returning undefined. This is an existing issue in code connect https://github.com/figma/code-connect/issues/193
        Start: false,
        Middle: false,
        End: true,
      }),
      compact: figma.boolean('compact'),
    },
    example: ({ checked = false, ...props }) => {
      return <SlideButton checked={checked} {...props} />;
    },
  },
);
