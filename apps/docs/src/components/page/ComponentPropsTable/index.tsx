import { useCallback, useMemo, useState } from 'react';
import { SearchInput } from '@coinbase/cds-web/controls/SearchInput';
import { useDimensions } from '@coinbase/cds-web/hooks/useDimensions';
import { Icon } from '@coinbase/cds-web/icons/Icon';
import { Box, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography/Text';
import type {
  ProcessedPropItem,
  SharedParentTypes,
  SharedTypeAliases,
} from '@coinbase/docusaurus-plugin-docgen/types';
import { useIsSticky } from '@site/src/utils/useIsSticky';

import ParentTypesList from './ParentTypesList';
import PropsTable from './PropsTable';

type ComponentPropsTableProps = {
  props: {
    props: ProcessedPropItem[];
    parentTypes: Record<string, string[]>;
  };
  sharedTypeAliases: SharedTypeAliases;
  sharedParentTypes: SharedParentTypes;
};

const tabsHeight = 67;
const stickyTopOffset = 115;

function ComponentPropsTable({
  props: { props, parentTypes },
  sharedTypeAliases,
  sharedParentTypes,
}: ComponentPropsTableProps) {
  const polymorphicDefaultElement = useMemo(() => {
    const asProp = props.find((p) => p.name === 'as');
    const defaultValue =
      typeof asProp?.defaultValue === 'string' && asProp.defaultValue.trim()
        ? asProp.defaultValue.trim()
        : undefined;
    return defaultValue;
  }, [props]);

  const isPolymorphicComponent = useMemo(() => {
    return (
      props.some((p) => p.name === 'as') ||
      props.some((p) => String(p.parent ?? '').startsWith('PolymorphicDefault<'))
    );
  }, [props]);

  const [searchValue, setSearchValue] = useState('');
  const filteredProps = useMemo(() => {
    const searchTerm = searchValue.toLowerCase();
    return props.filter((item) => item.name.toLowerCase().includes(searchTerm));
  }, [searchValue, props]);
  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const { elementRef: stickyElementRef, isSticky } = useIsSticky({
    top: stickyTopOffset,
  });

  useDimensions({
    ref: stickyElementRef,
    useBorderBoxSize: true,
    onResize: ({ height }) => {
      document.documentElement.style.setProperty('--props-table-search-bar-height', `${height}px`);
    },
  });

  return (
    <VStack maxWidth="100%" width="100%">
      <VStack
        ref={stickyElementRef}
        background="bgAlternate"
        borderedBottom={isSticky}
        gap={1}
        id="component-props-table-search-bar-container"
        paddingBottom={1}
        paddingTop={2}
        paddingX={{ base: 4, phone: 2 }}
        position={{ desktop: 'sticky', tablet: 'sticky' }}
        top={{
          desktop: `calc(var(--ifm-navbar-height) + ${tabsHeight}px - var(--space-3))`,
          tablet: `calc(var(--ifm-navbar-height) + ${tabsHeight}px - var(--space-3))`,
        }}
        zIndex={1}
      >
        <SearchInput
          compact
          onChangeText={handleSearchChange}
          placeholder="Search"
          value={searchValue}
        />
        <ParentTypesList
          parentTypes={parentTypes}
          sharedParentTypes={sharedParentTypes}
          sharedTypeAliases={sharedTypeAliases}
        />
        {isPolymorphicComponent ? (
          <Text as="p" color="fgMuted" font="label2">
            Note: This is a polymorphic component — use the &apos;as&apos; prop to change what is
            rendered. Props with the info icon
            <span style={{ display: 'inline-flex', verticalAlign: 'text-bottom' }}>
              <Icon name="info" size="s" />
            </span>{' '}
            are inherited from the default polymorphic element
            {polymorphicDefaultElement ? (
              <>
                {' '}
                (default:{' '}
                <Text mono as="span" color="fgMuted">
                  {`'${polymorphicDefaultElement}'`}
                </Text>
                )
              </>
            ) : null}
            , and may not apply depending on the `as` you render.
          </Text>
        ) : null}
      </VStack>
      {filteredProps.length > 0 ? (
        <Box maxWidth="100%" paddingBottom={{ base: 4, phone: 2 }} paddingX={{ base: 4, phone: 2 }}>
          <PropsTable
            props={filteredProps}
            searchTerm={searchValue}
            sharedTypeAliases={sharedTypeAliases}
          />
        </Box>
      ) : props.length > 0 ? (
        <VStack alignContent="center" alignItems="center" gap={1.5} paddingBottom={4} paddingX={4}>
          <Text font="headline">No results found</Text>
          <Text font="body">This prop does not exist.</Text>
        </VStack>
      ) : (
        <VStack alignContent="center" alignItems="center" gap={1.5} paddingBottom={4} paddingX={4}>
          <Text font="headline">No props found</Text>
          <Text font="body">This component/hook does not have any props.</Text>
        </VStack>
      )}
    </VStack>
  );
}

export default ComponentPropsTable;
