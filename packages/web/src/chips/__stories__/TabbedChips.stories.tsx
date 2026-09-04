import React, { useState } from 'react';
import { longTextTabs, sampleTabs } from '@coinbase/cds-common/internal/data/tabs';

import { VStack } from '../../layout';
import type { TabProps } from '../../tabs/TabNavigation';
import { Text } from '../../typography/Text';
import { TabbedChips, type TabbedChipsBaseProps } from '../TabbedChips';

export default {
  title: 'Components/Chips/TabbedChips',
  component: TabbedChips,
};

const defaultTabs = sampleTabs.slice(0, 5);

type TabId = 'one' | 'two' | 'three';

const enumTabs: TabProps<TabId>[] = [
  { id: 'one', label: 'One' },
  { id: 'two', label: 'Two' },
  { id: 'three', label: 'Three' },
];

const Demo = ({
  tabs = defaultTabs,
  style,
}: {
  tabs?: TabProps[];
  style?: React.CSSProperties;
}) => {
  const [value, setValue] = useState<TabbedChipsBaseProps['value']>(tabs[0].id);
  return <TabbedChips onChange={setValue} paddleStyle={style} tabs={tabs} value={value} />;
};

const EnumDemo = () => {
  const [value, setValue] = useState<TabId>(enumTabs[0].id);
  return <TabbedChips onChange={setValue} tabs={enumTabs} value={value} />;
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
      <Demo style={{ transform: 'scale(0.5)' }} tabs={sampleTabs} />
      <Text as="p" display="block" font="headline">
        With long text
      </Text>
      <Demo tabs={longTextTabs} />
      <Demo tabs={sampleTabs.map((tab, index) => ({ ...tab, disabled: index === 1 }))} />
      <Text as="p" display="block" font="headline">
        With enum values
      </Text>
      <EnumDemo />
    </VStack>
  );
};

Default.parameters = {
  percy: { enableJavaScript: true },
};
