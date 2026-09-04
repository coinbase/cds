import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

import { DefaultTray } from './Trays';

export const TrayBasicScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Basic Tray">
        <DefaultTray />
      </Example>
    </ExampleScreen>
  );
};

export default TrayBasicScreen;
