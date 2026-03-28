import React, { useMemo, useRef, useState } from 'react';
import { SearchInput } from '@coinbase/cds-web/controls/SearchInput';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography/Text';

import { useIsSticky } from '../../../utils/useIsSticky';

import ModalLink from './ModalLink';
import PropsTable from './PropsTable';
import type { ParentTypesItem, ParentTypesListProps } from './types';

const noResultsMessage = (
  <VStack alignContent="center" alignItems="center" gap={1.5} padding={2}>
    <Text font="headline">No results found</Text>
    <Text font="body">This prop does not exist.</Text>
  </VStack>
);

function ParentTypesTable({
  name,
  sharedTypeAliases,
  sharedParentTypes,
  props,
  scrollContainerRef,
}: ParentTypesItem & { scrollContainerRef: React.RefObject<HTMLDivElement> }) {
  const [searchValue, setSearchValue] = useState('');
  const filteredProps = useMemo(
    () =>
      Object.values(sharedParentTypes[name]).filter(
        (item) =>
          props.includes(item.name) && item.name.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [name, props, searchValue, sharedParentTypes],
  );

  const { elementRef, isSticky } = useIsSticky({
    top: 0,
    containerRef: scrollContainerRef,
  });

  return (
    <VStack paddingTop={0.25}>
      <Box
        ref={elementRef}
        background="bg"
        elevation={isSticky ? 1 : 0}
        paddingX={2}
        paddingY={2}
        position={{ desktop: 'sticky', tablet: 'sticky' }}
        top={{ desktop: 0, tablet: 0 }}
      >
        <SearchInput
          compact
          clearIconAccessibilityLabel="Clear search"
          onChangeText={setSearchValue}
          placeholder="Search"
          startIconAccessibilityLabel="Search"
          value={searchValue}
        />
      </Box>
      <Box paddingX={2}>
        {filteredProps.length > 0 ? (
          <PropsTable
            props={filteredProps}
            searchTerm={searchValue}
            sharedTypeAliases={sharedTypeAliases}
          />
        ) : (
          noResultsMessage
        )}
      </Box>
    </VStack>
  );
}

function ParentTypes({ name, sharedTypeAliases, sharedParentTypes, props }: ParentTypesItem) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  return (
    <ModalLink
      content={
        <ParentTypesTable
          name={name}
          props={props}
          scrollContainerRef={scrollContainerRef}
          sharedParentTypes={sharedParentTypes}
          sharedTypeAliases={sharedTypeAliases}
        />
      }
      font="headline"
      modalBodyProps={{ paddingX: 0, paddingY: 0 }}
      modalBodyRef={scrollContainerRef}
    >
      {name}
    </ModalLink>
  );
}

function ParentTypesList({
  parentTypes,
  sharedTypeAliases,
  sharedParentTypes,
}: ParentTypesListProps) {
  const parentTypesAsArray = useMemo(() => Object.entries(parentTypes), [parentTypes]);

  if (!parentTypesAsArray.length) return null;

  return (
    <HStack alignItems="center" flexWrap="wrap" gap={1}>
      <Text color="fgMuted" font="label1">
        Extended from:&nbsp;
      </Text>
      {parentTypesAsArray.map(([key, value]) => (
        <ParentTypes
          key={key}
          name={key}
          props={value}
          sharedParentTypes={sharedParentTypes}
          sharedTypeAliases={sharedTypeAliases}
        />
      ))}
    </HStack>
  );
}

export default ParentTypesList;
