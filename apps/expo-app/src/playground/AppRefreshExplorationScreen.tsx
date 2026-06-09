import React, { memo, useMemo } from 'react';
import { Accordion, AccordionItem } from '@coinbase/cds-mobile/accordion';
import type { ComponentConfig } from '@coinbase/cds-mobile/core/componentConfig';
import { HStack, VStack } from '@coinbase/cds-mobile/layout';
import { ComponentConfigProvider } from '@coinbase/cds-mobile/system/ComponentConfigProvider';
import { Text } from '@coinbase/cds-mobile/typography/Text';

function ComponentExploration({
  componentName,
  children,
}: {
  componentName: string;
  children: React.ReactNode;
}) {
  return (
    <VStack gap={2}>
      <Text font="headline">{componentName}</Text>
      {children}
    </VStack>
  );
}

export const AppRefreshExplorationScreen = memo(() => {
  const config: ComponentConfig = useMemo(() => ({}), []);

  return (
    <ComponentConfigProvider value={config}>
      <VStack background="bg" flexGrow={1} paddingX={2}>
        {/* TODO */}
      </VStack>
    </ComponentConfigProvider>
  );
});
