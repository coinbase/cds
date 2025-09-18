import React, { memo } from 'react';

import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { VStack } from '../layout/VStack';

export type TableCellSortIconProps = {
  direction?: React.TdHTMLAttributes<HTMLTableCellElement>['aria-sort'];
};

export const TableCellSortIcon = memo(({ direction }: TableCellSortIconProps) => {
  const upColor = direction === 'ascending' ? 'fgPrimary' : 'fgMuted';
  const downColor = direction === 'descending' ? 'fgPrimary' : 'fgMuted';

  return (
    <VStack gap={0.5}>
      <Box marginBottom={-0.5}>
        <Icon
          active
          aria-hidden="true"
          color={upColor}
          name="sortUpCenter"
          size="xs"
          testID="table-sort-icon-up"
        />
      </Box>
      <Box marginTop={-0.5}>
        <Icon
          active
          aria-hidden="true"
          color={downColor}
          name="sortDownCenter"
          size="xs"
          testID="table-sort-icon-down"
        />
      </Box>
    </VStack>
  );
});

TableCellSortIcon.displayName = 'TableCellSortIcon';
