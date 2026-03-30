import React, { memo, useState } from 'react';

import { SelectOption } from '../../../../controls/SelectOption';
import { SelectChip } from '../../../../chips/SelectChip';

export const SelectChipExample = memo(() => {
  const [value, setValue] = useState<string | undefined>('Balance');

  return (
    <SelectChip onChange={setValue} placeholder="Sort" value={value}>
      <SelectOption title="Balance" value="Balance" />
      <SelectOption title="Name" value="Name" />
      <SelectOption title="Asset Value" value="Asset Value" />
    </SelectChip>
  );
});
