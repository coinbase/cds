import React from 'react';
import { Button, IconButton } from '@coinbase/cds-web';

export function Toolbar() {
  return (
    <div>
      <Button variant="primary">Save</Button>
      <Button variant="inverse">Cancel</Button>
      <Button variant="secondary">Dismiss</Button>
      <Button variant="secondary">Edit</Button>
      <Button variant="positive">Confirm</Button>
      <Button variant="negative">Delete</Button>
      <IconButton variant="inverse" icon="close" accessibilityLabel="Close" />
      <IconButton variant="secondary" icon="settings" accessibilityLabel="Settings" />
      <IconButton variant="primary" icon="add" accessibilityLabel="Add" />
    </div>
  );
}
