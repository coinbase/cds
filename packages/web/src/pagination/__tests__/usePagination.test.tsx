import { act, renderHook } from '@testing-library/react';

import type { PaginationItem, PaginationOptions } from '../usePagination';
import { usePagination } from '../usePagination';

describe('usePagination', () => {
  const defaultProps: PaginationOptions = {
    totalPages: 10,
    activePage: 1,
    onChange: jest.fn(),
    siblingCount: 1,
    boundaryCount: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePagination(defaultProps));

    expect(result.current.activePage).toBe(1);
    expect(result.current.isFirstPage).toBe(true);
    expect(result.current.isLastPage).toBe(false);
    expect(result.current.items.length).toBeGreaterThan(0);
  });

  it('should navigate to the next page', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => usePagination({ ...defaultProps, onChange }));

    act(() => {
      result.current.goNextPage();
    });

    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('should navigate to the previous page', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      usePagination({ ...defaultProps, activePage: 5, onChange }),
    );

    act(() => {
      result.current.goPrevPage();
    });

    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('should navigate to the first page', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      usePagination({ ...defaultProps, activePage: 5, onChange }),
    );

    act(() => {
      result.current.goFirstPage();
    });

    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('should navigate to the last page', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => usePagination({ ...defaultProps, onChange }));

    act(() => {
      result.current.goLastPage();
    });

    expect(onChange).toHaveBeenCalledWith(10);
  });

  it('should set page directly', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => usePagination({ ...defaultProps, onChange }));

    act(() => {
      result.current.updateActivePage(7);
    });

    expect(onChange).toHaveBeenCalledWith(7);
  });

  it('should not go beyond first page', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      usePagination({ ...defaultProps, activePage: 1, onChange }),
    );

    act(() => {
      result.current.goPrevPage();
    });

    expect(onChange).not.toHaveBeenCalled();
    expect(result.current.isFirstPage).toBe(true);
  });

  it('should not go beyond last page', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      usePagination({ ...defaultProps, activePage: 10, onChange }),
    );

    act(() => {
      result.current.goNextPage();
    });

    expect(onChange).not.toHaveBeenCalled();
    expect(result.current.isLastPage).toBe(true);
  });

  it('should handle invalid active page', () => {
    expect(() => renderHook(() => usePagination({ ...defaultProps, activePage: 20 }))).toThrow(
      'Ensure activePage is within the valid range of 1 and totalPages',
    );
  });

  it('should handle negative total pages', () => {
    const { result } = renderHook(() => usePagination({ ...defaultProps, totalPages: -5 }));

    // Should convert negative pages to 1
    expect(result.current.activePage).toBe(1);
    expect(result.current.isFirstPage).toBe(true);
    expect(result.current.isLastPage).toBe(true);

    // Should have a single page item
    expect(result.current.items.filter((item) => item.type === 'page').length).toBe(1);

    // Navigation should be disabled via isFirstPage/isLastPage
    expect(result.current.isFirstPage).toBe(true);
    expect(result.current.isLastPage).toBe(true);
  });

  it('should generate correct page items', () => {
    const { result } = renderHook(() => usePagination(defaultProps));

    // Items should only contain pages and ellipses
    expect(
      result.current.items.every((item) => item.type === 'page' || item.type === 'ellipsis'),
    ).toBe(true);

    // First item should be page 1
    const firstItem = result.current.items[0];
    expect(firstItem.type).toBe('page');

    // Type assertion is safe because we've confirmed type is 'page' above
    const pageItem = firstItem as Extract<PaginationItem, { type: 'page' }>;
    expect(pageItem.page).toBe(1);
    expect(pageItem.selected).toBe(true); // Selected on first page

    // Navigation info should be available through isFirstPage/isLastPage
    expect(result.current.isFirstPage).toBe(true);
    expect(result.current.isLastPage).toBe(false);
  });

  it('should call onChange when changing pages', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => usePagination({ ...defaultProps, onChange }));

    act(() => {
      result.current.goNextPage();
    });

    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('should handle custom siblingCount', () => {
    const { result } = renderHook(() =>
      usePagination({ ...defaultProps, siblingCount: 2, activePage: 5 }),
    );

    const pageNumbers = result.current.items
      .filter((item): item is Extract<PaginationItem, { type: 'page' }> => item.type === 'page')
      .map((item) => item.page);

    // With siblingCount 2, should include pages 3,4,5,6,7
    expect(pageNumbers).toContain(3);
    expect(pageNumbers).toContain(4);
    expect(pageNumbers).toContain(5); // current page
    expect(pageNumbers).toContain(6);
    expect(pageNumbers).toContain(7);
  });

  it('should handle custom boundaryCount', () => {
    const { result } = renderHook(() =>
      usePagination({ ...defaultProps, boundaryCount: 2, activePage: 5 }),
    );

    const pageNumbers = result.current.items
      .filter((item): item is Extract<PaginationItem, { type: 'page' }> => item.type === 'page')
      .map((item) => item.page);

    // With boundaryCount 2, should include pages 1,2 at start and 9,10 at end
    expect(pageNumbers).toContain(1);
    expect(pageNumbers).toContain(2);
    expect(pageNumbers).toContain(9);
    expect(pageNumbers).toContain(10);
  });

  it('should update when totalPages changes', () => {
    const onChange = jest.fn();
    const totalPagesTest = { ...defaultProps, onChange };
    const { result, rerender } = renderHook(() => usePagination(totalPagesTest));

    // Reduce total pages
    totalPagesTest.totalPages = 5;
    rerender();

    // Navigation items should reflect new total
    const lastItem = result.current.items[result.current.items.length - 1];
    expect(lastItem.type).toBe('page');

    // Type assertion after checking type
    const lastPageItem = lastItem as Extract<PaginationItem, { type: 'page' }>;
    expect(lastPageItem.page).toBe(5);

    act(() => {
      result.current.goLastPage();
    });

    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('should handle single page scenario', () => {
    const { result } = renderHook(() => usePagination({ ...defaultProps, totalPages: 1 }));

    expect(result.current.isFirstPage).toBe(true);
    expect(result.current.isLastPage).toBe(true);
    expect(result.current.items.filter((i) => i.type === 'page').length).toBe(1);

    // No navigation is possible (verified through flags)
    expect(result.current.isFirstPage).toBe(true);
    expect(result.current.isLastPage).toBe(true);
  });

  it('should properly generate ellipsis for large page counts', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalPages: 100,
        activePage: 50,
        onChange: jest.fn(),
        boundaryCount: 1,
        siblingCount: 1,
      }),
    );

    const items = result.current.items;
    // Check if ellipsis exist
    expect(items.some((item) => item.type === 'ellipsis')).toBe(true);

    // Should have exactly 2 ellipses (one before and one after current page group)
    const ellipsisCount = items.filter((item) => item.type === 'ellipsis').length;
    expect(ellipsisCount).toBe(2);
  });

  it('should maintain current page when possible after totalPages change', () => {
    const totalPagesTest = { ...defaultProps, activePage: 7 };
    const { result, rerender } = renderHook(() => usePagination(totalPagesTest));

    // Decrease pages but current page is still valid
    totalPagesTest.totalPages = 8;
    rerender();
    expect(result.current.activePage).toBe(7);

    // Drastically increase pages
    totalPagesTest.totalPages = 100;
    rerender();
    expect(result.current.activePage).toBe(7);
  });
});
