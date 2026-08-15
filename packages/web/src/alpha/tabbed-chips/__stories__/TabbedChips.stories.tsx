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
  size,
  styles,
  autoScrollOffset,
}: {
  tabs?: TabbedChipProps[];
  styles?: TabbedChipsProps['styles'];
  compact?: boolean;
  size?: TabbedChipsProps['size'];
  autoScrollOffset?: number;
}) => {
  const [activeTab, setActiveTab] = useState<TabValue | null>(tabs[0]);
  return (
    <TabbedChips
      activeTab={activeTab}
      autoScrollOffset={autoScrollOffset}
      compact={compact}
      onChange={setActiveTab}
      size={size}
      styles={styles}
      tabs={tabs}
    />
  );
};

const EnumDemo = () => {
  const [activeTab, setActiveTab] = useState<TabValue<TabId> | null>(enumTabs[0]);
  return <TabbedChips activeTab={activeTab} onChange={setActiveTab} tabs={enumTabs} />;
};

const activeBackgroundTabs: TabbedChipProps[] = defaultTabs.map((tab) => ({
  ...tab,
  activeBackground: 'bgPositive' as TabbedChipProps['activeBackground'],
}));

const activeColorTabs: TabbedChipProps[] = defaultTabs.map((tab) => ({
  ...tab,
  activeColor: 'fgPositive' as TabbedChipProps['activeColor'],
}));

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
        Sizes
      </Text>
      <Text as="p" color="fgMuted" display="block" font="label1">
        {'size="s" (default)'}
      </Text>
      <Demo size="s" />
      <Text as="p" color="fgMuted" display="block" font="label1">
        {'size="xs"'}
      </Text>
      <Demo size="xs" />
      <Text as="p" color="fgMuted" display="block" font="label1">
        {'compact (deprecated, renders as size="xs")'}
      </Text>
      <Demo compact />
      <Text as="p" display="block" font="headline">
        With auto scroll offset
      </Text>
      <Demo autoScrollOffset={100} tabs={sampleTabs} />
      <Text as="p" display="block" font="headline">
        With activeBackground
      </Text>
      <Demo tabs={activeBackgroundTabs} />
      <Text as="p" display="block" font="headline">
        With activeColor
      </Text>
      <Demo tabs={activeColorTabs} />
    </VStack>
  );
};

Default.parameters = {
  percy: { enableJavaScript: true },
};
