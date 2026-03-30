import React, { useCallback } from 'react';
import { useAlert } from '@coinbase/cds-common/overlays/useAlert';
import { useModal } from '@coinbase/cds-common/overlays/useModal';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Text } from '../../typography/Text';
import { Alert } from '../Alert';
import { Modal } from '../modal/Modal';
import { ModalBody } from '../modal/ModalBody';
import { ModalFooter } from '../modal/ModalFooter';

const AlertOnModal = () => {
  const { openModal, closeModal } = useModal();
  const { open, close } = useAlert();

  const showAlert = useCallback(
    () =>
      open(
        <Alert
          visible
          body="Alert body type that can run over multiple lines, but should be kept short."
          onPreferredActionPress={close}
          onRequestClose={close}
          pictogram="warning"
          preferredActionLabel="Primary"
          title="Alert title"
        />,
      ),
    [open, close],
  );

  const handlePress = useCallback(() => {
    openModal(
      <Modal visible onRequestClose={closeModal}>
        <ModalBody>
          <Text font="body">Test Modal</Text>
        </ModalBody>
        <ModalFooter
          primaryAction={<Button onPress={showAlert}>Show Alert</Button>}
          secondaryAction={<Button onPress={closeModal}>Cancel</Button>}
        />
      </Modal>,
    );
  }, [closeModal, openModal, showAlert]);

  return <Button onPress={handlePress}>Open</Button>;
};

const AlertOverModalScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Alert over Modal (Multiple Modals)">
        <AlertOnModal />
      </Example>
    </ExampleScreen>
  );
};

export default AlertOverModalScreen;
