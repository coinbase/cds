import React, { useCallback, useMemo, useState } from 'react';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import { gutter } from '@coinbase/cds-common/tokens/sizing';
import sample from 'lodash/sample';

import { Button } from '../../buttons';
import { Chip } from '../../chips/Chip';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
import { Text } from '../../typography/Text';
import {
  type CustomTabProps,
  TabNavigation,
  type TabNavigationProps,
  type TabProps,
} from '../TabNavigation';

const renderCustomTab = ({ label, ...props }: CustomTabProps) => (
  <HStack bordered background="bg" borderRadius={100} paddingX={2} paddingY={1} {...props}>
    <Text font="headline">{label}</Text>
  </HStack>
);

const renderAnotherCustomTab = ({ label, ...props }: CustomTabProps) => (
  <Chip {...props}>{label}</Chip>
);

const someCustomTabs = [
  ...sampleTabs.slice(0, 3),
  {
    id: 'custom_tab',
    label: 'Custom',
    testID: 'custom_tab',
    Component: renderCustomTab,
  },
];

type TransactionType = 'buy' | 'sell' | 'convert';

const enumTabs: TabProps<TransactionType>[] = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
];

const TabNavigationScreen = () => {
  const [currentTabOne, setCurrentTabOne] = useState<TabNavigationProps['value']>();
  const [currentTabTwo, setCurrentTabTwo] = useState<TabNavigationProps['value']>(sampleTabs[3].id);
  const [currentTabThree, setCurrentTabThree] = useState<TabNavigationProps['value']>();
  const [currentTabFour, setCurrentTabFour] = useState<TabNavigationProps['value']>();
  const [currentTabFive, setCurrentTabFive] = useState<TransactionType>(enumTabs[0].id);
  const [currentTabSix, setCurrentTabSix] = useState<TabNavigationProps['value']>();
  const [dotCount, setDotCount] = useState(0);
  const tabsWithDot = useMemo(
    () => sampleTabs.map((tab) => ({ ...tab, count: dotCount })),
    [dotCount],
  );
  const randomizeCurrentTabOne = useCallback(() => {
    const randomTabItem = sample(sampleTabs);

    setCurrentTabOne(randomTabItem?.id);
  }, []);
  const randomizeDotCount = useCallback(() => {
    setDotCount(Number(dotCount ? 0 : sample([2, 14, 99, 100])));
  }, [dotCount]);

  return (
    <ExampleScreen>
      <Example overflow="visible" padding={gutter} title="Tab Navigation">
        <TabNavigation onChange={setCurrentTabOne} tabs={sampleTabs} value={currentTabOne} />
        <Button onPress={randomizeCurrentTabOne}>Select random item</Button>
      </Example>
      <Example overflow="visible" padding={gutter} title="Tab Navigation (with Default Tab)">
        <TabNavigation onChange={setCurrentTabTwo} tabs={sampleTabs} value={currentTabTwo} />
      </Example>
      <Example overflow="visible" padding={gutter} title="Tab Navigation (Secondary)">
        <TabNavigation
          onChange={setCurrentTabThree}
          tabs={sampleTabs}
          value={currentTabThree}
          variant="secondary"
        />
      </Example>
      <Example title="Enum Value">
        <TabNavigation onChange={setCurrentTabFive} tabs={enumTabs} value={currentTabFive} />
      </Example>
      <Example title="Custom Tab">
        <TabNavigation onChange={setCurrentTabFour} tabs={someCustomTabs} value={currentTabFour} />
      </Example>
      <Example title="Custom Tabs">
        <TabNavigation
          Component={renderCustomTab}
          onChange={setCurrentTabFour}
          tabs={sampleTabs}
          value={currentTabFour}
        />
      </Example>
      <Example title="Custom Tabs with one override">
        <TabNavigation
          Component={renderAnotherCustomTab}
          onChange={setCurrentTabFour}
          tabs={someCustomTabs}
          value={currentTabFour}
        />
      </Example>
      <Example overflow="visible" padding={gutter} title="Tab Navigation with dot count change">
        <TabNavigation onChange={setCurrentTabSix} tabs={tabsWithDot} value={currentTabSix} />
        <Button onPress={randomizeDotCount}>Randomize dot count</Button>
      </Example>
      <Example overflow="visible" padding={gutter} title="Tab Navigation with disabled tab">
        <TabNavigation
          onChange={setCurrentTabOne}
          tabs={sampleTabs.map((tab, index) => ({ ...tab, disabled: index === 1 }))}
          value={currentTabOne}
        />
        <Button onPress={randomizeCurrentTabOne}>Select random item</Button>
      </Example>
      <Example overflow="visible" padding={gutter} title="With Padding">
        <TabNavigation
          onChange={setCurrentTabOne}
          paddingX={3}
          paddingY={1}
          tabs={sampleTabs.slice(0, 3)}
          value={currentTabOne}
        />
      </Example>
    </ExampleScreen>
  );
};

export default TabNavigationScreen;
