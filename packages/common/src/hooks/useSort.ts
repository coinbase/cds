import { useMemo } from 'react';
import get from 'lodash/get';

import type { RecursiveKeyOf } from '../types/Helpers';

type UseSortParams<T> = Readonly<{
  /** An array of data we want to sort.  */
  data: readonly T[];
  /**
   * Key for the item we're sorting.
   * Use null/undefined to sort a simple array of strings or numbers
   * @example 'asset.name'
   */
  sortBy?: RecursiveKeyOf<T>;
  /**
   * The direction to sort items.
   * @default ascending
   */
  sortDirection?: React.TdHTMLAttributes<HTMLTableCellElement>['aria-sort'];
}>;

export const useSort = <T>({ data, sortBy, sortDirection }: UseSortParams<T>) => {
  // TODO remove in the next major bump
  // @ts-expect-error ensure old implementations don't fail
  if (sortDirection === 'ASC') sortDirection = 'ascending';
  // @ts-expect-error ensure old implementations don't fail
  if (sortDirection === 'DESC') sortDirection = 'descending';

  return useMemo(() => {
    // Spread to avoid overwriting in place
    return [...data].sort((a, b) => {
      // Descending
      if (sortDirection === 'descending') {
        return (sortBy ? get(a, sortBy) : a) > (sortBy ? get(b, sortBy) : b) ? -1 : 1;
      }

      // Ascending (Default)
      return (sortBy ? get(b, sortBy) : b) > (sortBy ? get(a, sortBy) : a) ? -1 : 1;
    });
  }, [data, sortDirection, sortBy]);
};
