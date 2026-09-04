import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
import { NavBarIconButton } from '../NavBarIconButton';
import { NavigationTitle } from '../NavigationTitle';
import { TopNavBar } from '../TopNavBar';

const NavBarIconButtonScreen = () => (
  <ExampleScreen>
    <Example title="In TopNavBar">
      {() => (
        <TopNavBar
          end={<NavBarIconButton name="share" />}
          start={<NavBarIconButton name="backArrow" />}
        >
          <NavigationTitle>Page Title</NavigationTitle>
        </TopNavBar>
      )}
    </Example>
    <Example title="Disabled">
      {() => (
        <TopNavBar
          end={<NavBarIconButton disabled name="share" />}
          start={<NavBarIconButton disabled name="backArrow" />}
        >
          <NavigationTitle>Page Title</NavigationTitle>
        </TopNavBar>
      )}
    </Example>
    <Example title="Custom Colors, Backgrounds, Icon Size, and Border Radius">
      {() => (
        <TopNavBar
          end={
            <NavBarIconButton
              background="bgSecondary"
              borderRadius={300}
              color="fgPrimary"
              name="share"
              size="s"
            />
          }
          start={
            <NavBarIconButton
              background="bgSecondary"
              borderRadius={300}
              color="fgPrimary"
              name="backArrow"
              size="s"
            />
          }
        >
          <NavigationTitle>Page Title</NavigationTitle>
        </TopNavBar>
      )}
    </Example>
  </ExampleScreen>
);

export default NavBarIconButtonScreen;
