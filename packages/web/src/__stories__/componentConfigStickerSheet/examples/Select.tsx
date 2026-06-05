import { memo, useState } from 'react';
import { Select } from '@coinbase/cds-web/alpha/select';

import { VStack } from '../../../layout';

const selectOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
  { value: 'option6', label: 'Option 6' },
];

export const SelectExample = memo(() => {
  const [selectValue, setSelectValue] = useState<string | null>(null);

  // Select stories run with a11y test off due to a known nested-interactive issue

  return (
    <VStack alignItems="stretch" className="no-a11y-checks" gap={1} width="100%">
      <Select
        label="Label"
        onChange={setSelectValue}
        options={selectOptions}
        placeholder="Outside label"
        style={{ flexGrow: 1 }}
        value={selectValue}
      />
      <Select
        label="Label"
        labelVariant="inside"
        onChange={setSelectValue}
        options={selectOptions}
        placeholder="Default input"
        style={{ flexGrow: 1 }}
        value={selectValue}
      />
      <Select
        compact
        label="Label"
        onChange={setSelectValue}
        options={selectOptions}
        placeholder="Compact input"
        style={{ flexGrow: 1 }}
        value={selectValue}
      />
      <Select
        compact
        align="end"
        label="Label"
        onChange={setSelectValue}
        options={selectOptions}
        placeholder="Compact end align"
        style={{ flexGrow: 1 }}
        value={selectValue}
      />
    </VStack>
  );
});
