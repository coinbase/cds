import { forwardRef, memo, useMemo, useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { IconButton } from '@coinbase/cds-web/buttons';
import { useTheme } from '@coinbase/cds-web/hooks/useTheme';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import {
  SegmentedTab,
  type SegmentedTabProps,
  type TabComponent,
  type TabsActiveIndicatorProps,
} from '@coinbase/cds-web/tabs';
import { TextHeadline, TextLabel1 } from '@coinbase/cds-web/typography';
import { css } from '@linaria/core';

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

const scrollContainerCss = css`
  scrollbar-width: none;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

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
    <HStack
      alignItems="center"
      justifyContent="space-between"
      maxWidth="100%"
      overflow="hidden"
      width="100%"
    >
      <Box flexGrow={1} overflow="hidden" position="relative">
        <Box className={scrollContainerCss} paddingEnd={2}>
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
        <Box
          position="absolute"
          style={{
            background: 'linear-gradient(to left, var(--color-bg), transparent 100%)',
            right: 0,
            bottom: 0,
            top: 0,
            width: 'var(--space-4)',
            pointerEvents: 'none',
          }}
        />
      </Box>
      {/* todo - better way to handle height? https://www.figma.com/design/sbeD5oRL9OL5hbIzaqzL7T/Line-Charts----Sparkline?node-id=5947-13669&t=7esgu5dzBls0bZNV-4 */}
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

const BTCActiveIndicator = memo(({ style, ...props }: TabsActiveIndicatorProps) => (
  <PeriodSelectorActiveIndicator
    {...props}
    style={{ ...style, backgroundColor: `${btcColor}1A` }}
  />
));

const BTCActiveExcludingLiveIndicator = memo(({ style, ...props }: TabsActiveIndicatorProps) => {
  const { activeTab } = useTabsContext();
  const isLive = useMemo(() => activeTab?.id === '1H', [activeTab]);

  return (
    <PeriodSelectorActiveIndicator
      {...props}
      style={{
        ...style,
        backgroundColor: isLive ? 'var(--color-bgNegativeWash)' : `${btcColor}1A`,
      }}
    />
  );
});

const BTCTab: TabComponent = memo(
  forwardRef(
    ({ label, ...props }: SegmentedTabProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
      const { activeTab } = useTabsContext();
      const theme = useTheme();
      const isActive = activeTab?.id === props.id;

      const btcThemeColor = useMemo(() => {
        if (!isActive) return undefined;
        return theme.activeColorScheme === 'light' ? '#593203' : btcColor;
      }, [isActive, theme.activeColorScheme]);

      return (
        <SegmentedTab
          ref={ref}
          label={
            <TextLabel1
              style={{
                transition: 'color 0.2s ease',
                color: btcThemeColor,
              }}
            >
              {label}
            </TextLabel1>
          }
          {...props}
        />
      );
    },
  ),
);

const ColoredPeriodSelectorExample = () => {
  const theme = useTheme();

  const liveLabelColor = theme.activeColorScheme === 'light' ? '#593203' : btcColor;

  const tabs = [
    { id: '1H', label: <LiveTabLabel style={{ color: liveLabelColor }} /> },
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
      <Example title="Min Width Period Selector">
        <MinWidthPeriodSelectorExample />
      </Example>
      <Example title="Live Period Selector">
        <LivePeriodSelectorExample />
      </Example>
      <Example title="Period Selector with Overflow & Button">
        <TooManyPeriodsSelectorExample />
      </Example>
      <Example title="Colored Period Selector">
        <ColoredPeriodSelectorExample />
      </Example>
      <Example title="Colored Excluding Live Period Selector">
        <ColoredExcludingLivePeriodSelectorExample />
      </Example>
    </VStack>
  );
};
