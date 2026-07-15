import React, { useState } from 'react';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import { VStack } from '../../../layout';
import { Text } from '../../../typography';
import { type TabbedChipProps, TabbedChips, type TabbedChipsProps } from '../TabbedChips';

export default {
  title: 'Components/alpha/TabbedChipsSize',
  component: TabbedChips,
};

const defaultTabs: TabbedChipProps[] = sampleTabs.slice(0, 5);

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

const LabeledExample = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <VStack gap={1}>
    <Text as="p" color="fgMuted" font="label2">
      {title}
    </Text>
    {children}
  </VStack>
);

/**
 * One-off size density story for the Alpha TabbedChips (xs/s).
 * Do not fold this into TabbedChips.stories.tsx — keeps visual review of density isolated.
 */
export const Size = () => (
  <VStack gap={3}>
    <LabeledExample title="Default (resolves to size s)">
      <SizeDemo />
    </LabeledExample>
    <LabeledExample title="Deprecated compact (legacy behavior, renders xs)">
      <SizeDemo compact />
    </LabeledExample>
    <LabeledExample title='size="s"'>
      <SizeDemo size="s" />
    </LabeledExample>
    <LabeledExample title='size="xs"'>
      <SizeDemo size="xs" />
    </LabeledExample>
    <LabeledExample title='compact + size="s" (size wins)'>
      <SizeDemo compact size="s" />
    </LabeledExample>
  </VStack>
);
