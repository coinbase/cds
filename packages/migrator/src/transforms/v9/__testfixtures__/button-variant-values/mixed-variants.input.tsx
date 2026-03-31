import React from 'react';
import { Button, IconButton } from '@coinbase/cds-web';

export function Toolbar() {
  return (
    <div>
      <Button variant="primary">Save</Button>
      <Button variant="tertiary">Cancel</Button>
      <Button variant="foregroundMuted">Dismiss</Button>
      <Button variant="secondary">Edit</Button>
      <Button variant="positive">Confirm</Button>
      <Button variant="negative">Delete</Button>
      <IconButton variant="tertiary" icon="close" accessibilityLabel="Close" />
      <IconButton variant="foregroundMuted" icon="settings" accessibilityLabel="Settings" />
      <IconButton variant="primary" icon="add" accessibilityLabel="Add" />
    </div>
  );
}
