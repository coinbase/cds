import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { Meta } from '@storybook/react';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { TextInput } from '../../controls';
import { Select } from '../../controls/Select';
import { SelectOption } from '../../controls/SelectOption';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { usePagination } from '../usePagination';

export default {
  title: 'Components/Pagination',
  parameters: {
    docs: {
      description: {
        component: 'Headless pagination hook for building custom pagination UIs',
      },
    },
  },
} as Meta;

const StandardCustomPaginationExample = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    items,
    activePage,
    updateActivePage,
    goNextPage,
    goPrevPage,
    goFirstPage,
    goLastPage,
    isFirstPage,
    isLastPage,
  } = usePagination({
    totalPages: 10,
    activePage: currentPage,
    siblingCount: 1,
    boundaryCount: 1,
    onChange: setCurrentPage,
  });

  return (
    <VStack alignItems="flex-start" gap={2}>
      <Text as="h3" display="block" font="headline">
        Standard Custom Pagination (Page: {activePage})
      </Text>

      <HStack alignItems="center" gap={1}>
        <Button compact disabled={isFirstPage} onClick={goFirstPage} variant="secondary">
          First
        </Button>
        <Button compact disabled={isFirstPage} onClick={goPrevPage} variant="secondary">
          Previous
        </Button>

        {items.map((item, index) => {
          if (item.type === 'ellipsis') {
            return <Text key={`ellipsis-${index}`}>...</Text>;
          }

          const isCurrent = item.page === activePage;

          return (
            <Button
              key={item.page}
              compact
              onClick={() => updateActivePage(item.page!)}
              variant={isCurrent ? 'primary' : 'secondary'}
            >
              {item.page}
            </Button>
          );
        })}

        <Button compact disabled={isLastPage} onClick={goNextPage} variant="secondary">
          Next
        </Button>
        <Button compact disabled={isLastPage} onClick={goLastPage} variant="secondary">
          Last
        </Button>
      </HStack>
    </VStack>
  );
};

const MinimalCustomPaginationExample = () => {
  const [inputValue, setInputValue] = useState('1');
  const [itemsPerPage, setItemsPerPage] = useState('10');
  const totalItems = 100; // Total number of items

  // Calculate total pages based on items per page
  const totalPages = Math.ceil(totalItems / parseInt(itemsPerPage, 10));

  const { activePage, updateActivePage, isFirstPage, isLastPage, goNextPage, goPrevPage } =
    usePagination({
      totalPages,
      activePage: 1,
      siblingCount: 1,
      boundaryCount: 1,
      onChange: (page) => {
        setInputValue(page.toString());
      },
    });

  // Handle input changes and validation
  const handlePageInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const applyPageChange = () => {
    const newPage = parseInt(inputValue, 10);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
      updateActivePage(newPage);
    } else {
      setInputValue(activePage.toString());
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value);
    // When changing items per page, we need to adjust the current page
    // to avoid being out of bounds with the new page count
    const newTotalPages = Math.ceil(totalItems / parseInt(value, 10));
    if (activePage > newTotalPages) {
      updateActivePage(newTotalPages);
      setInputValue(newTotalPages.toString());
    }
  };

  return (
    <VStack alignItems="flex-start" gap={2}>
      <Text as="h3" display="block" font="headline">
        Minimal Custom Pagination
      </Text>

      <HStack alignItems="center" gap={2}>
        <HStack alignItems="center" gap={2}>
          <IconButton
            transparent
            accessibilityLabel="Previous page"
            disabled={isFirstPage}
            name="caretLeft"
            onClick={goPrevPage}
            variant="secondary"
          />
          <TextInput
            compact
            accessibilityLabel="Go to page"
            align="center"
            max={totalPages}
            min={1}
            onBlur={applyPageChange}
            onChange={handlePageInput}
            onKeyDown={(e) => e.key === 'Enter' && applyPageChange()}
            type="number"
            value={inputValue}
            width={40}
          />
          <Text color="fgMuted" font="headline">
            of
          </Text>
          <Text font="headline">{totalPages}</Text>
          <IconButton
            transparent
            accessibilityLabel="Next page"
            disabled={isLastPage}
            name="caretRight"
            onClick={goNextPage}
            variant="secondary"
          />
        </HStack>

        {/* Items per page selection */}
        <HStack alignItems="center" gap={1}>
          <Text color="fgMuted" font="body">
            Items per page:
          </Text>
          <Select
            compact
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
            variant="foregroundMuted"
            width={90}
          >
            {['5', '10', '25', '50'].map((option) => (
              <SelectOption key={option} title={option} value={option} />
            ))}
          </Select>
        </HStack>
      </HStack>
    </VStack>
  );
};

export const UsePaginationExamples = () => {
  return (
    <VStack alignItems="flex-start" gap={4}>
      <StandardCustomPaginationExample />
      <MinimalCustomPaginationExample />
    </VStack>
  );
};
