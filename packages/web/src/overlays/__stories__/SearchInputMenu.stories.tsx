import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { SearchInput } from '../../controls/SearchInput';
import { SelectOption } from '../../controls/SelectOption';
import { Dropdown } from '../../dropdown/Dropdown';
import type { DropdownRefProps } from '../../dropdown/DropdownProps';
import { Icon } from '../../icons/Icon';
import { HStack } from '../../layout/HStack';
import { Pressable } from '../../system/Pressable';
import { Text } from '../../typography/Text';

const options = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
];

const SearchInputMenuRecipe = () => {
  const dropdownRef = useRef<DropdownRefProps>(null);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const [searchValue, setSearchValue] = useState<string>();
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const shouldShowAllResultsButton =
    filteredOptions.length && filteredOptions.length < options.length;

  const filterOptions = useMemo(
    () =>
      !searchValue
        ? options
        : options.filter(
            (option) =>
              searchValue &&
              typeof searchValue === 'string' &&
              option.toLowerCase().includes(searchValue.toLowerCase()),
          ),
    [searchValue],
  );

  useEffect(() => {
    setFilteredOptions(filterOptions);
  }, [filterOptions]);

  const handleSearchInputPress = useCallback(() => {
    dropdownRef.current?.openMenu();
  }, []);

  const handleClear = useCallback(() => {
    setSelectedValue(undefined);
    setSearchValue(undefined);
  }, [setSelectedValue]);

  const handleMenuChange = useCallback(
    (newValue: string) => {
      setSelectedValue(newValue);
      setSearchValue(newValue);
    },
    [setSearchValue, setSelectedValue],
  );

  const renderOptions = useMemo(
    () => filteredOptions.map((option) => <SelectOption title={option} value={option} />),
    [filteredOptions],
  );

  const handleKeyDown = useCallback(() => {
    // when using keyboard navigation and menu is focused,
    // open it once they start typing
    if (!searchValue) {
      dropdownRef.current?.openMenu();
    }
    // swap out selectedValue with searchValue so it becomes editable again
    if (selectedValue) {
      setSelectedValue(undefined);
    }
  }, [searchValue, selectedValue]);

  const content = useMemo(
    () => (
      <>
        {filteredOptions.length ? (
          renderOptions
        ) : (
          <HStack padding={3}>
            <Text as="p" display="block" font="caption">
              No options were found.{' '}
            </Text>
          </HStack>
        )}
        {shouldShowAllResultsButton ? (
          <Pressable block noScaleOnPress background="bg" onClick={handleClear}>
            <HStack alignItems="center" gap={1} paddingX={2} paddingY={2}>
              <Text as="p" display="block" font="label1">
                View all results
              </Text>
              <Icon color="fg" name="forwardArrow" size="xs" />
            </HStack>
          </Pressable>
        ) : null}
      </>
    ),
    [filteredOptions.length, handleClear, renderOptions, shouldShowAllResultsButton],
  );

  return (
    <Dropdown
      ref={dropdownRef}
      block
      disableCloseOnOptionChange
      disableTypeFocus
      content={content}
      onChange={handleMenuChange}
      value={selectedValue}
      width="100%"
    >
      <SearchInput
        accessibilityLabel="search-input"
        onChangeText={setSearchValue}
        onClear={handleClear}
        onClick={handleSearchInputPress}
        onKeyDown={handleKeyDown}
        value={selectedValue ?? searchValue ?? ''}
        width="100%"
      />
    </Dropdown>
  );
};

export const SearchInputMenu = () => <SearchInputMenuRecipe />;

export default {
  title: 'Components/Recipes/SearchInputMenu',
  component: SearchInputMenu,
};
