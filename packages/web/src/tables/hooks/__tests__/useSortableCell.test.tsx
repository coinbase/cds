import { noop } from '@coinbase/cds-utils';
import { renderHook } from '@testing-library/react';

import { TableCellSortIcon } from '../../TableCellSortIcon';
import { useSortableCell } from '../useSortableCell';

describe('useSortableCell()', () => {
  const onClick = expect.any(Function) as () => void;
  const sortBy = { price: 'price', amount: 'amount.balance' };

  it('returns the correct active props while ascending', () => {
    const {
      result: { current: getSortableProps },
    } = renderHook(() => {
      return useSortableCell({
        sortBy: sortBy.amount,
        sortDirection: 'ascending',
        onChange: noop,
      });
    });

    const expected = {
      onClick,
      color: 'fgPrimary',
      'aria-sort': 'ascending',
      end: <TableCellSortIcon direction="ascending" />,
    };

    // Use the hooks return fn
    const activeProps = getSortableProps('amount.balance');
    expect(activeProps).toMatchObject(expected);
  });

  it('returns the correct active props while descending', () => {
    const {
      result: { current: getSortableProps },
    } = renderHook(() => {
      return useSortableCell({
        sortBy: sortBy.amount,
        sortDirection: 'descending',
        onChange: noop,
      });
    });

    const expected = {
      onClick,
      color: 'fgPrimary',
      'aria-sort': 'descending',
      end: <TableCellSortIcon direction="descending" />,
    };

    // Use the hooks return fn
    const activeProps = getSortableProps('amount.balance');
    expect(activeProps).toMatchObject(expected);
  });

  it('returns the correct inactive props', () => {
    const {
      result: { current: getSortableProps },
    } = renderHook(() => {
      return useSortableCell({
        sortBy: sortBy.price,
        sortDirection: 'ascending',
        onChange: noop,
      });
    });

    const expected = { onClick, color: 'fgMuted', end: <TableCellSortIcon /> };

    // Use the hooks return fn
    const inactiveProps = getSortableProps('amount.balance');
    expect(inactiveProps).toMatchObject(expected);
  });
});
