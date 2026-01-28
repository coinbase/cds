import { useCallback, useMemo, useState } from 'react';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { Meta, Story } from '@storybook/react';
import sample from 'lodash/sample';

import { Button } from '../../buttons/Button';
import { Chip } from '../../chips/Chip';
import { Select } from '../../controls/Select';
import { SelectOption } from '../../controls/SelectOption';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Link } from '../../typography/Link';
import { Text } from '../../typography/Text';
import { type CustomTabProps, TabNavigation, type TabProps } from '../TabNavigation';

import { MockTabPanel } from './MockTabPanel';

const a11ySkipConfig = {
  config: {
    /**
     * The TabNavigation docs explain the proper way to setup the tabpanel.
     * Disabled because CDS TabNavigation doesn't have associated panels.
     * @link https://cds.coinbase.com/components/tab-navigation#accessibility
     * */
    rules: [
      { id: 'aria-valid-attr-value', enabled: false },
      { id: 'duplicate-id-active', enabled: false },
      { id: 'duplicate-id', enabled: false },
    ],
  },
};

const tabs = sampleTabs.slice(0, 5);

export default {
  title: 'Components/Tabs/TabNavigation',
  component: TabNavigation,
} as Meta;

export const Default: Story = () => {
  const [value, setValue] = useState<TabProps['id']>(tabs[0].id);

  return (
    <>
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <VStack background="bg" gap={2} padding={2}>
          <Text as="p" display="block" font="headline">
            Default (Normal)
          </Text>
          <TabNavigation onChange={setValue} tabs={tabs} value={value} />
        </VStack>
        <VStack background="bgAlternate" gap={2} padding={2}>
          <Text as="p" display="block" font="headline">
            Custom background
          </Text>
          <TabNavigation background="bgAlternate" onChange={setValue} tabs={tabs} value={value} />
        </VStack>
      </ThemeProvider>
      <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <VStack background="bg" gap={2} padding={2}>
          <Text as="p" display="block" font="headline">
            Dark
          </Text>
          <TabNavigation onChange={setValue} tabs={tabs} value={value} />
        </VStack>
      </ThemeProvider>
    </>
  );
};
Default.parameters = {
  percy: { enableJavaScript: true },
  a11y: a11ySkipConfig,
};

const renderCustomTab = ({ label, ...props }: CustomTabProps) => (
  <HStack bordered background="bg" borderRadius={100} paddingX={2} paddingY={1} {...props}>
    <Text as="p" display="block" font="headline">
      {label}
    </Text>
  </HStack>
);

const renderAnotherCustomTab = ({ label, ...props }: CustomTabProps) => (
  <Chip {...props}>{label}</Chip>
);

const someCustomTabs = [
  ...tabs.slice(0, 3),
  {
    id: 'custom_tab',
    label: 'Custom',
    testID: 'custom_tab',
    Component: renderCustomTab,
  },
];

export const CustomTab: Story = () => {
  const [value, setValue] = useState<TabProps['id']>(tabs[0].id);

  return (
    <VStack gap={2}>
      <Text as="p" display="block" font="headline">
        Custom tab
      </Text>
      <TabNavigation
        Component={renderCustomTab}
        gap={1}
        onChange={setValue}
        tabs={tabs}
        value={value}
      />
      <Text as="p" display="block" font="headline">
        Custom tab with paddles
      </Text>
      <TabNavigation
        Component={renderCustomTab}
        gap={1}
        onChange={setValue}
        tabs={sampleTabs}
        value={value}
      />
      <Text as="p" display="block" font="headline">
        Only one custom tab
      </Text>
      <TabNavigation gap={1} onChange={setValue} tabs={someCustomTabs} value={value} />
      <Text as="p" display="block" font="headline">
        All the custom things
      </Text>
      <TabNavigation
        Component={renderAnotherCustomTab}
        gap={1}
        onChange={setValue}
        tabs={someCustomTabs}
        value={value}
      />
    </VStack>
  );
};

CustomTab.parameters = { percy: { enableJavaScript: true }, a11y: a11ySkipConfig };

export const WithPaddles: Story = () => {
  const [value, setValue] = useState<TabProps['id']>(tabs[0].id);

  return <TabNavigation onChange={setValue} tabs={sampleTabs} value={value} />;
};
WithPaddles.parameters = { percy: { enableJavaScript: true }, a11y: a11ySkipConfig };

export const WithCustomPaddles: Story = () => {
  const [value, setValue] = useState<TabProps['id']>(tabs[0].id);

  return (
    <TabNavigation
      onChange={setValue}
      paddleStyle={{ transform: 'scale(0.5)' }}
      tabs={sampleTabs}
      value={value}
    />
  );
};
WithCustomPaddles.parameters = { percy: { enableJavaScript: true }, a11y: a11ySkipConfig };

type TradingActivity = 'buy' | 'sell' | 'convert' | 'send' | 'receive';

const enumTabs: TabProps<TradingActivity>[] = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
  { id: 'send', label: 'Send' },
  { id: 'receive', label: 'Receive' },
];

export const WithEnum: Story = () => {
  const [value, setValue] = useState<TradingActivity>('buy');

  return (
    <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
      <VStack background="bg" gap={2} padding={2}>
        <Text as="p" display="block" font="headline">
          With Enum
        </Text>
        <TabNavigation onChange={setValue} tabs={enumTabs} value={value} />
      </VStack>
    </ThemeProvider>
  );
};
WithEnum.parameters = { percy: { enableJavaScript: true }, a11y: a11ySkipConfig };

export const WithDotCountChange: Story = () => {
  const [value, setValue] = useState<TabProps['id']>(tabs[0].id);
  const [count, setCount] = useState(0);
  // This is just a helper to make a random tab show a count
  const tabsWithDot = useMemo(() => tabs.map((tab) => ({ ...tab, count })), [count]);

  const updateCount = useCallback(() => {
    setCount(Number(count ? 0 : sample([2, 14, 100])));
  }, [count]);

  return (
    <>
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <VStack background="bg" gap={2} padding={2}>
          <Select label="Select a tab" onChange={setValue} value={value}>
            {tabsWithDot.map((option) => (
              <SelectOption key={option.id} title={option.label} value={option.id} />
            ))}
          </Select>
          <Button onClick={updateCount}>Randomize dot count</Button>
          <Text as="p" display="block" font="headline">
            Default (Normal)
          </Text>
          <TabNavigation onChange={setValue} tabs={tabsWithDot} value={value} />
        </VStack>
      </ThemeProvider>
      <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <VStack background="bg" gap={2} padding={2}>
          <Text as="p" display="block" font="headline">
            Dark
          </Text>
          <TabNavigation onChange={setValue} tabs={tabsWithDot} value={value} />
        </VStack>
      </ThemeProvider>
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <VStack background="bgAlternate" gap={2} padding={2}>
          <Text as="p" display="block" font="headline">
            Custom background
          </Text>
          <TabNavigation
            background="bgAlternate"
            onChange={setValue}
            tabs={tabsWithDot}
            value={value}
          />
        </VStack>
      </ThemeProvider>
    </>
  );
};
WithDotCountChange.parameters = { percy: { enableJavaScript: true }, a11y: a11ySkipConfig };

export const Secondary: Story = () => {
  const [currentTab, setCurrentTab] = useState<TabProps['id']>();

  return (
    <>
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <VStack background="bg" gap={2} padding={2}>
          <TabNavigation
            onChange={setCurrentTab}
            tabs={tabs}
            value={currentTab}
            variant="secondary"
          />
        </VStack>
      </ThemeProvider>
      <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <VStack background="bg" gap={2} padding={2}>
          <TabNavigation
            onChange={setCurrentTab}
            tabs={tabs}
            value={currentTab}
            variant="secondary"
          />
        </VStack>
      </ThemeProvider>
    </>
  );
};
Secondary.parameters = { percy: { enableJavaScript: true }, a11y: a11ySkipConfig };

export const AccessibilityTest: Story = () => {
  const [currentTab, setCurrentTab] = useState<TabProps['id']>(tabs[0].id);

  return (
    <VStack gap={2}>
      <TabNavigation
        accessibilityLabel="Really nice tab navigation"
        onChange={setCurrentTab}
        tabs={tabs.slice(0, 3)}
        value={currentTab}
      />
      <MockTabPanel id={tabs[0].id} isActive={currentTab === tabs[0].id}>
        <Text as="h2" display="block" font="title1" paddingBottom={2}>
          This is tab one
        </Text>
        <Text as="p" display="block" font="body">
          <Link href="/">This is the body</Link> of tab one. You are going to love it
        </Text>
        <Text as="p" display="block" font="body">
          {loremIpsum}
        </Text>
      </MockTabPanel>
      <MockTabPanel id={tabs[1].id} isActive={currentTab === tabs[1].id}>
        <Text as="h2" display="block" font="title1" paddingBottom={2}>
          Here we have tab two
        </Text>
        <Text as="p" display="block" font="body">
          And look, <Link href="/">this another link</Link> in the body of tab one. You are going to
          love it
        </Text>
        <Text as="p" display="block" font="body">
          {loremIpsum} {loremIpsum}
        </Text>
      </MockTabPanel>
      <MockTabPanel id={tabs[2].id} isActive={currentTab === tabs[2].id}>
        <Text as="h2" display="block" font="title1" paddingBottom={2}>
          Heyooo, tab three!
        </Text>
        <Text as="p" display="block" font="body">
          Again, we can put a link like <Link href="/">this another link</Link> in the body of tab
          one. You are going to love it
        </Text>
        <Text as="p" display="block" font="body">
          {loremIpsum} {loremIpsum}
        </Text>
      </MockTabPanel>
    </VStack>
  );
};

export const Disabled: Story = () => {
  const [currentTab, setCurrentTab] = useState<TabProps['id']>();

  return (
    <VStack background="bg" gap={2} padding={2}>
      <TabNavigation
        onChange={setCurrentTab}
        tabs={tabs.map((tab, index) => ({ ...tab, disabled: index === 1 }))}
        value={currentTab}
        variant="secondary"
      />
    </VStack>
  );
};
Disabled.parameters = { percy: { enableJavaScript: true }, a11y: a11ySkipConfig };

export const WithPadding: Story = () => {
  const [currentTab, setCurrentTab] = useState<TabProps['id']>(tabs[0].id);

  return (
    <TabNavigation
      onChange={setCurrentTab}
      paddingX={3}
      paddingY={1}
      tabs={tabs.slice(0, 3)}
      value={currentTab}
    />
  );
};
WithPadding.parameters = { percy: { enableJavaScript: true }, a11y: a11ySkipConfig };
