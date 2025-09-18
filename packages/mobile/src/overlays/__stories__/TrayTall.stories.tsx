import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

import { ScrollableTray } from './Trays';

export const TrayTallScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Tall Tray">
        <ScrollableTray title="Lots of options..." verticalDrawerPercentageOfView={0.9} />
      </Example>
    </ExampleScreen>
  );
};

export default TrayTallScreen;
