import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, type LayoutChangeEvent, ScrollView, View } from 'react-native';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useTheme } from '@coinbase/cds-mobile';
import { Accordion, AccordionItem } from '@coinbase/cds-mobile/accordion';
import { Button } from '@coinbase/cds-mobile/buttons';
import { MessagingCard } from '@coinbase/cds-mobile/cards';
import { Carousel, CarouselItem } from '@coinbase/cds-mobile/carousel';
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
import { Canvas, RoundedRect, SweepGradient, vec } from '@shopify/react-native-skia';

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

const CARD_SHADOW = {
  shadowColor: '#000000',
  shadowOpacity: 0.08,
  shadowRadius: 24,
  shadowOffset: { width: 0, height: 8 },
  elevation: 4,
} as const;

const SERIES_LENGTH = 24;

type Team = {
  /** Short label shown on the scrubber beacon and button (e.g. "DUKE"). */
  abbr: string;
  /** Win probability that the series resolves to (also drives the line shape). */
  pct: number;
  /** Theme color token used for the line and the button background. */
  color: ThemeVars.Color;
  /** Payout for a $100 stake, e.g. "$833". */
  payout: string;
};

type Match = {
  id: string;
  title: string;
  subtitle: string;
  teamA: Team;
  teamB: Team;
};

const MATCHES: Match[] = [
  {
    id: 'duke-arizona',
    title: 'Duke vs. Arizona',
    subtitle: 'Round 1 · West Region',
    teamA: { abbr: 'DUKE', pct: 78, color: 'accentBoldBlue', payout: '$833' },
    teamB: { abbr: 'ARIZ', pct: 22, color: 'accentBoldRed', payout: '$113' },
  },
  {
    id: 'lakers-celtics',
    title: 'Lakers vs. Celtics',
    subtitle: 'NBA Finals · Game 7',
    teamA: { abbr: 'LAL', pct: 54, color: 'accentBoldPurple', payout: '$185' },
    teamB: { abbr: 'BOS', pct: 46, color: 'accentBoldGreen', payout: '$217' },
  },
  {
    id: 'chiefs-raiders',
    title: 'Chiefs vs. Raiders',
    subtitle: 'Week 18 · AFC West',
    teamA: { abbr: 'KC', pct: 63, color: 'accentBoldYellow', payout: '$159' },
    teamB: { abbr: 'LV', pct: 37, color: 'accentBoldGray', payout: '$270' },
  },
];

/**
 * Builds two mirrored series that start together at 50 and gently drift apart to
 * `endA` / `100 - endA`. A deterministic sine wiggle (damped toward the end)
 * keeps the lines lively without diverging too sharply.
 */
function generateMirroredSeries(endA: number): { a: number[]; b: number[] } {
  const a: number[] = [];
  for (let i = 0; i < SERIES_LENGTH; i++) {
    const t = i / (SERIES_LENGTH - 1);
    const base = 50 + (endA - 50) * t;
    const wiggle = Math.sin(i * 0.8) * 2.2 * (1 - t * 0.25);
    a.push(Math.round((base + wiggle) * 10) / 10);
  }
  const b = a.map((value) => Math.round((100 - value) * 10) / 10);
  return { a, b };
}

function PayoutText({ from, to }: { from: string; to: string }) {
  return (
    <Text color="fgMuted" font="legal">
      {from} →{' '}
      <Text color="fgPositive" font="legal">
        {to}
      </Text>
    </Text>
  );
}

function MatchCard({ match, width }: { match: Match; width: number }) {
  const theme = useTheme();
  const { teamA, teamB, title, subtitle } = match;

  const series = useMemo(() => {
    const { a, b } = generateMirroredSeries(teamA.pct);
    return [
      {
        id: 'a',
        data: a,
        color: theme.color[teamA.color],
        label: `${teamA.abbr} ${teamA.pct}%`,
        areaType: 'dotted' as const,
      },
      {
        id: 'b',
        data: b,
        color: theme.color[teamB.color],
        label: `${teamB.abbr} ${teamB.pct}%`,
        areaType: 'dotted' as const,
      },
    ];
  }, [teamA, teamB, theme]);

  const getScrubberAccessibilityLabel = useCallback(
    (index: number) => `${teamA.abbr} vs ${teamB.abbr}, point ${index + 1}`,
    [teamA.abbr, teamB.abbr],
  );

  const cardStyle = useMemo(() => [CARD_SHADOW, { width }], [width]);

  return (
    <VStack background="bg" borderRadius={500} gap={3} padding={5} style={cardStyle}>
      <VStack alignItems="center" gap={0}>
        <Text align="center" color="fg" font="title3">
          {title}
        </Text>
        <Text align="center" color="fgMuted" font="label2">
          {subtitle}
        </Text>
      </VStack>

      <LineChart
        enableScrubbing
        accessibilityLabel={`${title} win probability`}
        curve="monotone"
        getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
        height={200}
        inset={{ top: 16, left: 0, right: 56, bottom: 8 }}
        series={series}
        yAxis={{ domain: { min: 0, max: 100 } }}
      >
        <Scrubber idlePulse beaconLabelPreferredSide="right" />
      </LineChart>

      <HStack gap={2}>
        <VStack alignItems="center" flexBasis={0} flexGrow={1} gap={1}>
          <Button block compact background={teamA.color} color="fgInverse">
            {`${teamA.abbr} · ${teamA.pct}%`}
          </Button>
          <PayoutText from="$100" to={teamA.payout} />
        </VStack>
        <VStack alignItems="center" flexBasis={0} flexGrow={1} gap={1}>
          <Button block compact background={teamB.color} color="fgInverse">
            {`${teamB.abbr} · ${teamB.pct}%`}
          </Button>
          <PayoutText from="$100" to={teamB.payout} />
        </VStack>
      </HStack>
    </VStack>
  );
}

// Tall enough to hold the card (~432px) plus the pagination dots without clipping.
const CAROUSEL_HEIGHT = 500;

function MatchCarousel() {
  const theme = useTheme();
  const windowWidth = Dimensions.get('window').width;
  // The screen pads its content by space[2] on each side; leave a peek of the
  // next card on the right by subtracting a little extra width.
  const cardWidth = windowWidth - theme.space[2] * 2 - theme.space[4];

  const carouselStyles = useMemo(() => ({ carousel: { gap: theme.space[2] } }), [theme.space]);

  return (
    <Box style={{ height: CAROUSEL_HEIGHT }}>
      <Carousel hideNavigation drag="snap" snapMode="item" styles={carouselStyles}>
        {MATCHES.map((match) => (
          <CarouselItem key={match.id} id={match.id} width={cardWidth}>
            <MatchCard match={match} width={cardWidth} />
          </CarouselItem>
        ))}
      </Carousel>
    </Box>
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
            height={canvasH - GRADIENT_BORDER_WIDTH}
            r={pillR}
            strokeWidth={GRADIENT_BORDER_WIDTH}
            style="stroke"
            width={canvasW - GRADIENT_BORDER_WIDTH}
            x={GRADIENT_BORDER_WIDTH / 2}
            y={GRADIENT_BORDER_WIDTH / 2}
          >
            <SweepGradient
              c={vec(cx, cy)}
              colors={GRADIENT_COLORS}
              origin={vec(cx, cy)}
              positions={GRADIENT_POSITIONS}
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
