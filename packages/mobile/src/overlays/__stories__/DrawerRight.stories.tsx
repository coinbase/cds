import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

import { SideDrawer } from './Drawers';

const DrawerRightScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Right Drawer">
        <SideDrawer pin="right" />
      </Example>
    </ExampleScreen>
  );
};

export default DrawerRightScreen;
