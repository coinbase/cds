import React, { useState } from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { TabNavigation, type TabNavigationProps, type TabProps } from '../TabNavigation';

const tabs: TabProps[] = [
  {
    id: 'first_item',
    label: 'First item',
    onPress: console.warn,
  },
  {
    id: 'second_item',
    label: 'Second item',
  },
  {
    id: 'third_item',
    label: 'Third item',
    onPress: console.warn,
  },
  {
    id: 'fourth_item',
    label: 'Fourth item',
  },
  {
    id: 'fifth_item',
    label: 'Fifth item',
  },
];

// TODO update once _Tabs_ component is complete
const TabScreen = () => {
  const [activeTabOne, setActiveTabOne] = useState<TabNavigationProps['value']>(tabs[0].id);

  return (
    <ExampleScreen>
      <Example overflow="visible" padding={gutter} title="Tab System">
        <TabNavigation onChange={setActiveTabOne} tabs={tabs} value={activeTabOne} />
        <VStack alignItems="center" background="bgAlternate" justifyContent="center" paddingY={6}>
          <Text font="label1">Static preview</Text>
          <Text color="fgPrimary" font="title2">
            {activeTabOne}
          </Text>
        </VStack>
      </Example>
      <Example overflow="visible" padding={gutter} title="Tab System (Secondary)">
        <TabNavigation
          onChange={setActiveTabOne}
          tabs={tabs}
          value={activeTabOne}
          variant="secondary"
        />
        <VStack alignItems="center" background="bgAlternate" justifyContent="center" paddingY={6}>
          <Text font="label1">Static preview</Text>
          <Text color="fgPrimary" font="title2">
            {activeTabOne}
          </Text>
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default TabScreen;
