import { useContext } from 'react';

import type { CellSpacing } from '../../cells/Cell';
import { TableContext } from '../context/TableContext';
import { TableSectionContext } from '../context/TableSectionContext';
import type { TableCellSpacing } from '../Table';
import type { TableCellProps, TableCellTag } from '../TableCell';
import type { TableSectionTag } from '../TableSection';

const CELL_TAG_MAP: Record<TableSectionTag, TableCellTag> = {
  thead: 'th',
  tbody: 'td',
  tfoot: 'td',
  div: 'div',
};

export const defaultCellSpacing: TableCellSpacing = {
  outer: { paddingX: 2 },
  inner: { paddingX: 2 },
};

export const compactCellSpacing: TableCellSpacing = {
  outer: { paddingX: 2, paddingY: 0 },
  inner: { paddingX: 1, paddingY: 1 },
};

type UseTableContext = {
  skipAsValidation?: boolean;
};

export const useTableContext = ({ skipAsValidation }: UseTableContext = {}) => {
  const { as } = useContext(TableSectionContext);
  const { cellSpacing, compact } = useContext(TableContext);

  if (!skipAsValidation && !as) {
    console.error('This component must be wrapped in a TableHeader, TableBody or TableFooter.');
  }

  return { as, cellSpacing, compact };
};

export const useTableCellTag = (asProp?: TableCellProps['as']) => {
  const { as = 'div' } = useTableContext();

  if (asProp) return asProp;

  return CELL_TAG_MAP[as];
};

export const useTableSectionTag = () => {
  const { as = 'div' } = useTableContext();

  return as;
};

type UseTableCellSpacing = {
  outer?: CellSpacing;
  inner?: CellSpacing;
} & UseTableContext;

export const useTableCellSpacing = (props?: UseTableCellSpacing) => {
  const { cellSpacing, compact } = useTableContext({ skipAsValidation: props?.skipAsValidation });

  const componentSpacing = (props?.inner || props?.outer) && props;
  if (cellSpacing) return { ...cellSpacing, ...componentSpacing };
  if (compact) return { ...compactCellSpacing, ...componentSpacing };
  return { ...defaultCellSpacing, ...componentSpacing };
};
