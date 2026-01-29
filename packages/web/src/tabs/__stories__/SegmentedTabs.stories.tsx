import React, { useCallback, useState } from 'react';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { css } from '@linaria/core';

import { Box, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { SegmentedTab } from '../SegmentedTab';
import { SegmentedTabs, type SegmentedTabsProps } from '../SegmentedTabs';
import type { TabComponent, TabsActiveIndicatorProps } from '../Tabs';
import { TabsActiveIndicator } from '../Tabs';

export default {
  title: 'Components/Tabs/Segmented Tabs',
  component: SegmentedTabs,
};

const CustomActiveIndicator = ({
  activeTabRect,
}: Pick<TabsActiveIndicatorProps, 'activeTabRect'>) => (
  <TabsActiveIndicator activeTabRect={activeTabRect} background="bgOverlay" />
);

const CustomSegmentedTab: TabComponent = (props) => (
  <SegmentedTab {...props} activeColor="fgWarning" color="bgPrimary" />
);

const CustomSegmentedTabColor: TabComponent = (props) => (
  <SegmentedTab {...props} activeColor="fgWarning" color="bgPrimary" font="label2" />
);

const CustomSegmentedTabFont: TabComponent = (props) => <SegmentedTab {...props} font="label2" />;

const buttonCss = css`
  border-radius: 0;
`;

const AnotherCustomSegmentedTab: TabComponent = ({ id, label, disabled }) => {
  const { activeTab } = useTabsContext();
  const isActive = activeTab?.id === id;
  const renderedLabel = (
    <Text color={isActive ? 'fgPositive' : 'fgNegative'} font="label2" overflow="truncate">
      {label}
    </Text>
  );

  return <SegmentedTab className={buttonCss} disabled={disabled} id={id} label={renderedLabel} />;
};

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

type TradingAction = 'buy' | 'sell' | 'convert';
const typedSegments: TabValue<TradingAction>[] = [
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

type SegmentedTabsExampleProps<TabId extends string> = {
  title: string;
  defaultActiveTab: TabValue<TabId> | null;
} & Omit<SegmentedTabsProps<TabId>, 'activeTab' | 'onChange'>;

const SegmentedTabsExample = <TabId extends string>({
  title,
  defaultActiveTab,
  ...props
}: SegmentedTabsExampleProps<TabId>) => {
  const [activeTab, updateActiveTab] = useState<TabValue<TabId> | null>(defaultActiveTab);
  const handleChange = useCallback(
    (activeTab: TabValue<TabId> | null) => updateActiveTab(activeTab),
    [],
  );

  return (
    <VStack gap={2}>
      <Text as="h2" display="block" font="title4">
        {title}
      </Text>
      <SegmentedTabs
        {...props}
        accessibilityLabel="Switch token action views"
        activeTab={activeTab}
        onChange={handleChange}
      />
    </VStack>
  );
};

export const All = () => {
  return (
    <VStack gap={2}>
      <SegmentedTabsExample
        defaultActiveTab={basicSegments[0]}
        tabs={basicSegments}
        title="Basic"
      />
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
        title="Custom Segment & Active Indicator"
      />
      <Box maxWidth={300} overflow="auto">
        <SegmentedTabsExample
          defaultActiveTab={longSegments[4]}
          tabs={longSegments}
          title="Scrolling"
        />
      </Box>
      <Box style={{ transform: 'scale(0.7)', transformOrigin: 'top left' }}>
        <SegmentedTabsExample
          defaultActiveTab={basicSegments[0]}
          tabs={basicSegments}
          title="Scaled"
        />
      </Box>
      <SegmentedTabsExample
        defaultActiveTab={typedSegments[0]}
        tabs={typedSegments}
        title="Typed Tabs"
      />
      <SegmentedTabsExample
        defaultActiveTab={basicSegments[0]}
        gap={2}
        paddingX={3}
        paddingY={1}
        tabs={basicSegments}
        title="With Padding"
        width="fit-content"
      />
    </VStack>
  );
};

const disableA11yCheck = {
  a11y: {
    config: {
      /**
       * Disabled Color contrast ratio rule since the activated tab has an animated indicator which didn't catch by the a11y runner
       * @link https://dequeuniversity.com/rules/axe/4.6/color-contrast?application=axeAPI
       */
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

All.parameters = disableA11yCheck;
