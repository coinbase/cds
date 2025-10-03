import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout';
import { Text } from '../../typography/Text';
import { SegmentedTab } from '../SegmentedTab';
import { SegmentedTabs, type SegmentedTabsProps } from '../SegmentedTabs';
import type { TabProps } from '../TabNavigation';
import type { TabComponent, TabsActiveIndicatorProps } from '../Tabs';
import { TabsActiveIndicator } from '../Tabs';

const CustomActiveIndicator = ({
  activeTabRect,
}: Pick<TabsActiveIndicatorProps, 'activeTabRect'>) => (
  <TabsActiveIndicator activeTabRect={activeTabRect} background="bgOverlay" />
);

const CustomSegmentedTab: TabComponent = (props) => (
  <SegmentedTab {...props} activeColor="accentBoldPurple" color="fgPrimary" />
);

const AnotherCustomSegmentedTab: TabComponent = ({ id, label, disabled }) => {
  const { activeTab, updateActiveTab, disabled: tabsDisabled } = useTabsContext();
  const isActive = activeTab?.id === id;

  const handlePress = useCallback(() => {
    updateActiveTab(id);
  }, [id, updateActiveTab]);

  return (
    <Pressable
      accessibilityRole="button"
      aria-pressed={isActive}
      disabled={disabled || tabsDisabled}
      onPress={handlePress}
    >
      <Box alignItems="center" paddingX={3} paddingY={1}>
        {typeof label === 'string' ? (
          <Text color={isActive ? 'fgPositive' : 'fgNegative'} ellipsize="tail" font="label2">
            {label}
          </Text>
        ) : (
          label
        )}
      </Box>
    </Pressable>
  );
};

const CustomSegmentedTabColor: TabComponent = (props) => (
  <SegmentedTab {...props} activeColor="fgWarning" color="bgPrimary" font="label2" />
);

const CustomSegmentedTabFont: TabComponent = (props) => <SegmentedTab {...props} font="label2" />;

const basicSegments = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
];

const longSegments = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
  { id: 'hello', label: 'Hello' },
  { id: 'world', label: 'World' },
  { id: 'something', label: 'Something' },
  { id: 'carrots', label: 'Carrots' },
  { id: 'bitcoin', label: 'Bitcoin' },
];

const basicSegmentsWithDisabled = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell', disabled: true },
  { id: 'convert', label: 'Convert' },
];

type TransactionType = 'buy' | 'sell' | 'convert';

const enumSegments: TabProps<TransactionType>[] = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
];

const customSegments = [
  { id: 'buy', label: 'Buy', Component: CustomSegmentedTab },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
];

const mixedCustomSegments = [
  { id: 'buy', label: 'Buy', Component: CustomSegmentedTabColor },
  { id: 'sell', label: 'Sell', Component: CustomSegmentedTabFont },
  { id: 'convert', label: 'Convert', Component: CustomSegmentedTabColor },
];

type SegmentedTabsExampleProps<T extends string> = {
  title: string;
  defaultActiveTab: TabValue<T> | null;
} & Omit<SegmentedTabsProps<T>, 'activeTab' | 'onChange'>;

const SegmentedTabsExample = <T extends string>({
  title,
  defaultActiveTab,
  ...props
}: SegmentedTabsExampleProps<T>) => {
  const [activeTab, updateActiveTab] = useState<TabValue<T> | null>(defaultActiveTab);
  const handleChange = useCallback(
    (activeTab: TabValue<T> | null) => updateActiveTab(activeTab),
    [],
  );

  return (
    <Example title={title}>
      <SegmentedTabs
        {...props}
        accessibilityLabel="Switch token action views"
        activeTab={activeTab}
        onChange={handleChange}
      />
    </Example>
  );
};

const SegmentedTabsScreen = () => (
  <ExampleScreen>
    <SegmentedTabsExample defaultActiveTab={basicSegments[0]} tabs={basicSegments} title="Basic" />
    <SegmentedTabsExample
      defaultActiveTab={basicSegments[0]}
      tabs={basicSegments.slice(0, 2)}
      title="Two Tabs"
    />
    <SegmentedTabsExample defaultActiveTab={longSegments[0]} tabs={longSegments} title="Long" />
    <SegmentedTabsExample
      defaultActiveTab={basicSegments[1]}
      tabs={basicSegments}
      title="Initial Value"
    />
    <SegmentedTabsExample defaultActiveTab={null} tabs={basicSegments} title="No Initial Value" />
    <SegmentedTabsExample
      disabled
      defaultActiveTab={basicSegments[0]}
      tabs={basicSegments}
      title="Disabled"
    />
    <SegmentedTabsExample
      defaultActiveTab={basicSegmentsWithDisabled[0]}
      tabs={basicSegmentsWithDisabled}
      title="Disabled Segment"
    />
    <SegmentedTabsExample
      defaultActiveTab={enumSegments[0]}
      tabs={enumSegments}
      title="Enum Value"
    />
    <SegmentedTabsExample
      defaultActiveTab={customSegments[0]}
      tabs={customSegments}
      title="Custom Single Segment"
    />
    <SegmentedTabsExample
      defaultActiveTab={mixedCustomSegments[0]}
      tabs={mixedCustomSegments}
      title="Mixed Custom Segments"
    />
    <SegmentedTabsExample
      TabComponent={AnotherCustomSegmentedTab}
      TabsActiveIndicatorComponent={CustomActiveIndicator}
      borderRadius={0}
      defaultActiveTab={basicSegments[0]}
      tabs={basicSegments}
      title="Custom Single Segment"
    />
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <SegmentedTabsExample
        defaultActiveTab={longSegments[4]}
        tabs={longSegments}
        title="Scrolling"
      />
    </ScrollView>
    <SegmentedTabsExample
      defaultActiveTab={basicSegments[0]}
      style={{
        transform: [{ scale: 0.7 }],
        transformOrigin: 'top left',
      }}
      tabs={basicSegments}
      title="Scaled"
    />
  </ExampleScreen>
);

export default SegmentedTabsScreen;
