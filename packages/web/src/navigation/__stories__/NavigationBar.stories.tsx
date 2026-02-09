import React, { useCallback, useMemo, useState } from 'react';

import { AvatarButton, Button, IconButton } from '../../buttons';
import { SearchInput } from '../../controls';
import { useBreakpoints } from '../../hooks/useBreakpoints';
import { LogoMark } from '../../icons';
import { HStack, VStack } from '../../layout';
import { Avatar } from '../../media';
import { TabNavigation } from '../../tabs';
import { Text } from '../../typography/Text';
import { NavigationBar } from '../NavigationBar';
import { NavigationTitle } from '../NavigationTitle';
import { NavigationTitleSelect } from '../NavigationTitleSelect';

export default {
  component: NavigationBar,
  title: 'Components/Navigation/NavigationBar',
};

const a11ySkipConfig = {
  config: {
    /**
     * The TabNavigation docs explain the proper way to setup the tabpanel.
     * Disabled because CDS TabNavigation doesn't have associated panels.
     * @link https://cds.coinbase.com/components/tab-navigation#accessibility
     * */
    rules: [{ id: 'aria-valid-attr-value', enabled: false }],
  },
};

// Helper function for demo interactions
const handlePress = (name: string) => console.log(`Pressed ${name}`);

// Tabs data for the full example
const tabs = [
  { id: 'all', label: 'All' },
  { id: 'watchlist', label: 'Watchlist' },
  { id: 'tradable', label: 'Tradable' },
  { id: 'gainers', label: 'Gainers' },
  { id: 'losers', label: 'Losers' },
  { id: 'trending', label: 'Trending' },
  { id: 'schill', label: 'Schill' },
];

export const NavigationBarFullExampleDefault = () => {
  const [value, setValue] = useState(tabs[0].id);

  const showBackButton = useMemo(() => value !== tabs[0].id, [value]);
  const pageTitle = tabs.find((tab) => tab.id === value)?.label;

  const handleBackPress = useCallback(() => {
    setValue(tabs[0].id);
  }, []);

  const handleTabChange = useCallback((id: string) => {
    setValue(id);
  }, []);

  return (
    <VStack alignItems="flex-start" gap={1}>
      <Text as="h1" display="block" font="title1">
        Navigation full example
      </Text>
      <NavigationBar
        bottom={<TabNavigation onChange={handleTabChange} tabs={tabs} value={value} />}
        end={
          <HStack alignItems="center" gap={1}>
            <IconButton name="helpCenterQuestionMark" />
            <IconButton
              active
              accessibilityLabel="Notifications"
              name="bell"
              onClick={() => handlePress('Notifications')}
            />
            <IconButton name="appSwitcher" />
            <IconButton active name="profile" />
          </HStack>
        }
        start={
          showBackButton ? (
            <IconButton
              compact
              accessibilityLabel="Back"
              name="backArrow"
              onClick={handleBackPress}
              variant="secondary"
            />
          ) : undefined
        }
      >
        <NavigationTitle>Personal Portfolio ({pageTitle ?? 'All'})</NavigationTitle>
      </NavigationBar>
    </VStack>
  );
};

NavigationBarFullExampleDefault.parameters = {
  a11y: a11ySkipConfig,
};

export const NavigationBarMobileExample = () => {
  return (
    <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        Mobile NavigationBar
      </Text>
      <NavigationBar
        end={
          <HStack alignItems="center" gap={1}>
            <IconButton compact name="search" variant="secondary" />
            <IconButton compact name="appSwitcher" variant="secondary" />
            <AvatarButton compact alt="User" name="Sam Smith" />
          </HStack>
        }
        start={<IconButton compact transparent name="hamburger" />}
      >
        <LogoMark size={32} />
      </NavigationBar>
    </VStack>
  );
};

export const NavigationBarWithSearch = () => {
  return (
    <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        NavigationBar with search and actions
      </Text>
      <NavigationBar
        end={
          <HStack gap={2}>
            <HStack flexBasis={0} flexShrink={1}>
              <SearchInput
                compact
                onChangeText={() => {}}
                onSearch={() => {}}
                placeholder="Search"
                value=""
              />
            </HStack>
            <HStack gap={1}>
              <Button compact>Action 1</Button>
              <Button compact variant="secondary">
                Action 2
              </Button>
            </HStack>
            <HStack gap={1}>
              <IconButton active compact name="search" variant="secondary" />
              <IconButton active compact name="appSwitcher" variant="secondary" />
              <AvatarButton compact alt="User" name="Sam Smith" />
            </HStack>
          </HStack>
        }
        start={<IconButton compact name="backArrow" variant="secondary" />}
      >
        <NavigationTitle>Page Title</NavigationTitle>
      </NavigationBar>
    </VStack>
  );
};

export const NavigationBarWithSelectableTitle = () => {
  const [selectedPage, setSelectedPage] = useState('dashboard');

  const pageOptions = [
    { label: 'Dashboard', id: 'dashboard' },
    { label: 'Analytics', id: 'analytics' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Transactions', id: 'transactions' },
    { label: 'Settings', id: 'settings' },
  ];

  return (
    <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        NavigationBar with selectable title
      </Text>
      <NavigationBar
        end={
          <HStack alignItems="center" gap={1}>
            <IconButton active accessibilityLabel="Notifications" name="bell" />
            <AvatarButton compact alt="User" />
          </HStack>
        }
      >
        <NavigationTitleSelect
          accessibilityLabel="Select page"
          onChange={setSelectedPage}
          options={pageOptions}
          value={selectedPage}
        />
      </NavigationBar>
    </VStack>
  );
};

export const NavigationBarWithActions = () => {
  const handleAction = useCallback((action: string) => {
    console.log(`Action pressed: ${action}`);
  }, []);

  return (
    <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        NavigationBar with action buttons
      </Text>
      <NavigationBar
        end={
          <HStack alignItems="center" gap={1}>
            <IconButton
              active
              accessibilityLabel="Search"
              name="magnifyingGlass"
              onClick={() => handleAction('search')}
            />
            <IconButton
              active
              accessibilityLabel="Filter"
              name="filter"
              onClick={() => handleAction('filter')}
            />
            <IconButton
              active
              accessibilityLabel="More options"
              name="more"
              onClick={() => handleAction('more')}
            />
          </HStack>
        }
      >
        <NavigationTitle>Asset Portfolio</NavigationTitle>
      </NavigationBar>
    </VStack>
  );
};

export const NavigationBarWithCustomPadding = () => {
  return (
    <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        NavigationBar with custom padding
      </Text>
      <NavigationBar paddingBottom={4} paddingTop={4} paddingX={6}>
        <NavigationTitle>Extended Padding Example</NavigationTitle>
      </NavigationBar>
    </VStack>
  );
};

export const NavigationBarBasic = () => {
  return (
    <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        Basic NavigationBar
      </Text>
      <NavigationBar
        end={
          <HStack alignItems="center" gap={1}>
            <IconButton accessibilityLabel="Notifications" name="bell" />
            <Avatar size="xl" />
          </HStack>
        }
        start={<IconButton accessibilityLabel="Back" name="backArrow" />}
      >
        <NavigationTitle>Dashboard</NavigationTitle>
      </NavigationBar>
    </VStack>
  );
};

export const NavigationBarWithTabs = () => {
  const tabItems = [
    { id: 'all', label: 'All' },
    { id: 'watchlist', label: 'Watchlist' },
    { id: 'tradable', label: 'Tradable' },
    { id: 'gainers', label: 'Gainers' },
  ];
  const [value, setValue] = useState(tabItems[0].id);

  return (
    <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        NavigationBar with Tab Navigation
      </Text>
      <NavigationBar
        bottom={<TabNavigation onChange={setValue} tabs={tabItems} value={value} />}
        end={
          <HStack alignItems="center" gap={1}>
            <IconButton accessibilityLabel="Notifications" name="bell" />
            <Avatar size="xl" />
          </HStack>
        }
      >
        <NavigationTitle>Portfolio</NavigationTitle>
      </NavigationBar>
    </VStack>
  );
};

NavigationBarWithTabs.parameters = {
  a11y: a11ySkipConfig,
};

export const NavigationBarWithCustomBackground = () => {
  return (
    <VStack alignItems="flex-start" gap={4}>
      <Text as="h1" display="block" font="title1">
        NavigationBar with custom backgrounds
      </Text>
      <VStack gap={2} width="100%">
        <Text font="body">Default background (bg)</Text>
        <NavigationBar
          end={<IconButton accessibilityLabel="Settings" name="settings" />}
          start={<IconButton accessibilityLabel="Back" name="backArrow" />}
        >
          <NavigationTitle>Default Background</NavigationTitle>
        </NavigationBar>
      </VStack>
      <VStack gap={2} width="100%">
        <Text font="body">Secondary background (bgSecondary)</Text>
        <NavigationBar
          background="bgSecondary"
          end={<IconButton accessibilityLabel="Settings" name="settings" />}
          start={<IconButton accessibilityLabel="Back" name="backArrow" />}
        >
          <NavigationTitle>Secondary Background</NavigationTitle>
        </NavigationBar>
      </VStack>
      <VStack gap={2} width="100%">
        <Text font="body">Tertiary background (bgTertiary)</Text>
        <NavigationBar
          background="bgTertiary"
          end={<IconButton accessibilityLabel="Settings" name="settings" />}
          start={<IconButton accessibilityLabel="Back" name="backArrow" />}
        >
          <NavigationTitle>Tertiary Background</NavigationTitle>
        </NavigationBar>
      </VStack>
    </VStack>
  );
};

export const NavigationBarResponsive = () => {
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const { isPhone } = useBreakpoints();

  const handleSearchToggle = useCallback(() => {
    setSearchOpen((prev) => !prev);
    if (searchOpen) {
      setSearch('');
    }
  }, [searchOpen]);

  return (
    <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        Responsive NavigationBar
      </Text>
      <Text as="p" display="block" font="body">
        Resize the window to see the search input collapse to an icon button on smaller screens.
      </Text>
      <NavigationBar
        background="bgSecondary"
        end={
          <HStack alignItems="center" gap={1}>
            {isPhone && (
              <IconButton
                accessibilityLabel="Search"
                active={searchOpen}
                name="search"
                onClick={handleSearchToggle}
              />
            )}
            <IconButton accessibilityLabel="Notifications" name="bell" />
            <Avatar size="xl" />
          </HStack>
        }
        start={<IconButton accessibilityLabel="Back" name="backArrow" />}
      >
        {isPhone ? (
          searchOpen && (
            <SearchInput
              compact
              accessibilityLabel="Search"
              onChangeText={setSearch}
              placeholder="Search..."
              value={search}
            />
          )
        ) : (
          <SearchInput
            compact
            accessibilityLabel="Search"
            onChangeText={setSearch}
            placeholder="Search assets..."
            value={search}
          />
        )}
        {!isPhone && !searchOpen && <NavigationTitle>Trading</NavigationTitle>}
      </NavigationBar>
    </VStack>
  );
};

export const NavigationBarWithCustomGap = () => {
  return (
    <VStack alignItems="flex-start" gap={4}>
      <Text as="h1" display="block" font="title1">
        NavigationBar with custom gap
      </Text>
      <VStack gap={2} width="100%">
        <Text font="body">Custom column gap (4)</Text>
        <NavigationBar
          columnGap={4}
          end={<IconButton accessibilityLabel="Settings" name="settings" />}
          start={<IconButton accessibilityLabel="Back" name="backArrow" />}
        >
          <NavigationTitle>Wide Column Gap</NavigationTitle>
        </NavigationBar>
      </VStack>
      <VStack gap={2} width="100%">
        <Text font="body">Custom row gap with tabs (4)</Text>
        <NavigationBar
          bottom={
            <TabNavigation
              onChange={() => {}}
              tabs={[
                { id: 'tab1', label: 'Tab 1' },
                { id: 'tab2', label: 'Tab 2' },
              ]}
              value="tab1"
            />
          }
          end={<IconButton accessibilityLabel="Settings" name="settings" />}
          rowGap={4}
        >
          <NavigationTitle>Wide Row Gap</NavigationTitle>
        </NavigationBar>
      </VStack>
    </VStack>
  );
};

NavigationBarWithCustomGap.parameters = {
  a11y: a11ySkipConfig,
};

export const NavigationBarWithCustomStyles = () => {
  return (
    <VStack alignItems="flex-start" gap={4}>
      <Text as="h1" display="block" font="title1">
        NavigationBar with custom styles and classNames
      </Text>
      <NavigationBar
        end={
          <HStack alignItems="center" gap={1}>
            <IconButton accessibilityLabel="Notifications" name="bell" />
            <Avatar size="xl" />
          </HStack>
        }
        start={<IconButton accessibilityLabel="Back" name="backArrow" />}
        styles={{
          root: { borderBottomWidth: 2 },
          content: { justifyContent: 'center' },
        }}
      >
        <NavigationTitle>Centered Title</NavigationTitle>
      </NavigationBar>
    </VStack>
  );
};
