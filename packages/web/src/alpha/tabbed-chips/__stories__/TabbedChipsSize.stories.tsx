import React, { useState } from 'react';
import { sampleTabs } from '@coinbase/cds-common/internal/data/tabs';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import type { Meta, StoryObj } from '@storybook/react';

import { VStack } from '../../../layout/VStack';
import { Text } from '../../../typography/Text';
import { type TabbedChipProps, TabbedChips, type TabbedChipsProps } from '../TabbedChips';

const meta: Meta = {
  title: 'Components/Alpha/TabbedChipsSize',
  component: TabbedChips,
};

export default meta;
type Story = StoryObj;

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
  <VStack alignItems="flex-start" gap={1}>
    <Text as="p" color="fgMuted" font="label2">
      {title}
    </Text>
    {children}
  </VStack>
);

/**
 * One-off t-shirt size stories for the alpha TabbedChips (xs/s).
 * Do not fold these into TabbedChips.stories.tsx — keeps visual review of sizing isolated.
 */
export const Size: Story = {
  render: () => (
    <VStack gap={3}>
      <LabeledExample title="Default (resolves to size s)">
        <SizeDemo />
      </LabeledExample>
      <LabeledExample title="Deprecated compact (renders as size xs)">
        <SizeDemo compact />
      </LabeledExample>
      <LabeledExample title='size="xs"'>
        <SizeDemo size="xs" />
      </LabeledExample>
      <LabeledExample title='size="s"'>
        <SizeDemo size="s" />
      </LabeledExample>
      <LabeledExample title='compact + size="s" (size wins)'>
        <SizeDemo compact size="s" />
      </LabeledExample>
    </VStack>
  ),
};
