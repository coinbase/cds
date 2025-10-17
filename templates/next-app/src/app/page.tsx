'use client';
import { useState } from 'react';
import type { ColorScheme } from '@cbhq/cds-common';
import { ThemeProvider } from '@cbhq/cds-web';
import { defaultTheme } from '@cbhq/cds-web/themes/defaultTheme';
import { Box, Divider, HStack, VStack } from '@cbhq/cds-web/layout';
import { Sidebar, SidebarItem } from '@cbhq/cds-web/navigation';
import { MediaQueryProvider } from '@cbhq/cds-web/system';
import { Navbar } from './components/Navbar';
import { AssetList } from './components/AssetList';
import { CDSLogo } from './components/CDSLogo';
import { CardList } from './components/CardList';
import { SearchInput } from '@cbhq/cds-web/controls';

const navItems = [
  {
    title: 'Assets',
    icon: 'chartPie',
  },
  {
    title: 'Trade',
    icon: 'trading',
  },
  {
    title: 'Pay',
    icon: 'pay',
  },
  {
    title: 'For you',
    icon: 'newsFeed',
  },
  {
    title: 'Earn',
    icon: 'giftBox',
  },
  {
    title: 'Borrow',
    icon: 'cash',
  },
  {
    title: 'DeFi',
    icon: 'defi',
  },
] as const;

const Home = () => {
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [search, setSearch] = useState('');
  const activeNavItem = navItems[activeNavIndex];

  const [activeColorScheme, setActiveColorScheme] = useState<ColorScheme>('light');

  const toggleColorScheme = () => setActiveColorScheme((s) => (s === 'light' ? 'dark' : 'light'));

  return (
    <MediaQueryProvider>
      <ThemeProvider theme={defaultTheme} activeColorScheme={activeColorScheme}>
        <HStack background="bg">
          <Sidebar autoCollapse height="100vh" logo={<CDSLogo />}>
            {navItems.map(({ title, icon }, index) => (
              <SidebarItem
                key={title}
                active={index === activeNavIndex}
                icon={icon}
                onClick={() => setActiveNavIndex(index)}
                title={title}
              />
            ))}
          </Sidebar>
          <VStack width="100%" zIndex={0}>
            <Navbar title={activeNavItem.title} toggleColorScheme={toggleColorScheme} />
            <HStack width="100%">
              <VStack width={{ base: 500, desktop: 660 }}>
                <Box padding={2}>
                  <SearchInput
                    compact
                    accessibilityLabel="Search"
                    onChangeText={setSearch}
                    placeholder="Search"
                    value={search}
                  />
                </Box>
                <Box paddingX={2} width="100%">
                  <AssetList pageSize={5} />
                </Box>
              </VStack>
              <Divider direction="vertical" />
              <Box paddingX={3} paddingY={2}>
                <CardList />
              </Box>
            </HStack>
          </VStack>
        </HStack>
      </ThemeProvider>
    </MediaQueryProvider>
  );
};

export default Home;
