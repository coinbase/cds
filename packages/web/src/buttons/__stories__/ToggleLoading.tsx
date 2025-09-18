import React, { useState } from 'react';

import { Button } from '../Button';

export const ToggleLoading = ({ compact = false }: { compact?: boolean }) => {
  const [loading, setLoading] = useState(false);
  return (
    /* eslint-disable-next-line */
    <div onClick={() => setLoading(!loading)}>
      <Button compact={compact} loading={loading}>
        Button
      </Button>
    </div>
  );
};
