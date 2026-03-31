import React from 'react';
import { Button as CdsButton, IconButton as CdsIconButton } from '@coinbase/cds-web';

export function AliasedToolbar() {
  return (
    <div>
      <CdsButton variant="inverse">Cancel</CdsButton>
      <CdsButton variant="secondary">Dismiss</CdsButton>
      <CdsIconButton variant="inverse" icon="close" accessibilityLabel="Close" />
    </div>
  );
}
