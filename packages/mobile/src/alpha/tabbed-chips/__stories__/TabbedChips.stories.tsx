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
}: {
  tabs?: TabValue[];
  compact?: boolean;
  width?: BoxProps['width'];
}) => {
  const [value, setValue] = useState<TabValue | null>(tabs[0]);
  return (
    <TabbedChips
      activeTab={value}
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

const TabbedChipsScreen = () => {
  return (
    <ExampleScreen>
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
    </ExampleScreen>
  );
};

export default TabbedChipsScreen;
