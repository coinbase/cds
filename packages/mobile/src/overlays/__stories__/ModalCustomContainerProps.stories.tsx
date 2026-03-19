import React, { useCallback, useState } from 'react';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Modal } from '../modal/Modal';
import { ModalBody } from '../modal/ModalBody';
import { ModalFooter } from '../modal/ModalFooter';
import { ModalHeader } from '../modal/ModalHeader';

const ModalCustomContainerPropsScreen = () => {
  const [visible, setVisible] = useState(true);
  const handleClose = useCallback(() => setVisible(false), []);
  const handleOpen = useCallback(() => setVisible(true), []);

  return (
    <ExampleScreen>
      <Example title="Modal with custom container props">
        <Button onPress={handleOpen}>Open Modal</Button>
        <Modal onRequestClose={handleClose} visible={visible}>
          <ModalHeader
            background="bgSecondary"
            closeAccessibilityLabel="Close"
            paddingX={4}
            paddingY={3}
            title="Custom Container Props"
          />
          <ModalBody>
            <LoremIpsum />
          </ModalBody>
          <ModalFooter
            background="bgSecondary"
            direction="vertical"
            paddingX={4}
            paddingY={3}
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

export default ModalCustomContainerPropsScreen;
