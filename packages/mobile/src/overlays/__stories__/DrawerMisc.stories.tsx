import React, { useCallback, useRef, useState } from 'react';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useA11y } from '../../hooks/useA11y';
import type { DrawerBaseProps } from '../drawer/Drawer';
import { Drawer } from '../drawer/Drawer';

import { SideDrawerContent } from './Drawers';

const SideDrawerWithA11y = ({ pin = 'left' }: Pick<DrawerBaseProps, 'pin'>) => {
  const [isVisible, setIsVisible] = useState(false);
  const setIsVisibleToOn = useCallback(() => setIsVisible(true), []);
  const triggerRef = useRef(null);
  const { setA11yFocus } = useA11y();

  const handleCloseDrawer = useCallback(() => {
    setIsVisible(false);
    // return a11y focus to trigger
    setA11yFocus(triggerRef);
  }, [setA11yFocus]);

  return (
    <>
      <Button ref={triggerRef} onPress={setIsVisibleToOn}>
        Open
      </Button>
      {isVisible && (
        <Drawer onCloseComplete={handleCloseDrawer} pin={pin}>
          {({ handleClose }) => <SideDrawerContent handleClose={handleClose} />}
        </Drawer>
      )}
    </>
  );
};

const DrawerMiscScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Drawer with A11y focus return">
        <SideDrawerWithA11y pin="left" />
      </Example>
    </ExampleScreen>
  );
};

export default DrawerMiscScreen;
