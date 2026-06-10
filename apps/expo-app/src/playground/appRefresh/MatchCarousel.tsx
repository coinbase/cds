import React, { useCallback, useMemo } from 'react';
import { Dimensions } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useTheme } from '@coinbase/cds-mobile';
import { Button } from '@coinbase/cds-mobile/buttons';
import { Carousel, CarouselItem } from '@coinbase/cds-mobile/carousel';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { Text } from '@coinbase/cds-mobile/typography/Text';
import { LineChart, Scrubber } from '@coinbase/cds-mobile/visualizations/chart';

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

export function MatchCarousel() {
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
