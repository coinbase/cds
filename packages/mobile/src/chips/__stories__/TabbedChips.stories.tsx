import React, { useState } from 'react';
import { longTextTabs, sampleTabs } from '@coinbase/cds-common/internal/data/tabs';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import type { TabProps } from '../../tabs/TabNavigation';
import { TabbedChips, type TabbedChipsBaseProps } from '../TabbedChips';

const defaultTabs = sampleTabs.slice(0, 5);

type TabId = 'one' | 'two' | 'three';

const enumTabs: TabProps<TabId>[] = [
  { id: 'one', label: 'One' },
  { id: 'two', label: 'Two' },
  { id: 'three', label: 'Three' },
];

const Demo = ({ tabs = defaultTabs }: { tabs?: TabProps[] }) => {
  const [value, setValue] = useState<TabbedChipsBaseProps['value']>(tabs[0].id);
  return <TabbedChips onChange={setValue} tabs={tabs} value={value} />;
};

const EnumDemo = () => {
  const [value, setValue] = useState<TabId>(enumTabs[0].id);
  return <TabbedChips onChange={setValue} tabs={enumTabs} value={value} />;
};

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
    </ExampleScreen>
  );
};

export default TabbedChipsScreen;
