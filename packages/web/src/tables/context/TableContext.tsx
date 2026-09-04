import { createContext } from 'react';

import type { TableProps } from '../Table';

export type TableContextValue = Pick<TableProps, 'variant' | 'cellSpacing' | 'compact'>;

export const TableContext = createContext<TableContextValue>({
  variant: 'default',
  compact: false,
});
