import { forwardRef, memo, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { IconButton } from '@coinbase/cds-mobile/buttons';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { HStack } from '@coinbase/cds-mobile/layout';
import { type TabComponent, type TabsActiveIndicatorProps } from '@coinbase/cds-mobile/tabs';
import { SegmentedTab, type SegmentedTabProps } from '@coinbase/cds-mobile/tabs/SegmentedTab';
import { Text } from '@coinbase/cds-mobile/typography';

import {
  LiveTabLabel,
  type LiveTabLabelProps,
  PeriodSelector,
  PeriodSelectorActiveIndicator,
} from '../PeriodSelector';

const PeriodSelectorExample = () => {
  const tabs = [
    { id: '1H', label: '1H' },
    { id: '1D', label: '1D' },
    { id: '1W', label: '1W' },
    { id: '1M', label: '1M' },
    { id: '1Y', label: '1Y' },
    { id: 'All', label: 'All' },
  ];
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);
  return <PeriodSelector activeTab={activeTab} onChange={(tab) => setActiveTab(tab)} tabs={tabs} />;
};

const MinWidthPeriodSelectorExample = () => {
  const tabs = [
    { id: '1H', label: '1H' },
    { id: '1D', label: '1D' },
    { id: '1W', label: '1W' },
    { id: '1M', label: '1M' },
    { id: '1Y', label: '1Y' },
    { id: 'All', label: 'All' },
  ];
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);
  return (
    <PeriodSelector
      activeTab={activeTab}
      gap={0.5}
      onChange={(tab) => setActiveTab(tab)}
      tabs={tabs}
      width="fit-content"
    />
  );
};

const PaddedPeriodSelectorExample = () => {
  const tabs = [
    { id: '1W', label: '1W' },
    { id: '1M', label: '1M' },
    { id: 'YTD', label: 'YTD' },
  ];
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);
  return (
    <PeriodSelector
      activeTab={activeTab}
      gap={2}
      onChange={(tab) => setActiveTab(tab)}
      padding={3}
      tabs={tabs}
      width="fit-content"
    />
  );
};

const LivePeriodSelectorExample = () => {
  const tabs = useMemo(
    () => [
      {
        id: '1H',
        label: <LiveTabLabel />,
      },
      { id: '1D', label: '1D' },
      { id: '1W', label: '1W' },
      { id: '1M', label: '1M' },
      { id: '1Y', label: '1Y' },
      { id: 'All', label: 'All' },
    ],
    [],
  );

  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);
  const isLive = useMemo(() => activeTab?.id === '1H', [activeTab]);

  const activeBackground = useMemo(() => (!isLive ? 'bgPrimaryWash' : 'bgNegativeWash'), [isLive]);

  return (
    <PeriodSelector
      activeBackground={activeBackground}
      activeTab={activeTab}
      onChange={setActiveTab}
      tabs={tabs}
    />
  );
};

const TooManyPeriodsSelectorExample = () => {
  const tabs = useMemo(
    () => [
      {
        id: '1H',
        label: <LiveTabLabel />,
      },
      { id: '1D', label: '1D' },
      { id: '1W', label: '1W' },
      { id: '1M', label: '1M' },
      { id: 'YTD', label: 'YTD' },
      { id: '1Y', label: '1Y' },
      { id: '5Y', label: '5Y' },
      { id: 'All', label: 'All' },
    ],
    [],
  );

  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);
  const isLive = useMemo(() => activeTab?.id === '1H', [activeTab]);

  const activeBackground = useMemo(() => (!isLive ? 'bgPrimaryWash' : 'bgNegativeWash'), [isLive]);

  return (
    <HStack alignItems="center" justifyContent="space-between" maxWidth="100%" width="100%">
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingEnd: 8, flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
      >
        <PeriodSelector
          activeBackground={activeBackground}
          activeTab={activeTab}
          gap={1}
          justifyContent="flex-start"
          onChange={setActiveTab}
          tabs={tabs}
          width="fit-content"
        />
      </ScrollView>
      <IconButton
        compact
        accessibilityLabel="Configure chart"
        flexShrink={0}
        name="filter"
        variant="secondary"
      />
    </HStack>
  );
};

const btcColor = assets.btc.color;

const BTCActiveIndicator = memo((props: TabsActiveIndicatorProps) => {
  const theme = useTheme();
  const { activeTab } = useTabsContext();
  const isLive = useMemo(() => activeTab?.id === '1H', [activeTab]);

  const backgroundColor = useMemo(
    () => (isLive ? theme.color.bgNegativeWash : `${btcColor}1A`),
    [isLive, theme.color.bgNegativeWash],
  );

  return <PeriodSelectorActiveIndicator {...props} background={backgroundColor as any} />;
});

const BTCActiveExcludingLiveIndicator = memo((props: TabsActiveIndicatorProps) => {
  const theme = useTheme();
  const { activeTab } = useTabsContext();
  const isLive = useMemo(() => activeTab?.id === '1H', [activeTab]);

  const backgroundColor = useMemo(
    () => (isLive ? theme.color.bgNegativeWash : `${btcColor}1A`),
    [isLive, theme.color.bgNegativeWash],
  );

  return <PeriodSelectorActiveIndicator {...props} background={backgroundColor as any} />;
});

const BTCTab: TabComponent = memo(
  forwardRef(({ label, ...props }: SegmentedTabProps, ref: React.ForwardedRef<any>) => {
    const { activeTab } = useTabsContext();
    const isActive = activeTab?.id === props.id;
    const theme = useTheme();

    // If label is already a React element (like LiveTabLabel), pass it through directly
    // For string labels, wrap with custom BTC color when active
    const wrappedLabel =
      typeof label === 'string' ? (
        <Text dangerouslySetColor={isActive ? btcColor : theme.color.fg} font="label1">
          {label}
        </Text>
      ) : (
        label
      );

    return <SegmentedTab ref={ref} label={wrappedLabel} {...props} />;
  }),
);

const BTCLiveLabel = memo(
  forwardRef<View, LiveTabLabelProps>(
    ({ label = 'LIVE', font = 'label1', hideDot, style, ...props }, ref) => {
      const theme = useTheme();

      const dotStyle = useMemo(
        () => ({
          width: theme.space[1],
          height: theme.space[1],
          borderRadius: 1000,
          marginRight: theme.space[0.75],
          backgroundColor: btcColor,
        }),
        [theme.space],
      );

      return (
        <View
          ref={ref}
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
            },
            style,
          ]}
        >
          {!hideDot && <View style={dotStyle} />}
          <Text font={font} style={{ color: btcColor }} {...props}>
            {label}
          </Text>
        </View>
      );
    },
  ),
);

const ColoredPeriodSelectorExample = () => {
  const tabs = [
    { id: '1H', label: <BTCLiveLabel /> },
    { id: '1D', label: '1D' },
    { id: '1W', label: '1W' },
    { id: '1M', label: '1M' },
    { id: '1Y', label: '1Y' },
    { id: 'All', label: 'All' },
  ];
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);

  return (
    <PeriodSelector
      TabComponent={BTCTab}
      TabsActiveIndicatorComponent={BTCActiveIndicator}
      activeTab={activeTab}
      onChange={(tab) => setActiveTab(tab)}
      tabs={tabs}
    />
  );
};

const ColoredExcludingLivePeriodSelectorExample = () => {
  const tabs = [
    { id: '1H', label: <LiveTabLabel /> },
    { id: '1D', label: '1D' },
    { id: '1W', label: '1W' },
    { id: '1M', label: '1M' },
    { id: '1Y', label: '1Y' },
    { id: 'All', label: 'All' },
  ];
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);

  return (
    <PeriodSelector
      TabComponent={BTCTab}
      TabsActiveIndicatorComponent={BTCActiveExcludingLiveIndicator}
      activeTab={activeTab}
      onChange={(tab) => setActiveTab(tab)}
      tabs={tabs}
    />
  );
};

export default function All() {
  return (
    <ExampleScreen>
      <Example title="Basic">
        <PeriodSelectorExample />
      </Example>
      <Example title="Min Width">
        <MinWidthPeriodSelectorExample />
      </Example>
      <Example title="Live Period">
        <LivePeriodSelectorExample />
      </Example>
      <Example title="Too Many Periods">
        <TooManyPeriodsSelectorExample />
      </Example>
      <Example title="Colored (BTC)">
        <ColoredPeriodSelectorExample />
      </Example>
      <Example title="Colored Excluding Live">
        <ColoredExcludingLivePeriodSelectorExample />
      </Example>
      <Example title="With Padding">
        <PaddedPeriodSelectorExample />
      </Example>
    </ExampleScreen>
  );
}
