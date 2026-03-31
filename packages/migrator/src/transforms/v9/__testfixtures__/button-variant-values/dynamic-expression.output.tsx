import React from 'react';
import { Button } from '@coinbase/cds-web';

type Props = {
  variant: 'tertiary' | 'primary';
  isActive: boolean;
};

export function DynamicButton({ variant, isActive }: Props) {
  return (
    <div>
      // TODO(cds-migration): Button variant values changed in v9: "tertiary" is now "inverse", "foregroundMuted" is now "secondary". Check if this dynamic value needs updating.
      <Button variant={variant}>Dynamic</Button>
      // TODO(cds-migration): Button variant values changed in v9: "tertiary" is now "inverse", "foregroundMuted" is now "secondary". Check if this dynamic value needs updating.
      <Button variant={isActive ? 'tertiary' : 'primary'}>Ternary</Button>
    </div>
  );
}
