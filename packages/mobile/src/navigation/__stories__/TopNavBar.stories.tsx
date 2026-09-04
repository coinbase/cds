import { useState } from 'react';

import { Switch } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { TabNavigation } from '../../tabs';
import { NavBarIconButton } from '../NavBarIconButton';
import { NavigationSubtitle } from '../NavigationSubtitle';
import { NavigationTitle } from '../NavigationTitle';
import { NavigationTitleSelect } from '../NavigationTitleSelect';
import { TopNavBar } from '../TopNavBar';

const tabs = [
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

const DefaultExample = () => {
  const [showStart, setShowStart] = useState(true);
  const [showEnd, setShowEnd] = useState(true);
  return (
    <Example title="With Start and End Nodes">
      <Switch checked={showStart} onChange={() => setShowStart(!showStart)}>
        Show Start Node
      </Switch>
      <Switch checked={showEnd} onChange={() => setShowEnd(!showEnd)}>
        Show End Node
      </Switch>
      <TopNavBar
        end={
          showEnd && (
            <HStack alignItems="center" gap={1}>
              <NavBarIconButton name="share" />
              <NavBarIconButton name="more" />
            </HStack>
          )
        }
        paddingX={0}
        start={showStart && <NavBarIconButton name="appSwitcher" />}
      >
        <VStack alignItems="center">
          <NavigationTitle>Page Title</NavigationTitle>
          <NavigationSubtitle>Page Subtitle</NavigationSubtitle>
        </VStack>
      </TopNavBar>
    </Example>
  );
};

const ExampleWithBottomComponent = () => {
  const [tab, setTab] = useState(tabs[0].id);

  return (
    <Example title="With Bottom Node">
      <TopNavBar
        bottom={<TabNavigation onChange={setTab} tabs={tabs} value={tab} />}
        end={
          <HStack alignItems="center" gap={1}>
            <NavBarIconButton name="share" />
            <NavBarIconButton name="more" />
          </HStack>
        }
        paddingX={0}
        start={<NavBarIconButton name="appSwitcher" />}
      >
        <NavigationTitleSelect onChange={setTab} options={tabs} value={tab} />
      </TopNavBar>
    </Example>
  );
};

const NavigationBarScreen = () => {
  return (
    <ExampleScreen>
      <DefaultExample />
      <ExampleWithBottomComponent />
    </ExampleScreen>
  );
};

export default NavigationBarScreen;
