import React, { useCallback, useState } from 'react';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { HStack } from '../../layout/HStack';
import { Text } from '../../typography/Text';
import { Modal } from '../modal/Modal';
import { ModalBody } from '../modal/ModalBody';
import { ModalFooter } from '../modal/ModalFooter';
import { ModalHeader } from '../modal/ModalHeader';

export default function ModalCustomHeaderScreen() {
  const [customFontVisible, setCustomFontVisible] = useState(false);
  const handleCustomFontClose = useCallback(() => setCustomFontVisible(false), []);
  const handleCustomFontOpen = useCallback(() => setCustomFontVisible(true), []);

  const [reactNodeVisible, setReactNodeVisible] = useState(false);
  const handleReactNodeClose = useCallback(() => setReactNodeVisible(false), []);
  const handleReactNodeOpen = useCallback(() => setReactNodeVisible(true), []);

  return (
    <ExampleScreen>
      <Example title="Custom Font Title">
        <Button onPress={handleCustomFontOpen}>Open</Button>
        <Modal onRequestClose={handleCustomFontClose} visible={customFontVisible}>
          <ModalHeader
            closeAccessibilityLabel="Close"
            font="title1"
            fontSize="display3"
            title="Large Title Modal"
          />
          <ModalBody>
            <LoremIpsum />
          </ModalBody>
          <ModalFooter
            primaryAction={<Button onPress={handleCustomFontClose}>Save</Button>}
            secondaryAction={
              <Button onPress={handleCustomFontClose} variant="secondary">
                Cancel
              </Button>
            }
          />
        </Modal>
      </Example>

      <Example title="ReactNode Title">
        <Button onPress={handleReactNodeOpen}>Open</Button>
        <Modal onRequestClose={handleReactNodeClose} visible={reactNodeVisible}>
          <ModalHeader
            closeAccessibilityLabel="Close"
            title={
              <HStack alignItems="center" gap={0.5} justifyContent="center">
                <Text font="title2">Custom Title</Text>
                <Text color="fgMuted" font="caption">
                  with subtitle
                </Text>
              </HStack>
            }
          />
          <ModalBody>
            <LoremIpsum />
          </ModalBody>
          <ModalFooter
            primaryAction={<Button onPress={handleReactNodeClose}>Save</Button>}
            secondaryAction={
              <Button onPress={handleReactNodeClose} variant="secondary">
                Cancel
              </Button>
            }
          />
        </Modal>
      </Example>
    </ExampleScreen>
  );
}
