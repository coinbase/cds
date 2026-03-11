import React, { useState } from 'react';

import { VStack } from '../../layout';
import { Box } from '../../layout/Box';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { Radio, RadioGroup } from '../RadioGroup';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
};

const Example: React.FC<React.PropsWithChildren<{ title: string }>> = ({ children, title }) => {
  return (
    <VStack gap={2}>
      <Text as="h2" display="block" font="title3">
        {title}
      </Text>
      {children}
    </VStack>
  );
};

function Normal() {
  const [checked, setChecked] = useState(false);
  return (
    <Radio checked={checked} name="normal-radio" onChange={() => setChecked((s) => !s)}>
      Normal
    </Radio>
  );
}

function CustomColors() {
  const [checked, setChecked] = useState(false);
  return (
    <VStack gap={2}>
      <Radio
        checked={checked}
        controlColor="bgPositive"
        name="normal-radio"
        onChange={() => setChecked((s) => !s)}
      >
        Control color prop
      </Radio>
      <Radio
        background={checked ? 'accentBoldPurple' : 'bg'}
        borderColor={checked ? 'bgNegative' : 'bgWarning'}
        checked={checked}
        color="bgPrimary"
        controlColor="bgPositive"
        name="normal-radio"
        onChange={() => setChecked((s) => !s)}
      >
        Style props
      </Radio>
    </VStack>
  );
}

const options1 = {
  btc: 'Bitcoin',
  eth: 'Ethereum',
  dai: 'Dai',
};

const options2 = {
  'yellow-jacket': 'Yellow Jacket',
  bruin: 'Bruin',
  bronco: 'Bronco',
};

const options3 = {
  taco: 'tacos',
  puttanesca: 'Spaghetti',
  'hamachi-salad': <Text font="label1">Hamachi salad</Text>,
};

function Groups() {
  const [group1, setGroup1] = useState<string>('btc');
  const [group2, setGroup2] = useState<string>();
  const [group3, setGroup3] = useState<string>();
  const [group4, setGroup4] = useState<keyof typeof options3>();

  return (
    <>
      <RadioGroup
        aria-labelledby="choose-a-currency"
        id="currency-radio-group"
        label={
          <Text font="headline" id="choose-a-currency">
            Choose a currency
          </Text>
        }
        name="radio-group1"
        onChange={setGroup1}
        options={options1}
        value={group1}
      />
      <Text font="headline" id="choose-a-mascot">
        Choose a mascot
      </Text>
      <RadioGroup
        accessibilityLabelledBy="choose-a-mascot"
        id="mascot-radio-group"
        name="radio-group2"
        onChange={setGroup2}
        options={options2}
        value={group2}
      />
      <RadioGroup
        aria-labelledby="choose-a-currency2"
        direction="horizontal"
        gap={2}
        id="horizontal-radio-group"
        label={
          <Text font="headline" id="choose-a-currency2">
            Choose a currency
          </Text>
        }
        name="radio-group3"
        onChange={setGroup3}
        options={options1}
        value={group3}
      />
      <Text font="headline" id="select-dish-to-order">
        Select a dish to order
      </Text>
      <RadioGroup
        aria-labelledby="select-dish-to-order"
        direction="horizontal"
        gap={2}
        name="radio-group4"
        onChange={setGroup4}
        options={options3}
        value={group4}
      />
    </>
  );
}

function CustomBorderWidth() {
  const [selected, setSelected] = useState<string>();
  return (
    <VStack gap={2}>
      <Radio
        checked={selected === 'default'}
        name="border-width-radio"
        onChange={() => setSelected('default')}
        value="default"
      >
        Default radio (20px, borderWidth 100)
      </Radio>
      <Radio
        borderWidth={200}
        checked={selected === 'medium'}
        name="border-width-radio"
        onChange={() => setSelected('medium')}
        value="small"
      >
        Medium thickness radio (borderWidth 200)
      </Radio>
      <Radio
        borderWidth={500}
        checked={selected === 'thick'}
        name="border-width-radio"
        onChange={() => setSelected('thick')}
        value="thick"
      >
        Thicker thickness radio (borderWidth 500)
      </Radio>
    </VStack>
  );
}

export const All = () => {
  return (
    <VStack gap={4}>
      <Example title="Default">
        <Normal />
      </Example>
      <Example title="Custom Colors">
        <CustomColors />
      </Example>
      <Example title="States">
        <VStack gap={2}>
          <Radio disabled>Disabled unselected</Radio>
          <Radio checked disabled>
            Disabled selected
          </Radio>
        </VStack>
      </Example>
      <Example title="Multi-line Labels">
        <Box width="250px">
          <Radio>
            This radio has a multi-line label. The radio and label should align at the top.
          </Radio>
        </Box>
      </Example>
      <Example title="Groups">
        <Groups />
      </Example>
      <Example title="Custom Border Width">
        <CustomBorderWidth />
      </Example>
    </VStack>
  );
};
