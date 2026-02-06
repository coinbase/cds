import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import type { NativeScrollEvent, NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import type { PictogramName } from '@coinbase/cds-common/types';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { ListCell } from '../../cells/ListCell';
import { Menu, SelectOption } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useSafeBottomPadding } from '../../hooks/useSafeBottomPadding';
import { useTheme } from '../../hooks/useTheme';
import { Pictogram } from '../../illustrations';
import { Box, HStack, VStack } from '../../layout';
import { StickyFooter } from '../../sticky-footer/StickyFooter';
import { Text } from '../../typography/Text';
import type { DrawerRefBaseProps } from '../drawer/Drawer';
import { Tray, type TrayProps } from '../tray/Tray';

import { options } from './Trays';

export const TrayRedesignScreen = () => {
  return (
    <ExampleScreen>
      {/* Standard Tray Examples */}
      <Example title="Basic Tray">
        <BasicTray />
      </Example>
      <Example title="With Sticky Footer">
        <TrayWithStickyFooter />
      </Example>
      <Example title="With ListCells">
        <TrayWithListCells />
      </Example>
      <Example title="With ListCells Sticky Footer">
        <TrayWithListCellsStickyFooter />
      </Example>

      {/* Illustration Tray Examples */}
      <Example title="Illustration Tray">
        <IllustrationTray />
      </Example>
      <Example title="Illustration with ListCells">
        <IllustrationTrayWithListCells />
      </Example>
      <Example title="Illustration with Sticky Footer">
        <IllustrationTrayWithStickyFooter />
      </Example>
      <Example title="Illustration with ListCells Sticky Footer">
        <IllustrationTrayWithListCellsStickyFooter />
      </Example>

      {/* Full Bleed Image Tray Examples */}
      <Example title="Full Bleed Image Tray">
        <FullBleedImageTray />
      </Example>
      <Example title="Full Bleed Image with ListCells">
        <FullBleedImageTrayWithListCells />
      </Example>
      <Example title="Full Bleed Image with Sticky Footer">
        <FullBleedImageTrayWithStickyFooter />
      </Example>
      <Example title="Full Bleed Image with ListCells Sticky Footer">
        <FullBleedImageTrayWithListCellsStickyFooter />
      </Example>

      {/* Composed Tray Examples */}
      <Example title="Floating Tray">
        <FloatingTrayExample />
      </Example>
      <Example title="Multi-Screen Tray">
        <MultiScreenTrayExample />
      </Example>
      <Example title="Composed Illustration Tray">
        <ComposedIllustrationTrayExample />
      </Example>
      <Example title="Responsive Tray">
        <ResponsiveTrayExample />
      </Example>
    </ExampleScreen>
  );
};

// ============================================================================
// Standard Tray Examples
// ============================================================================

const BasicTray = () => {
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

const TrayWithStickyFooter = () => {
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
          title="Header"
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

const TrayWithListCells = () => {
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
          headerElevation={isScrolled ? 2 : 0}
          onCloseComplete={setIsTrayVisibleOff}
          onVisibilityChange={handleTrayVisibilityChange}
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

const TrayWithListCellsStickyFooter = () => {
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
          headerElevation={isScrolled ? 2 : 0}
          onCloseComplete={setIsTrayVisibleOff}
          onVisibilityChange={handleTrayVisibilityChange}
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

// ============================================================================
// Illustration Tray Examples
// ============================================================================

const IllustrationTray = () => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
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

const IllustrationTrayWithListCells = () => {
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
          headerElevation={isScrolled ? 2 : 0}
          onCloseComplete={setIsTrayVisibleOff}
          onVisibilityChange={handleTrayVisibilityChange}
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

const IllustrationTrayWithStickyFooter = () => {
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

const IllustrationTrayWithListCellsStickyFooter = () => {
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
          headerElevation={isScrolled ? 2 : 0}
          onCloseComplete={setIsTrayVisibleOff}
          onVisibilityChange={handleTrayVisibilityChange}
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

// ============================================================================
// Full Bleed Image Tray Examples
// ============================================================================

const FULL_BLEED_IMAGE_URI =
  'https://static-assets.coinbase.com/design-system/placeholder/coinbaseHeader.jpg';

const FullBleedImageTray = () => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
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
                source={{ uri: FULL_BLEED_IMAGE_URI }}
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

const FullBleedImageTrayWithListCells = () => {
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
          header={
            <Text font="title3" paddingBottom={0.75} paddingTop={2} paddingX={3}>
              Header
            </Text>
          }
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
                source={{ uri: FULL_BLEED_IMAGE_URI }}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          }
          verticalDrawerPercentageOfView={0.9}
        >
          <ScrollView contentContainerStyle={scrollContentStyle}>
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

const FullBleedImageTrayWithStickyFooter = () => {
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
                source={{ uri: FULL_BLEED_IMAGE_URI }}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          }
        >
          <VStack paddingBottom={1} paddingX={3}>
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

const FullBleedImageTrayWithListCellsStickyFooter = () => {
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

  return (
    <>
      <Button onPress={setIsTrayVisibleOn}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          footer={({ handleClose }) => (
            <StickyFooter background="bgElevation2" elevation={isScrolled ? 2 : 0} paddingX={3}>
              <Button block onPress={handleClose}>
                Close
              </Button>
            </StickyFooter>
          )}
          handleBarVariant="inside"
          header={
            <Text font="title3" paddingBottom={0.75} paddingTop={2} paddingX={3}>
              Header
            </Text>
          }
          headerElevation={isScrolled ? 2 : 0}
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
                source={{ uri: FULL_BLEED_IMAGE_URI }}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
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

// ============================================================================
// Composed Tray Examples
// ============================================================================

type FloatingTrayProps = TrayProps & {
  offset?: number;
  borderRadiusValue?: number;
};

function FloatingTray({
  offset = 2,
  borderRadiusValue = 600,
  children,
  styles,
  ...props
}: FloatingTrayProps) {
  const safeBottomPadding = useSafeBottomPadding();
  const theme = useTheme();

  const offsetPx = theme.space[offset as keyof typeof theme.space];
  const borderRadius = theme.borderRadius[borderRadiusValue as keyof typeof theme.borderRadius];

  const floatingStyles: ViewStyle = useMemo(
    () => ({
      bottom: offsetPx + safeBottomPadding,
      left: offsetPx,
      right: offsetPx,
      borderRadius,
      width: 'auto',
    }),
    [offsetPx, safeBottomPadding, borderRadius],
  );

  const containerStyles: StyleProp<ViewStyle>[] = useMemo(
    () => [floatingStyles, styles?.container],
    [floatingStyles, styles?.container],
  );

  const drawerStyles: StyleProp<ViewStyle>[] = useMemo(
    () => [{ paddingBottom: 0 }, styles?.drawer],
    [styles?.drawer],
  );

  return (
    <Tray
      {...props}
      handleBarVariant="inside"
      styles={{
        ...styles,
        container: containerStyles,
        drawer: drawerStyles,
      }}
    >
      {children}
    </Tray>
  );
}

const FloatingTrayExample = () => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), []);
  const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), []);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = e.nativeEvent.contentOffset.y;
    setIsScrolled(scrollY > 0);
  }, []);

  return (
    <>
      <Button onPress={setIsTrayVisibleOn}>Open Floating Tray</Button>
      {isTrayVisible && (
        <FloatingTray
          headerElevation={isScrolled ? 2 : 0}
          onCloseComplete={setIsTrayVisibleOff}
          title="Example title"
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 0 }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            <VStack paddingBottom={2}>
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
            </VStack>
          </ScrollView>
        </FloatingTray>
      )}
    </>
  );
};

type Screen = {
  title: string;
  render: (props: { onNavigate: (index: number) => void }) => React.ReactNode;
};

type MultiScreenTrayProps = Omit<TrayProps, 'title' | 'children'> & {
  screens: Screen[];
  initialScreen?: number;
};

function MultiScreenTray({ screens, initialScreen = 0, ...props }: MultiScreenTrayProps) {
  const [currentScreen, setCurrentScreen] = useState(initialScreen);
  const screen = screens[currentScreen];

  const handleBack = useCallback(() => setCurrentScreen(0), []);
  const handleNavigate = useCallback((index: number) => setCurrentScreen(index), []);

  return (
    <Tray
      {...props}
      accessibilityLabel={screen.title}
      handleBarVariant="inside"
      title={
        <VStack alignItems="flex-start">
          {currentScreen > 0 && (
            <IconButton
              transparent
              accessibilityLabel="Go back"
              flush="start"
              name="backArrow"
              onPress={handleBack}
            />
          )}
          <Text font="title3">{screen.title}</Text>
        </VStack>
      }
    >
      {screen.render({ onNavigate: handleNavigate })}
    </Tray>
  );
}

const MultiScreenTrayExample = () => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), []);
  const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), []);

  const screens: Screen[] = useMemo(
    () => [
      {
        title: 'Settings',
        render: ({ onNavigate }) => (
          <ScrollView scrollEventThrottle={16}>
            <ListCell
              accessory="arrow"
              description="Manage your account settings"
              onPress={() => onNavigate(1)}
              spacingVariant="condensed"
              title="Account"
            />
            <ListCell
              accessory="arrow"
              description="Configure notification preferences"
              onPress={() => onNavigate(2)}
              spacingVariant="condensed"
              title="Notifications"
            />
            <ListCell
              accessory="arrow"
              description="Review privacy settings"
              onPress={() => onNavigate(3)}
              spacingVariant="condensed"
              title="Privacy"
            />
          </ScrollView>
        ),
      },
      {
        title: 'Account',
        render: () => (
          <VStack paddingX={3}>
            <Text color="fgMuted" paddingBottom={2}>
              Account settings content goes here.
            </Text>
          </VStack>
        ),
      },
      {
        title: 'Notifications',
        render: () => (
          <VStack paddingX={3}>
            <Text color="fgMuted" paddingBottom={2}>
              Notification preferences content goes here.
            </Text>
          </VStack>
        ),
      },
      {
        title: 'Privacy',
        render: () => (
          <VStack paddingX={3}>
            <Text color="fgMuted" paddingBottom={2}>
              Privacy settings content goes here.
            </Text>
          </VStack>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Button onPress={setIsTrayVisibleOn}>Open Multi-Screen Tray</Button>
      {isTrayVisible && <MultiScreenTray onCloseComplete={setIsTrayVisibleOff} screens={screens} />}
    </>
  );
};

type ComposedIllustrationTrayProps = Omit<TrayProps, 'title'> & {
  pictogramName: PictogramName;
  title: string;
};

function ComposedIllustrationTray({
  pictogramName,
  title,
  children,
  ...props
}: ComposedIllustrationTrayProps) {
  return (
    <Tray
      {...props}
      accessibilityLabel={title}
      handleBarVariant="inside"
      title={
        <VStack gap={1.5}>
          <Pictogram name={pictogramName} />
          <Text font="title3">{title}</Text>
        </VStack>
      }
    >
      {children}
    </Tray>
  );
}

const ComposedIllustrationTrayExample = () => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), []);
  const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), []);

  return (
    <>
      <Button onPress={setIsTrayVisibleOn}>Open Illustration Tray</Button>
      {isTrayVisible && (
        <ComposedIllustrationTray
          onCloseComplete={setIsTrayVisibleOff}
          pictogramName="addWallet"
          title="Section header"
        >
          <VStack paddingX={3}>
            <Text color="fgMuted" font="body" paddingBottom={2}>
              Curabitur commodo nulla vel dolor vulputate vestibulum. Nulla et nisl molestie,
              interdum lorem id, viverra.
            </Text>
          </VStack>
        </ComposedIllustrationTray>
      )}
    </>
  );
};

type ResponsiveTrayProps = TrayProps & {
  footerLabel?: string;
};

function ResponsiveTray({ footer, footerLabel, children, ...props }: ResponsiveTrayProps) {
  const resolvedFooter =
    footer ??
    (footerLabel
      ? ({ handleClose }: { handleClose: () => void }) => (
          <StickyFooter background="bgElevation2" paddingX={3}>
            <Button block onPress={handleClose}>
              {footerLabel}
            </Button>
          </StickyFooter>
        )
      : undefined);

  return (
    <Tray {...props} footer={resolvedFooter} handleBarVariant="inside">
      {children}
    </Tray>
  );
}

const ResponsiveTrayExample = () => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), []);
  const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), []);

  return (
    <>
      <Button onPress={setIsTrayVisibleOn}>Open Responsive Tray</Button>
      {isTrayVisible && (
        <ResponsiveTray
          footerLabel="Close"
          onCloseComplete={setIsTrayVisibleOff}
          title="Example title"
        >
          <VStack paddingX={3}>
            <Text color="fgMuted" paddingBottom={2}>
              Curabitur commodo nulla vel dolor vulputate vestibulum. Nulla et nisl molestie,
              interdum lorem id, viverra.
            </Text>
          </VStack>
        </ResponsiveTray>
      )}
    </>
  );
};

export default TrayRedesignScreen;
