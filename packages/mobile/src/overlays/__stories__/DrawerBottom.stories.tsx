import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

import { DefaultDrawer } from './Drawers';

const DrawerBottomScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Bottom Drawer">
        <DefaultDrawer pin="bottom" />
      </Example>
    </ExampleScreen>
  );
};

export default DrawerBottomScreen;
