import React from 'react';
import { Button } from './components/Button';

export function CustomToolbar() {
  return (
    <div>
      <Button variant="tertiary">Cancel</Button>
      <Button variant="foregroundMuted">Dismiss</Button>
    </div>
  );
}
