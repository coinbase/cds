import React from 'react';
import { figma } from '@figma/code-connect';

import { Button, IconButton } from '../../buttons';
import { SearchInput } from '../../controls';
import { HStack } from '../../layout';
import { Avatar } from '../../media';
import { TabNavigation } from '../../tabs';
import { NavigationBar } from '../NavigationBar';

figma.connect(
  NavigationBar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=10414-896',
  {
    imports: ["import { NavigationBar } from '@coinbase/cds-web/navigation/NavigationBar'"],

    props: {
      // showsearch27799: figma.boolean('show search'),
      // showhelpcenter176314: figma.boolean('show help center'),
      // showsecondarycta24034: figma.boolean('show secondary cta'),
      // shownotification24028: figma.boolean('show notification'),
      // type156900: figma.instance('type'),
      // showpagetitle80: figma.boolean('show page title'),
      // showtabs24024: figma.boolean('show tabs'),
      // showprimarycta24032: figma.boolean('show primary cta'),
      // showbackarrow24022: figma.boolean('show back arrow'),
      // device: figma.enum('device', {
      //   desktop: 'desktop',
      //   tablet: 'tablet',
      //   'responsive mobile': 'responsive-mobile',
      // }),
      children: figma.boolean('show page title', {
        true: figma.children('.NavigationTitle'),
        false: undefined,
      }),
      start: figma.boolean('show back arrow', {
        true: <IconButton compact name="backArrow" variant="secondary" />,
        false: undefined,
      }),
      search: figma.boolean('show search', {
        true: <SearchInput compact onChangeText={() => {}} placeholder="Search" value="" />,
        false: undefined,
      }),
      primaryButton: figma.boolean('show primary cta', {
        true: <Button compact>Button</Button>,
        false: undefined,
      }),
      secondaryButton: figma.boolean('show secondary cta', {
        true: (
          <Button compact variant="secondary">
            Button
          </Button>
        ),
        false: undefined,
      }),
      helpButton: figma.boolean('show help center', {
        true: <IconButton compact name="unknown" variant="secondary" />,
        false: undefined,
      }),
      notificationButton: figma.boolean('show notification', {
        true: <IconButton compact name="bell" variant="secondary" />,
        false: undefined,
      }),
      tabs: figma.boolean('show tabs', {
        true: (
          <TabNavigation
            onChange={() => {}}
            tabs={[
              { id: 'first_primary_tab', label: 'Primary tab' },
              { id: 'second_primary_tab', label: 'Primary tab' },
              { id: 'third_primary_tab', label: 'Primary tab' },
            ]}
            value="first_primary_tab"
          />
        ),
        false: undefined,
      }),
    },
    example: ({
      start,
      search,
      primaryButton,
      secondaryButton,
      helpButton,
      notificationButton,
      tabs,
      children,
    }) => (
      <NavigationBar
        bottom={tabs}
        end={
          <HStack gap={2}>
            {search}
            <HStack gap={1}>
              {primaryButton}
              {secondaryButton}
            </HStack>
            <HStack gap={1}>
              {helpButton}
              {notificationButton}
              <IconButton compact name="appSwitcher" variant="secondary" />
              <Avatar alt="initial" colorScheme="blue" name="S" shape="circle" size="xl" />
            </HStack>
          </HStack>
        }
        start={start}
      >
        <HStack alignItems="center" flexGrow={1} gap={1}>
          {children}
        </HStack>
      </NavigationBar>
    ),
  },
);

figma.connect(
  NavigationBar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=10414-896',
  {
    imports: ["import { NavigationBar } from '@coinbase/cds-web/navigation/NavigationBar'"],
    variant: {
      device: 'tablet',
    },
    props: {
      children: figma.boolean('show page title', {
        true: figma.children('.NavigationTitle'),
        false: undefined,
      }),
      start: figma.boolean('show back arrow', {
        true: <IconButton compact name="backArrow" variant="secondary" />,
        false: undefined,
      }),
      search: figma.boolean('show search', {
        true: <SearchInput compact onChangeText={() => {}} placeholder="Search" value="" />,
        false: undefined,
      }),
      helpButton: figma.boolean('show help center', {
        true: <IconButton compact name="unknown" variant="secondary" />,
        false: undefined,
      }),
      notificationButton: figma.boolean('show notification', {
        true: <IconButton compact name="bell" variant="secondary" />,
        false: undefined,
      }),
      tabs: figma.boolean('show tabs', {
        true: (
          <TabNavigation
            onChange={() => {}}
            tabs={[
              { id: 'first_primary_tab', label: 'Primary tab' },
              { id: 'second_primary_tab', label: 'Primary tab' },
              { id: 'third_primary_tab', label: 'Primary tab' },
            ]}
            value="first_primary_tab"
          />
        ),
        false: undefined,
      }),
    },
    example: ({ start, search, helpButton, notificationButton, tabs, children }) => (
      <NavigationBar
        bottom={tabs}
        end={
          <HStack gap={2}>
            {search}
            <HStack gap={1}>
              {helpButton}
              {notificationButton}
              <IconButton compact name="appSwitcher" variant="secondary" />
              <Avatar alt="initial" colorScheme="blue" name="S" shape="circle" size="xl" />
            </HStack>
          </HStack>
        }
        start={start}
      >
        <HStack alignItems="center" flexGrow={1} gap={1}>
          {children}
        </HStack>
      </NavigationBar>
    ),
  },
);

figma.connect(
  NavigationBar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=10414-896',
  {
    imports: ["import { NavigationBar } from '@coinbase/cds-web/navigation/NavigationBar'"],
    variant: {
      device: 'responsive mobile',
    },
    props: {
      children: figma.instance('type'),
    },
    example: ({ children }) => (
      <NavigationBar
        end={
          <HStack gap={1}>
            <IconButton compact name="search" variant="secondary" />
            <IconButton compact name="appSwitcher" variant="secondary" />
            <Avatar alt="initial" colorScheme="blue" name="S" shape="circle" size="xl" />
          </HStack>
        }
        start={<IconButton compact transparent name="hamburger" variant="secondary" />}
      >
        <HStack alignItems="center" flexGrow={1} gap={1}>
          {children}
        </HStack>
      </NavigationBar>
    ),
  },
);
