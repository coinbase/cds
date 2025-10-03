import { forwardRef, memo, useMemo, useState } from 'react';
import { View } from 'react-native';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { IconButton } from '@coinbase/cds-mobile/buttons';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Box, HStack, VStack } from '@coinbase/cds-mobile/layout';
import { type TabComponent, type TabsActiveIndicatorProps } from '@coinbase/cds-mobile/tabs';
import { SegmentedTab, type SegmentedTabProps } from '@coinbase/cds-mobile/tabs/SegmentedTab';
import { TextHeadline, TextLabel1 } from '@coinbase/cds-mobile/typography';

import { LiveTabLabel, PeriodSelector, PeriodSelectorActiveIndicator } from '../PeriodSelector';

export default {
  component: PeriodSelector,
  title: 'Components/Chart/PeriodSelector',
};

const Example: React.FC<
  React.PropsWithChildren<{ title: string; description?: string | React.ReactNode }>
> = ({ children, title, description }) => {
  return (
    <VStack gap={2}>
      <TextHeadline>{title}</TextHeadline>
      {description}
      {children}
    </VStack>
  );
};

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
      gap={2}
      onChange={(tab) => setActiveTab(tab)}
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
  const theme = useTheme();
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

  const gradientOverlayStyles = useMemo(
    () => [
      {
        position: 'absolute' as const,
        right: 0,
        bottom: 0,
        top: 0,
        width: theme.space[4],
        backgroundColor: theme.color.bgPrimary,
        opacity: 0.8,
      },
    ],
    [theme.space, theme.color.bgPrimary],
  );

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      maxWidth="100%"
      overflow="hidden"
      width="100%"
    >
      <Box flexGrow={1} overflow="hidden" position="relative">
        <Box overflow="scroll" paddingEnd={2}>
          <PeriodSelector
            activeBackground={activeBackground}
            activeTab={activeTab}
            gap={1}
            justifyContent="flex-start"
            onChange={setActiveTab}
            tabs={tabs}
            width="fit-content"
          />
        </Box>
        <View pointerEvents="none" style={gradientOverlayStyles} />
      </Box>
      <IconButton
        compact
        accessibilityLabel="Configure chart"
        flexShrink={0}
        height={36}
        name="filter"
        variant="secondary"
      />
    </HStack>
  );
};

const btcColor = assets.btc.color;

const BTCActiveIndicator = memo((props: TabsActiveIndicatorProps) => (
  <PeriodSelectorActiveIndicator {...props} background={`${btcColor}1A` as any} />
));

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

    const textColor = isActive ? btcColor : undefined;

    return (
      <SegmentedTab
        ref={ref}
        label={<TextLabel1 dangerouslySetColor={textColor}>{label}</TextLabel1>}
        {...props}
      />
    );
  }),
);

const ColoredPeriodSelectorExample = () => {
  const tabs = [
    { id: '1H', label: <LiveTabLabel dangerouslySetColor={btcColor} /> },
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

export const All = () => {
  return (
    <VStack gap={2}>
      <Example title="Basic Example">
        <PeriodSelectorExample />
      </Example>
    </VStack>
  );
};
