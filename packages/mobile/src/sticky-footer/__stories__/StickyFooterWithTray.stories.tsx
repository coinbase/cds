import React, { useCallback, useRef, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { prices } from '@coinbase/cds-common/internal/data/prices';

import { Button } from '../../buttons/Button';
import { Menu } from '../../controls/Menu';
import { SelectOption } from '../../controls/SelectOption';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box, HStack } from '../../layout';
import { Tray, TrayStickyFooter } from '../../overlays';
import type { DrawerRefBaseProps } from '../../overlays/drawer/Drawer';
import { StickyFooter } from '../StickyFooter';

const options: string[] = prices.slice(0, 20);

const StickyFooterWithTray = ({ title }: { title?: string }) => {
  const [isTrayVisible, setIsTrayVisible] = useState(true);
  const setIsTrayVisibleToFalse = useCallback(() => setIsTrayVisible(false), []);
  const setIsTrayVisibleToTrue = useCallback(() => setIsTrayVisible(true), []);
  const [value, setValue] = useState<string>();
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleTrayClose = useCallback(() => {
    trayRef.current?.handleClose();
  }, []);

  const renderItem = useCallback(
    ({ index, item }: { index: number; item: string }) => {
      return (
        <SelectOption
          key={index}
          description="BTC"
          onPress={handleTrayClose}
          title={item}
          value={item}
        />
      );
    },
    [handleTrayClose],
  );

  return (
    <>
      <Button onPress={setIsTrayVisibleToTrue}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          disableCapturePanGestureToDismiss
          footer={({ handleClose }) => (
            <StickyFooter>
              <HStack alignItems="center" gap={1} justifyContent="center" width="100%">
                <Box flexGrow={1}>
                  <Button block variant="secondary">
                    Secondary
                  </Button>
                </Box>
                <Box flexGrow={1}>
                  <Button block onPress={handleClose}>
                    Primary
                  </Button>
                </Box>
              </HStack>
            </StickyFooter>
          )}
          handleBarVariant="inside"
          onCloseComplete={setIsTrayVisibleToFalse}
          title={title}
          verticalDrawerPercentageOfView={0.75}
        >
          <Menu onChange={setValue} value={value}>
            <FlatList data={options} renderItem={renderItem} />
          </Menu>
        </Tray>
      )}
    </>
  );
};

const StickyFooterWithTrayScreen = () => {
  return (
    <ExampleScreen>
      <Example title="StickyFooter with Tray">
        <StickyFooterWithTray title="StickyFooter with Tray" />
      </Example>
    </ExampleScreen>
  );
};

export default StickyFooterWithTrayScreen;
