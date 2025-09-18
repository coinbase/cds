import React, { useCallback, useEffect, useState } from 'react';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Fallback, Spacer, VStack } from '../../layout';
import type { DrawerBaseProps } from '../drawer/Drawer';
import { Drawer } from '../drawer/Drawer';

import { navOptions, SideDrawerContent } from './Drawers';

const SidebarDrawerContentFallback = () => {
  return (
    <VStack height="100%" justifyContent="space-between" padding={2} paddingBottom={4}>
      <VStack alignItems="center" gap={2}>
        <Fallback height={50} shape="circle" width={50} />
        <VStack alignItems="center" padding={2}>
          <Fallback height={30} shape="square" width={150} />
        </VStack>
        <Fallback height={50} shape="squircle" width="100%" />
        <Spacer />
        {navOptions.map(({ label }) => (
          <Fallback key={label} height={30} shape="square" width="100%" />
        ))}
      </VStack>
      <Fallback height={50} shape="squircle" width="100%" />
    </VStack>
  );
};

const SideDrawerWithFallback = ({ pin = 'left' }: Pick<DrawerBaseProps, 'pin'>) => {
  const [isVisible, setIsVisible] = useState(true);
  const setIsVisibleToOn = useCallback(() => setIsVisible(true), []);
  const setIsVisibleToOff = useCallback(() => setIsVisible(false), []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), __DEV__ ? 2000 : 20000);
    }
  }, [isVisible]);

  return (
    <>
      <Button onPress={setIsVisibleToOn}>Open</Button>
      {isVisible && (
        <Drawer onCloseComplete={setIsVisibleToOff} pin={pin}>
          {({ handleClose }) =>
            isLoading ? (
              <SidebarDrawerContentFallback />
            ) : (
              <SideDrawerContent handleClose={handleClose} />
            )
          }
        </Drawer>
      )}
    </>
  );
};

const DrawerFallbackScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Side Drawer with Fallback">
        <SideDrawerWithFallback pin="left" />
      </Example>
    </ExampleScreen>
  );
};

export default DrawerFallbackScreen;
