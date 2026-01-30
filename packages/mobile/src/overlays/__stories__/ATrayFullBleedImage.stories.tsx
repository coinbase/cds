import { useCallback, useMemo, useRef, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { Button } from '../../buttons/Button';
import { ListCell } from '../../cells/ListCell';
import { Menu, SelectOption } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useSafeBottomPadding } from '../../hooks/useSafeBottomPadding';
import { useTheme } from '../../hooks/useTheme';
import { Box, VStack } from '../../layout';
import { StickyFooter } from '../../sticky-footer/StickyFooter';
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
      <Example title="With Scrollable ListCells">
        <MyTrayWithListCells />
      </Example>
      <Example title="With Sticky Footer">
        <MyTrayWithStickyFooter />
      </Example>
      <Example title="With ListCells Sticky Footer">
        <MyTrayWithListCellsStickyFooter />
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

const MyTrayWithListCells = () => {
  const safeBottomPadding = useSafeBottomPadding();

  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), [setIsTrayVisible]);
  const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), [setIsTrayVisible]);
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleTrayVisibilityChange = useCallback((e: 'visible' | 'hidden') => {
    console.log('Tray visibility changed:', e);
  }, []);

  const scrollContentStyle = useMemo(
    () => ({
      paddingBottom: safeBottomPadding,
    }),
    [safeBottomPadding],
  );

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
            drawer: scrollContentStyle,
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
          verticalDrawerPercentageOfView={0.9}
        >
          <ScrollView contentContainerStyle={scrollContentStyle}>
            <Text font="title3" paddingBottom={0.75} paddingTop={2} paddingX={3}>
              Header
            </Text>
            {Array.from({ length: 20 }, (_, i) => (
              <ListCell
                key={i}
                accessory="arrow"
                description="Description"
                onPress={() => alert('Cell clicked!')}
                spacingVariant="condensed"
                title="Title"
              />
            ))}
          </ScrollView>
        </Tray>
      )}
    </>
  );
};

const MyTrayWithStickyFooter = () => {
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
          footer={({ handleClose }) => (
            <StickyFooter paddingX={3}>
              <Button block onPress={handleClose}>
                Close
              </Button>
            </StickyFooter>
          )}
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
          <VStack paddingBottom={2} paddingX={3}>
            <Text font="title3" paddingBottom={0.75} paddingTop={2}>
              Header
            </Text>
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

const MyTrayWithListCellsStickyFooter = () => {
  const theme = useTheme();
  const safeBottomPadding = useSafeBottomPadding();
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), [setIsTrayVisible]);
  const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), [setIsTrayVisible]);
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleTrayVisibilityChange = useCallback((e: 'visible' | 'hidden') => {
    console.log('Tray visibility changed:', e);
  }, []);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = e.nativeEvent.contentOffset.y;
    setIsScrolled(scrollY > 0);
  }, []);

  const headerStyles = useMemo(
    () => ({
      paddingHorizontal: 0,
      paddingBottom: 0,
      borderBottomWidth: isScrolled ? 1 : 0,
      borderBottomColor: theme.color.bgLine,
    }),
    [theme, isScrolled],
  );

  return (
    <>
      <Button onPress={setIsTrayVisibleOn}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          footer={({ handleClose }) => (
            <StickyFooter background="bg" elevation={isScrolled ? 2 : 0} paddingX={3}>
              <Button block onPress={handleClose}>
                Close
              </Button>
            </StickyFooter>
          )}
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
            header: headerStyles,
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
          verticalDrawerPercentageOfView={0.9}
        >
          <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
            <Text font="title3" paddingBottom={0.75} paddingTop={2} paddingX={3}>
              Header
            </Text>
            {Array.from({ length: 20 }, (_, i) => (
              <ListCell
                key={i}
                accessory="arrow"
                description="Description"
                onPress={() => alert('Cell clicked!')}
                spacingVariant="condensed"
                title="Title"
              />
            ))}
          </ScrollView>
        </Tray>
      )}
    </>
  );
};

export default TrayFullBleedImageScreen;
