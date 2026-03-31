import React from 'react';
import { Button as CdsButton, IconButton as CdsIconButton } from '@coinbase/cds-web';

export function AliasedToolbar() {
  return (
    <div>
      <CdsButton variant="tertiary">Cancel</CdsButton>
      <CdsButton variant="foregroundMuted">Dismiss</CdsButton>
      <CdsIconButton variant="tertiary" icon="close" accessibilityLabel="Close" />
    </div>
  );
}
