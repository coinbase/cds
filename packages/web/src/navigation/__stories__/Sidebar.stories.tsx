import React from 'react';

import { Spacer } from '../../layout';
import { Text } from '../../typography/Text';
import { Sidebar } from '../Sidebar';

import {
  CondensedSidebarExample,
  CustomSidebarExample,
  DefaultSidebarExample,
} from './NavigationStorySetup';

export default {
  component: Sidebar,
  title: 'Components/Navigation/Sidebar',
};

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
