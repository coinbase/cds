import React, { memo } from 'react';

import { Button } from '../../../../buttons/Button';
import { Coachmark } from '../../../../coachmark/Coachmark';

export const CoachmarkExample = memo(() => {
  return (
    <Coachmark
      action={<Button compact>Got it</Button>}
      content="You can now trade directly from your portfolio page."
      onClose={() => undefined}
      title="New feature"
    />
  );
});
