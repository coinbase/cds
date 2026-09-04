import React, { useCallback, useRef, useState } from 'react';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { Text } from '../../typography/Text';
import type { DrawerRefBaseProps } from '../drawer/Drawer';
import { Tray } from '../tray/Tray';

export const TrayReduceMotionScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Reduce Motion Tray">
        <TrayWithReduceMotion />
      </Example>
    </ExampleScreen>
  );
};

const TrayWithReduceMotion = () => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), [setIsTrayVisible]);
  const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), [setIsTrayVisible]);
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleTrayVisibilityChange = useCallback((e: 'visible' | 'hidden') => {
    console.log('Tray visibility changed:', e);
  }, []);

  return (
    <>
      <Button onPress={setIsTrayVisibleOn}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          reduceMotion
          handleBarVariant="inside"
          onCloseComplete={setIsTrayVisibleOff}
          onVisibilityChange={handleTrayVisibilityChange}
          title="Header"
        >
          <VStack paddingX={3}>
            <Text font="body">
              Curabitur commodo nulla vel dolor vulputate vestibulum. Nulla et nisl molestie,
              interdum lorem id, viverra.
            </Text>
          </VStack>
        </Tray>
      )}
    </>
  );
};

export default TrayReduceMotionScreen;
