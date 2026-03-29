import React, { memo } from 'react';

import { TableSection, type TableSectionProps } from './TableSection';

export type TableFooterProps = TableSectionProps;

export const TableFooter = memo(({ children, testID, ...props }: TableFooterProps) => {
  return (
    <TableSection as="tfoot" data-testid={testID} {...props}>
      {children}
    </TableSection>
  );
});

TableFooter.displayName = 'TableFooter';
