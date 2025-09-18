import { useCallback, useMemo } from 'react';

export type PaginationItem =
  | {
      type: 'page';
      page: number;
      selected?: boolean;
    }
  | {
      type: 'ellipsis';
    };

export type PaginationOptions = {
  /** React state for the currently active page. */
  activePage: number;
  /** Total number of pages. */
  totalPages: number;
  /** Callback that is fired when the active page changes. Use this callback to update the `activePage` state. */
  onChange: (activePage: number) => void;
  /** Number of pages to show on each side of current page. */
  siblingCount?: number;
  /** Number of pages to show at the beginning and end of pagination. */
  boundaryCount?: number;
};

export type PaginationApi = Omit<PaginationOptions, 'onChange'> & {
  /** React state for the currently active page number. Setting it to `null` results in no active page. */
  activePage: number;
  /** Update the currently active page number to `activePage`. Setting it to a number outside of the valid range will not change the active page. */
  updateActivePage: (activePage: number) => void;
  /** Update the currently active page to the next page. */
  goNextPage: () => void;
  /** Update the currently active page to the previous page. */
  goPrevPage: () => void;
  /** Update the currently active page to the first page. */
  goFirstPage: () => void;
  /** Update the currently active page to the last page. */
  goLastPage: () => void;
  /** State indicating if the activePage is the first page. */
  isFirstPage: boolean;
  /** State indicating if the activePage is the last page. */
  isLastPage: boolean;
  /** Array of pagination items. */
  items: PaginationItem[];
};

/** Creates an array of consecutive numbers from `start` to `end`.  */
const createNumberRange = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const createPaginationItems = ({
  activePage,
  validTotalPages,
  siblingCount,
  boundaryCount,
}: {
  activePage: number;
  validTotalPages: number;
  siblingCount: number;
  boundaryCount: number;
}): PaginationItem[] => {
  const startPages = createNumberRange(1, Math.min(boundaryCount, validTotalPages));
  const endPages = createNumberRange(
    Math.max(validTotalPages - boundaryCount + 1, boundaryCount + 1),
    validTotalPages,
  );

  const siblingsStart = Math.max(
    Math.min(activePage - siblingCount, validTotalPages - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(activePage + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : validTotalPages - 1,
  );

  // Initialize items array
  const items: PaginationItem[] = [];

  // Add start pages
  startPages.forEach((page) => {
    items.push({
      type: 'page',
      page,
      selected: page === activePage,
    });
  });

  // Add ellipsis if needed
  if (siblingsStart > boundaryCount + 2) {
    items.push({ type: 'ellipsis' });
  } else if (boundaryCount + 1 < validTotalPages - boundaryCount) {
    items.push({
      type: 'page',
      page: boundaryCount + 1,
      selected: boundaryCount + 1 === activePage,
    });
  }

  // Add sibling pages
  const siblingsRange = createNumberRange(siblingsStart, siblingsEnd);
  siblingsRange.forEach((page) => {
    items.push({
      type: 'page',
      page,
      selected: page === activePage,
    });
  });

  // Add ellipsis if needed
  if (siblingsEnd < validTotalPages - boundaryCount - 1) {
    items.push({ type: 'ellipsis' });
  } else if (validTotalPages - boundaryCount > boundaryCount) {
    items.push({
      type: 'page',
      page: validTotalPages - boundaryCount,
      selected: validTotalPages - boundaryCount === activePage,
    });
  }

  // Add end pages
  endPages.forEach((page) => {
    items.push({
      type: 'page',
      page,
      selected: page === activePage,
    });
  });

  return items;
};

export function usePagination({
  activePage = 1,
  onChange,
  totalPages,
  siblingCount = 1,
  boundaryCount = 1,
}: PaginationOptions): PaginationApi {
  const validTotalPages = Math.max(1, totalPages);
  if (activePage < 1 || activePage > validTotalPages) {
    throw new Error('Ensure activePage is within the valid range of 1 and totalPages');
  }

  const updateActivePage = useCallback(
    (page: number) => {
      if (page < 1 || page > validTotalPages || page === activePage) return;
      onChange(page);
    },
    [activePage, validTotalPages, onChange],
  );

  const goNextPage = useCallback(
    () => updateActivePage(activePage + 1),
    [activePage, updateActivePage],
  );

  const goPrevPage = useCallback(
    () => updateActivePage(activePage - 1),
    [activePage, updateActivePage],
  );

  const goFirstPage = useCallback(() => updateActivePage(1), [updateActivePage]);

  const goLastPage = useCallback(
    () => updateActivePage(validTotalPages),
    [validTotalPages, updateActivePage],
  );

  const isFirstPage = activePage === 1;
  const isLastPage = activePage === validTotalPages;

  const items = useMemo(
    () =>
      createPaginationItems({
        activePage,
        validTotalPages,
        siblingCount,
        boundaryCount,
      }),
    [activePage, validTotalPages, siblingCount, boundaryCount],
  );

  const api = useMemo(
    () => ({
      activePage,
      updateActivePage,
      totalPages,
      siblingCount,
      boundaryCount,
      goNextPage,
      goPrevPage,
      goFirstPage,
      goLastPage,
      isFirstPage,
      isLastPage,
      items,
    }),
    [
      totalPages,
      siblingCount,
      boundaryCount,
      activePage,
      updateActivePage,
      goNextPage,
      goPrevPage,
      goFirstPage,
      goLastPage,
      isFirstPage,
      isLastPage,
      items,
    ],
  );

  return api;
}
