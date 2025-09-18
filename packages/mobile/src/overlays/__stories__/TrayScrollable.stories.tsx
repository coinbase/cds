import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

import { ScrollableTray } from './Trays';

export const TrayScrollableScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Tray with Scrollable Children">
        <ScrollableTray title="Lots of options..." />
      </Example>
    </ExampleScreen>
  );
};

export default TrayScrollableScreen;
