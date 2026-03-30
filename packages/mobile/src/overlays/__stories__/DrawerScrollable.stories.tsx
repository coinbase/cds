import React, { useCallback, useRef, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { prices } from '@coinbase/cds-common/internal/data/prices';

import { Button } from '../../buttons/Button';
import { Menu, SelectOption } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Pressable } from '../../system/Pressable';
import type { DrawerBaseProps, DrawerRefBaseProps } from '../drawer/Drawer';
import { Drawer } from '../drawer/Drawer';

const lotsOfOptions: string[] = prices.slice(0, 30);

type RenderItemProps = {
  index: number;
  item: string;
};

const SideDrawerScrollableContent = ({ pin = 'left' }: Pick<DrawerBaseProps, 'pin'>) => {
  const [isVisible, setIsVisible] = useState(false);
  const setIsVisibleToOn = useCallback(() => setIsVisible(true), []);
  const setIsVisibleToOff = useCallback(() => setIsVisible(false), []);
  const drawerRef = useRef<DrawerRefBaseProps>(null);
  const [value, setValue] = useState<string>();

  const handleOptionPress = useCallback(() => {
    drawerRef.current?.handleClose();
  }, []);

  const renderItem = useCallback(
    ({ index, item }: RenderItemProps) => {
      return (
        <SelectOption
          key={index}
          description="BTC"
          onPress={handleOptionPress}
          title={item}
          value={item}
        />
      );
    },
    [handleOptionPress],
  );

  return (
    <>
      <Button onPress={setIsVisibleToOn}>Open</Button>
      {isVisible && (
        <Drawer
          ref={drawerRef}
          disableCapturePanGestureToDismiss
          onCloseComplete={setIsVisibleToOff}
          pin={pin}
        >
          <VStack height={120} paddingBottom={1} paddingX={3}>
            <ScrollView>
              <Pressable noScaleOnPress accessibilityRole="button" background="transparent">
                <LoremIpsum repeat={2} />
              </Pressable>
            </ScrollView>
          </VStack>
          <Menu onChange={setValue} value={value}>
            <FlatList data={lotsOfOptions} renderItem={renderItem} />
          </Menu>
          <VStack padding={2}>
            <Button onPress={handleOptionPress} variant="secondary">
              Cancel
            </Button>
          </VStack>
        </Drawer>
      )}
    </>
  );
};

const DrawerScrollableScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Side Drawer with Scrollable Content">
        <SideDrawerScrollableContent pin="left" />
      </Example>
    </ExampleScreen>
  );
};

export default DrawerScrollableScreen;
