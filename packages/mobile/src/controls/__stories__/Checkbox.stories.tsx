import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useCheckboxGroupState } from '../../hooks/useCheckboxGroupState';
import { Text } from '../../typography/Text';
import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from '../CheckboxGroup';

const styles = StyleSheet.create({
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
});

const options = {
  'fish-taco': 'Fish tacos',
  puttanesca: 'Spaghetti alla puttanesca',
  'hamachi-salad': 'Hamachi salad',
};

const CheckboxScreen = () => {
  const [checked, setChecked] = useState(false);
  return (
    <ExampleScreen>
      <Example inline title="Default">
        <Checkbox checked={checked} onChange={() => setChecked((prevChecked) => !prevChecked)}>
          Default
        </Checkbox>
      </Example>

      <Example inline title="States">
        <Checkbox checked>Selected</Checkbox>
        <Checkbox disabled>Disabled</Checkbox>
        <Checkbox indeterminate>Indeterminate</Checkbox>
        <Checkbox checked disabled>
          Checked and disabled
        </Checkbox>
        <Checkbox readOnly>Read Only</Checkbox>
        <Checkbox accessibilityLabel="checkbox with no label" />
        <Checkbox>
          This checkbox has a multi-line label. The checkbox and label should align at the top. The
          label is super duper long and it keeps going on forever. This checkbox has a multi-line
          label.
        </Checkbox>
      </Example>

      <Example inline title="Checkbox Group">
        {() => {
          const optionValues = Object.keys(options) as unknown as (keyof typeof options)[];
          const [selectedValues, { toggle }] =
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useCheckboxGroupState<keyof typeof options>(optionValues);

          return (
            <>
              <Text font="headline">Order Dinner</Text>
              <CheckboxGroup<keyof typeof options>
                accessibilityLabel="Order Dinner"
                onChange={toggle}
                selectedValues={selectedValues}
              >
                {Object.entries(options).map(([value, label]) => (
                  <Checkbox key={value} value={value}>
                    {label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </>
          );
        }}
      </Example>

      <Example inline title="Checkbox Group With Styles">
        {() => {
          const optionValues = Object.keys(options) as unknown as (keyof typeof options)[];
          const [selectedValues, { toggle }] =
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useCheckboxGroupState<keyof typeof options>(optionValues);

          return (
            <>
              <Text font="headline">Order Dinner</Text>
              <CheckboxGroup<keyof typeof options>
                accessibilityLabel="Order Dinner"
                onChange={toggle}
                selectedValues={selectedValues}
                style={styles.checkboxGroup}
              >
                {Object.entries(options).map(([value, label]) => (
                  <Checkbox key={value} value={value}>
                    {label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </>
          );
        }}
      </Example>

      <Example inline title="Custom Color">
        <Checkbox
          checked={checked}
          controlColor="bgNegative"
          onChange={() => setChecked((s) => !s)}
        >
          Control color
        </Checkbox>
        <Checkbox
          background={checked ? 'bgNegative' : 'bg'}
          borderColor={checked ? 'bgNegative' : 'bgPositive'}
          checked={checked}
          controlColor="fg"
          onChange={() => setChecked((s) => !s)}
        >
          Style props
        </Checkbox>
        <Checkbox
          background={checked ? 'bgNegative' : 'bg'}
          borderColor={checked ? 'bgNegative' : 'bgPositive'}
          borderRadius={200}
          borderWidth={500}
          color="fgPrimary"
          controlColor="fg"
          indeterminate={checked}
          onChange={() => setChecked((s) => !s)}
        >
          Style props indeterminate
        </Checkbox>
      </Example>
    </ExampleScreen>
  );
};

export default CheckboxScreen;
