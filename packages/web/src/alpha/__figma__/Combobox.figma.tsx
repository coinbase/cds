import { figma } from '@figma/code-connect';

import { Combobox } from '../combobox/Combobox';

const comboboxOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange', description: 'Citrus' },
];

figma.connect(
  Combobox,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=71762-14938',
  {
    imports: ["import { Combobox } from '@coinbase/cds-web/alpha/combobox/Combobox'"],
    example: () => (
      <Combobox
        label="Label"
        onChange={() => {}}
        options={comboboxOptions}
        placeholder="Search"
        value={null}
      />
    ),
  },
);
