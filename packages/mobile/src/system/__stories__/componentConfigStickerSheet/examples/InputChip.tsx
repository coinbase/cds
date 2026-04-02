import React, { memo } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';

import { InputChip } from '../../../../chips/InputChip';
import { RemoteImage } from '../../../../media/RemoteImage';

export const InputChipExample = memo(() => {
  return (
    <InputChip
      onPress={() => undefined}
      start={<RemoteImage height={16} shape="circle" source={assets.eth.imageUrl} width={16} />}
    >
      ETH
    </InputChip>
  );
});
