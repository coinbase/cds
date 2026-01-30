import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import type { NativeScrollEvent, NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import type { IconName, PictogramName } from '@coinbase/cds-common/types';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { ListCell } from '../../cells/ListCell';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useSafeBottomPadding } from '../../hooks/useSafeBottomPadding';
import { useTheme } from '../../hooks/useTheme';
import { Pictogram } from '../../illustrations';
import { HStack, VStack } from '../../layout';
import { StickyFooter } from '../../sticky-footer/StickyFooter';
import { Text } from '../../typography/Text';
import type { DrawerRefBaseProps } from '../drawer/Drawer';
import { Tray, type TrayProps } from '../tray/Tray';

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
      <Example title="Floating Tray">
        <FloatingTrayExample />
      </Example>
      <Example title="Multi-Screen Tray">
        <MultiScreenTrayExample />
      </Example>
      <Example title="Illustration Tray">
        <IllustrationTrayExample />
      </Example>
      <Example title="Responsive Tray">
        <ResponsiveTrayExample />
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

// Composed Examples

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
  const theme = useTheme();
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), []);
  const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), []);

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = e.nativeEvent.contentOffset.y;
    setIsScrolled(scrollY > 0);
  }, []);

  const headerStyles = useMemo(
    () => ({
      borderBottomWidth: isScrolled ? 1 : 0,
      borderBottomColor: theme.color.bgLine,
    }),
    [theme, isScrolled],
  );

  return (
    <>
      <Button onPress={setIsTrayVisibleOn}>Open Floating Tray</Button>
      {isTrayVisible && (
        <FloatingTray
          onCloseComplete={setIsTrayVisibleOff}
          styles={{ header: headerStyles }}
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

type IllustrationTrayProps = Omit<TrayProps, 'title'> & {
  pictogramName: PictogramName;
  title: string;
};

function IllustrationTray({ pictogramName, title, children, ...props }: IllustrationTrayProps) {
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

const IllustrationTrayExample = () => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), []);
  const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), []);

  return (
    <>
      <Button onPress={setIsTrayVisibleOn}>Open Illustration Tray</Button>
      {isTrayVisible && (
        <IllustrationTray
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
        </IllustrationTray>
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

export default TrayStandardScreen;
