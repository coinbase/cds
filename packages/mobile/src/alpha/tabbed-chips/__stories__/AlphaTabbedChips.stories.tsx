import { useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { longTextTabs, sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import type { BoxProps } from '../../../layout';
import { RemoteImage, type RemoteImageProps } from '../../../media/RemoteImage';
import { type TabbedChipProps, TabbedChips } from '../TabbedChips';

const defaultTabs: TabValue[] = sampleTabs.slice(0, 5);

type TabId = 'one' | 'two' | 'three';

const enumTabs: TabValue<TabId>[] = [
  { id: 'one', label: 'One' },
  { id: 'two', label: 'Two' },
  { id: 'three', label: 'Three' },
];

const Demo = ({
  tabs = defaultTabs,
  compact = false,
  width,
  autoScrollOffset,
}: {
  tabs?: TabValue[];
  compact?: boolean;
  width?: BoxProps['width'];
  autoScrollOffset?: number;
}) => {
  const [value, setValue] = useState<TabValue | null>(tabs[0]);
  return (
    <TabbedChips
      activeTab={value}
      autoScrollOffset={autoScrollOffset}
      compact={compact}
      onChange={setValue}
      tabs={tabs}
      width={width}
    />
  );
};

const EnumDemo = () => {
  const [value, setValue] = useState<TabValue<TabId> | null>(enumTabs[0]);
  return <TabbedChips activeTab={value} onChange={setValue} tabs={enumTabs} />;
};

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

// BUG REPRO: activeColor should set a custom background when a tab is active.
// Currently, activeColor is not destructured in DefaultTabComponent so it falls
// into ...tabProps and leaks onto MediaChip as an unknown prop. Additionally,
// invertColorScheme={isActive} is applied unconditionally, so the active chip
// inverts its color scheme instead of using the custom activeColor background.
const bugReproTabs: TabbedChipProps[] = defaultTabs.map((tab) => ({
  ...tab,
  activeColor: 'positive' as BoxProps['background'],
}));

const TabbedChipsScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Bug repro - activeColor (active chip should show 'positive' background, not inverted scheme)">
        <Demo tabs={bugReproTabs} />
      </Example>
      <Example title="Default">
        <Demo />
      </Example>
      <Example title="Lots of tabs">
        <Demo tabs={sampleTabs} />
      </Example>
      <Example title="Long text tabs">
        <Demo tabs={longTextTabs} />
      </Example>
      <Example title="Disabled tab">
        <Demo tabs={sampleTabs.map((tab, index) => ({ ...tab, disabled: index === 1 }))} />
      </Example>
      <Example title="With enum values">
        <EnumDemo />
      </Example>
      <Example title="With start">
        <Demo tabs={tabsWithStart} />
      </Example>
      <Example title="Compact with start">
        <Demo compact tabs={compactTabsWithStart} />
      </Example>
      <Example title="With auto scroll offset">
        <Demo autoScrollOffset={100} tabs={sampleTabs} />
      </Example>
    </ExampleScreen>
  );
};

export default TabbedChipsScreen;
