/**
 * React 18 Compatibility Test App
 *
 * This app is used to validate that @coinbase/cds-web remains compatible
 * with React 18 consumers after the CDS v9 upgrade to React 19.
 *
 * The app imports and uses various CDS components to ensure:
 * 1. TypeScript compilation works with React 18 types
 * 2. Runtime behavior is correct with React 18
 * 3. Refs, contexts, and other React features work correctly
 */

import { type ReactNode, useRef, useState } from 'react';
import type { ColorScheme } from '@coinbase/cds-common';
import { ThemeProvider } from '@coinbase/cds-web';
import { SearchInput } from '@coinbase/cds-web/controls';
import { Box, Divider, HStack, VStack } from '@coinbase/cds-web/layout';
import { Sidebar, SidebarItem } from '@coinbase/cds-web/navigation';
import { MediaQueryProvider } from '@coinbase/cds-web/system';
import { defaultTheme } from '@coinbase/cds-web/themes/defaultTheme';

import { AssetList } from './components/AssetList';
import { CardList } from './components/CardList';
import { CDSLogo } from './components/CDSLogo';
import { Navbar } from './components/Navbar';

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

export const App = () => {
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [search, setSearch] = useState('');
  const activeNavItem = navItems[activeNavIndex];
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (value: string) => {
    setSearch(value);
    console.log('search: value from ref', inputRef.current?.value);
  };

  const [activeColorScheme, setActiveColorScheme] = useState<ColorScheme>('light');

  const toggleColorScheme = () => setActiveColorScheme((s) => (s === 'light' ? 'dark' : 'light'));

  return (
    <MediaQueryProvider>
      <ThemeProvider activeColorScheme={activeColorScheme} theme={defaultTheme}>
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
                    ref={inputRef}
                    compact
                    accessibilityLabel="Search"
                    onChangeText={handleSearch}
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
