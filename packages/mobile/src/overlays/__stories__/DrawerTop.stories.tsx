import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

import { DefaultDrawer } from './Drawers';

const DrawerTopScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Top Drawer">
        <DefaultDrawer pin="top" />
      </Example>
    </ExampleScreen>
  );
};

export default DrawerTopScreen;
