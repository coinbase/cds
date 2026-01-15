import { figma } from '@figma/code-connect';

import { CheckboxCell } from '../CheckboxCell';

figma.connect(
  CheckboxCell,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=54927-2772&t=pdfsCDffPYWTRujC-4',
  {
    imports: ["import { CheckboxCell } from '@coinbase/cds-mobile/controls/CheckboxCell'"],
    props: {
      title: figma.string('title text'),
      description: figma.boolean('description', {
        true: figma.string('description text'),
        false: undefined,
      }),
    },
    example: ({ ...props }) => <CheckboxCell {...props} />,
  },
);

figma.connect(
  CheckboxCell,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=54927-2772&t=pdfsCDffPYWTRujC-4',
  {
    imports: ["import { CheckboxCell } from '@coinbase/cds-mobile/controls/CheckboxCell'"],
    variant: {
      state: 'selected',
    },
    props: {
      title: figma.string('title text'),
      description: figma.boolean('description', {
        true: figma.string('description text'),
        false: undefined,
      }),
    },
    example: ({ ...props }) => <CheckboxCell checked {...props} />,
  },
);
