import React, { memo, useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { gutter } from '@coinbase/cds-common/tokens/sizing';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { LinearGradient } from '../../gradients/LinearGradient';
import { useTheme } from '../../hooks/useTheme';
import { type BoxProps, VStack } from '../../layout';
import { pinStyles } from '../../styles/pinStyles';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { DefaultTab } from '../DefaultTab';
import { DefaultTabsActiveIndicator } from '../DefaultTabsActiveIndicator';
import { Tabs } from '../Tabs';
import { TabsScrollArea } from '../TabsScrollArea';
import type { TabsScrollAreaOverflowIndicatorProps } from '../TabsScrollAreaOverflowIndicator';

const basicTabs: (TabValue<string> & { testID?: string })[] = [
  { id: 'buy', label: 'Buy', testID: 'buy-tab' },
  { id: 'sell', label: 'Sell', testID: 'sell-tab' },
  { id: 'convert', label: 'Convert', testID: 'convert-tab' },
];

const longTabs = sampleTabs.slice(0, 9);

const storyShadowGradientDirections = {
  right: {
    start: { x: 1, y: 0 },
    end: { x: 0, y: 0 },
  },
  left: {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
} as const;

const StoryCustomOverflowIndicator = memo(function StoryCustomOverflowIndicator({
  direction = 'left',
  show,
  style,
  testID,
}: TabsScrollAreaOverflowIndicatorProps) {
  const theme = useTheme();
  const shadowGradientColors = useMemo(
    () => ['rgba(0, 0, 0, 0.22)', 'rgba(0, 0, 0, 0.06)', theme.color.transparent],
    [theme.color.transparent],
  );

  if (!show) {
    return null;
  }

  return (
    <LinearGradient
      colors={shadowGradientColors}
      end={storyShadowGradientDirections[direction].end}
      pointerEvents="none"
      start={storyShadowGradientDirections[direction].start}
      stops={[0, 0.4, 1]}
      style={[styles.gradientShadow, pinStyles[direction], style]}
      testID={testID}
    />
  );
});

const styles = StyleSheet.create({
  gradientShadow: {
    width: 44,
  },
});

StoryCustomOverflowIndicator.displayName = 'StoryCustomOverflowIndicator';

type TabsScrollAreaExampleProps = {
  title: string;
  description?: string;
  width?: BoxProps['width'];
  maxWidth?: BoxProps['maxWidth'];
  tabs: TabValue<string>[];
  OverflowIndicatorComponent?: React.FC<TabsScrollAreaOverflowIndicatorProps>;
};

const TabsScrollAreaExample = ({
  title,
  description = 'Use a narrow width so the tab row overflows and edge gradients appear. Scroll horizontally to move the row.',
  width,
  maxWidth,
  tabs,
  OverflowIndicatorComponent,
}: TabsScrollAreaExampleProps) => {
  const [activeTab, setActiveTab] = useState<TabValue<string> | null>(tabs[0]);
  const handleChange = useCallback((next: TabValue<string> | null) => setActiveTab(next), []);

  return (
    <Example overflow="visible" padding={gutter} title={title}>
      <VStack gap={2}>
        <Text color="fgMuted" font="body">
          {description}
        </Text>
        <TabsScrollArea
          OverflowIndicatorComponent={OverflowIndicatorComponent}
          accessibilityLabel="Scrollable tabs row"
          maxWidth={maxWidth}
          testID="tabs-scroll-area-story"
          width={width ?? '100%'}
        >
          {({ onActiveTabElementChange }) => (
            <Tabs
              TabComponent={DefaultTab}
              TabsActiveIndicatorComponent={DefaultTabsActiveIndicator}
              accessibilityLabel="Tabs"
              activeBackground="bgPrimary"
              activeTab={activeTab}
              background="bg"
              gap={4}
              onActiveTabElementChange={onActiveTabElementChange}
              onChange={handleChange}
              tabs={tabs}
              zIndex={zIndex.navigation}
            />
          )}
        </TabsScrollArea>
      </VStack>
    </Example>
  );
};

const TabsScrollAreaStoriesScreen = () => (
  <ExampleScreen>
    <TabsScrollAreaExample
      maxWidth={320}
      tabs={longTabs}
      title="Overflow with gradients (narrow width)"
    />
    <TabsScrollAreaExample maxWidth={360} tabs={sampleTabs} title="Many tabs (sample data)" />
    <TabsScrollAreaExample
      description="Wide container: tabs may fit on one row, so edge gradients stay hidden until the row overflows."
      maxWidth={900}
      tabs={basicTabs}
      title="Short tab list (often no overflow)"
    />
    <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
      <TabsScrollAreaExample maxWidth={300} tabs={longTabs} title="Dark theme" />
    </ThemeProvider>
    <TabsScrollAreaExample
      OverflowIndicatorComponent={StoryCustomOverflowIndicator}
      description="Custom OverflowIndicatorComponent (shadow-style gradient vignette, visual-only). Narrow width to see it; scroll the tab row with a horizontal pan."
      maxWidth={320}
      tabs={longTabs}
      title="Custom overflow indicator"
    />
  </ExampleScreen>
);

export default TabsScrollAreaStoriesScreen;
