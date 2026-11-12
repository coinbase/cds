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
      const aValue = sortBy ? get(a, sortBy) : a;
      const bValue = sortBy ? get(b, sortBy) : b;

      // Array.prototype.sort requires 0 for equal values. Returning 1 in both
      // directions makes the comparator inconsistent, which leaves the order of
      // tied rows implementation-defined and breaks the stable-sort guarantee.
      if (aValue === bValue) return 0;

      // Descending
      if (sortDirection === 'descending') {
        return aValue > bValue ? -1 : 1;
      }

      // Ascending (Default)
      return aValue < bValue ? -1 : 1;
    });
  }, [data, sortDirection, sortBy]);
};
