import React, { memo, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from '@coinbase/cds-mobile';
import { Accordion, AccordionItem } from '@coinbase/cds-mobile/accordion';
import { MessagingCard } from '@coinbase/cds-mobile/cards';
import type { ComponentConfig } from '@coinbase/cds-mobile/core/componentConfig';
import { Pictogram } from '@coinbase/cds-mobile/illustrations';
import { HStack, VStack } from '@coinbase/cds-mobile/layout';
import { Avatar } from '@coinbase/cds-mobile/media';
import { Pressable } from '@coinbase/cds-mobile/system';
import { ComponentConfigProvider } from '@coinbase/cds-mobile/system/ComponentConfigProvider';
import { Text } from '@coinbase/cds-mobile/typography/Text';

import { GradientBorderButton } from './appRefresh/GradientBorderButton';
import { MatchCarousel } from './appRefresh/MatchCarousel';
import { PriceChart } from './appRefresh/PriceChart';

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
  const config: ComponentConfig = useMemo(
    () => ({
      Avatar: () => {
        const { activeColorScheme } = useTheme();
        return {
          shape: activeColorScheme === 'light' ? 'square' : 'circle',
        };
      },
      MessagingCard: (props) => {
        if (props.type === 'nudge') {
          return {
            background: 'bg',
            borderColor: 'bgLine',
            borderWidth: 100,
          };
        }

        return {};
      },
    }),
    [],
  );

  return (
    <ComponentConfigProvider value={config}>
      <ScrollView>
        <VStack background="bg" flexGrow={1} gap={4} paddingBottom={8} paddingX={2}>
          <ComponentExploration componentName="Prediction Cards">
            <MatchCarousel />
          </ComponentExploration>
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
          <ComponentExploration componentName="Line Chart">
            <PriceChart />
          </ComponentExploration>
          <ComponentExploration componentName="Messaging Card">
            <MessagingCard
              action={
                <Pressable>
                  <Text color="fg" font="headline">
                    Get started
                  </Text>
                </Pressable>
              }
              description={
                <Text color="fgMuted" font="body">
                  Get a USDC loan by using your Bitcoin as collateral
                </Text>
              }
              media={
                <Pictogram
                  accessibilityLabel="Add to watchlist"
                  dimension="48x48"
                  name="usdcLoan"
                />
              }
              mediaPlacement="end"
              title={
                <Text color="fg" font="body">
                  Borrow USDC
                </Text>
              }
              type="nudge"
            />
          </ComponentExploration>
          <ComponentExploration componentName="Different tokens per colorScheme">
            <Avatar name="Test" size="xl" />
          </ComponentExploration>
          <ComponentExploration componentName="Animated Gradient Border">
            <GradientBorderButton />
          </ComponentExploration>
        </VStack>
      </ScrollView>
    </ComponentConfigProvider>
  );
});
