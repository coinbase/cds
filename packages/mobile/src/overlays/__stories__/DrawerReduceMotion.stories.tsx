import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

import { DefaultDrawer } from './Drawers';

const DrawerReduceMotionScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Reduce Motion Drawer">
        <DefaultDrawer reduceMotion pin="bottom" />
      </Example>
    </ExampleScreen>
  );
};

export default DrawerReduceMotionScreen;
