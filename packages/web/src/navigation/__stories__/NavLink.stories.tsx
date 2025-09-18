import React from 'react';

import { Spacer, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { NavLink } from '../NavLink';

import { NavLinkExample } from './NavigationStorySetup';

export default {
  component: NavLink,
  title: 'Components/Navigation/NavLink',
};

export const NavLinkExampleDefault = () => {
  return (
    <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        Nav link example
      </Text>
      <Spacer />
      <NavLinkExample />
    </VStack>
  );
};
