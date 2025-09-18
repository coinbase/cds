import React, { useCallback, useRef, useState } from 'react';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { SpotRectangle } from '../../illustrations';
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
                <Box alignItems="center" paddingBottom={3}>
                  <SpotRectangle name="exploreDecentralizedApps" />
                </Box>
                <Text align="center" font="title1" paddingBottom={2}>
                  Earn crypto by lending, staking, and more
                </Text>
                <Text align="center" color="fgMuted" font="body">
                  Many decentralized apps (“dapps”) let you earn yield on your crypto. Check out
                  trusted dapps like Aave and Compound without leaving Coinbaes.
                </Text>
              </VStack>
              <StickyFooter paddingX={3}>
                <Button block onPress={handleClose}>
                  Explore Dapps
                </Button>
              </StickyFooter>
            </TrayStickyFooter>
          )}
        </Tray>
      )}
    </>
  );
};

export const PromotionalTrayScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Promotional Tray">
        <Default />
      </Example>
    </ExampleScreen>
  );
};

export default PromotionalTrayScreen;
