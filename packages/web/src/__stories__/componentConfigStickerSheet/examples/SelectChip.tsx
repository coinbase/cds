import { memo, useState } from 'react';
import { SelectChip } from '@coinbase/cds-web/alpha/select-chip/SelectChip';

const selectChipOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'CAD', label: 'CAD' },
  { value: 'GBP', label: 'GBP' },
  { value: 'JPY', label: 'JPY' },
];

export const SelectChipExample = memo(() => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <SelectChip
      accessibilityLabel="Select a currency"
      onChange={setValue}
      options={selectChipOptions}
      placeholder="Currency"
      value={value}
    />
  );
});
