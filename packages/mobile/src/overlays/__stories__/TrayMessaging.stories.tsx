import React, { useCallback, useRef, useState } from 'react';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { SpotSquare } from '../../illustrations';
import { Box, VStack } from '../../layout';
import { StickyFooter } from '../../sticky-footer/StickyFooter';
import { Text } from '../../typography/Text';
import type { DrawerRefBaseProps } from '../drawer/Drawer';
import { Tray, TrayStickyFooter } from '../tray/Tray';

export const Default = () => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const setIsTrayVisibleToFalse = useCallback(() => setIsTrayVisible(false), []);
  const setIsTrayVisibleToTrue = useCallback(() => setIsTrayVisible(true), []);
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleTrayVisibilityChange = useCallback((e: 'visible' | 'hidden') => {
    console.log('Tray visibility changed:', e);
  }, []);

  return (
    <>
      <Button onPress={setIsTrayVisibleToTrue}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          handleBarAccessibilityLabel="Dismiss"
          onCloseComplete={setIsTrayVisibleToFalse}
          onVisibilityChange={handleTrayVisibilityChange}
        >
          {({ handleClose }) => (
            <TrayStickyFooter>
              <VStack paddingBottom={1} paddingTop={1} paddingX={3}>
                <Box alignItems="center" paddingBottom={4}>
                  <SpotSquare name="borrowWallet" />
                </Box>
                <Text align="center" font="title1" paddingBottom={1}>
                  You’re ready to explore
                </Text>
                <Text align="center" color="fgMuted" font="body">
                  You don’t have any dapps open right now. Here’s one you might like: [dapp]
                </Text>
              </VStack>
              <StickyFooter paddingX={3}>
                <Button block onPress={handleClose}>
                  Button
                </Button>
              </StickyFooter>
            </TrayStickyFooter>
          )}
        </Tray>
      )}
    </>
  );
};

export const MessagingTrayScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Messaging Tray">
        <Default />
      </Example>
    </ExampleScreen>
  );
};

export default MessagingTrayScreen;
