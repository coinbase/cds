import { memo, type ReactNode, useCallback, useMemo, useState } from 'react';
import { ListCell } from '@coinbase/cds-web/cells/ListCell';
import { Box } from '@coinbase/cds-web/layout/Box';
import { Divider } from '@coinbase/cds-web/layout/Divider';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import type { StyleSelector } from '@coinbase/docusaurus-plugin-docgen/types';

import styles from './styles.module.css';

export type StylesExplorerProps = {
  selectors: StyleSelector[];
  children: (classNames: Record<string, string>) => ReactNode;
};

export const StylesExplorer = memo(({ selectors, children }: StylesExplorerProps) => {
  const [activeSelector, setActiveSelector] = useState<string | null>(null);
  const [hoveredSelector, setHoveredSelector] = useState<string | null>(null);

  const handleSelectorClick = useCallback((selector: string) => {
    setActiveSelector((prev) => (prev === selector ? null : selector));
  }, []);

  const handleSelectorHover = useCallback((selector: string | null) => {
    setHoveredSelector(selector);
  }, []);

  const displayedSelector = hoveredSelector ?? activeSelector;

  const appliedClassNames = useMemo(() => {
    if (!displayedSelector) return {};
    return { [displayedSelector]: styles.highlight };
  }, [displayedSelector]);

  return (
    <VStack paddingBottom={3}>
      <Box
        bordered
        background="bg"
        borderRadius={400}
        flexDirection={{ phone: 'column', tablet: 'row', desktop: 'row' }}
        overflow="hidden"
      >
        <Box
          alignItems="center"
          display="flex"
          flexGrow={1}
          justifyContent="center"
          minHeight={256}
          overflow="hidden"
          padding={3}
          position="relative"
        >
          {children(appliedClassNames)}
        </Box>
        <Divider
          direction="horizontal"
          display={{ phone: 'flex', tablet: 'none', desktop: 'none' }}
        />
        <Divider
          direction="vertical"
          display={{ phone: 'none', tablet: 'flex', desktop: 'flex' }}
        />
        <VStack
          flexShrink={0}
          maxHeight={384}
          overflow="hidden"
          width={{ tablet: 280, desktop: 280 }}
        >
          <VStack borderedBottom padding={2}>
            <Text as="p" font="title4">
              Component Styles
            </Text>
            <Text as="p" color="fgMuted" font="label2">
              Choose a selector to highlight the corresponding element
            </Text>
          </VStack>
          <VStack flexGrow={1} minHeight={0} overflow="auto">
            {selectors.map((selector) => (
              <ListCell
                key={selector.selector}
                accessory={activeSelector === selector.selector ? 'selected' : 'unselected'}
                description={selector.description}
                onClick={() => handleSelectorClick(selector.selector)}
                onMouseEnter={() => handleSelectorHover(selector.selector)}
                onMouseLeave={() => handleSelectorHover(null)}
                selected={activeSelector === selector.selector}
                spacingVariant="condensed"
                title={selector.selector}
              />
            ))}
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );
});
