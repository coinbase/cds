import React, { useCallback, useRef, useState } from 'react';

import { Button } from '../../buttons/Button';
import { ListCell } from '../../cells/ListCell';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { VStack } from '../../layout';
import { StickyFooter } from '../../sticky-footer/StickyFooter';
import { Text } from '../../typography/Text';
import type { DrawerRefBaseProps } from '../drawer/Drawer';
import { Tray, TrayStickyFooter } from '../tray/Tray';

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
          handleBarVariant="inside"
          onCloseComplete={setIsTrayVisibleOff}
          onVisibilityChange={handleTrayVisibilityChange}
          title="Header"
        >
          {({ handleClose }) => (
            <TrayStickyFooter>
              <VStack paddingX={3}>
                <Text font="body">
                  Curabitur commodo nulla vel dolor vulputate vestibulum. Nulla et nisl molestie,
                  interdum lorem id, viverra.
                </Text>
              </VStack>
              <StickyFooter background="bg" elevation={2} paddingX={3}>
                <Button block onPress={handleClose}>
                  Close
                </Button>
              </StickyFooter>
            </TrayStickyFooter>
          )}
        </Tray>
      )}
    </>
  );
};

const MyTrayWithListCells = () => {
  const theme = useTheme();

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
          styles={{
            header: {
              paddingBottom: theme.space[1],
            },
          }}
          title="Header"
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
        </Tray>
      )}
    </>
  );
};

const MyTrayWithListCellsStickyFooter = () => {
  const theme = useTheme();
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
          styles={{
            header: {
              paddingBottom: theme.space[1],
            },
          }}
          title="Header"
        >
          {({ handleClose }) => (
            <TrayStickyFooter>
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
              <StickyFooter background="bg" elevation={2} paddingX={3}>
                <Button block onPress={handleClose}>
                  Close
                </Button>
              </StickyFooter>
            </TrayStickyFooter>
          )}
        </Tray>
      )}
    </>
  );
};

export default TrayStandardScreen;
