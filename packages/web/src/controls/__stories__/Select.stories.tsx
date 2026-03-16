import React, { useRef, useState } from 'react';
import type { AssetKey } from '@coinbase/cds-common/internal/data/assets';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';

import { DotSymbol } from '../../dots';
import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { RemoteImage } from '../../media';
import { InputIcon } from '../InputIcon';
import { Select, type SelectProps } from '../Select';
import { SelectOption } from '../SelectOption';

const exampleOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

const assetKeys = Object.keys(assets) as AssetKey[];

export default {
  title: 'Components/Select/Select',
  component: Select,
  parameters: {
    a11y: { test: 'off' },
  },
};

const Default = ({
  variant,
  label,
  helperText,
  labelVariant,
  startNode,
  compact,
  placeholder,
}: Pick<
  SelectProps,
  'variant' | 'label' | 'helperText' | 'labelVariant' | 'startNode' | 'compact' | 'placeholder'
>) => {
  const [value, setValue] = useState<string | undefined>('');

  return (
    <VStack padding={2}>
      <Select
        compact={compact}
        helperText={helperText}
        label={label}
        labelVariant={labelVariant}
        onChange={setValue}
        placeholder={placeholder}
        startNode={startNode}
        value={value}
        variant={variant}
      >
        <SelectOption key="Disabled" disabled description="BTC" title="Disabled" value="disabled" />
        {exampleOptions.map((option) => (
          <SelectOption
            key={option}
            description="BTC"
            testID={`option-${option}`}
            title={option}
            value={option}
          />
        ))}
      </Select>
    </VStack>
  );
};

const LongTextSelect = ({
  variant,
  label,
  helperText,
}: Pick<SelectProps, 'variant' | 'label' | 'helperText'>) => {
  const exampleLongOptions = [
    'This is a very long text. This is a very long text. This is a very long text. ',
    'This is a long text. This is a very long text. This is a very long text. ',
    'This is a text. This is a very long text. This is a very long text. ',
  ];
  const [value, setValue] = useState<string | undefined>(exampleLongOptions[0]);

  return (
    <VStack padding={2}>
      <Select
        helperText={helperText}
        label={label}
        onChange={setValue}
        placeholder="Choose something"
        value={value}
        variant={variant}
      >
        {exampleLongOptions.map((option) => (
          <SelectOption
            key={option}
            description="BTC"
            testID={`option-${option}`}
            title={option}
            value={option}
          />
        ))}
      </Select>
    </VStack>
  );
};

const AssetSelect = (props: SelectProps) => {
  const [asset, setAsset] = useState<string | undefined>('btc');
  const assetConfig = assets[(asset as AssetKey) ?? 'btc'];
  const ethLogo = assets.eth.imageUrl;

  return (
    <VStack minHeight={100} padding={2}>
      <Select
        label="Select Asset"
        onChange={setAsset}
        startNode={
          <Box paddingX={2}>
            <DotSymbol overlap="circular" pin="bottom-end" size="s" source={ethLogo}>
              <RemoteImage shape="circle" size="l" source={assetConfig.imageUrl} />
            </DotSymbol>
          </Box>
        }
        value={asset}
        valueLabel={assetConfig.name}
        {...props}
      >
        {Object.values(assets).map(({ name, imageUrl }, idx) => (
          <SelectOption
            key={name}
            description="BTC"
            media={
              <DotSymbol overlap="circular" pin="bottom-end" size="s" source={ethLogo}>
                <RemoteImage shape="circle" size="l" source={imageUrl} />
              </DotSymbol>
            }
            testID={`option-${name}`}
            title={name}
            value={assetKeys[idx]}
          />
        ))}
      </Select>
    </VStack>
  );
};

const InputStackOptions = () => {
  const [value, setValue] = useState<string | undefined>('');

  return (
    <VStack minHeight={100} padding={2}>
      <Select
        accessibilityLabel="select story"
        helperText="What happens when helper text gets ridiculously long? We shall find out... Bueller.. Bueller.. is the edge of my parent container present? Ugh I still have a way to go. "
        label="I am a very long label that is supposed to be indicative of what my purpose is. Do you know my purpose? Directive? Directive? Directive? "
        onChange={setValue}
        placeholder="I am some ridiculously, absurdly, ostentatiously long placeholder text that would ideally get truncated when I meet the edge of my parent container. "
        startNode={<InputIcon name="calendar" />}
        value={value}
      >
        {exampleOptions.map((option) => (
          <SelectOption
            key={option}
            description="BTC"
            testID={`option-${option}`}
            title={option}
            value={option}
          />
        ))}
      </Select>
    </VStack>
  );
};

const Disabled = () => {
  const [value, setValue] = useState<string | undefined>('');

  return (
    <VStack minHeight={100} padding={2}>
      <Select
        disabled
        helperText="You can only choose one option"
        label="How many would you like?"
        onChange={setValue}
        placeholder="Choose an amount"
        value={value}
      >
        {exampleOptions.map((option) => (
          <SelectOption
            key={option}
            description="BTC"
            testID={`option-${option}`}
            title={option}
            value={option}
          />
        ))}
      </Select>
    </VStack>
  );
};

const Compact = () => {
  const [value, setValue] = useState<string | undefined>('');

  return (
    <VStack minHeight={100} padding={2}>
      <Select
        compact
        helperText="You only get one choice"
        label="How many would you like? "
        onChange={setValue}
        placeholder="Choose an amount"
        value={value}
      >
        {exampleOptions.map((option) => (
          <SelectOption
            key={option}
            compact
            description="BTC"
            testID={`option-${option}`}
            title={option}
            value={option}
          />
        ))}
      </Select>
    </VStack>
  );
};

const Variants = () => {
  return (
    <VStack>
      <Default
        helperText="I am helpful text"
        label="I am a label"
        placeholder="Choose something"
        variant="foreground"
      />
      <Default
        helperText="I am helpful text"
        label="I am a label"
        placeholder="Choose something"
        variant="foregroundMuted"
      />
      <Default
        helperText="I am helpful text"
        label="I am a label"
        placeholder="Choose something"
        variant="primary"
      />
      <Default
        helperText="I am helpful text"
        label="I am a label"
        placeholder="Choose something"
        variant="positive"
      />
      <Default
        helperText="I am helpful text"
        label="I am a label"
        placeholder="Choose something"
        variant="negative"
      />
      <Default
        helperText="I am helpful text"
        label="I am a label"
        placeholder="Choose something"
        variant="secondary"
      />
    </VStack>
  );
};

const LongText = () => {
  const [value, setValue] = useState<string | undefined>('');
  const selectRef = useRef<HTMLButtonElement>(null);

  return (
    <VStack minHeight={100} padding={2}>
      <Select ref={selectRef} onChange={setValue} placeholder="Choose an amount" value={value}>
        <SelectOption compact description="BTC" title={loremIpsum} value={loremIpsum} />
      </Select>
    </VStack>
  );
};

const LabelVariants = () => {
  return (
    <VStack>
      <Default label="Outside Label No Placeholder" />
      <Default label="Outside Label" placeholder="Choose something" />
      <Default label="Inside Label No Placeholder" labelVariant="inside" />
      <Default label="Inside Label" placeholder="Choose something" />
      <AssetSelect labelVariant="inside" />
      <Default
        helperText="I am helpful text"
        label="Start Node"
        labelVariant="inside"
        startNode={<InputIcon name="calendar" />}
      />
      <Default
        helperText="I am helpful text"
        label="I am a label"
        labelVariant="inside"
        variant="secondary"
      />
      <Default
        compact
        helperText="I am helpful text"
        label="Compact + inside"
        labelVariant="inside"
        variant="secondary"
      />
    </VStack>
  );
};

export {
  AssetSelect,
  Compact,
  Default,
  Disabled,
  InputStackOptions,
  LabelVariants,
  LongText,
  LongTextSelect,
  Variants,
};

Disabled.bind({});
/** TODO: convert to CSF (Component Story Format v3) */
Disabled.parameters = {
  a11y: {
    config: {
      /**
       * Color contrast ratio doesn't need to meet 4.5:1, as the element is disabled
       * @link https://dequeuniversity.com/rules/axe/4.3/color-contrast
       */
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};
