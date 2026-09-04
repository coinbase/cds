import React, { useCallback, useRef, useState } from 'react';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';

import { Button } from '../../buttons/Button';
import { Menu } from '../../controls/Menu';
import { SelectOption } from '../../controls/SelectOption';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useA11y } from '../../hooks/useA11y';
import { HStack } from '../../layout';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Text } from '../../typography/Text';
import type { DrawerRefBaseProps } from '../drawer/Drawer';
import { Modal } from '../modal/Modal';
import { ModalBody } from '../modal/ModalBody';
import { ModalHeader } from '../modal/ModalHeader';
import { Tray } from '../tray/Tray';

import { options } from './Trays';

const AccessibleTray = ({ title }: { title?: React.ReactNode }) => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const setIsTrayVisibleToTrue = useCallback(() => setIsTrayVisible(true), []);
  const [value, setValue] = useState<string>();
  const trayRef = useRef<DrawerRefBaseProps>(null);
  const triggerRef = useRef(null);
  const { setA11yFocus } = useA11y();

  const handleOptionPress = () => {
    trayRef.current?.handleClose();
  };

  const handleCloseTray = useCallback(() => {
    setIsTrayVisible(false);
    // return a11y focus to trigger
    setA11yFocus(triggerRef);
  }, [setA11yFocus]);

  return (
    <>
      <Button ref={triggerRef} onPress={setIsTrayVisibleToTrue}>
        Open
      </Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          handleBarAccessibilityLabel="This is a handlebar, double tap to dismiss the tray"
          onCloseComplete={handleCloseTray}
          title={title}
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

const TrayWithinTray = ({ title }: { title?: React.ReactNode }) => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const setIsTrayVisibleToTrue = useCallback(() => setIsTrayVisible(true), []);

  const [isInceptionTrayVisible, setIsInceptionTrayVisible] = useState(false);
  const setIsInceptionTrayVisibleToFalse = useCallback(() => setIsInceptionTrayVisible(false), []);
  const isBlurred = useRef<boolean>(false);

  const onTrayClose = useCallback(() => {
    setIsTrayVisible(false);
    if (!isBlurred.current) {
      setIsInceptionTrayVisible(true);
    }
    isBlurred.current = false;
  }, [isBlurred]);

  const handleBlur = useCallback(() => {
    isBlurred.current = true;
  }, []);

  return (
    <>
      <Button onPress={setIsTrayVisibleToTrue}>Open</Button>
      {isTrayVisible && (
        <Tray onBlur={handleBlur} onCloseComplete={onTrayClose} title={title}>
          {({ handleClose }) => {
            return (
              <>
                <HStack padding={3}>
                  <Text font="body">{loremIpsum.repeat(3)}</Text>
                </HStack>
                <HStack justifyContent="center">
                  <Button onPress={handleClose}>More options</Button>
                </HStack>
              </>
            );
          }}
        </Tray>
      )}
      {isInceptionTrayVisible && (
        <Tray onCloseComplete={setIsInceptionTrayVisibleToFalse} title={title}>
          {() => {
            return (
              <HStack padding={3}>
                <Text font="body">{loremIpsum.repeat(3)}</Text>
              </HStack>
            );
          }}
        </Tray>
      )}
    </>
  );
};

const TrayToModalFlow = ({ title }: { title?: React.ReactNode }) => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const setIsTrayVisibleToTrue = useCallback(() => setIsTrayVisible(true), []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const setIsModalVisibleToFalse = useCallback(() => setIsModalVisible(false), []);

  const handleTrayCloseComplete = useCallback(() => {
    setIsTrayVisible(false);
    setIsModalVisible(true);
  }, []);

  return (
    <>
      <Button onPress={setIsTrayVisibleToTrue}>Open Tray</Button>
      {isTrayVisible && (
        <Tray onCloseComplete={handleTrayCloseComplete} title={title}>
          {({ handleClose }) => {
            return (
              <>
                <HStack padding={3}>
                  <LoremIpsum />
                </HStack>
                <HStack justifyContent="center">
                  <Button onPress={handleClose}>Open Modal</Button>
                </HStack>
              </>
            );
          }}
        </Tray>
      )}
      <Modal onRequestClose={setIsModalVisibleToFalse} visible={isModalVisible}>
        <ModalHeader title="I am a Modal" />
        <ModalBody>
          <LoremIpsum />
          <Button onPress={setIsModalVisibleToFalse}>Close</Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export const TrayMiscScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Accessible Tray">
        <AccessibleTray />
      </Example>
      <Example title="Tray within a Tray">
        <TrayWithinTray />
      </Example>
      <Example title="Tray to Modal Flow">
        <TrayToModalFlow />
      </Example>
    </ExampleScreen>
  );
};

export default TrayMiscScreen;
