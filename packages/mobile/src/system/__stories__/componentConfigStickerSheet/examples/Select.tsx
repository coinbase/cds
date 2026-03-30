import React, { memo, useState } from 'react';

import { Select } from '../../../../alpha/select/Select';
import { VStack } from '../../../../layout/VStack';

import { stickerSheetSelectOptions } from './constants';

export const SelectExample = memo(() => {
  const [value, setValue] = useState<string | null>('btc');
  const [secondaryValue, setSecondaryValue] = useState<string | null>(null);

  return (
    <VStack gap={1} width="100%">
      <Select label="Asset" onChange={setValue} options={stickerSheetSelectOptions} value={value} />
      <Select
        label="Asset (empty)"
        onChange={setSecondaryValue}
        options={stickerSheetSelectOptions}
        value={secondaryValue}
      />
    </VStack>
  );
});
