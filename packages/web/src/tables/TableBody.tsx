import React, { memo } from 'react';

import { TableSection, type TableSectionProps } from './TableSection';

export type TableBodyProps = TableSectionProps;

export const TableBody = memo(({ children, testID, ...props }: TableBodyProps) => {
  return (
    <TableSection as="tbody" testID={testID} {...props}>
      {children}
    </TableSection>
  );
});

TableBody.displayName = 'TableBody';
