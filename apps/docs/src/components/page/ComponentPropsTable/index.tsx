import { useCallback, useMemo, useState } from 'react';
import { SearchInput } from '@coinbase/cds-web/controls/SearchInput';
import { useDimensions } from '@coinbase/cds-web/hooks/useDimensions';
import { Box, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography/Text';
import type {
  ProcessedPropItem,
  SharedParentTypes,
  SharedTypeAliases,
} from '@coinbase/docusaurus-plugin-docgen/types';
import { useIsSticky } from '@site/src/utils/useIsSticky';

import ModalLink from './ModalLink';
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

function DefaultElementPropsModalContent({
  defaultElement,
  props,
  sharedTypeAliases,
}: {
  defaultElement: string;
  props: ProcessedPropItem[];
  sharedTypeAliases: SharedTypeAliases;
}) {
  const [searchValue, setSearchValue] = useState('');
  const inherited = useMemo(() => {
    const parentPrefix = `PolymorphicDefault<${defaultElement}>`;
    const search = searchValue.toLowerCase();
    return props.filter((p) => {
      if (String(p.parent ?? '') !== parentPrefix) return false;
      return p.name.toLowerCase().includes(search);
    });
  }, [defaultElement, props, searchValue]);

  return (
    <VStack gap={2}>
      <VStack gap={1}>
        <Text as="p" color="fgMuted" font="label2">
          These props are inherited from the default polymorphic element and may or may not apply
          depending on the value of &apos;as&apos;.
        </Text>
        <SearchInput
          compact
          onChangeText={setSearchValue}
          placeholder="Search"
          value={searchValue}
        />
      </VStack>
      <PropsTable
        props={inherited}
        searchTerm={searchValue}
        sharedTypeAliases={sharedTypeAliases}
      />
    </VStack>
  );
}

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
    return props.filter((item) => {
      // Default-element props are shown in a dedicated modal to avoid overcrowding the main table.
      const isDefaultElementProp = String(item.parent ?? '').startsWith('PolymorphicDefault<');
      if (isDefaultElementProp) return false;
      return item.name.toLowerCase().includes(searchTerm);
    });
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
        {isPolymorphicComponent && (
          <VStack gap={0.5}>
            <Text as="p" font="headline">
              🧩 Polymorphic Component
            </Text>
            <Text as="p" color="fgMuted" font="label2">
              The value passed to the &apos;as&apos; prop determines:
            </Text>
            <ul>
              <li>
                <Text color="fgMuted" font="label2">
                  The HTML element rendered in the DOM.
                </Text>
              </li>
              <li>
                <Text color="fgMuted" font="label2">
                  The inherited props available to the component (e.g. as=&quot;a&quot;, the
                  component accepts href).
                </Text>
              </li>
            </ul>
            {polymorphicDefaultElement && (
              <Text as="p" color="fgMuted" font="label2">
                <b>Default element:</b> <Text color="fgPrimary">{polymorphicDefaultElement}</Text>{' '}
                (Extends all{' '}
                <ModalLink
                  content={
                    <DefaultElementPropsModalContent
                      defaultElement={polymorphicDefaultElement}
                      props={props}
                      sharedTypeAliases={sharedTypeAliases}
                    />
                  }
                  font="label2"
                  modalBodyProps={{ paddingX: 2, paddingY: 2 }}
                  style={{ textDecoration: 'underline' }}
                  title={`${polymorphicDefaultElement} attributes`}
                >
                  {`${polymorphicDefaultElement} attributes`}
                </ModalLink>
                ).
              </Text>
            )}
          </VStack>
        )}
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
