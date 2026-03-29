import React, { memo } from 'react';

import { useComponentConfig } from '../hooks/useComponentConfig';

import { TableSection, type TableSectionProps } from './TableSection';

export type TableFooterBaseProps = Pick<TableSectionProps, 'children'>;

export type TableFooterProps = TableFooterBaseProps & Omit<TableSectionProps, 'as'>;

export const TableFooter = memo((_props: TableFooterProps) => {
  const mergedProps = useComponentConfig('TableFooter', _props);
  const { children, testID, ...props } = mergedProps;
  return (
    <TableSection as="tfoot" data-testid={testID} {...props}>
      {children}
    </TableSection>
  );
});

TableFooter.displayName = 'TableFooter';
