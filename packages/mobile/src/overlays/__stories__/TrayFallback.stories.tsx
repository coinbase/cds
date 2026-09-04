import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

import { ScrollableTray } from './Trays';

export const TrayFallbackScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Tray with Fallback">
        <ScrollableTray fallbackEnabled title="You are going to be waiting awhile..." />
      </Example>
    </ExampleScreen>
  );
};

export default TrayFallbackScreen;
