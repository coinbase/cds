import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { Button } from '../../buttons/Button';
import { ListCell } from '../../cells/ListCell';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useSafeBottomPadding } from '../../hooks/useSafeBottomPadding';
import { useTheme } from '../../hooks/useTheme';
import { VStack } from '../../layout';
import { StickyFooter } from '../../sticky-footer/StickyFooter';
import { Text } from '../../typography/Text';
import type { DrawerRefBaseProps } from '../drawer/Drawer';
import { Tray } from '../tray/Tray';

export const TrayStandardScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Basic Tray">
        <MyTray />
      </Example>
      <Example title="With Sticky Footer">
        <MyTrayWithStickyFooter />
      </Example>
      <Example title="With ListCells">
        <MyTrayWithListCells />
      </Example>
      <Example title="With ListCells Sticky Footer">
        <MyTrayWithListCellsStickyFooter />
      </Example>
    </ExampleScreen>
  );
};

const MyTray = () => {
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
          title="Header"
        >
          <VStack paddingBottom={2} paddingX={3}>
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
            drawer: scrollContentStyle,
          }}
          title="Header"
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
              background="bg"
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
          title="Header"
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

export default TrayStandardScreen;
