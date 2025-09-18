import React, { useState } from 'react';
import type { Meta } from '@storybook/react';

import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import type {
  PaginationEllipsisProps,
  PaginationNavigationButtonProps,
  PaginationPageButtonProps,
} from '../Pagination';
import { Pagination } from '../Pagination';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: 'Pagination component allows users to navigate through paginated content.',
      },
    },
    a11y: {
      config: {
        // Add any specific a11y configs if needed
      },
    },
  },
} as Meta;

const BasicPaginationExample = () => {
  const [page, setPage] = useState(1);
  return (
    <VStack alignItems="flex-start" gap={2}>
      <Text as="h3" display="block" font="headline">
        Basic Pagination
      </Text>
      <Pagination activePage={page} onChange={setPage} totalPages={10} />
    </VStack>
  );
};

const WithFirstLastButtonsExample = () => {
  const [page, setPage] = useState(5);
  return (
    <VStack alignItems="flex-start" gap={2}>
      <Text as="h3" display="block" font="headline">
        With First/Last Buttons
      </Text>
      <Pagination
        activePage={page}
        onChange={setPage}
        showFirstLastButtons={true}
        totalPages={10}
      />
    </VStack>
  );
};

const CustomRangesExample = () => {
  const [page, setPage] = useState(7);
  return (
    <VStack alignItems="flex-start" gap={2}>
      <Text as="h3" display="block" font="headline">
        Custom Ranges (siblingCount=2, boundaryCount=2)
      </Text>
      <Pagination
        activePage={page}
        boundaryCount={2}
        onChange={setPage}
        siblingCount={2}
        totalPages={20}
      />
    </VStack>
  );
};

const FewPagesExample = () => {
  const [page, setPage] = useState(2);
  return (
    <VStack alignItems="flex-start" gap={2}>
      <Text as="h3" display="block" font="headline">
        Few Pages
      </Text>
      <Pagination activePage={page} onChange={setPage} totalPages={3} />
    </VStack>
  );
};

const ManyPagesExample = () => {
  const [page, setPage] = useState(25);
  return (
    <VStack alignItems="flex-start" gap={2}>
      <Text as="h3" display="block" font="headline">
        Many Pages
      </Text>
      <Pagination
        activePage={page}
        onChange={setPage}
        showFirstLastButtons={true}
        totalPages={50}
      />
    </VStack>
  );
};

const DisabledPagesExample = () => {
  const [page, setPage] = useState(2);
  return (
    <VStack alignItems="flex-start" gap={2}>
      <Text as="h3" display="block" font="headline">
        Disabled Pages
      </Text>
      <Pagination disabled activePage={page} onChange={setPage} totalPages={3} />
    </VStack>
  );
};

const AccessiblePaginationExample = () => {
  const [page, setPage] = useState(3);
  return (
    <VStack alignItems="flex-start" gap={2}>
      <Text as="h3" display="block" font="headline">
        Accessible Pagination
      </Text>
      <Text as="p" display="block" font="body">
        With custom accessibility labels, tooltip labels, and test IDs
      </Text>
      <Pagination
        accessibilityLabel="Custom accessible pagination"
        accessibilityLabels={{
          first: 'Go to first page of results',
          last: 'Go to last page of results',
          next: 'Go to next page of results',
          page: (page) => `Go to page ${page} of results`,
          previous: 'Go to previous page of results',
        }}
        activePage={page}
        onChange={setPage}
        showFirstLastButtons={true}
        testID="pagination-example"
        testIDMap={{
          firstButton: 'pagination-first-button',
          lastButton: 'pagination-last-button',
          nextButton: 'pagination-next-button',
          prevButton: 'pagination-prev-button',
        }}
        totalPages={10}
      />
    </VStack>
  );
};

const CustomComponentsExample = () => {
  const [page, setPage] = useState(5);

  // Custom page button component
  const CustomPageButton = React.forwardRef<HTMLButtonElement, PaginationPageButtonProps>(
    ({ accessibilityLabel, isCurrentPage, onClick, page, testID }, ref) => (
      <Box
        ref={ref}
        alignItems="center"
        aria-current={isCurrentPage ? 'page' : undefined}
        aria-label={accessibilityLabel}
        as="button"
        background={isCurrentPage ? 'bgSecondary' : 'bg'}
        borderRadius={100}
        color={isCurrentPage ? 'fgPrimary' : 'fgMuted'}
        display="flex"
        justifyContent="center"
        margin={0}
        minWidth={8}
        onClick={() => onClick(page)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(page);
          }
        }}
        padding={1}
        role="button"
        style={{ cursor: 'pointer' }}
        tabIndex={0}
        testID={testID}
      >
        <Text font="body">{page}</Text>
      </Box>
    ),
  );

  // Custom navigation button
  const CustomNavButton = React.forwardRef<HTMLButtonElement, PaginationNavigationButtonProps>(
    ({ accessibilityLabel, direction, disabled, onClick }, ref) => {
      // Direction-specific arrows
      const getArrow = () => {
        switch (direction) {
          case 'first':
            return '««';
          case 'previous':
            return '«';
          case 'next':
            return '»';
          case 'last':
            return '»»';
          default:
            return '';
        }
      };

      return (
        <Box
          ref={ref}
          alignItems="center"
          aria-disabled={disabled}
          aria-label={accessibilityLabel}
          as="button"
          background="bgSecondary"
          borderRadius={100}
          color={disabled ? 'fgMuted' : 'fgPrimary'}
          disabled={disabled}
          display="flex"
          justifyContent="center"
          margin={0}
          minWidth={8}
          onClick={disabled ? undefined : onClick}
          onKeyDown={(e) => {
            if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              onClick();
            }
          }}
          opacity={disabled ? 0.7 : 1}
          padding={1}
          role="button"
          style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
          tabIndex={disabled ? -1 : 0}
        >
          {getArrow()}
        </Box>
      );
    },
  );

  // Custom ellipsis component
  const CustomEllipsis: React.FC<PaginationEllipsisProps> = ({ content = '•••', testID }) => (
    <Box
      alignItems="center"
      aria-hidden="true"
      color="fgMuted"
      display="flex"
      margin={0}
      padding={1}
      testID={testID}
    >
      {content}
    </Box>
  );

  return (
    <VStack alignItems="flex-start" gap={2}>
      <Text as="h3" display="block" font="headline">
        Custom Components
      </Text>
      <Text as="p" display="block" font="body">
        Using custom components for page buttons, navigation buttons, and ellipsis
      </Text>

      <Pagination
        showFirstLastButtons
        PaginationEllipsisComponent={CustomEllipsis}
        PaginationNavigationButtonComponent={CustomNavButton}
        PaginationPageButtonComponent={CustomPageButton}
        activePage={page}
        onChange={setPage}
        totalPages={20}
      />
    </VStack>
  );
};

export const PaginationExamples = () => {
  return (
    <VStack alignItems="flex-start" gap={4}>
      <BasicPaginationExample />
      <FewPagesExample />
      <ManyPagesExample />
      <WithFirstLastButtonsExample />
      <DisabledPagesExample />
      <AccessiblePaginationExample />
      <CustomRangesExample />
      <CustomComponentsExample />
    </VStack>
  );
};
