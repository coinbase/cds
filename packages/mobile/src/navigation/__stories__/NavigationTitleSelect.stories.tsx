import { useState } from 'react';
import type { ThemeVars } from '@coinbase/cds-common';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { HStack } from '../../layout';
import { Text } from '../../typography/Text';
import { NavigationTitleSelect } from '../NavigationTitleSelect';

const BasicExample = () => {
  const [value, setValue] = useState('home');
  const options = [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'earn', label: 'Earn' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <Example title="Basic Usage">
      <NavigationTitleSelect onChange={setValue} options={options} value={value} />
    </Example>
  );
};

const CustomColorExample = () => {
  const [value, setValue] = useState('fgPrimary');
  const options = [
    { id: 'fgPrimary', label: 'Primary Color' },
    { id: 'fgMuted', label: 'Muted Color' },
    { id: 'fgPositive', label: 'Positive Color' },
    { id: 'fgNegative', label: 'Negative Color' },
  ];

  return (
    <Example title="Custom Colors">
      <NavigationTitleSelect
        color={value as ThemeVars.Color}
        onChange={setValue}
        options={options}
        value={value}
      />
    </Example>
  );
};

const CustomFontExample = () => {
  const [value, setValue] = useState('large');
  const options = [
    { id: 'large', label: 'Large Title' },
    { id: 'medium', label: 'Medium Title' },
    { id: 'small', label: 'Small Title' },
  ];

  return (
    <Example title="Custom Font">
      <NavigationTitleSelect font="title1" onChange={setValue} options={options} value={value} />
    </Example>
  );
};

const ManyOptionsExample = () => {
  const [value, setValue] = useState('account1');
  const options = Array.from({ length: 12 }, (_, i) => ({
    id: `account${i + 1}`,
    label: `Account ${i + 1}`,
  }));

  return (
    <Example title="Many Options">
      <NavigationTitleSelect onChange={setValue} options={options} value={value} />
    </Example>
  );
};

const LongLabelsExample = () => {
  const [value, setValue] = useState('long1');
  const options = [
    {
      id: 'long1',
      label: 'This is a very long navigation title that might overflow',
    },
    {
      id: 'long2',
      label: 'Another extremely long title for testing purposes',
    },
    {
      id: 'short',
      label: 'Short',
    },
  ];

  return (
    <Example title="Long Labels">
      <NavigationTitleSelect
        ellipsize="tail"
        numberOfLines={1}
        onChange={setValue}
        options={options}
        value={value}
      />
    </Example>
  );
};

const ReactNodeLabelsExample = () => {
  const [value, setValue] = useState('wallet1');
  const options = [
    {
      id: 'wallet1',
      label: (
        <HStack alignItems="center" gap={1}>
          <Icon color="fg" name="wallet" size="xs" />
          <Text>Wallet 1</Text>
        </HStack>
      ),
    },
    {
      id: 'wallet2',
      label: (
        <HStack alignItems="center" gap={1}>
          <Icon color="fg" name="wallet" size="xs" />
          <Text>Wallet 2</Text>
        </HStack>
      ),
    },
    {
      id: 'vault',
      label: (
        <HStack alignItems="center" gap={1}>
          <Icon color="fg" name="lock" size="xs" />
          <Text>Vault</Text>
        </HStack>
      ),
    },
  ];

  return (
    <Example title="React Node Labels">
      <NavigationTitleSelect onChange={setValue} options={options} value={value} />
    </Example>
  );
};

const ControlledExample = () => {
  const [value, setValue] = useState('btc');
  const options = [
    { id: 'btc', label: 'Bitcoin' },
    { id: 'eth', label: 'Ethereum' },
    { id: 'usdc', label: 'USD Coin' },
  ];

  return (
    <Example title="Controlled Component">
      <NavigationTitleSelect onChange={setValue} options={options} value={value} />
      <Text color="fgMuted" font="label2" style={{ marginTop: 8 }}>
        Selected: {options.find((opt) => opt.id === value)?.label}
      </Text>
    </Example>
  );
};

const AccessibilityExample = () => {
  const [value, setValue] = useState('inbox');
  const options = [
    { id: 'inbox', label: 'Inbox' },
    { id: 'sent', label: 'Sent' },
    { id: 'drafts', label: 'Drafts' },
  ];

  return (
    <Example title="Accessibility Features">
      <NavigationTitleSelect
        accessibilityHint="Double tap to select a different folder"
        accessibilityLabel="Mail folder selector"
        onChange={setValue}
        options={options}
        value={value}
      />
    </Example>
  );
};

const StyledExample = () => {
  const [value, setValue] = useState('theme1');
  const options = [
    { id: 'theme1', label: 'Light Theme' },
    { id: 'theme2', label: 'Dark Theme' },
    { id: 'theme3', label: 'Auto Theme' },
  ];

  return (
    <Example title="Custom Styling">
      <NavigationTitleSelect
        color="fgPrimary"
        font="headline"
        onChange={setValue}
        options={options}
        style={{ marginVertical: 4 }}
        value={value}
      />
    </Example>
  );
};

const NavigationTitleSelectScreen = () => {
  return (
    <ExampleScreen>
      <BasicExample />
      <CustomColorExample />
      <CustomFontExample />
      <ManyOptionsExample />
      <LongLabelsExample />
      <ReactNodeLabelsExample />
      <ControlledExample />
      <AccessibilityExample />
      <StyledExample />
    </ExampleScreen>
  );
};

export default NavigationTitleSelectScreen;
