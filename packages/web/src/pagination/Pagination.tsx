import React, { useCallback, useRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';
import type { HStackDefaultElement, HStackProps } from '../layout/HStack';
import { HStack } from '../layout/HStack';

import { DefaultPaginationEllipsis } from './DefaultPaginationEllipsis';
import { DefaultPaginationNavigationButton } from './DefaultPaginationNavigationButton';
import { DefaultPaginationNavigationTextButton } from './DefaultPaginationNavigationTextButton';
import { DefaultPaginationPageButton } from './DefaultPaginationPageButton';
import type { PaginationOptions } from './usePagination';
import { usePagination } from './usePagination';

export type PaginationPageButtonProps = {
  /** The page number */
  page: number;
  /** Click handler for the page button */
  onClick: (page: number) => void;
  /** A data attribute for the page number, used for focus management */
  'data-pagenumber': number;
  /** Whether this is the current active page */
  isCurrentPage?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Accessibility label for the button */
  accessibilityLabel?: string;
  /** Test ID for the button */
  testID?: string;
};

export type PaginationNavigationButtonProps = {
  /** Which navigation button this is */
  direction: 'first' | 'previous' | 'next' | 'last';
  /** Click handler for the button */
  onClick: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Accessibility label for the button */
  accessibilityLabel?: string;
  /** Test ID for the button */
  testID?: string;
};

export type PaginationEllipsisProps = {
  /** Custom content to display instead of default "..." */
  content?: string;
  /** Test ID for the ellipsis element */
  testID?: string;
};

export type PaginationPageButtonComponent = React.FC<PaginationPageButtonProps>;

export type PaginationNavigationButtonComponent = React.FC<PaginationNavigationButtonProps>;

export type PaginationEllipsisComponent = React.FC<PaginationEllipsisProps>;

export type PaginationBaseProps = Omit<PaginationOptions, 'initialPage'> & {
  /** Current active page number (1-based) */
  activePage: number;
  /** Whether to show first and last page navigation buttons */
  showFirstLastButtons?: boolean;
  disabled?: boolean;
  /** Custom test IDs for specific elements within pagination */
  testIDMap?: {
    nav?: string;
    nextButton?: string;
    prevButton?: string;
    firstButton?: string;
    lastButton?: string;
  };
  /** Custom label for the first page button */
  firstPageButtonLabel?: string;
  /** Custom label for the last page button */
  lastPageButtonLabel?: string;
  /** Custom accessibility labels for navigation buttons */
  accessibilityLabels?: {
    next?: string;
    previous?: string;
    first?: string;
    last?: string;
    page?: (page: number) => string;
  };
  accessibilityLabel?: string;
  /**
   * Custom component for rendering page buttons.
   * Must use forwardRef to properly receive and forward the ref to a focusable DOM element
   * for focus management to work correctly.
   */
  PaginationPageButtonComponent?: PaginationPageButtonComponent;
  /**
   * Custom component for rendering navigation buttons.
   * Must use forwardRef to properly receive and forward the ref to a focusable DOM element
   * for focus management to work correctly.
   */
  PaginationNavigationButtonComponent?: PaginationNavigationButtonComponent;
  /** Custom component for rendering ellipsis */
  PaginationEllipsisComponent?: PaginationEllipsisComponent;
};

export type PaginationProps = Polymorphic.ExtendableProps<
  HStackProps<HStackDefaultElement>,
  PaginationBaseProps
>;

export const Pagination = ({
  totalPages,
  activePage,
  onChange,
  disabled,
  showFirstLastButtons,
  siblingCount = 1,
  boundaryCount = 1,
  accessibilityLabel = 'Pagination',
  testID,
  testIDMap,
  accessibilityLabels,
  PaginationPageButtonComponent = DefaultPaginationPageButton,
  PaginationNavigationButtonComponent = DefaultPaginationNavigationButton,
  PaginationEllipsisComponent = DefaultPaginationEllipsis,
  firstPageButtonLabel = 'First',
  lastPageButtonLabel = 'Last',
  ...props
}: PaginationProps) => {
  const { items, updateActivePage, goNextPage, goPrevPage, goFirstPage, goLastPage } =
    usePagination({
      activePage,
      onChange,
      totalPages,
      siblingCount,
      boundaryCount,
    });

  // Refs for focus management
  const paginationContainerRef = useRef<HTMLElement>(null);

  const focusPageButton = (page: number) => {
    paginationContainerRef.current
      ?.querySelector<HTMLElement>(`[data-pagenumber="${page}"]`)
      ?.focus();
  };

  const handleGoToPage = useCallback(
    (page: number) => {
      updateActivePage(page);
      focusPageButton(page);
    },
    [updateActivePage],
  );

  const handleGoNextPage = useCallback(() => {
    const willBecomeDisabled = activePage + 1 === totalPages;
    goNextPage();
    if (willBecomeDisabled) focusPageButton(totalPages);
  }, [activePage, goNextPage, totalPages]);

  const handleGoPreviousPage = useCallback(() => {
    const willBecomeDisabled = activePage - 1 === 1;
    goPrevPage();
    if (willBecomeDisabled) focusPageButton(1);
  }, [activePage, goPrevPage]);

  const handleGoFirstPage = useCallback(() => {
    goFirstPage();
    focusPageButton(1);
  }, [goFirstPage]);

  const handleGoLastPage = useCallback(() => {
    goLastPage();
    focusPageButton(totalPages);
  }, [goLastPage, totalPages]);

  return (
    <HStack
      ref={paginationContainerRef}
      accessibilityLabel={accessibilityLabel}
      alignItems="center"
      as="nav"
      gap={0.5}
      justifyContent="center"
      testID={testID}
      {...props}
    >
      {showFirstLastButtons &&
        (PaginationNavigationButtonComponent === DefaultPaginationNavigationButton ? (
          <DefaultPaginationNavigationTextButton
            accessibilityLabel={accessibilityLabels?.first ?? 'First page'}
            disabled={activePage === 1 || disabled}
            onClick={handleGoFirstPage}
            testID={testIDMap?.firstButton}
          >
            {firstPageButtonLabel}
          </DefaultPaginationNavigationTextButton>
        ) : (
          <PaginationNavigationButtonComponent
            accessibilityLabel={accessibilityLabels?.first ?? 'First page'}
            direction="first"
            disabled={activePage === 1 || disabled}
            onClick={handleGoFirstPage}
            testID={testIDMap?.firstButton}
          />
        ))}

      <PaginationNavigationButtonComponent
        accessibilityLabel={accessibilityLabels?.previous ?? 'Previous page'}
        direction="previous"
        disabled={activePage === 1 || disabled}
        onClick={handleGoPreviousPage}
        testID={testIDMap?.prevButton}
      />

      {items.map((item, index) => {
        if (item.type === 'ellipsis')
          return <PaginationEllipsisComponent key={`ellipsis-${index}`} />;

        // Check if this is the current page
        const page = item.page;
        const isCurrentPage = activePage === page;

        return (
          <PaginationPageButtonComponent
            key={page}
            accessibilityLabel={
              accessibilityLabels?.page ? accessibilityLabels.page(page) : `Page ${page}`
            }
            data-pagenumber={page}
            disabled={disabled}
            isCurrentPage={isCurrentPage}
            onClick={handleGoToPage}
            page={page}
            testID={isCurrentPage ? `${testID}-current-page` : undefined}
          />
        );
      })}

      <PaginationNavigationButtonComponent
        accessibilityLabel={accessibilityLabels?.next ?? 'Next page'}
        direction="next"
        disabled={activePage === totalPages || disabled}
        onClick={handleGoNextPage}
        testID={testIDMap?.nextButton}
      />

      {showFirstLastButtons &&
        (PaginationNavigationButtonComponent === DefaultPaginationNavigationButton ? (
          <DefaultPaginationNavigationTextButton
            accessibilityLabel={accessibilityLabels?.last ?? 'Last page'}
            disabled={activePage === totalPages || disabled}
            onClick={handleGoLastPage}
            testID={testIDMap?.lastButton}
          >
            {lastPageButtonLabel}
          </DefaultPaginationNavigationTextButton>
        ) : (
          <PaginationNavigationButtonComponent
            accessibilityLabel={accessibilityLabels?.last ?? 'Last page'}
            direction="last"
            disabled={activePage === totalPages || disabled}
            onClick={handleGoLastPage}
            testID={testIDMap?.lastButton}
          />
        ))}
    </HStack>
  );
};
