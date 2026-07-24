import { useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { longTextTabs, sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import type { BoxProps } from '../../../layout';
import { RemoteImage, type RemoteImageProps } from '../../../media/RemoteImage';
import { type TabbedChipProps, TabbedChips, type TabbedChipsProps } from '../TabbedChips';

const defaultTabs: TabValue[] = sampleTabs.slice(0, 5);

type TabId = 'one' | 'two' | 'three';

const enumTabs: TabValue<TabId>[] = [
  { id: 'one', label: 'One' },
  { id: 'two', label: 'Two' },
  { id: 'three', label: 'Three' },
];

const Demo = ({
  tabs = defaultTabs,
  compact,
  size,
  width,
  autoScrollOffset,
}: {
  tabs?: TabValue[];
  compact?: boolean;
  size?: TabbedChipsProps['size'];
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
      size={size}
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

const smallAssetIconProps: RemoteImageProps = {
  height: 16,
  shape: 'circle',
  source: assets.eth.imageUrl,
  width: 16,
};

const tabsWithStart: TabbedChipProps[] = defaultTabs.map((tab) => ({
  ...tab,
  start: <RemoteImage {...assetIconProps} />,
}));

const smallTabsWithStart: TabbedChipProps[] = defaultTabs.map((tab) => ({
  ...tab,
  start: <RemoteImage {...smallAssetIconProps} />,
}));

const activeBackgroundTabs: TabbedChipProps[] = defaultTabs.map((tab) => ({
  ...tab,
  activeBackground: 'bgPositive' as TabbedChipProps['activeBackground'],
}));

const activeColorTabs: TabbedChipProps[] = defaultTabs.map((tab) => ({
  ...tab,
  activeColor: 'fgPositive' as TabbedChipProps['activeColor'],
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
      <Example title="Sizes">
        <Demo size="s" />
        <Demo size="xs" />
      </Example>
      <Example title="Deprecated compact (renders as size xs)">
        <Demo compact />
      </Example>
      <Example title="Sizes with start">
        <Demo tabs={tabsWithStart} />
        <Demo size="xs" tabs={smallTabsWithStart} />
      </Example>
      <Example title="With auto scroll offset">
        <Demo autoScrollOffset={100} tabs={sampleTabs} />
      </Example>
      <Example title="With activeBackground">
        <Demo tabs={activeBackgroundTabs} />
      </Example>
      <Example title="With activeColor">
        <Demo tabs={activeColorTabs} />
      </Example>
    </ExampleScreen>
  );
};

export default TabbedChipsScreen;
