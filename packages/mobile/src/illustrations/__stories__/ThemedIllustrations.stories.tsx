import { useCallback, useState } from 'react';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { HStack, VStack } from '../../layout';
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

const resolveTheme = (key: IllustrationThemeKey) =>
  key === 'default' ? defaultTheme : { ...defaultTheme, ...ILLUSTRATION_THEMES[key] };

// ─── Story ───────────────────────────────────────────────────────────────────

const ThemedIllustrationsStory = () => {
  const { activeColorScheme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabValue<IllustrationThemeKey> | null>(
    ILLUSTRATION_THEME_TABS[0],
  );
  const handleChange = useCallback(
    (tab: TabValue<IllustrationThemeKey> | null) => setActiveTab(tab),
    [],
  );

  const themeKey = activeTab?.id ?? 'default';
  const theme = resolveTheme(themeKey);
  const garishTheme = resolveTheme('garish');

  return (
    <ExampleScreen>
      {/* ── Side-by-side comparison ─────────────────────────────────────── */}
      <Example title="Side-by-side comparison">
        <HStack gap={4}>
          <ThemeProvider activeColorScheme={activeColorScheme} theme={defaultTheme}>
            <VStack alignItems="center" gap={2} padding={2} style={{ flex: 1 }}>
              <Text font="label2">Default</Text>
              <HeroSquare applyTheme name="accessToAdvancedCharts" scaleMultiplier={0.35} />
              <SpotSquare applyTheme name="accessToAdvancedCharts" />
              <Pictogram applyTheme name="add" />
              <SpotIcon applyTheme name="advancedTradeProduct" />
            </VStack>
          </ThemeProvider>

          <ThemeProvider activeColorScheme={activeColorScheme} theme={garishTheme}>
            <VStack alignItems="center" gap={2} padding={2} style={{ flex: 1 }}>
              <Text font="label2">Garish</Text>
              <HeroSquare applyTheme name="accessToAdvancedCharts" scaleMultiplier={0.35} />
              <SpotSquare applyTheme name="accessToAdvancedCharts" />
              <Pictogram applyTheme name="add" />
              <SpotIcon applyTheme name="advancedTradeProduct" />
            </VStack>
          </ThemeProvider>
        </HStack>
      </Example>

      {/* ── Per-type previews ────────────────────────────────────────────── */}
      <Example title="Theme">
        <SegmentedTabs
          accessibilityLabel="Select illustration theme"
          activeTab={activeTab}
          onChange={handleChange}
          tabs={ILLUSTRATION_THEME_TABS}
        />
      </Example>

      <ThemeProvider activeColorScheme={activeColorScheme} theme={theme}>
        {/* HeroSquare */}
        <Example title="HeroSquare">
          <HStack flexWrap="wrap" gap={2}>
            {HERO_SQUARE_SAMPLES.map((name) => (
              <VStack key={name} alignItems="center" gap={0}>
                <HeroSquare applyTheme name={name} scaleMultiplier={0.3} />
                <Text color="fgMuted" font="legal" numberOfLines={1}>
                  {name}
                </Text>
              </VStack>
            ))}
          </HStack>
        </Example>

        {/* SpotSquare */}
        <Example title="SpotSquare">
          <HStack flexWrap="wrap" gap={2}>
            {SPOT_SQUARE_SAMPLES.map((name) => (
              <VStack key={name} alignItems="center" gap={0}>
                <SpotSquare applyTheme name={name} />
                <Text color="fgMuted" font="legal" numberOfLines={1}>
                  {name}
                </Text>
              </VStack>
            ))}
          </HStack>
        </Example>

        {/* Pictogram */}
        <Example title="Pictogram">
          <HStack flexWrap="wrap" gap={2}>
            {PICTOGRAM_SAMPLES.map((name) => (
              <VStack key={name} alignItems="center" gap={0}>
                <Pictogram applyTheme name={name} />
                <Text color="fgMuted" font="legal" numberOfLines={1}>
                  {name}
                </Text>
              </VStack>
            ))}
          </HStack>
        </Example>

        {/* SpotIcon */}
        <Example title="SpotIcon">
          <HStack flexWrap="wrap" gap={2}>
            {SPOT_ICON_SAMPLES.map((name) => (
              <VStack key={name} alignItems="center" gap={0}>
                <SpotIcon applyTheme name={name} />
                <Text color="fgMuted" font="legal" numberOfLines={1}>
                  {name}
                </Text>
              </VStack>
            ))}
          </HStack>
        </Example>

        {/* SpotRectangle */}
        <Example title="SpotRectangle">
          <VStack gap={2}>
            {SPOT_RECTANGLE_SAMPLES.map((name) => (
              <VStack key={name} gap={0}>
                <SpotRectangle applyTheme name={name} scaleMultiplier={0.5} />
                <Text color="fgMuted" font="legal" numberOfLines={1}>
                  {name}
                </Text>
              </VStack>
            ))}
          </VStack>
        </Example>
      </ThemeProvider>
    </ExampleScreen>
  );
};

export default ThemedIllustrationsStory;
