import { figma } from '@figma/code-connect';

import { Select } from '../select/Select';

const selectOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange', description: 'Citrus' },
];

figma.connect(
  Select,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=71762-14938',
  {
    imports: ["import { Select } from '@coinbase/cds-web/alpha/select/Select'"],
    props: {
      type: figma.enum('type', {
        'single select': 'single',
        'multi-select': 'multi',
      }),
      disabled: figma.boolean('disabled'),
      compact: figma.boolean('compact'),
      variant: figma.enum('state', {
        positive: 'positive',
        negative: 'negative',
      }),
      defaultOpen: figma.enum('state', {
        'active-desktop': true,
        'active-mobile': true,
      }),
      value: figma.enum('type', {
        'single select': 'apple',
        'multi-select': ['apple', 'banana'],
      }),
    },
    example: ({ type, value, ...props }) => (
      <Select
        {...props}
        helperText="Helper text"
        label="Label"
        onChange={() => {}}
        options={selectOptions}
        placeholder="Select an option"
        type={type}
        value={value}
      />
    ),
  },
);
