import React from 'react';
import { Button } from '@coinbase/cds-web';

type Props = {
  variant: 'tertiary' | 'primary';
  isActive: boolean;
};

export function DynamicButton({ variant, isActive }: Props) {
  return (
    <div>
      <Button variant={variant}>Dynamic</Button>
      <Button variant={isActive ? 'tertiary' : 'primary'}>Ternary</Button>
    </div>
  );
}
