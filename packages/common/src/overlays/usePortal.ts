import { useContext } from 'react';
import { isProduction } from '@coinbase/cds-utils';

import { PortalContext } from './PortalContext';

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!isProduction() && !context) {
    console.error('Cannot use `usePortal` outside of PortalProvider');
  }
  return context;
};
