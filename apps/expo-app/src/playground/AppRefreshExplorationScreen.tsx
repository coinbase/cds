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
        <ComponentExploration componentName="Accordion">
          <Accordion
            style={{
              borderWidth: 1,
              borderColor: '#EEF0F3',
              borderRadius: '4%',
              overflow: 'hidden',
            }}
          >
            <AccordionItem
              itemKey="1"
              styles={{ panel: { borderTopWidth: 1, borderColor: '#EEF0F3' } }}
              subtitle="Item 1 subtitle"
              title="Item 1"
            >
              <HStack justifyContent="space-between">
                <Text font="body">TSLA $410 Call 4/20</Text>
                <Text font="body">
                  $600.00 (
                  <Text color="fgPositive" font="body">
                    ↗ 2.12%
                  </Text>
                  )
                </Text>
              </HStack>
            </AccordionItem>
          </Accordion>
        </ComponentExploration>
      </VStack>
    </ComponentConfigProvider>
  );
});
