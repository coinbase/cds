import React, { useState } from 'react';
import { css } from '@linaria/core';

import { IconButton } from '../../buttons';
import { SelectOption } from '../../controls';
import { Icon, LogoMark, SubBrandLogoMark } from '../../icons';
import { Box, HStack, Spacer, VStack } from '../../layout';
import { PortalProvider } from '../../overlays/PortalProvider';
import { Pressable } from '../../system';
import { Text } from '../../typography/Text';
import { Sidebar, SidebarItem, SidebarMoreMenu } from '..';

import {
  CondensedSidebarExample,
  CustomSidebarExample,
  DefaultSidebarExample,
} from './NavigationStorySetup';

export default {
  component: Sidebar,
  title: 'Components/Navigation/Sidebar',
};

const items = [
  { title: 'Home', icon: 'home' as const },
  { title: 'Assets', icon: 'chartPie' as const },
  { title: 'Trade', icon: 'trading' as const },
  { title: 'Pay', icon: 'pay' as const },
  { title: 'For you', icon: 'newsFeed' as const },
  { title: 'Earn', icon: 'giftBox' as const },
  { title: 'Borrow', icon: 'cash' as const },
  { title: 'DeFi', icon: 'defi' as const },
];

export const Default = () => {
  return (
    <>
      <Text as="h1" display="block" font="title1">
        Default Sidebar Example
      </Text>
      <Spacer as="div" vertical={1} />
      <DefaultSidebarExample />
    </>
  );
};

export const Condensed = () => {
  return (
    <>
      <Text as="h1" display="block" font="title1">
        Condensed Sidebar Example
      </Text>
      <Spacer as="div" vertical={1} />
      <CondensedSidebarExample />
    </>
  );
};

export const Custom = () => {
  return (
    <>
      <Text as="h1" display="block" font="title1">
        Custom Sidebar Example
      </Text>
      <Spacer as="div" vertical={1} />
      <CustomSidebarExample />
    </>
  );
};

export const ControlledCollapse = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [moreMenuValue, setMoreMenuValue] = useState<string | undefined>(undefined);
  const [collapsed, setCollapsed] = useState(true);
  const moreMenuOptions = items.slice(4);

  const handleMoreMenuChange = (newValue: string) => {
    const moreIndex =
      moreMenuOptions.findIndex((option) => option.title === newValue) + items.length;
    setActiveIndex(moreIndex);
    setMoreMenuValue(newValue);
  };

  const handleItemPress = (index: number) => {
    setActiveIndex(index);
    setMoreMenuValue(undefined);
  };

  const renderEnd = () => (
    <IconButton
      height="48px"
      name={collapsed ? 'caretRight' : 'caretLeft'}
      onClick={() => setCollapsed(!collapsed)}
      width="48px"
    />
  );

  return (
    <PortalProvider>
      <HStack alignItems="flex-start" justifyContent="center" overflow="hidden">
        <Sidebar collapsed={collapsed} logo={<LogoMark />} renderEnd={renderEnd}>
          {items.map((item, index) => (
            <SidebarItem
              key={`sidebar-item--${item.title}`}
              active={index === activeIndex}
              onClick={() => handleItemPress(index)}
              tooltipContent={item.title}
              {...item}
            />
          ))}
          <SidebarMoreMenu
            active={activeIndex >= items.length}
            onChange={handleMoreMenuChange}
            tooltipContent="More"
            value={moreMenuValue}
          >
            {moreMenuOptions.map((item) => (
              <SelectOption
                key={`sidebar-more-menu-item--${item.title}`}
                description={item.title}
                media={<Icon name={item.icon} />}
                value={item.title}
              />
            ))}
          </SidebarMoreMenu>
        </Sidebar>
        <VStack flexGrow={1} gap={1} justifyContent="space-between" padding={2}>
          <Text as="h2" display="block" font="headline">
            Click the arrow button to toggle collapsed state
          </Text>
        </VStack>
      </HStack>
    </PortalProvider>
  );
};

export const AutoCollapse = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <PortalProvider>
      <HStack alignItems="flex-start" justifyContent="center" overflow="hidden">
        <Sidebar autoCollapse logo={<LogoMark />}>
          {items.slice(0, 4).map((item, index) => (
            <SidebarItem
              key={item.title}
              active={index === activeIndex}
              icon={item.icon}
              onClick={() => setActiveIndex(index)}
              title={item.title}
              tooltipContent={item.title}
            />
          ))}
        </Sidebar>
        <VStack flexGrow={1} padding={3}>
          <Text color="fgMuted" font="label1">
            Resize the browser window to see the sidebar auto-collapse at the tablet breakpoint.
          </Text>
        </VStack>
      </HStack>
    </PortalProvider>
  );
};

export const CustomLogo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const renderLogo = (isCollapsed: boolean) =>
    isCollapsed ? (
      <LogoMark />
    ) : (
      <Box height={32}>
        <SubBrandLogoMark type="commerce" />
      </Box>
    );

  return (
    <PortalProvider>
      <HStack alignItems="flex-start" justifyContent="center" overflow="hidden">
        <Sidebar
          collapsed={collapsed}
          logo={renderLogo}
          renderEnd={() => (
            <IconButton
              name={collapsed ? 'caretRight' : 'caretLeft'}
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
        >
          {items.slice(0, 3).map((item, index) => (
            <SidebarItem
              key={item.title}
              active={index === activeIndex}
              icon={item.icon}
              onClick={() => setActiveIndex(index)}
              title={item.title}
              tooltipContent={item.title}
            />
          ))}
        </Sidebar>
      </HStack>
    </PortalProvider>
  );
};

export const RenderEnd = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderEnd = (isCollapsed: boolean) => (
    <Pressable
      transparentWhileInactive
      as="button"
      background="bgPrimaryWash"
      borderRadius={1000}
      onClick={() => console.log('Help clicked!')}
      width="100%"
    >
      <HStack alignItems="center" gap={2} paddingX={2} paddingY={2}>
        <Icon name="questionMark" />
        {!isCollapsed && (
          <Text as="span" font="headline">
            Help & Support
          </Text>
        )}
      </HStack>
    </Pressable>
  );

  return (
    <PortalProvider>
      <HStack alignItems="flex-start" justifyContent="center" overflow="hidden">
        <Sidebar
          logo={<LogoMark />}
          renderEnd={renderEnd}
          styles={{
            end: {
              width: '100%',
            },
          }}
        >
          {items.slice(0, 3).map((item, index) => (
            <SidebarItem
              key={item.title}
              active={index === activeIndex}
              icon={item.icon}
              onClick={() => setActiveIndex(index)}
              title={item.title}
              tooltipContent={item.title}
            />
          ))}
        </Sidebar>
      </HStack>
    </PortalProvider>
  );
};

export const CustomStyles = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <PortalProvider>
      <HStack alignItems="flex-start" justifyContent="center" overflow="hidden">
        <Sidebar
          logo={<LogoMark />}
          renderEnd={() => (
            <Pressable
              transparentWhileInactive
              as="button"
              background="bgPrimaryWash"
              borderRadius={1000}
              width="100%"
            >
              <HStack alignItems="center" gap={2} paddingX={2} paddingY={2}>
                <Icon name="questionMark" />
                <Text as="span" font="headline">
                  Help
                </Text>
              </HStack>
            </Pressable>
          )}
          styles={{
            root: {
              background:
                'linear-gradient(180deg, var(--color-bg) 0%, var(--color-bgAlternate) 100%)',
            },
            logo: { paddingBottom: 32 },
            end: { width: '100%' },
          }}
        >
          {items.slice(0, 4).map((item, index) => (
            <SidebarItem
              key={item.title}
              active={index === activeIndex}
              icon={item.icon}
              onClick={() => setActiveIndex(index)}
              title={item.title}
              tooltipContent={item.title}
            />
          ))}
        </Sidebar>
      </HStack>
    </PortalProvider>
  );
};

export const ApplicationShell = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [moreMenuValue, setMoreMenuValue] = useState<string | undefined>(undefined);
  const navItems = items.slice(0, 5);
  const moreMenuOptions = items.slice(5);

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

  const currentPage = items[activeIndex]?.title || 'Dashboard';

  return (
    <PortalProvider>
      <HStack alignItems="stretch" height={400} overflow="hidden">
        <Sidebar
          autoCollapse
          logo={<LogoMark />}
          renderEnd={(isCollapsed) => (
            <VStack gap={1}>
              <Pressable
                transparentWhileInactive
                as="button"
                background="bgPrimaryWash"
                borderRadius={1000}
                width="100%"
              >
                <HStack alignItems="center" gap={2} paddingX={2} paddingY={2}>
                  <Icon name="settings" />
                  {!isCollapsed && (
                    <Text as="span" font="headline">
                      Settings
                    </Text>
                  )}
                </HStack>
              </Pressable>
              <Pressable
                transparentWhileInactive
                as="button"
                background="bgPrimaryWash"
                borderRadius={1000}
                width="100%"
              >
                <HStack alignItems="center" gap={2} paddingX={2} paddingY={2}>
                  <Icon name="profile" />
                  {!isCollapsed && (
                    <Text as="span" font="headline">
                      Profile
                    </Text>
                  )}
                </HStack>
              </Pressable>
            </VStack>
          )}
        >
          {navItems.map((item, index) => (
            <SidebarItem
              key={item.title}
              active={index === activeIndex}
              icon={item.icon}
              onClick={() => handleItemPress(index)}
              title={item.title}
              tooltipContent={item.title}
            />
          ))}
          <SidebarMoreMenu
            active={activeIndex >= navItems.length}
            onChange={handleMoreMenuChange}
            tooltipContent="More"
            value={moreMenuValue}
          >
            {moreMenuOptions.map((item) => (
              <SelectOption
                key={item.title}
                description={item.title}
                media={<Icon name={item.icon} />}
                value={item.title}
              />
            ))}
          </SidebarMoreMenu>
        </Sidebar>
        <VStack background="bgAlternate" flexGrow={1} padding={3}>
          <Text as="h1" font="title2">
            {currentPage}
          </Text>
          <Text color="fgMuted" font="body">
            Welcome to the {currentPage.toLowerCase()} page. This is a sample application shell
            demonstrating the Sidebar component with responsive behavior.
          </Text>
        </VStack>
      </HStack>
    </PortalProvider>
  );
};

export const CondensedTradingInterface = () => {
  const tradingItems = [
    { title: 'Spot', icon: 'chartCandles' as const },
    { title: 'Futures', icon: 'chartBar' as const },
    { title: 'Portfolio', icon: 'chartPie' as const },
    { title: 'Orders', icon: 'documentation' as const },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <PortalProvider>
      <HStack>
        <Sidebar logo={<LogoMark foreground />} variant="condensed">
          {tradingItems.map((item, index) => (
            <SidebarItem
              key={item.title}
              active={index === activeIndex}
              icon={item.icon}
              onClick={() => setActiveIndex(index)}
              title={item.title}
            />
          ))}
        </Sidebar>
        <VStack background="bgAlternate" flexGrow={1} gap={2} padding={3}>
          <HStack justifyContent="space-between">
            <Text font="title3">BTC/USD</Text>
            <Text color="fgPositive" font="title3">
              $67,432.50
            </Text>
          </HStack>
          <Box
            background="bg"
            borderRadius={200}
            flexGrow={1}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text color="fgMuted" font="label1">
              {tradingItems[activeIndex].title} Chart Area
            </Text>
          </Box>
        </VStack>
      </HStack>
    </PortalProvider>
  );
};

const customRootCss = css`
  border-right: 2px solid var(--color-linePrimary);
`;

const customLogoCss = css`
  padding-bottom: var(--spacing-6);
`;

const customContentCss = css`
  gap: var(--spacing-2);
`;

const customEndCss = css`
  width: 100%;
  padding-top: var(--spacing-6);
`;

export const CustomClassNames = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <PortalProvider>
      <HStack alignItems="flex-start" justifyContent="center" overflow="hidden">
        <Sidebar
          classNames={{
            root: customRootCss,
            logo: customLogoCss,
            content: customContentCss,
            end: customEndCss,
          }}
          logo={<LogoMark />}
          renderEnd={() => (
            <Pressable
              transparentWhileInactive
              as="button"
              background="bgPrimaryWash"
              borderRadius={1000}
              width="100%"
            >
              <HStack alignItems="center" gap={2} paddingX={2} paddingY={2}>
                <Icon name="questionMark" />
                <Text as="span" font="headline">
                  Help
                </Text>
              </HStack>
            </Pressable>
          )}
        >
          {items.slice(0, 4).map((item, index) => (
            <SidebarItem
              key={item.title}
              active={index === activeIndex}
              icon={item.icon}
              onClick={() => setActiveIndex(index)}
              title={item.title}
              tooltipContent={item.title}
            />
          ))}
        </Sidebar>
      </HStack>
    </PortalProvider>
  );
};
