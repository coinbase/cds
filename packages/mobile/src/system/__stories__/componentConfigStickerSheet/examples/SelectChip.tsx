import React, { memo, useState } from 'react';

import { SelectChip } from '../../../../chips/SelectChip';
import { SelectOption } from '../../../../controls/SelectOption';

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
