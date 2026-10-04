import { type FC, memo, useCallback, useState } from 'react';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';
import { css } from '@linaria/core';

import { IconButton } from '../../buttons/IconButton';
import { cx } from '../../cx';
import { Box, VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { DefaultTab } from '../DefaultTab';
import { DefaultTabsActiveIndicator } from '../DefaultTabsActiveIndicator';
import { Tabs } from '../Tabs';
import { TabsScrollArea } from '../TabsScrollArea';
import type { TabsScrollAreaOverflowIndicatorProps } from '../TabsScrollAreaOverflowIndicator';

const customOverflowIndicatorRootCss = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: ${zIndex.navigation + 2};
`;

const StoryCustomOverflowIndicator = memo(function StoryCustomOverflowIndicator({
  direction,
  show,
  onClick,
  style,
  className,
}: TabsScrollAreaOverflowIndicatorProps) {
  if (!show) {
    return null;
  }

  return (
    <Box
      as="span"
      className={cx(customOverflowIndicatorRootCss, className)}
      style={{
        ...(direction === 'left' ? { left: 0 } : { right: 0 }),
        ...style,
      }}
    >
      <IconButton
        accessibilityLabel={direction === 'left' ? 'Previous' : 'Next'}
        name={direction === 'left' ? 'caretLeft' : 'caretRight'}
        onClick={onClick}
        variant="primary"
      />
    </Box>
  );
});

StoryCustomOverflowIndicator.displayName = 'StoryCustomOverflowIndicator';

export default {
  title: 'Components/Tabs/TabsScrollArea',
  parameters: {
    a11y: {
      context: {
        include: ['body'],
        exclude: ['.no-a11y-checks'],
      },
    },
  },
};

const basicTabs: (TabValue<string> & { testID?: string })[] = [
  { id: 'buy', label: 'Buy', testID: 'buy-tab' },
  { id: 'sell', label: 'Sell', testID: 'sell-tab' },
  { id: 'convert', label: 'Convert', testID: 'convert-tab' },
];

const longTabs = sampleTabs.slice(0, 9);

const tabsTabListOnlyA11y = {
  a11y: {
    context: {
      include: ['body'],
      exclude: ['.no-a11y-checks'],
    },
    options: {
      rules: {
        'aria-valid-attr-value': { enabled: false },
        'duplicate-id': { enabled: false },
        'duplicate-id-active': { enabled: false },
      },
    },
  },
};

type TabsScrollAreaExampleProps = {
  title: string;
  description?: string;
  maxWidth: number | string;
  tabs: TabValue<string>[];
  OverflowIndicatorComponent?: FC<TabsScrollAreaOverflowIndicatorProps>;
};

const TabsScrollAreaExample = ({
  title,
  description = 'Narrow the Storybook viewport or use the constrained width below so the tab row overflows and the side paddles appear.',
  maxWidth,
  tabs,
  OverflowIndicatorComponent,
}: TabsScrollAreaExampleProps) => {
  const [activeTab, setActiveTab] = useState<TabValue<string> | null>(tabs[0]);
  const handleChange = useCallback((next: TabValue<string> | null) => setActiveTab(next), []);

  return (
    <VStack background="bg" gap={2} padding={2}>
      <Text as="h2" display="block" font="title4">
        {title}
      </Text>
      <Text as="p" color="fgMuted" display="block" font="body">
        {description}
      </Text>
      <TabsScrollArea
        OverflowIndicatorComponent={OverflowIndicatorComponent}
        maxWidth={maxWidth}
        testID="tabs-scroll-area-story"
        width="100%"
      >
        {({ onActiveTabElementChange: onActiveTab }) => (
          <Tabs
            TabComponent={DefaultTab}
            TabsActiveIndicatorComponent={DefaultTabsActiveIndicator}
            accessibilityLabel="Scrollable tabs"
            activeBackground="bgPrimary"
            activeTab={activeTab}
            background="bg"
            gap={4}
            onActiveTabElementChange={onActiveTab}
            onChange={handleChange}
            tabs={tabs}
            zIndex={zIndex.navigation}
          />
        )}
      </TabsScrollArea>
    </VStack>
  );
};

export const Default = () => (
  <TabsScrollAreaExample
    maxWidth={320}
    tabs={longTabs}
    title="Overflow with paddles (narrow width)"
  />
);

export const ManyTabs = () => (
  <TabsScrollAreaExample maxWidth="min(100%, 360px)" tabs={sampleTabs} title="All sample tabs" />
);

export const FitsWithoutOverflow = () => (
  <TabsScrollAreaExample
    description="Wide container: tabs fit on one row, so paddles stay hidden until the viewport is smaller than the tab row."
    maxWidth={900}
    tabs={basicTabs}
    title="Short tab list (may not show paddles)"
  />
);

export const LightAndDark = () => (
  <VStack gap={4}>
    <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
      <TabsScrollAreaExample maxWidth={300} tabs={longTabs} title="Light" />
    </ThemeProvider>
    <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
      <TabsScrollAreaExample maxWidth={300} tabs={longTabs} title="Dark" />
    </ThemeProvider>
  </VStack>
);

export const CustomOverflowIndicator = () => (
  <TabsScrollAreaExample
    OverflowIndicatorComponent={StoryCustomOverflowIndicator}
    description="Uses a custom `OverflowIndicatorComponent` (primary IconButtons) instead of the default `Paddle`. Narrow the viewport to see them."
    maxWidth={320}
    tabs={longTabs}
    title="Custom overflow indicator"
  />
);

Default.parameters = tabsTabListOnlyA11y;
ManyTabs.parameters = tabsTabListOnlyA11y;
FitsWithoutOverflow.parameters = tabsTabListOnlyA11y;
LightAndDark.parameters = tabsTabListOnlyA11y;
CustomOverflowIndicator.parameters = tabsTabListOnlyA11y;
