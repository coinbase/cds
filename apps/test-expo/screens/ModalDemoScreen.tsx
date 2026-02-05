import { useState, useCallback } from 'react';
import { Text } from '@coinbase/cds-mobile/typography';
import { VStack } from '@coinbase/cds-mobile/layout';
import { Button } from '@coinbase/cds-mobile/buttons';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@coinbase/cds-mobile/overlays';

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

export function ModalDemoScreen() {
  const [visible, setVisible] = useState(false);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <VStack
      gap={4}
      padding={4}
      alignItems="center"
      justifyContent="center"
      style={{ flex: 1 }}
    >
      <Text font="title1">Modal Demo</Text>
      <Button onPress={openModal}>Open Modal</Button>

      <Modal visible={visible} onRequestClose={closeModal}>
        <ModalHeader title="Demo Modal" />
        <ModalBody>
          <Text font="body">{LOREM_IPSUM}</Text>
        </ModalBody>
        <ModalFooter primaryAction={<Button onPress={closeModal}>Close</Button>} />
      </Modal>
    </VStack>
  );
}
