import { createContext } from 'react';

import type { TableSectionTag } from '../TableSection';

export type TableSectionContextValue = {
  as?: TableSectionTag;
};

export const TableSectionContext = createContext<TableSectionContextValue>({});
