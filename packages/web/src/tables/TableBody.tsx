import React, { memo } from 'react';

import { useComponentConfig } from '../hooks/useComponentConfig';

import { TableSection, type TableSectionProps } from './TableSection';

export type TableBodyBaseProps = TableSectionProps;

export type TableBodyProps = TableBodyBaseProps;

export const TableBody = memo((_props: TableBodyProps) => {
  const mergedProps = useComponentConfig('TableBody', _props);
  const { children, testID, ...props } = mergedProps;
  return (
    <TableSection as="tbody" testID={testID} {...props}>
      {children}
    </TableSection>
  );
});

TableBody.displayName = 'TableBody';
