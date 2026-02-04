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
      label: figma.boolean('show label', {
        true: figma.boolean('show info icon')
          ? `<HStack alignItems="center">
          <InputLabel>${figma.string('label string')}</InputLabel>
          <Tooltip content="This will be visible to other users.">
            <Icon active color="fg" name="info" padding={0.75} size="xs" tabIndex={0} />
          </Tooltip>
        </HStack>`
          : figma.string('label string'),
        false: undefined,
      }),
      start: figma.boolean('show start', {
        true: figma.instance('start'),
        false: undefined,
      }),
      helperText: figma.boolean('show helper text', {
        true: figma.string('helper text'),
        false: undefined,
      }),
      placeholder: figma.string('placeholderText'),
      variant: figma.enum('state', {
        default: undefined,
        positive: 'positive',
        negative: 'negative',
      }),
      value: figma.enum('type', {
        'single select': 'Item 1',
        'multi-select': ['Item 1', 'Item 2'],
      }),
    },
    example: ({ type, value, ...props }) => (
      <Select {...props} onChange={() => {}} options={selectOptions} type={type} value={value} />
    ),
  },
);
