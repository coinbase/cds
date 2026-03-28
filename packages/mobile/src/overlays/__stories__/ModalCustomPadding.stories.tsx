import React, { useCallback, useState } from 'react';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Modal } from '../modal/Modal';
import { ModalBody } from '../modal/ModalBody';
import { ModalFooter } from '../modal/ModalFooter';
import { ModalHeader } from '../modal/ModalHeader';

export default function ModalCustomPaddingScreen() {
  const [visible, setVisible] = useState(false);
  const handleClose = useCallback(() => setVisible(false), []);
  const handleOpen = useCallback(() => setVisible(true), []);

  return (
    <ExampleScreen>
      <Example title="Modal with custom padding">
        <Button onPress={handleOpen}>Open</Button>
        <Modal onRequestClose={handleClose} visible={visible}>
          <ModalHeader
            closeAccessibilityLabel="Close"
            paddingX={0}
            paddingY={0}
            title="Custom Padding Modal"
          />
          <ModalBody paddingX={0} paddingY={0}>
            <LoremIpsum />
          </ModalBody>
          <ModalFooter
            paddingX={0}
            paddingY={0}
            primaryAction={<Button onPress={handleClose}>Save</Button>}
            secondaryAction={
              <Button onPress={handleClose} variant="secondary">
                Cancel
              </Button>
            }
          />
        </Modal>
      </Example>
    </ExampleScreen>
  );
}
