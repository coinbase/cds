import React, { useCallback, useState } from 'react';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Modal } from '../modal/Modal';
import { ModalBody } from '../modal/ModalBody';
import { ModalFooter } from '../modal/ModalFooter';
import { ModalHeader } from '../modal/ModalHeader';

const ModalBackButtonScreen = () => {
  const [visible, setVisible] = useState(true);
  const handleClose = useCallback(() => setVisible(false), []);
  const handleOpen = useCallback(() => setVisible(true), []);

  return (
    <ExampleScreen>
      <Example title="Back Button Modal">
        <Button onPress={handleOpen}>Open Modal</Button>
        <Modal onRequestClose={handleClose} visible={visible}>
          <ModalHeader
            backAccessibilityLabel="Back"
            closeAccessibilityLabel="Close"
            onBackButtonClick={handleClose}
            testID="Basic Modal Test ID"
            title="Basic Modal"
          />
          <ModalBody testID="modal-body">
            <LoremIpsum />
          </ModalBody>
          <ModalFooter
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
};

export default ModalBackButtonScreen;
