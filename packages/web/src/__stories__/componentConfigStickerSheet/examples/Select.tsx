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

  return (
    <VStack alignItems="stretch" className="no-a11y-checks" gap={2} width="100%">
      <Select
        label="Label"
        onChange={setSelectValue}
        options={selectOptions}
        placeholder="Outside label"
        style={{ width: '100%' }}
        value={selectValue}
      />
      <Select
        label="Label"
        labelVariant="inside"
        onChange={setSelectValue}
        options={selectOptions}
        placeholder="Default input"
        style={{ width: '100%' }}
        value={selectValue}
      />
      <Select
        compact
        label="Label"
        onChange={setSelectValue}
        options={selectOptions}
        placeholder="Compact input"
        style={{ width: '100%' }}
        value={selectValue}
      />
      <Select
        readOnly
        label="Label"
        onChange={setSelectValue}
        options={selectOptions}
        placeholder="Read only input"
        style={{ width: '100%' }}
        value={selectValue}
      />
    </VStack>
  );
});
