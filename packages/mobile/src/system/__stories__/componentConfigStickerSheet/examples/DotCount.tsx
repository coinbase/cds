import React, { memo } from 'react';

import { DotCount } from '../../../../dots/DotCount';
import { Icon } from '../../../../icons/Icon';

export const DotCountExample = memo(() => {
  return (
    <>
      <DotCount count={3}>
        <Icon name="bell" size="m" />
      </DotCount>
      <DotCount count={12}>
        <Icon name="bell" size="m" />
      </DotCount>
      <DotCount count={100} max={99}>
        <Icon name="bell" size="m" />
      </DotCount>
    </>
  );
});
