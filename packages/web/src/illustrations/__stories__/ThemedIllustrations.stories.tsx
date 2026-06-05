import { memo, useCallback, useState } from 'react';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import { useTheme } from '../../hooks/useTheme';
import { Box, HStack, VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { SegmentedTabs } from '../../tabs/SegmentedTabs';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { HeroSquare } from '../HeroSquare';
import { Pictogram } from '../Pictogram';
import { SpotIcon } from '../SpotIcon';
import { SpotRectangle } from '../SpotRectangle';
import { SpotSquare } from '../SpotSquare';

import {
  ILLUSTRATION_THEME_TABS,
  ILLUSTRATION_THEMES,
  type IllustrationThemeKey,
} from './illustrationThemes';

export default {
  title: 'Illustrations/Themed',
  parameters: {
    // Accessibility checks are disabled for theming stories: custom palettes
    // (e.g. garish) intentionally use colors that may not meet contrast ratios.
    a11y: { disable: true },
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const resolveTheme = (key: IllustrationThemeKey) =>
  key === 'default' ? defaultTheme : { ...defaultTheme, ...ILLUSTRATION_THEMES[key] };

// ─── Illustration samples ────────────────────────────────────────────────────

const HERO_SQUARE_SAMPLES = [
  'accessToAdvancedCharts',
  'accountUnderReview',
  'add2Fa',
  'addBankAccount',
  'addCreditCard',
] as const;

const SPOT_SQUARE_SAMPLES = [
  'accessToAdvancedCharts',
  'addCard',
  'addEth',
  'addMultipleCrypto',
  'addPasswordProtection',
] as const;

const PICTOGRAM_SAMPLES = [
  'accountsNavigation',
  'accreditedInvestor',
  'add',
  'addCard',
  'addPayment',
] as const;

const SPOT_ICON_SAMPLES = [
  'advancedTradeProduct',
  'arrowsUpDown',
  'assetEmptyStateAa',
  'assetEmptyStateAb',
  'assetEmptyStateAc',
] as const;

const SPOT_RECTANGLE_SAMPLES = [
  'accessToAdvancedCharts',
  'addBank',
  'addPhoneNumber',
  'advancedTradeCharts',
  'advancedTrading',
] as const;

// ─── Themes ──────────────────────────────────────────────────────────────────

// ─── Row helpers ─────────────────────────────────────────────────────────────

const HERO_SCALE = 0.3;
const RECT_SCALE = 0.45;

const IllustrationLabel = memo(function IllustrationLabel({ name }: { name: string }) {
  return (
    <Text color="fgMuted" font="legal">
      {name}
    </Text>
  );
});

// ─── Side-by-side comparison ──────────────────────────────────────────────────

const ThemeComparisonStory = memo(function ThemeComparisonStory() {
  const { activeColorScheme } = useTheme();
  const garishTheme = resolveTheme('garish');

  return (
    <HStack gap={4} padding={4}>
      <ThemeProvider activeColorScheme={activeColorScheme} theme={defaultTheme}>
        <VStack alignItems="center" gap={2} style={{ flex: 1 }}>
          <Text font="label2">Default</Text>
          <HeroSquare applyTheme name="accessToAdvancedCharts" scaleMultiplier={HERO_SCALE} />
          <SpotSquare applyTheme name="accessToAdvancedCharts" />
          <Pictogram applyTheme name="add" />
          <SpotIcon applyTheme name="advancedTradeProduct" />
          <SpotRectangle applyTheme name="accessToAdvancedCharts" scaleMultiplier={RECT_SCALE} />
        </VStack>
      </ThemeProvider>

      <ThemeProvider activeColorScheme={activeColorScheme} theme={garishTheme}>
        <VStack alignItems="center" gap={2} style={{ flex: 1 }}>
          <Text font="label2">Garish</Text>
          <HeroSquare applyTheme name="accessToAdvancedCharts" scaleMultiplier={HERO_SCALE} />
          <SpotSquare applyTheme name="accessToAdvancedCharts" />
          <Pictogram applyTheme name="add" />
          <SpotIcon applyTheme name="advancedTradeProduct" />
          <SpotRectangle applyTheme name="accessToAdvancedCharts" scaleMultiplier={RECT_SCALE} />
        </VStack>
      </ThemeProvider>
    </HStack>
  );
});

export const themeComparison = () => <ThemeComparisonStory />;

// ─── Single interactive story ─────────────────────────────────────────────────

const ThemedIllustrationsInteractive = memo(function ThemedIllustrationsInteractive() {
  const { activeColorScheme } = useTheme();
  const [activeThemeTab, setActiveThemeTab] = useState<TabValue<IllustrationThemeKey> | null>(
    ILLUSTRATION_THEME_TABS[0],
  );

  const handleThemeChange = useCallback(
    (tab: TabValue<IllustrationThemeKey> | null) => setActiveThemeTab(tab),
    [],
  );

  const themeKey = activeThemeTab?.id ?? 'default';
  const theme =
    themeKey === 'default' ? defaultTheme : { ...defaultTheme, ...ILLUSTRATION_THEMES[themeKey] };

  return (
    <VStack gap={4} padding={4}>
      {/* Theme selector */}
      <VStack gap={1}>
        <Text font="label1">Theme</Text>
        <SegmentedTabs
          accessibilityLabel="Select illustration theme"
          activeTab={activeThemeTab}
          onChange={handleThemeChange}
          tabs={ILLUSTRATION_THEME_TABS}
        />
      </VStack>

      <ThemeProvider activeColorScheme={activeColorScheme} theme={theme}>
        <Box background="bg" borderRadius={100}>
          <VStack gap={5}>
            {/* HeroSquare */}
            <VStack gap={2}>
              <Text font="label1">HeroSquare</Text>
              <HStack flexWrap="wrap" gap={3}>
                {HERO_SQUARE_SAMPLES.map((name) => (
                  <VStack key={name} alignItems="center" gap={1}>
                    <HeroSquare applyTheme name={name} scaleMultiplier={HERO_SCALE} />
                    <IllustrationLabel name={name} />
                  </VStack>
                ))}
              </HStack>
            </VStack>

            {/* SpotSquare */}
            <VStack gap={2}>
              <Text font="label1">SpotSquare</Text>
              <HStack flexWrap="wrap" gap={3}>
                {SPOT_SQUARE_SAMPLES.map((name) => (
                  <VStack key={name} alignItems="center" gap={1}>
                    <SpotSquare applyTheme name={name} />
                    <IllustrationLabel name={name} />
                  </VStack>
                ))}
              </HStack>
            </VStack>

            {/* Pictogram */}
            <VStack gap={2}>
              <Text font="label1">Pictogram</Text>
              <HStack flexWrap="wrap" gap={3}>
                {PICTOGRAM_SAMPLES.map((name) => (
                  <VStack key={name} alignItems="center" gap={1}>
                    <Pictogram applyTheme name={name} />
                    <IllustrationLabel name={name} />
                  </VStack>
                ))}
              </HStack>
            </VStack>

            {/* SpotIcon */}
            <VStack gap={2}>
              <Text font="label1">SpotIcon</Text>
              <HStack flexWrap="wrap" gap={3}>
                {SPOT_ICON_SAMPLES.map((name) => (
                  <VStack key={name} alignItems="center" gap={1}>
                    <SpotIcon applyTheme name={name} />
                    <IllustrationLabel name={name} />
                  </VStack>
                ))}
              </HStack>
            </VStack>

            {/* SpotRectangle */}
            <VStack gap={2}>
              <Text font="label1">SpotRectangle</Text>
              <HStack flexWrap="wrap" gap={3}>
                {SPOT_RECTANGLE_SAMPLES.map((name) => (
                  <VStack key={name} alignItems="center" gap={1}>
                    <SpotRectangle applyTheme name={name} scaleMultiplier={RECT_SCALE} />
                    <IllustrationLabel name={name} />
                  </VStack>
                ))}
              </HStack>
            </VStack>
          </VStack>
        </Box>
      </ThemeProvider>
    </VStack>
  );
});

export const themedIllustrations = () => <ThemedIllustrationsInteractive />;
