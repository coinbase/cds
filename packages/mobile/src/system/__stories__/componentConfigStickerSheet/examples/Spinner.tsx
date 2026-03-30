import React, { memo } from 'react';

import { Spinner } from '../../../../loaders/Spinner';

export const SpinnerExample = memo(() => {
  return (
    <>
      <Spinner />
      <Spinner size="large" />
    </>
  );
});
