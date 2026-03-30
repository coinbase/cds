import React, { useState } from 'react';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

import { Select } from '../../alpha/select/Select';
import { Button } from '../../buttons';
import { IconButton } from '../../buttons/IconButton';
import { Chip } from '../../chips/Chip';
import { SearchInput } from '../../controls/SearchInput';
import { TextInput } from '../../controls/TextInput';
import type { ComponentConfig } from '../../core/componentConfig';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { SegmentedTabs } from '../../tabs/SegmentedTabs';
import { Link } from '../../typography/Link';
import { Text } from '../../typography/Text';
import { ComponentConfigProvider } from '../ComponentConfigProvider';

import { customComponentConfig } from './componentConfigStickerSheet/customComponentConfig';

const StaticConfigExample = () => {
  const config: ComponentConfig = {
    Button: { variant: 'secondary', compact: true },
  };

  return (
    <ComponentConfigProvider value={config}>
      <VStack gap={2}>
        <Text font="body">Buttons inherit config defaults</Text>
        <HStack gap={2}>
          <Button>Default</Button>
          <Button variant="primary">Local override</Button>
        </HStack>
      </VStack>
    </ComponentConfigProvider>
  );
};

const FunctionalConfigExample = () => {
  const config: ComponentConfig = {
    Button: (props) => ({
      borderRadius: props.compact ? 200 : 900,
      variant: props.loading ? 'secondary' : 'primary',
    }),
  };

  return (
    <ComponentConfigProvider value={config}>
      <VStack gap={2}>
        <Text font="body">Button config is resolved from local props</Text>
        <HStack gap={2}>
          <Button compact>Compact</Button>
          <Button loading>Loading</Button>
          <Button>Regular</Button>
        </HStack>
      </VStack>
    </ComponentConfigProvider>
  );
};

const NestedProvidersExample = () => {
  const outerConfig: ComponentConfig = {
    Button: { variant: 'secondary' },
  };
  const innerConfig: ComponentConfig = {
    Button: { variant: 'positive', compact: true },
  };

  return (
    <ComponentConfigProvider value={outerConfig}>
      <VStack gap={2}>
        <Text font="body">Outer provider defaults</Text>
        <HStack gap={2}>
          <Button>Outer Button</Button>
        </HStack>

        <ComponentConfigProvider value={innerConfig}>
          <VStack gap={2} padding={2} style={{ borderWidth: 1, borderRadius: 8 }}>
            <Text font="body">Inner provider overrides Button</Text>
            <HStack gap={2}>
              <Button>Inner Button</Button>
            </HStack>
          </VStack>
        </ComponentConfigProvider>
      </VStack>
    </ComponentConfigProvider>
  );
};

const stickerSheetSelectOptions = [
  { value: null, label: 'Clear' },
  { value: 'btc', label: 'Bitcoin' },
  { value: 'eth', label: 'Ethereum' },
  { value: 'sol', label: 'Solana' },
];
const stickerSheetTabs: TabValue<'buy' | 'sell' | 'convert'>[] = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
];

const StickerSheetParityExample = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectValue, setSelectValue] = useState<string | null>('btc');
  const [activeTab, setActiveTab] = useState<TabValue<'buy' | 'sell' | 'convert'> | null>(
    stickerSheetTabs[0],
  );

  return (
    <ComponentConfigProvider value={customComponentConfig}>
      <VStack gap={2}>
        <Text font="body">Mirrors the latest web sticker-sheet component config defaults.</Text>
        <HStack gap={2}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <IconButton accessibilityLabel="add" name="add" variant="tertiary" />
        </HStack>

        <TextInput
          label="Amount"
          onChangeText={setTextInputValue}
          placeholder="0.00"
          value={textInputValue}
        />
        <SearchInput onChangeText={setSearchValue} value={searchValue} />
        <Select
          label="Asset"
          onChange={setSelectValue}
          options={stickerSheetSelectOptions}
          value={selectValue}
        />
        <SegmentedTabs activeTab={activeTab} onChange={setActiveTab} tabs={stickerSheetTabs} />
        <HStack gap={2}>
          <Chip>Chip</Chip>
          <Link to="https://cds.coinbase.com">CDS docs</Link>
        </HStack>
      </VStack>
    </ComponentConfigProvider>
  );
};

const ComponentConfigProviderStory = () => {
  return (
    <ExampleScreen>
      <Example title="Static Config">
        <StaticConfigExample />
      </Example>
      <Example title="Functional Config">
        <FunctionalConfigExample />
      </Example>
      <Example title="Nested Providers">
        <NestedProvidersExample />
      </Example>
      <Example title="Sticker-sheet parity defaults">
        <StickerSheetParityExample />
      </Example>
    </ExampleScreen>
  );
};

export default ComponentConfigProviderStory;
