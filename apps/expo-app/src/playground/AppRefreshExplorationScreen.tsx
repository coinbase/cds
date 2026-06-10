import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { type LayoutChangeEvent, ScrollView, View } from 'react-native';
import { Canvas, RoundedRect, SweepGradient, vec } from '@shopify/react-native-skia';
import { useTheme } from '@coinbase/cds-mobile';
import { Accordion, AccordionItem } from '@coinbase/cds-mobile/accordion';
import { Button } from '@coinbase/cds-mobile/buttons';
import { MessagingCard } from '@coinbase/cds-mobile/cards';
import type { ComponentConfig } from '@coinbase/cds-mobile/core/componentConfig';
import { Pictogram } from '@coinbase/cds-mobile/illustrations';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { Avatar } from '@coinbase/cds-mobile/media';
import { Pressable } from '@coinbase/cds-mobile/system';
import { ComponentConfigProvider } from '@coinbase/cds-mobile/system/ComponentConfigProvider';
import { Text } from '@coinbase/cds-mobile/typography/Text';
import {
  LineChart,
  PeriodSelector,
  type PeriodSelectorProps,
  Scrubber,
} from '@coinbase/cds-mobile/visualizations/chart';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type Tab = Parameters<NonNullable<PeriodSelectorProps['onChange']>>[0] & object;

const TABS: Tab[] = [
  { id: '1H', label: '1H' },
  { id: '1D', label: '1D' },
  { id: '1W', label: '1W' },
  { id: '1M', label: '1M' },
  { id: '1Y', label: '1Y' },
  { id: 'YTD', label: 'YTD' },
  { id: 'All', label: 'All' },
];

const SAMPLE_DATA = [
  98.2, 98.6, 99.1, 98.8, 99.4, 99.0, 99.7, 100.2, 99.9, 100.5, 100.1, 100.8, 101.2, 100.9, 101.5,
  101.1, 101.8, 102.3, 102.0, 102.7,
];

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

function PriceChart() {
  const [activeTab, setActiveTab] = useState<Tab>(TABS[1]);

  const onPeriodChange = useCallback((tab: Tab | null) => {
    if (tab) setActiveTab(tab);
  }, []);

  const getScrubberAccessibilityLabel = useCallback((index: number) => `Point ${index + 1}`, []);

  return (
    <VStack gap={0}>
      <LineChart
        enableScrubbing
        showArea
        accessibilityLabel="Price chart"
        areaType="dotted"
        curve="monotone"
        getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
        height={220}
        inset={{ top: 16, left: 0, right: 16, bottom: 0 }}
        series={[{ id: 'price', data: SAMPLE_DATA }]}
      >
        <Scrubber idlePulse />
      </LineChart>
      <PeriodSelector
        activeBackground="bgAlternate"
        activeColor="fg"
        activeTab={activeTab}
        onChange={onPeriodChange}
        tabs={TABS}
      />
    </VStack>
  );
}

const GRADIENT_BORDER_WIDTH = 3;
const CANVAS_PAD = 3;

const GRADIENT_COLORS = ['#2563EB', '#3B82F6', '#A5B4FC', 'rgba(165,180,252,0.05)', '#2563EB'];
const GRADIENT_POSITIONS = [0, 0.2, 0.5, 0.75, 1];

function GradientBorderButton() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const angle = useSharedValue(0);

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(Math.PI * 2, { duration: 2500, easing: Easing.linear }),
      -1,
      false,
    );
  }, [angle]);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  const canvasW = size.width + CANVAS_PAD * 2;
  const canvasH = size.height + CANVAS_PAD * 2;
  const cx = canvasW / 2;
  const cy = canvasH / 2;
  // pill radius clamped to half height (mirrors borderRadius: 900 in RN)
  const pillR = canvasH / 2 - GRADIENT_BORDER_WIDTH / 2;

  const transform = useDerivedValue(() => [{ rotate: angle.value }]);

  return (
    <View onLayout={handleLayout} style={{ alignSelf: 'flex-start' }}>
      {size.width > 0 && (
        <Canvas
          style={{
            position: 'absolute',
            top: -CANVAS_PAD,
            left: -CANVAS_PAD,
            width: canvasW,
            height: canvasH,
          }}
        >
          <RoundedRect
            x={GRADIENT_BORDER_WIDTH / 2}
            y={GRADIENT_BORDER_WIDTH / 2}
            width={canvasW - GRADIENT_BORDER_WIDTH}
            height={canvasH - GRADIENT_BORDER_WIDTH}
            r={pillR}
            style="stroke"
            strokeWidth={GRADIENT_BORDER_WIDTH}
          >
            <SweepGradient
              c={vec(cx, cy)}
              colors={GRADIENT_COLORS}
              positions={GRADIENT_POSITIONS}
              origin={vec(cx, cy)}
              transform={transform}
            />
          </RoundedRect>
        </Canvas>
      )}
      <Button noScaleOnPress borderWidth={0} startIcon="sparkle" variant="secondary">
        Ask advisor
      </Button>
    </View>
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
