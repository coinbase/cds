import React, { useCallback, useEffect } from 'react';
import { useModal } from '@cbhq/cds-common/overlays/useModal';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Modal } from '../modal/Modal';
import { ModalBody } from '../modal/ModalBody';
import { ModalFooter } from '../modal/ModalFooter';
import { ModalHeader } from '../modal/ModalHeader';

const ModalPortalScreen = () => {
  const { openModal, closeModal } = useModal();

  const handlePress = useCallback(
    () =>
      openModal(
        <Modal visible onRequestClose={closeModal}>
          <ModalHeader closeAccessibilityLabel="Close" title="Default Modal" />
          <ModalBody>
            <LoremIpsum />
          </ModalBody>
          <ModalFooter
            primaryAction={<Button onPress={closeModal}>Save</Button>}
            secondaryAction={
              <Button onPress={closeModal} variant="secondary">
                Cancel
              </Button>
            }
          />
        </Modal>,
      ),
    [openModal, closeModal],
  );

  useEffect(() => {
    handlePress();

    return () => closeModal();
  }, [closeModal, handlePress]);
  return (
    <ExampleScreen>
      <Example title="Portal Modal">
        <Button onPress={handlePress}>Open Modal</Button>
      </Example>
    </ExampleScreen>
  );
};

export default ModalPortalScreen;
