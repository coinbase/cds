import React, { useCallback, useRef, useState } from 'react';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { SectionHeader } from '../../section-header/SectionHeader';
import { StickyFooter } from '../../sticky-footer/StickyFooter';
import { Text } from '../../typography/Text';
import { ProgressBar } from '../../visualizations/ProgressBar';
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
          title={<SectionHeader paddingX={3} title="Trading activity" />}
        >
          {({ handleClose }) => (
            <TrayStickyFooter>
              <VStack paddingBottom={1} paddingX={3}>
                <Text color="fgMuted" font="body" paddingBottom={3}>
                  The percentage of Coinbase customers who increased or decreased their net position
                  in 00 over the past 24 hours through trading. What this means: Increased buying
                  activity can signal that the asset is gaining popularity. Last updated on May 2,
                  2023.
                </Text>
                <Text font="headline">What this means:</Text>
                <Text color="fgMuted" font="body" paddingBottom={3}>
                  Increased buying activity can signal that the asset is gaining popularity.
                </Text>
                <Text color="fgMuted" font="legal">
                  Last updated on May 2, 2023.
                </Text>
              </VStack>
              <StickyFooter paddingX={3}>
                <Button block onPress={handleClose} variant="secondary">
                  Got it
                </Button>
              </StickyFooter>
            </TrayStickyFooter>
          )}
        </Tray>
      )}
    </>
  );
};

export const WithProgressBar = () => {
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
          title={<SectionHeader paddingX={3} title="Section header" />}
        >
          {({ handleClose }) => (
            <TrayStickyFooter>
              <VStack paddingBottom={1} paddingX={3}>
                <Text color="fgMuted" font="body" paddingBottom={3}>
                  The percentage of this asset currently being held in cold storage. In order to
                  trade these funds, you will need to first unlock them from your cold storage
                  vault.
                </Text>
                <ProgressBar
                  accessibilityLabel="default progressbar"
                  color="bgInverse"
                  progress={0.5}
                />
                <HStack justifyContent="space-between" paddingTop={1.5}>
                  <VStack>
                    <Text font="label2">$1,863.90 · 50%</Text>
                    <Text color="fgMuted" font="label2">
                      Stored in vault
                    </Text>
                  </VStack>
                  <VStack>
                    <Text font="label2">$1,863.90</Text>
                    <Text color="fgMuted" font="label2">
                      Eligible
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
              <StickyFooter paddingX={3}>
                <Button block onPress={handleClose} variant="secondary">
                  Got it
                </Button>
              </StickyFooter>
            </TrayStickyFooter>
          )}
        </Tray>
      )}
    </>
  );
};

export const InformationalTrayScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Informational Tray">
        <Default />
      </Example>
      <Example title="With Progress Bar">
        <WithProgressBar />
      </Example>
    </ExampleScreen>
  );
};

export default InformationalTrayScreen;
