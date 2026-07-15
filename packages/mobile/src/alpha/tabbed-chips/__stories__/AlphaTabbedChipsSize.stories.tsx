import { useState } from 'react';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { TabbedChips, type TabbedChipsProps } from '../TabbedChips';

const defaultTabs: TabValue[] = sampleTabs.slice(0, 5);

const SizeDemo = ({ compact, size }: { compact?: boolean; size?: TabbedChipsProps['size'] }) => {
  const [activeTab, setActiveTab] = useState<TabValue | null>(defaultTabs[0]);

  return (
    <TabbedChips
      activeTab={activeTab}
      compact={compact}
      onChange={setActiveTab}
      size={size}
      tabs={defaultTabs}
    />
  );
};

/**
 * One-off t-shirt size stories for the alpha TabbedChips (xs/s).
 * Do not fold these into TabbedChips.stories.tsx — keeps visual review of sizing isolated.
 */
const TabbedChipsSizeScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default (resolves to size s)">
        <SizeDemo />
      </Example>
      <Example title="Deprecated compact (renders as size xs)">
        <SizeDemo compact />
      </Example>
      <Example title='size="xs"'>
        <SizeDemo size="xs" />
      </Example>
      <Example title='size="s"'>
        <SizeDemo size="s" />
      </Example>
      <Example title='compact + size="s" (size wins)'>
        <SizeDemo compact size="s" />
      </Example>
    </ExampleScreen>
  );
};

export default TabbedChipsSizeScreen;
