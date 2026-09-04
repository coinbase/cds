import { createContext } from 'react';

import type { PortalNode } from './usePortalState';

export type PortalProviderStates = {
  addNode: (id: string, element: PortalNode['element']) => void;
  removeNode: (id: string) => void;
  nodes: PortalNode[];
};

export const PortalContext = createContext<PortalProviderStates>({
  addNode: () => {},
  removeNode: () => {},
  nodes: [],
});
