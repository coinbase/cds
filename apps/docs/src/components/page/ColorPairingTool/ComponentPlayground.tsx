import React, { memo, useState } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { ThemeProvider } from '@coinbase/cds-web/system/ThemeProvider';
import { SegmentedTabs } from '@coinbase/cds-web/tabs';
import { Text } from '@coinbase/cds-web/typography';
import { useColorMode } from '@docusaurus/theme-common';

import { useDocsTheme } from '../../../theme/Layout/Provider/UnifiedThemeContext';

import { PlaygroundContent } from './PlaygroundContent';
const PLAYGROUND_TABS: TabValue[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
];

type ComponentPlaygroundProps = {
  /** CDS spectrum token name for the light-mode brand color (e.g. "blue40"). */
  lightToken: ThemeVars.SpectrumColor;
  /** CDS spectrum token name for the dark-mode brand color (e.g. "blue50"). */
  darkToken: ThemeVars.SpectrumColor;
  /** Hex value of lightToken — used for contrast ratio calculation only. */
  lightHex: string;
  /** Hex value of darkToken — used for contrast ratio calculation only. */
  darkHex: string;
  imgSrc: string | null;
};

export const ComponentPlayground = memo(function ComponentPlayground({
  lightToken,
  darkToken,
  lightHex,
  darkHex,
  imgSrc,
}: ComponentPlaygroundProps) {
  const { colorMode } = useColorMode();
  const { theme } = useDocsTheme();

  const [selectedMode, setSelectedMode] = useState<'light' | 'dark'>(() =>
    colorMode === 'light' ? 'light' : 'dark',
  );

  const [prevColorMode, setPrevColorMode] = useState(colorMode);
  if (prevColorMode !== colorMode) {
    setPrevColorMode(colorMode);
    setSelectedMode(colorMode === 'light' ? 'light' : 'dark');
  }

  const activeTab = PLAYGROUND_TABS.find((t) => t.id === selectedMode) ?? PLAYGROUND_TABS[0];

  const selectedToken = selectedMode === 'light' ? lightToken : darkToken;
  const selectedHex = selectedMode === 'light' ? lightHex : darkHex;

  return (
    <Box padding={4} paddingTop={3} width="100%">
      <VStack gap={2} width="100%">
        <HStack
          alignItems={{ base: 'flex-start', tablet: 'center', desktop: 'center' }}
          flexDirection={{ base: 'column', tablet: 'row', desktop: 'row' }}
          gap={{ base: 3, tablet: 0, desktop: 0 }}
          justifyContent="space-between"
          width="100%"
        >
          <Text as="h3" font="title3">
            Color match to components
          </Text>
          <SegmentedTabs
            accessibilityLabel="Switch light or dark mode preview"
            activeTab={activeTab}
            onChange={(tab) => {
              if (tab) setSelectedMode(tab.id as 'light' | 'dark');
            }}
            tabs={PLAYGROUND_TABS}
          />
        </HStack>

        <ThemeProvider activeColorScheme={selectedMode} display="contents" theme={theme}>
          <PlaygroundContent
            imgSrc={imgSrc}
            selectedHex={selectedHex}
            selectedToken={selectedToken}
          />
        </ThemeProvider>
      </VStack>
    </Box>
  );
});
