import React, { useCallback, useMemo, useState } from 'react';

import { AvatarButton, Button, IconButton } from '../../buttons';
import { SearchInput } from '../../controls';
import { LogoMark } from '../../icons';
import { HStack, VStack } from '../../layout';
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
