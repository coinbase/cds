import { memo, useState } from 'react';

import { Select } from '../../../../alpha/select/Select';
import { VStack } from '../../../../layout/VStack';

import { stickerSheetSelectOptions } from './constants';

export const SelectExample = memo(() => {
  const [selectValue, setSelectValue] = useState<string | null>(null);

  return (
    <VStack gap={1} width="100%">
      <Select
        label="Label"
        onChange={setSelectValue}
        options={stickerSheetSelectOptions}
        placeholder="Outside label"
        value={selectValue}
      />
      <Select
        label="Label"
        labelVariant="inside"
        onChange={setSelectValue}
        options={stickerSheetSelectOptions}
        placeholder="Inside label"
        value={selectValue}
      />
      <Select
        compact
        label="Label"
        onChange={setSelectValue}
        options={stickerSheetSelectOptions}
        placeholder="Compact input"
        value={selectValue}
      />
      <Select
        compact
        align="end"
        label="Label"
        onChange={setSelectValue}
        options={stickerSheetSelectOptions}
        placeholder="Compact end align"
        value={selectValue}
      />
    </VStack>
  );
});
