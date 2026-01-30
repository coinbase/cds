import { useCallback, useRef, useState } from 'react';
import { Image } from 'react-native';

import { Button } from '../../buttons/Button';
import { Menu, SelectOption } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout';
import { Text } from '../../typography/Text';
import type { DrawerRefBaseProps } from '../drawer/Drawer';
import { Tray } from '../tray/Tray';

import { options } from './Trays';

export const TrayFullBleedImageScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Tray with Full Bleed Image">
        <MyTray />
      </Example>
    </ExampleScreen>
  );
};

const MyTray = () => {
  const [isTrayVisible, setIsTrayVisible] = useState(true);
  const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), [setIsTrayVisible]);
  const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), [setIsTrayVisible]);
  const [value, setValue] = useState<string>();
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleOptionPress = () => {
    trayRef.current?.handleClose();
  };

  const handleTrayVisibilityChange = useCallback((e: 'visible' | 'hidden') => {
    console.log('Tray visibility changed:', e);
  }, []);

  return (
    <>
      <Button onPress={setIsTrayVisibleOn}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          handleBarVariant="inside"
          onCloseComplete={setIsTrayVisibleOff}
          onVisibilityChange={handleTrayVisibilityChange}
          styles={{
            handleBar: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1,
            },
            header: {
              paddingHorizontal: 0,
              paddingBottom: 0,
            },
          }}
          title={
            <Box background="bgAlternate" height={180} marginX={-3}>
              <Image
                resizeMode="cover"
                source={{
                  uri: 'https://images.ctfassets.net/o10es7wu5gm1/4BsskcYybNIDMYTeMpkFPG/216eb97727f834346649004a5d66cd3f/Coinbase_Press_Page_Product_Image.png',
                }}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          }
        >
          <Text font="title3" paddingBottom={0.75} paddingTop={2} paddingX={3}>
            Header
          </Text>
          <Menu onChange={setValue} value={value}>
            {options.map((option: string) => (
              <SelectOption
                key={option}
                description="BTC"
                onPress={handleOptionPress}
                title={option}
                value={option}
              />
            ))}
          </Menu>
        </Tray>
      )}
    </>
  );
};

export default TrayFullBleedImageScreen;
