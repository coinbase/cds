import { figma } from '@figma/code-connect';

import { NativeTextArea } from '../NativeTextArea';
import { TextInput } from '../TextInput';

figma.connect(
  NativeTextArea,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14089%3A46502',
  {
    imports: [
      "import { TextInput } from '@coinbase/cds-web/controls/TextInput'",
      "import { NativeTextArea } from '@coinbase/cds-web/controls/NativeTextArea'",
    ],
    props: {
      label: figma.boolean('show label', {
        true: figma.string('↳ label string'),
        false: undefined,
      }),
      helperText: figma.boolean('show helper text', {
        true: figma.string('↳ helper text'),
        false: undefined,
      }),
      disabled: figma.boolean('disabled'),
      variant: figma.enum('state', {
        positive: 'positive',
        negative: 'negative',
      }),
    },
    example: (props) => <TextInput inputNode={<NativeTextArea />} {...props} />,
  },
);
