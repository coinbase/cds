import React, { useCallback, useMemo, useState } from 'react';
import { css } from '@linaria/core';

import { AvatarButton, IconButton } from '../../buttons';
import { SelectOption } from '../../controls';
import { Icon, LogoMark, SubBrandLogoMark } from '../../icons';
import { Pictogram } from '../../illustrations';
import { Box, HStack, VStack } from '../../layout';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { PortalProvider } from '../../overlays/PortalProvider';
import { Pressable } from '../../system';
import { TabNavigation } from '../../tabs';
import { MockTabPanel } from '../../tabs/__stories__/MockTabPanel';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/test';
import type { SidebarMoreMenuProps, SidebarProps } from '..';
import { type NavLinkProps } from '../NavLink';
import type { SidebarItemProps } from '../SidebarItem';
import { SidebarItem } from '../SidebarItem';
import { NavigationBar, NavigationTitle, NavLink, Sidebar, SidebarMoreMenu } from '..';

export const StoryMap = {
  NoTabsNoTitle: 'No Tabs no displayTitle',
  TabsAndTitle: 'With Tabs and displayTitle',
};

// Helpers
type Items = {
  title: string;
  icon: SidebarItemProps['icon'];
  Component?: SidebarItemProps['Component'];
}[];
export const items: Items = [
  { title: 'Assets', icon: 'chartPie' },
  { title: 'Trade', icon: 'trading' },
  { title: 'Pay', icon: 'pay' },
  { title: 'For you', icon: 'newsFeed' },
  { title: 'Earn', icon: 'giftBox' },
  { title: 'Borrow', icon: 'cash' },
  { title: 'DeFi', icon: 'defi' },
];

const handlePress = (name: string) => console.log(`Pressed ${name}`);

export const tabs = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'watchlist',
    label: 'Watchlist',
  },
  {
    id: 'tradable',
    label: 'Tradable',
  },
  {
    id: 'gainers',
    label: 'Gainers',
  },
  {
    id: 'losers',
    label: 'Losers',
  },
  {
    id: 'trending',
    label: 'Trending',
  },
  {
    id: 'schill',
    label: 'Schill',
  },
];
type NavigationBarFullExampleProps = {
  pageTitle?: string;
  onTabChange?: (id: string) => void;
  onBackPress?: () => void;
};

export function NavigationBarFullExample({
  pageTitle,
  onTabChange,
  onBackPress,
}: NavigationBarFullExampleProps) {
  const [value, setValue] = useState(tabs[0].id);

  const showBackButton = useMemo(
    () => (pageTitle ? pageTitle !== 'Dashboard' : value !== tabs[0].id),
    [pageTitle, value],
  );
  const handleBackPress = useCallback(() => {
    if (onBackPress) {
      onBackPress();
    } else {
      setValue(tabs[0].id);
    }
  }, [onBackPress]);

  const handleTabChange = useCallback(
    (id: string) => {
      onTabChange?.(id);
      setValue?.(id);
    },
    [onTabChange],
  );

  return (
    <NavigationBar
      bottom={<TabNavigation onChange={handleTabChange} tabs={tabs} value={value} />}
      end={
        <HStack alignItems="center" gap={1}>
          <IconButton active name="helpCenterQuestionMark" />
          <IconButton
            active
            accessibilityLabel="Notifications"
            name="bell"
            onClick={() => handlePress('Notifications')}
          />
          <IconButton active name="appSwitcher" />
          <IconButton active name="profile" />
        </HStack>
      }
      start={
        showBackButton && (
          <IconButton
            active
            compact
            accessibilityLabel="Back"
            name="backArrow"
            onClick={handleBackPress}
            variant="secondary"
          />
        )
      }
    >
      <NavigationTitle>{pageTitle ?? `Personal Portfolio (${value})`}</NavigationTitle>
    </NavigationBar>
  );
}

export const NavigationBarTitle = () => {
  return (
    <NavigationBar
      end={
        <HStack alignItems="center" gap={1}>
          <IconButton
            active
            accessibilityLabel="Notifications"
            name="bell"
            onClick={() => handlePress('Notifications')}
          />
          <AvatarButton compact alt="Donna" onClick={() => handlePress('Avatar')} />
        </HStack>
      }
    >
      <NavigationTitle>Personal Portfolio</NavigationTitle>
    </NavigationBar>
  );
};

export const ComposedSystem = () => {
  const [activeSidebarIndex, setActiveSidebarIndex] = useState(0);
  const [activeTabId, setActiveTabId] = useState('all');

  const activeTabTitle = useMemo(
    () => tabs.find(({ id }) => id === activeTabId),
    [activeTabId],
  )?.label;

  const activePageTitle = useMemo(
    () => items[activeSidebarIndex]?.title ?? 'Dashboard',
    [activeSidebarIndex],
  );

  const handleTabChange = (id: string) => {
    setActiveTabId(id);
  };

  return (
    <HStack>
      <Sidebar autoCollapse logo={<LogoMark />}>
        {items.map((props, index) => (
          <SidebarItem
            key={`sidebar-item--${props.title}`}
            active={index === activeSidebarIndex}
            onClick={() => setActiveSidebarIndex(index)}
            {...props}
          />
        ))}
      </Sidebar>
      <VStack overflow="clip">
        <NavigationBarFullExample
          onBackPress={() => setActiveSidebarIndex(-1)}
          onTabChange={handleTabChange}
          pageTitle={activePageTitle}
        />
        <VStack padding={2}>
          {tabs.map(({ id }, idx) => {
            const isActive = id === activeTabId;

            return (
              <MockTabPanel id={id} isActive={isActive}>
                <Text as="h2" display="block" font="display2" paddingBottom={1}>
                  {activeTabTitle}
                </Text>
                <LoremIpsum repeat={1 * (idx + 1)} />
              </MockTabPanel>
            );
          })}
        </VStack>
      </VStack>
    </HStack>
  );
};
ComposedSystem.parameters = { percy: { enableJavaScript: true } };

const testOverrideCss = css`
  color: var(--color-fgNegative);
`;

export const NavLinkExample = () => {
  const [activeItem, setActiveItem] = useState('assets');
  const getProps = (name: string) =>
    ({
      onClick: () => setActiveItem(name),
      active: name === activeItem,
    }) satisfies NavLinkProps;

  return (
    <HStack gap={3}>
      <NavLink {...getProps('test')} className={testOverrideCss}>
        Override Test
      </NavLink>
      <NavLink {...getProps('assets')}>Assets</NavLink>
      <NavLink {...getProps('payments')}>Payments</NavLink>
      <NavLink {...getProps('myWallet')}>My Wallet</NavLink>
      <NavLink {...getProps('defi')}>DeFi</NavLink>
    </HStack>
  );
};

const renderCustomSidebarItem: SidebarItemProps['Component'] = ({
  color,
  title,
  active,
  icon,
  isCollapsed,
}) => (
  <HStack alignItems="center" gap={2} justifyContent="center" padding={2}>
    {isCollapsed ? (
      <Icon active={active} name={icon} size="m" />
    ) : (
      <Text color={color} font="headline">
        {title}
      </Text>
    )}
  </HStack>
);

const renderAnotherCustomItem: SidebarItemProps['Component'] = ({ color, title, active, icon }) => (
  <VStack alignItems="center" gap={0.5} padding={2}>
    <Icon active={active} color={active ? 'fgPrimary' : 'fg'} name={icon} size="m" />
    <Text color={color} font="label1">
      {title}
    </Text>
  </VStack>
);

const navItems = items.slice(0, 4);
const customNavItems = items
  .slice(0, 4)
  .map((item) => ({ ...item, Component: renderCustomSidebarItem }));
const moreMenuOptions = items.slice(4);
const renderCB1 = (isCollapsed: boolean) => {
  const spacing = isCollapsed ? 1 : 2;
  return (
    <Pressable
      accessibilityLabel="Coinbase One"
      as="button"
      background="bgPrimaryWash"
      borderRadius={400}
      onClick={() => handlePress('Notifications')}
    >
      <HStack alignItems="center" gap={1} justifyContent="center" padding={spacing}>
        <Pictogram dimension="48x48" name="coinbaseOneLogo" scaleMultiplier={0.8} />
        {!isCollapsed && (
          <VStack>
            <Text font="headline">Coinbase One</Text>
            <Text as="p" color="fgMuted" display="block" font="legal">
              Zero trading fees
            </Text>
          </VStack>
        )}
      </HStack>
    </Pressable>
  );
};

type SidebarExampleProps = {
  children?: React.ReactNode;
} & Omit<SidebarMoreMenuProps, 'children'>;

export const DefaultSidebarExample = ({ children, ...props }: SidebarExampleProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [moreMenuValue, setMoreMenuValue] = useState<string | undefined>(undefined);

  const handleMoreMenuChange = (newValue: string) => {
    const moreIndex =
      moreMenuOptions.findIndex((option) => option.title === newValue) + navItems.length;
    setActiveIndex(moreIndex);
    setMoreMenuValue(newValue);
  };

  const handleItemPress = (index: number) => {
    setActiveIndex(index);
    setMoreMenuValue(undefined);
  };

  return (
    <PortalProvider>
      <HStack
        alignItems="flex-start"
        background="bgAlternate"
        justifyContent="center"
        overflow="hidden"
      >
        <Sidebar autoCollapse logo={<LogoMark />} renderEnd={renderCB1}>
          {navItems.map((item, index) => (
            <SidebarItem
              key={`sidebar-item--${item.title}`}
              active={index === activeIndex}
              onClick={() => handleItemPress(index)}
              tooltipContent={item.title}
              {...item}
            />
          ))}
          <SidebarMoreMenu
            active={activeIndex >= navItems.length}
            onChange={handleMoreMenuChange}
            tooltipContent="More"
            value={moreMenuValue}
            {...props}
          >
            {moreMenuOptions.map((item) => (
              <SelectOption
                key={`sidebar-more-menu-item--${item.title}`}
                description={item.title}
                media={<Icon color="fg" name={item.icon} size="m" />}
                value={item.title}
              />
            ))}
          </SidebarMoreMenu>
        </Sidebar>
        <VStack flexGrow={1} gap={1} justifyContent="space-between" padding={2}>
          <Text as="h2" display="block" font="headline">
            Active Page: {[...items, ...moreMenuOptions][activeIndex].title}
          </Text>
          <HStack alignItems="center" flexGrow={1} justifyContent="center" padding={3}>
            {children}
          </HStack>
        </VStack>
      </HStack>
    </PortalProvider>
  );
};

export const CondensedSidebarExample = ({ children, ...props }: SidebarExampleProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [moreMenuValue, setMoreMenuValue] = useState<string | undefined>(undefined);

  const handleMoreMenuChange = (newValue: string) => {
    const moreIndex =
      moreMenuOptions.findIndex((option) => option.title === newValue) + navItems.length;
    setActiveIndex(moreIndex);
    setMoreMenuValue(newValue);
  };

  const handleItemPress = (index: number) => {
    setActiveIndex(index);
    setMoreMenuValue(undefined);
  };

  return (
    <PortalProvider>
      <HStack
        alignItems="flex-start"
        background="bgAlternate"
        justifyContent="center"
        overflow="hidden"
      >
        <Sidebar logo={<LogoMark />} renderEnd={() => renderCB1(true)} variant="condensed">
          {navItems.map((item, index) => {
            const active = index === activeIndex;
            return (
              <SidebarItem
                key={`sidebar-item--${item.title}`}
                active={active}
                onClick={() => handleItemPress(index)}
                {...item}
              />
            );
          })}
          <SidebarMoreMenu
            active={activeIndex >= navItems.length}
            onChange={handleMoreMenuChange}
            value={moreMenuValue}
            {...props}
          >
            {moreMenuOptions.map((item) => (
              <SelectOption
                key={`sidebar-more-menu-item--${item.title}`}
                description={item.title}
                media={<Icon color="fg" name={item.icon} size="m" />}
                value={item.title}
              />
            ))}
          </SidebarMoreMenu>
        </Sidebar>
        <VStack flexGrow={1} gap={1} justifyContent="space-between" padding={2}>
          <Text as="h2" display="block" font="headline">
            Active Page: {[...items, ...moreMenuOptions][activeIndex].title}
          </Text>
          <HStack alignItems="center" flexGrow={1} justifyContent="center" padding={3}>
            {children}
          </HStack>
        </VStack>
      </HStack>
    </PortalProvider>
  );
};

export const CustomSidebarExample = ({ children, ...props }: SidebarExampleProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [moreMenuValue, setMoreMenuValue] = useState<string | undefined>(undefined);

  const handleMoreMenuChange = (newValue: string) => {
    const moreIndex =
      moreMenuOptions.findIndex((option) => option.title === newValue) + navItems.length;
    setActiveIndex(moreIndex);
    setMoreMenuValue(newValue);
  };

  const handleItemPress = (index: number) => {
    setActiveIndex(index);
    setMoreMenuValue(undefined);
  };

  const renderLogo = (isCollapsed: boolean) => {
    return isCollapsed ? (
      <LogoMark />
    ) : (
      <Box height={32}>
        <SubBrandLogoMark type="wallet" />
      </Box>
    );
  };

  return (
    <PortalProvider>
      <HStack
        alignItems="flex-start"
        background="bgAlternate"
        justifyContent="center"
        overflow="hidden"
      >
        <Sidebar autoCollapse logo={renderLogo} renderEnd={renderCB1}>
          {customNavItems.map((item, index) => {
            const active = index === activeIndex;
            return (
              <SidebarItem
                key={`sidebar-item--${item.title}`}
                active={active}
                borderRadius={100}
                onClick={() => handleItemPress(index)}
                tooltipContent={item.title}
                {...item}
              />
            );
          })}
          <SidebarMoreMenu
            Component={renderAnotherCustomItem}
            active={activeIndex >= customNavItems.length}
            borderRadius={100}
            onChange={handleMoreMenuChange}
            value={moreMenuValue}
            {...props}
          >
            {moreMenuOptions.map((item) => (
              <SelectOption
                key={`sidebar-more-menu-item--${item.title}`}
                description={item.title}
                media={<Icon color="fg" name={item.icon} size="m" />}
                value={item.title}
              />
            ))}
          </SidebarMoreMenu>
        </Sidebar>
        <VStack flexGrow={1} gap={1} justifyContent="space-between" padding={2}>
          <Text as="h2" display="block" font="headline">
            Active Page: {[...items, ...moreMenuOptions][activeIndex].title}
          </Text>
          <HStack alignItems="center" flexGrow={1} justifyContent="center" padding={3}>
            {children}
          </HStack>
        </VStack>
      </HStack>
    </PortalProvider>
  );
};

export const MockSidebar = ({ ...props }: Partial<SidebarProps>) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemPress = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <DefaultThemeProvider>
      <PortalProvider>
        <HStack
          alignItems="flex-start"
          background="bgAlternate"
          justifyContent="center"
          overflow="hidden"
        >
          <Sidebar logo={<LogoMark />} renderEnd={renderCB1} testID="sidebar" {...props}>
            {navItems.slice(0, 1).map((item, index) => (
              <SidebarItem
                key={`sidebar-item--${item.title}`}
                active={index === activeIndex}
                onClick={() => handleItemPress(index)}
                tooltipContent={item.title}
                {...item}
              />
            ))}
          </Sidebar>
        </HStack>
      </PortalProvider>
    </DefaultThemeProvider>
  );
};
DefaultSidebarExample.parameters = { percy: { enableJavaScript: true } };
