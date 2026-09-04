import { memo } from 'react';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { Tooltip } from '@coinbase/cds-web/overlays';

export const TooltipExample = memo(() => {
  return (
    <Tooltip content="Additional information about this action">
      <Button variant="secondary">Show Tooltip</Button>
    </Tooltip>
  );
});
