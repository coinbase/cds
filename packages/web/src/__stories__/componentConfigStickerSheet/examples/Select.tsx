import { memo, useState } from 'react';
import { Select } from '@coinbase/cds-web/alpha/select';

import { VStack } from '../../../layout';

const selectOptions = [
  { value: 'option1', label: 'Option 1', description: 'Description' },
  { value: 'option2', label: 'Option 2', description: 'Description' },
  { value: 'option3', label: 'Option 3', description: 'Description' },
  { value: 'option4', label: 'Option 4', description: 'Description' },
  { value: 'option5', label: 'Option 5', description: 'Description' },
  { value: 'option6', label: 'Option 6', description: 'Description' },
];

export const SelectExample = memo(() => {
  const [selectValue, setSelectValue] = useState<string | null>(null);

  // Select stories run with a11y test off due to a known nested-interactive issue

  return (
    <VStack className="no-a11y-checks">
      <Select
        compact
        label="Label"
        labelVariant="inside"
        onChange={setSelectValue}
        options={selectOptions}
        placeholder="Select an option"
        style={{ flexGrow: 1 }}
        value={selectValue}
      />
      <Select
        label="Label"
        labelVariant="inside"
        onChange={setSelectValue}
        options={selectOptions}
        placeholder="Select an option"
        style={{ flexGrow: 1 }}
        value={selectValue}
      />
      <Select
        label="Label"
        onChange={setSelectValue}
        options={selectOptions}
        placeholder="Select an option"
        style={{ flexGrow: 1 }}
        value={selectValue}
      />
    </VStack>
  );
});
