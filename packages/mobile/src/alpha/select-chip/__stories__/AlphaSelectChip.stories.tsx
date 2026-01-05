import { useMemo, useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { useMultiSelect } from '@coinbase/cds-common/select/useMultiSelect';

import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { HStack } from '../../../layout/HStack';
import { VStack } from '../../../layout/VStack';
import { RemoteImage, RemoteImageGroup } from '../../../media';
import { Text } from '../../../typography/Text';
import type { SelectOption, SelectOptionGroup, SelectType } from '../../select/Select';
import { SelectChip } from '../SelectChip';

export const DefaultSingle = () => {
  const exampleOptions = [
    { value: null, label: 'Clear selection' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
  ];
  const [value, setValue] = useState<string | null>(null);

  return (
    <SelectChip
      accessibilityLabel="Select a value"
      label="Select a value"
      onChange={setValue}
      options={exampleOptions}
      placeholder="Choose an option"
      value={value}
    />
  );
};

export const DefaultMulti = () => {
  const exampleOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: [],
  });

  return (
    <SelectChip
      accessibilityLabel="Select multiple values"
      label="Select multiple values"
      onChange={onChange}
      options={exampleOptions}
      placeholder="Choose options"
      type="multi"
      value={value}
    />
  );
};

export const Compact = () => {
  const exampleOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <SelectChip
      compact
      onChange={setValue}
      options={exampleOptions}
      placeholder="Choose an option"
      value={value}
    />
  );
};

export const WithStartEndNodes = () => {
  const exampleOptions = [
    { value: 'btc', label: assets.btc.name },
    { value: 'eth', label: assets.eth.name },
    { value: 'dai', label: assets.dai.name },
  ];
  const [value, setValue] = useState<string | null>('eth');

  // Map each option value to a different asset
  const getStartNode = (selectedValue: string | null) => {
    if (!selectedValue) return null;

    const assetMap: Record<string, string> = {
      btc: assets.btc.imageUrl,
      eth: assets.eth.imageUrl,
      dai: assets.dai.imageUrl,
    };

    const imageUrl = assetMap[selectedValue];
    if (!imageUrl) return null;

    return <RemoteImage height={24} shape="circle" source={imageUrl} width={24} />;
  };

  return (
    <SelectChip
      onChange={setValue}
      options={exampleOptions}
      placeholder="Choose an asset"
      startNode={getStartNode(value)}
      value={value}
    />
  );
};

// Map asset symbols to their image URLs
const assetImageMap: Record<string, string> = {
  btc: assets.btc.imageUrl,
  eth: assets.eth.imageUrl,
  dai: assets.dai.imageUrl,
  ltc: assets.ltc.imageUrl,
  xrp: assets.xrp.imageUrl,
};

export const MultiSelectWithAssets = () => {
  const exampleOptions = [
    { value: 'btc', label: assets.btc.name },
    { value: 'eth', label: assets.eth.name },
    { value: 'dai', label: assets.dai.name },
    { value: 'ltc', label: assets.ltc.name },
    { value: 'xrp', label: assets.xrp.name },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: ['eth', 'btc'],
  });

  // Get startNode based on selected assets
  const startNode = useMemo(() => {
    if (value.length === 0) return null;

    // Multiple assets selected - use RemoteImageGroup
    return (
      <RemoteImageGroup shape="circle" size={24}>
        {value.map((assetValue) => {
          const imageUrl = assetImageMap[assetValue];
          if (!imageUrl) return null;
          return <RemoteImage key={assetValue} source={imageUrl} />;
        })}
      </RemoteImageGroup>
    );
  }, [value]);

  return (
    <SelectChip
      accessibilityLabel="Select multiple assets"
      maxWidth={400}
      onChange={onChange}
      options={exampleOptions}
      placeholder="Choose assets"
      startNode={startNode}
      type="multi"
      value={value}
    />
  );
};

export const InvertColorScheme = () => {
  const exampleOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <VStack background="bgAlternate" borderRadius={200} padding={2}>
      <SelectChip
        invertColorScheme
        onChange={setValue}
        options={exampleOptions}
        placeholder="Choose an option"
        value={value}
      />
    </VStack>
  );
};

export const EmptyOptions = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <SelectChip onChange={setValue} options={[]} placeholder="No options available" value={value} />
  );
};

export const WithGroups = () => {
  const exampleOptions = [
    {
      label: 'Group A',
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ],
    },
    {
      label: 'Group B',
      options: [
        { value: '4', label: 'Option 4' },
        { value: '5', label: 'Option 5' },
      ],
    },
    {
      label: 'Group C',
      options: [{ value: '6', label: 'Option 6' }],
    },
  ] as (SelectOption<string> | SelectOptionGroup<SelectType, string>)[];
  const [value, setValue] = useState<string | null>(null);

  return (
    <SelectChip
      accessibilityLabel="Select a value"
      onChange={setValue}
      options={exampleOptions as any}
      placeholder="Choose an option"
      value={value}
    />
  );
};

export const MultiWithGroups = () => {
  const exampleOptions: (SelectOption<string> | SelectOptionGroup<SelectType, string>)[] = [
    {
      label: 'Group A',
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ],
    },
    {
      label: 'Group B',
      options: [
        { value: '4', label: 'Option 4' },
        { value: '5', label: 'Option 5' },
      ],
    },
    {
      label: 'Group C',
      options: [{ value: '6', label: 'Option 6' }],
    },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: [],
  });

  return (
    <SelectChip
      accessibilityLabel="Select multiple values"
      onChange={onChange}
      options={exampleOptions as any}
      placeholder="Choose options"
      type="multi"
      value={value}
    />
  );
};

export const WithDisabledGroup = () => {
  const exampleOptions: (SelectOption<string> | SelectOptionGroup<SelectType, string>)[] = [
    {
      label: 'Available Options',
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ],
    },
    {
      label: 'Unavailable Options (Group Disabled)',
      disabled: true,
      options: [
        { value: '4', label: 'Option 4' },
        { value: '5', label: 'Option 5' },
        { value: '6', label: 'Option 6' },
      ],
    },
    {
      label: 'More Available Options',
      options: [
        { value: '7', label: 'Option 7' },
        { value: '8', label: 'Option 8' },
      ],
    },
  ];
  const [value, setValue] = useState<string | null>(null);

  return (
    <SelectChip
      accessibilityLabel="Select a value"
      onChange={setValue}
      options={exampleOptions as any}
      placeholder="Choose an option"
      value={value}
    />
  );
};

export const MultiWithDisabledGroup = () => {
  const exampleOptions: (SelectOption<string> | SelectOptionGroup<SelectType, string>)[] = [
    {
      label: 'Available Options',
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ],
    },
    {
      label: 'Unavailable Options (Group Disabled)',
      disabled: true,
      options: [
        { value: '4', label: 'Option 4' },
        { value: '5', label: 'Option 5' },
        { value: '6', label: 'Option 6' },
      ],
    },
    {
      label: 'More Available Options',
      options: [
        { value: '7', label: 'Option 7' },
        { value: '8', label: 'Option 8' },
      ],
    },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: [],
  });

  return (
    <SelectChip
      accessibilityLabel="Select multiple values"
      onChange={onChange}
      options={exampleOptions as any}
      placeholder="Choose options"
      type="multi"
      value={value}
    />
  );
};
export const FullyDisabled = () => {
  const exampleOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
  ];
  const [value, setValue] = useState<string | null>('1');

  return (
    <VStack gap={2}>
      <Text>Disabled select chip:</Text>
      <HStack gap={2}>
        <SelectChip
          disabled
          accessibilityLabel="Select a value"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Choose an option"
          value={null}
        />
        <SelectChip
          disabled
          accessibilityLabel="Select a value"
          onChange={setValue}
          options={exampleOptions}
          placeholder="Choose an option"
          value={value}
        />
      </HStack>
    </VStack>
  );
};

export const WithDisabledOptions = () => {
  const exampleOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2', disabled: true },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4', disabled: true },
  ];
  const [value, setValue] = useState<string | null>(null);

  return (
    <VStack gap={2}>
      <Text>Select with disabled options:</Text>
      <SelectChip
        accessibilityLabel="Select a value"
        onChange={setValue}
        options={exampleOptions}
        placeholder="Choose an option"
        value={value}
      />
    </VStack>
  );
};

export const WithDescriptions = () => {
  const exampleOptions = [
    { value: '1', label: 'Option 1', description: 'First option description' },
    { value: '2', label: 'Option 2', description: 'Second option description' },
    { value: '3', label: 'Option 3', description: 'Third option description' },
    { value: '4', label: 'Option 4', description: 'Fourth option description' },
  ];
  const [value, setValue] = useState<string | null>(null);

  return (
    <VStack gap={2}>
      <Text>Select with option descriptions:</Text>
      <SelectChip
        accessibilityLabel="Select a value"
        onChange={setValue}
        options={exampleOptions}
        placeholder="Choose an option"
        value={value}
      />
    </VStack>
  );
};

export const WithDisplayValue = () => {
  const exampleOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
  ];
  const { value, onChange } = useMultiSelect({
    initialValue: [],
  });

  const displayValue =
    Array.isArray(value) && value.length > 0
      ? `${value.length} ${value.length === 1 ? 'option' : 'options'} selected`
      : undefined;

  return (
    <VStack gap={2}>
      <Text>Select with custom displayed value:</Text>
      <SelectChip
        accessibilityLabel="Select multiple values"
        displayValue={displayValue}
        onChange={onChange}
        options={exampleOptions}
        placeholder="Choose options"
        type="multi"
        value={value}
      />
    </VStack>
  );
};

const SelectChipScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default">
        <DefaultSingle />
      </Example>
      <Example title="Default Multi">
        <DefaultMulti />
      </Example>
      <Example title="Compact">
        <Compact />
      </Example>
      <Example title="With Start End Nodes">
        <WithStartEndNodes />
      </Example>
      <Example title="Multi-Select with Assets">
        <MultiSelectWithAssets />
      </Example>
      <Example title="Invert Color Scheme">
        <InvertColorScheme />
      </Example>
      <Example title="Empty Options">
        <EmptyOptions />
      </Example>
      <Example title="With Groups">
        <WithGroups />
      </Example>
      <Example title="Multi With Groups">
        <MultiWithGroups />
      </Example>
      <Example title="With Disabled Group">
        <WithDisabledGroup />
      </Example>
      <Example title="Multi With Disabled Group">
        <MultiWithDisabledGroup />
      </Example>
      <Example title="Fully Disabled">
        <FullyDisabled />
      </Example>
      <Example title="With Disabled Options">
        <WithDisabledOptions />
      </Example>
      <Example title="With Descriptions">
        <WithDescriptions />
      </Example>
      <Example title="With Display Value">
        <WithDisplayValue />
      </Example>
    </ExampleScreen>
  );
};

export default SelectChipScreen;
