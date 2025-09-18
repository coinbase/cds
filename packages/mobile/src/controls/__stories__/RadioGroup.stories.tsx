import React, { useState } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { ThemeProvider } from '../../system';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { Radio, RadioGroup } from '../RadioGroup';

const RadioGroupScreen = () => {
  const [checked, setChecked] = useState(false);

  return (
    <ExampleScreen>
      <Example inline title="Default">
        {() => {
          const toggleChecked = () => setChecked((prevChecked) => !prevChecked);
          return (
            <Radio checked={checked} onChange={toggleChecked}>
              Default
            </Radio>
          );
        }}
      </Example>

      <Example inline title="States">
        <Radio checked>Selected</Radio>
        <Radio checked disabled>
          Disabled Selected
        </Radio>
        <Radio disabled>Disabled</Radio>
        <Radio readOnly>Read Only</Radio>
        <Radio accessibilityLabel="radio with no label" />
        <Radio>
          This radio has a multi-line label. The radio and label should align at the top. The label
          is super duper long and it keeps going on forever. This radio has a multi-line label.
        </Radio>
      </Example>

      <Example inline title="Radio Group">
        {() => {
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

          /* eslint-disable react-hooks/rules-of-hooks */
          const [group1, setGroup1] = useState<keyof typeof options1 | undefined>('btc');
          const [group2, setGroup2] = useState<keyof typeof options2>();
          const [group3, setGroup3] = useState<keyof typeof options1>();
          const [group4, setGroup4] = useState<keyof typeof options3>();

          /* eslint-enable react-hooks/rules-of-hooks */

          return (
            <>
              <Text font="headline">Select a Currency</Text>
              <RadioGroup<keyof typeof options1>
                accessibilityLabel="Select a currency to trade"
                onChange={setGroup1}
                options={options1}
                radioAccessibilityLabel="Button {{number}} of {{total}}"
                value={group1}
              />
              <RadioGroup<keyof typeof options2>
                accessibilityLabel="Choose as mascot for your team"
                label={<Text font="headline">Choose a Mascot</Text>}
                onChange={setGroup2}
                options={options2}
                value={group2}
              />
              <Text font="headline">Select a Currency</Text>
              <RadioGroup<keyof typeof options1>
                accessibilityLabel="Select a currency to trade"
                direction="horizontal"
                gap={2}
                onChange={setGroup3}
                options={options1}
                value={group3}
              />
              <Text font="headline">Select a dish to order</Text>
              <RadioGroup<keyof typeof options3>
                accessibilityLabel="Select a dish to order"
                direction="horizontal"
                gap={2}
                onChange={setGroup4}
                options={options3}
                value={group4}
              />
            </>
          );
        }}
      </Example>

      <Example inline title="Custom Color">
        {() => {
          const toggleChecked = () => setChecked((prevChecked) => !prevChecked);

          return (
            <VStack gap={2}>
              <Radio checked={checked} controlColor="bgPositive" onChange={toggleChecked}>
                Control color prop
              </Radio>
              <Radio
                background={checked ? 'accentBoldPurple' : 'bg'}
                borderColor={checked ? 'bgNegative' : 'bgWarning'}
                checked={checked}
                color="bgPrimary"
                controlColor="bgPositive"
                onChange={toggleChecked}
              >
                Style props
              </Radio>
            </VStack>
          );
        }}
      </Example>
    </ExampleScreen>
  );
};

export default RadioGroupScreen;
