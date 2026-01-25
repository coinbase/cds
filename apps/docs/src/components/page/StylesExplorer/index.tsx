import { memo, type ReactNode, useCallback, useMemo, useState } from 'react';
import { ListCell } from '@coinbase/cds-web/cells/ListCell';
import { Box } from '@coinbase/cds-web/layout/Box';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import type { StyleSelector } from '@coinbase/docusaurus-plugin-docgen/types';

import styles from './styles.module.css';

export type StylesExplorerProps = {
  /** Array of style selectors for the component */
  selectors: StyleSelector[];
  /** Render function that receives the classNames object to apply */
  children: (classNames: Record<string, string>) => ReactNode;
};

export const StylesExplorer = memo(({ selectors, children }: StylesExplorerProps) => {
  const [activeSelector, setActiveSelector] = useState<string | null>(null);

  const handleSelectorClick = useCallback((selector: string) => {
    setActiveSelector((prev) => (prev === selector ? null : selector));
  }, []);

  const appliedClassNames = useMemo(() => {
    if (!activeSelector) return {};
    return { [activeSelector]: styles.highlight };
  }, [activeSelector]);

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
        <VStack borderedStart width={{ tablet: 280, desktop: 280 }}>
          <VStack borderedBottom padding={2}>
            <Text as="p" font="title4">
              Component Styles
            </Text>
            <Text as="p" color="fgMuted" font="label2">
              Click a selector to highlight the corresponding element
            </Text>
          </VStack>

          <VStack>
            {selectors.map((selector) => (
              <ListCell
                key={selector.selector}
                description={selector.description}
                onClick={() => handleSelectorClick(selector.selector)}
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
