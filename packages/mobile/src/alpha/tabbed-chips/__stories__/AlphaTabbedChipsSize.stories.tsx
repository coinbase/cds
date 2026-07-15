import { useState } from 'react';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { TabbedChips, type TabbedChipsProps } from '../TabbedChips';

const defaultTabs: TabValue[] = sampleTabs.slice(0, 5);

const SizeDemo = ({ compact, size }: { compact?: boolean; size?: TabbedChipsProps['size'] }) => {
  const [value, setValue] = useState<TabValue | null>(defaultTabs[0]);
  return (
    <TabbedChips
      activeTab={value}
      compact={compact}
      onChange={setValue}
      size={size}
      tabs={defaultTabs}
    />
  );
};

/**
 * One-off size density screen for the Alpha TabbedChips (xs/s).
 * Do not fold this into AlphaTabbedChips.stories.tsx — keeps visual review of density isolated.
 */
const TabbedChipsSizeScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default (resolves to size s)">
        <SizeDemo />
      </Example>
      <Example title="Deprecated compact (legacy behavior, renders xs)">
        <SizeDemo compact />
      </Example>
      <Example title='size="s"'>
        <SizeDemo size="s" />
      </Example>
      <Example title='size="xs"'>
        <SizeDemo size="xs" />
      </Example>
      <Example title='compact + size="s" (size wins)'>
        <SizeDemo compact size="s" />
      </Example>
    </ExampleScreen>
  );
};

export default TabbedChipsSizeScreen;
