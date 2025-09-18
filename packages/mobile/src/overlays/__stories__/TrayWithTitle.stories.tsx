import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

import { DefaultTray } from './Trays';

export const TrayWithTitleScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Tray with Title">
        <DefaultTray title="How much would you like to donate? " />
      </Example>
    </ExampleScreen>
  );
};

export default TrayWithTitleScreen;
