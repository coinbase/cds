import React, { memo, useState, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

import type { ColorScheme } from '@coinbase/cds-common';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import { useTheme } from '@coinbase/cds-mobile';
import { defaultTheme } from '@coinbase/cds-mobile/themes/defaultTheme';
import { VStack, HStack, Box } from '@coinbase/cds-mobile/layout';
import { TabbedChips } from '@coinbase/cds-mobile/alpha/tabbed-chips/TabbedChips';
import { PortalProvider } from '@coinbase/cds-mobile/overlays/PortalProvider';
import { StatusBar, ThemeProvider } from '@coinbase/cds-mobile/system';

import { Navbar } from './components/Navbar';
import { AssetList } from './components/AssetList';
import { CardList } from './components/CardList';
import { AssetCarousel } from './components/AssetCarousel';
import { AssetChart } from './components/AssetChart';
import { TabBarButton } from './components/TabBarButton';

const chipTabs = [
  { id: 'all', label: 'All' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'nfts', label: 'NFTs' },
  { id: 'defi', label: 'DeFi' },
  { id: 'earn', label: 'Earn' },
];

const CdsSafeAreaProvider = memo(({ children }: React.PropsWithChildren) => {
  const theme = useTheme();
  return (
    <SafeAreaProvider style={{ backgroundColor: theme.color.bg }}>{children}</SafeAreaProvider>
  );
});

export default function App() {
  const [activeColorScheme, setActiveColorScheme] = useState<ColorScheme>('light');
  const [fontsLoaded] = useFonts({
    CoinbaseIcons: require('@coinbase/cds-icons/fonts/native/CoinbaseIcons.ttf'),
    Inter_400Regular,
    Inter_600SemiBold,
  });

  const toggleColorScheme = useCallback(
    () => setActiveColorScheme((s) => (s === 'light' ? 'dark' : 'light')),
    [],
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider activeColorScheme={activeColorScheme} theme={defaultTheme}>
        <CdsSafeAreaProvider>
          <PortalProvider>
            <StatusBar />
            <AppContent toggleColorScheme={toggleColorScheme} />
          </PortalProvider>
        </CdsSafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function AppContent({ toggleColorScheme }: { toggleColorScheme: () => void }) {
  const [activeChip, setActiveChip] = useState<TabValue | null>(chipTabs[0]);
  const [activeNavTab, setActiveNavTab] = useState('home');
  const insets = useSafeAreaInsets();

  return (
    <VStack style={{ flex: 1 }} background="bg">
      <Navbar toggleColorScheme={toggleColorScheme} />

      <Box paddingX={2} paddingY={1}>
        <TabbedChips
          accessibilityLabel="Filter categories"
          activeTab={activeChip}
          onChange={setActiveChip}
          tabs={chipTabs}
        />
      </Box>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
        <Box padding={2}>
          <AssetChart />
        </Box>

        <Box paddingY={1}>
          <AssetCarousel />
        </Box>

        <Box padding={2}>
          <AssetList />
        </Box>

        <Box paddingY={1}>
          <CardList />
        </Box>
      </ScrollView>

      <Box borderedTop background="bg" style={{ paddingBottom: insets.bottom }}>
        <HStack>
          <TabBarButton
            icon="home"
            label="Home"
            active={activeNavTab === 'home'}
            onPress={() => setActiveNavTab('home')}
          />
          <TabBarButton
            icon="sendReceive"
            label="Trade"
            active={activeNavTab === 'trade'}
            onPress={() => setActiveNavTab('trade')}
          />
          <TabBarButton
            icon="compass"
            label="Explore"
            active={activeNavTab === 'explore'}
            onPress={() => setActiveNavTab('explore')}
          />
          <TabBarButton
            icon="account"
            label="Account"
            active={activeNavTab === 'account'}
            onPress={() => setActiveNavTab('account')}
          />
        </HStack>
      </Box>
    </VStack>
  );
}
