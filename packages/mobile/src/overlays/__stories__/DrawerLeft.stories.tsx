import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

import { SideDrawer } from './Drawers';

const DrawerLeftScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Left Drawer">
        <SideDrawer pin="left" />
      </Example>
    </ExampleScreen>
  );
};

export default DrawerLeftScreen;
