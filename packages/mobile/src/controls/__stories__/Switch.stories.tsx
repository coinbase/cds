import React, { useState } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { Switch } from '../Switch';

const SwitchScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(true);
  const [isChecked3, setIsChecked3] = useState(false);

  return (
    <ExampleScreen>
      <Example inline title="Default">
        {() => {
          const toggleChecked = () => setIsChecked((prevChecked) => !prevChecked);
          return (
            <Switch checked={isChecked} onChange={toggleChecked}>
              Default
            </Switch>
          );
        }}
      </Example>
      <Example inline title="States">
        <Switch checked>On</Switch>
        <Switch checked readOnly>
          On Readonly
        </Switch>
        <Switch disabled>Off Disabled</Switch>
        <Switch readOnly>Off Read Only</Switch>
        <Switch accessibilityLabel="switch with no label" />
        <Switch>
          This switch has a multi-line label. The switch and label should align at the top. The
          label is super duper long and it keeps going on forever. This switch has a multi-line
          label.
        </Switch>
      </Example>
      <Example inline title="Custom Color">
        {() => {
          const toggleChecked = () => setIsChecked2((prevChecked) => !prevChecked);
          return (
            <VStack gap={2}>
              <Switch checked={isChecked2} controlColor="bgNegative" onChange={toggleChecked}>
                Control color prop
              </Switch>
              <Switch
                background={isChecked2 ? 'accentBoldPurple' : 'bgNegative'}
                borderColor={isChecked2 ? 'bgPositive' : 'bgPrimary'}
                borderWidth={200}
                checked={isChecked2}
                color="bgPrimary"
                controlColor="bgPositive"
                onChange={toggleChecked}
              >
                Style props
              </Switch>
            </VStack>
          );
        }}
      </Example>
      <Example inline title="Elevation">
        {() => {
          const toggleChecked = () => setIsChecked3((prevChecked) => !prevChecked);
          return (
            <Switch checked={isChecked3} elevation={1} onChange={toggleChecked}>
              Elevation
            </Switch>
          );
        }}
      </Example>
    </ExampleScreen>
  );
};

export default SwitchScreen;
