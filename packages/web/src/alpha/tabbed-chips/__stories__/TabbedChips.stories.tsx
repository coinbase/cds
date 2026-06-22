import React, { useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { longTextTabs, sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import { VStack } from '../../../layout';
import { RemoteImage, type RemoteImageProps } from '../../../media';
import { Text } from '../../../typography';
import { type TabbedChipProps, TabbedChips, type TabbedChipsProps } from '../TabbedChips';

export default {
  title: 'Components/alpha/TabbedChips',
  component: TabbedChips,
};

const defaultTabs: TabbedChipProps[] = sampleTabs.slice(0, 5);

type TabId = 'one' | 'two' | 'three';

const enumTabs: TabbedChipProps<TabId>[] = [
  { id: 'one', label: 'One' },
  { id: 'two', label: 'Two' },
  { id: 'three', label: 'Three' },
];

const assetIconProps: RemoteImageProps = {
  height: 24,
  shape: 'circle',
  source: assets.eth.imageUrl,
  width: 24,
};

const compactAssetIconProps: RemoteImageProps = {
  height: 16,
  shape: 'circle',
  source: assets.eth.imageUrl,
  width: 16,
};

const tabsWithStart: TabbedChipProps[] = defaultTabs.map((tab) => ({
  ...tab,
  start: <RemoteImage {...assetIconProps} />,
}));

const compactTabsWithStart: TabbedChipProps[] = defaultTabs.map((tab) => ({
  ...tab,
  start: <RemoteImage {...compactAssetIconProps} />,
}));

const Demo = ({
  tabs = defaultTabs,
  compact = false,
  styles,
  autoScrollOffset,
}: {
  tabs?: TabbedChipProps[];
  styles?: TabbedChipsProps['styles'];
  compact?: boolean;
  autoScrollOffset?: number;
}) => {
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);
  return (
    <TabbedChips
      activeTab={activeTab}
      autoScrollOffset={autoScrollOffset}
      compact={compact}
      onChange={setActiveTab}
      styles={styles}
      tabs={tabs}
    />
  );
};

const EnumDemo = () => {
  const [activeTab, setActiveTab] = useState<TabValue<TabId> | null>(enumTabs[0]);
  return <TabbedChips activeTab={activeTab} onChange={setActiveTab} tabs={enumTabs} />;
};

// BUG REPRO: activeColor prop does not exist on web TabbedChipProps at all — the feature
// is entirely absent. On web, DefaultTabComponent always applies invertColorScheme={isActive}
// unconditionally with no way to customize the active chip background color.
// This story documents the missing feature for parity with mobile intent.
export const BugRepro = () => {
  return (
    <VStack gap={2}>
      <Text as="p" display="block" font="headline">
        Bug repro - activeColor missing on web (active chip should show custom background)
      </Text>
      {/* activeColor prop is absent from TabbedChipProps on web — this is the bug */}
      <Demo tabs={defaultTabs} />
    </VStack>
  );
};

BugRepro.parameters = {
  percy: { enableJavaScript: true },
};

export const Default = () => {
  return (
    <VStack gap={2}>
      <Text as="p" display="block" font="headline">
        Default
      </Text>
      <Demo />
      <Text as="p" display="block" font="headline">
        With paddles
      </Text>
      <Demo tabs={sampleTabs} />
      <Text as="p" display="block" font="headline">
        With custom sized paddles
      </Text>
      <Demo styles={{ paddle: { transform: 'scale(0.5)' } }} tabs={sampleTabs} />
      <Text as="p" display="block" font="headline">
        With long text
      </Text>
      <Demo tabs={longTextTabs} />
      <Demo tabs={sampleTabs.map((tab, index) => ({ ...tab, disabled: index === 1 }))} />
      <Text as="p" display="block" font="headline">
        With enum values
      </Text>
      <EnumDemo />
      <Text as="p" display="block" font="headline">
        With start
      </Text>
      <Demo tabs={tabsWithStart} />
      <Text as="p" display="block" font="headline">
        Compact with start
      </Text>
      <Demo compact tabs={compactTabsWithStart} />
      <Text as="p" display="block" font="headline">
        With auto scroll offset
      </Text>
      <Demo autoScrollOffset={100} tabs={sampleTabs} />
    </VStack>
  );
};

const a11ySkipConfig = {
  config: {
    rules: [
      { id: 'aria-valid-attr-value', enabled: false },
      { id: 'duplicate-id-active', enabled: false },
      { id: 'duplicate-id', enabled: false },
      { id: 'duplicate-id-aria', enabled: false },
    ],
  },
};

Default.parameters = {
  percy: { enableJavaScript: true },
  a11y: a11ySkipConfig,
};
