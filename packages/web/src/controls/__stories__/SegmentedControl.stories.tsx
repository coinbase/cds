import React, { useState } from 'react';

import { VStack } from '../../layout';
import { type IconOptions, SegmentedControl, type TextOptions } from '../SegmentedControl';

export default {
  title: 'Components/Segmented Control',
  component: SegmentedControl,
};

const options1: TextOptions = [
  {
    label: 'ETH',
    value: 'eth',
  },
  {
    label: 'USD',
    value: 'usd',
  },
];

const options2: TextOptions = [
  {
    label: '🐔',
    value: 'chicken',
  },
  {
    label: '🥚',
    value: 'egg',
  },
];

const options3: TextOptions = [
  {
    label: 'black',
    value: 'black',
  },
  {
    label: 'white',
    value: 'white',
  },
];

export const Normal = () => {
  return (
    <VStack gap={2}>
      <SegmentedControl options={options1} />
      <SegmentedControl options={options2} />
      <SegmentedControl disabled options={options3} />
    </VStack>
  );
};

const iconOptions1: IconOptions = [
  {
    label: 'ethereum',
    value: 'eth',
    accessibilityLabel: 'Ethereum',
    active: true,
  },
  {
    label: 'cashUSD',
    value: 'usd',
    accessibilityLabel: 'CashUSD',
  },
];

export const Icons = () => {
  const [value, setValue] = useState('eth');

  return (
    <VStack gap={2}>
      <pre>xs</pre>
      <SegmentedControl
        iconSize="xs"
        onChange={setValue}
        options={iconOptions1}
        type="icon"
        value={value}
      />

      <pre>s</pre>
      <SegmentedControl
        iconSize="s"
        onChange={setValue}
        options={iconOptions1}
        type="icon"
        value={value}
      />

      <pre>m</pre>
      <SegmentedControl
        iconSize="m"
        onChange={setValue}
        options={iconOptions1}
        type="icon"
        value={value}
      />

      <pre>l</pre>
      <SegmentedControl
        iconSize="l"
        onChange={setValue}
        options={iconOptions1}
        type="icon"
        value={value}
      />
    </VStack>
  );
};
