import { figma } from '@figma/code-connect';

import { DotCount } from '../DotCount';

figma.connect(
  DotCount,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=155%3A11976',
  {
    imports: ["import { DotCount } from '@cbhq/cds-web/dots/DotCount'"],
    props: {
      count: figma.enum('type', {
        'single digit': 1,
        '2 digits': 12,
        '3+ digits': 123,
      }),
    },
    example: (props) => <DotCount {...props} />,
  },
);
