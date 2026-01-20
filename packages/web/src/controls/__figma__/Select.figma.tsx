import { figma } from '@figma/code-connect';

import { Select } from '../Select';
import { SelectOption } from '../SelectOption';

figma.connect(
  Select,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=247-13005&m=dev',
  {
    imports: [
      "import { Select } from '@coinbase/cds-web/controls'",
      "import { SelectOption } from '@coinbase/cds-web/controls'",
    ],
    props: {
      startNode: figma.boolean('show start', {
        true: figma.instance('🔄 start'),
        false: undefined,
      }),
      label: figma.boolean('show label', {
        true: 'Label',
        false: undefined,
      }),
      helperText: figma.boolean('show helper text', {
        true: 'Assistive Message',
        false: undefined,
      }),
      variant: figma.enum('state', {
        positive: 'positive',
        negative: 'negative',
      }),
      placeholder: figma.string('inputText'),
      disabled: figma.boolean('disabled'),
      compact: figma.boolean('compact'),
      value: figma.enum('state', {
        selected: 'Option 1',
      }),
    },
    example: (...props) => (
      <Select {...props}>
        <SelectOption key="Option 1" title="Option 1" value="Option 1" />
      </Select>
    ),
  },
);
