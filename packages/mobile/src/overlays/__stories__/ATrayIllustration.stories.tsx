import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { Button } from '../../buttons/Button';
import { ListCell } from '../../cells/ListCell';
import { Menu, SelectOption } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useSafeBottomPadding } from '../../hooks/useSafeBottomPadding';
import { useTheme } from '../../hooks/useTheme';
import { Pictogram } from '../../illustrations';
import { VStack } from '../../layout';
import { StickyFooter } from '../../sticky-footer/StickyFooter';
import { Text } from '../../typography/Text';
import type { DrawerRefBaseProps } from '../drawer/Drawer';
import { Tray } from '../tray/Tray';

import { options } from './Trays';

export const TrayIllustrationScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Tray with Illustration">
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
          title={
            <VStack gap={1.5}>
              <Pictogram name="addWallet" />
              <Text font="title3">Header</Text>
            </VStack>
          }
        >
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
      paddingBottom: theme.space[1],
      borderBottomWidth: isScrolled ? 1 : 0,
      borderBottomColor: theme.color.bgLine,
    }),
    [theme, isScrolled],
  );

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
            header: headerStyles,
          }}
          title={
            <VStack gap={1.5}>
              <Pictogram name="addWallet" />
              <Text font="title3">Header</Text>
            </VStack>
          }
          verticalDrawerPercentageOfView={0.9}
        >
          <ScrollView
            contentContainerStyle={scrollContentStyle}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
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
            <StickyFooter background="bgElevation2" paddingX={3}>
              <Button block onPress={handleClose}>
                Close
              </Button>
            </StickyFooter>
          )}
          handleBarVariant="inside"
          onCloseComplete={setIsTrayVisibleOff}
          onVisibilityChange={handleTrayVisibilityChange}
          title={
            <VStack gap={1.5}>
              <Pictogram name="addWallet" />
              <Text font="title3">Header</Text>
            </VStack>
          }
        >
          <VStack paddingBottom={1} paddingX={3}>
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
      paddingBottom: theme.space[1],
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
            <StickyFooter
              background="bgElevation2"
              elevation={isScrolled ? 2 : 0}
              paddingX={3}
              style={{ paddingBottom: safeBottomPadding }}
            >
              <Button block onPress={handleClose}>
                Close
              </Button>
            </StickyFooter>
          )}
          handleBarVariant="inside"
          onCloseComplete={setIsTrayVisibleOff}
          onVisibilityChange={handleTrayVisibilityChange}
          styles={{
            header: headerStyles,
          }}
          title={
            <VStack gap={1.5}>
              <Pictogram name="addWallet" />
              <Text font="title3">Header</Text>
            </VStack>
          }
          verticalDrawerPercentageOfView={0.9}
        >
          <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
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

export default TrayIllustrationScreen;
