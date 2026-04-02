import { memo, useState } from 'react';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@coinbase/cds-web/overlays';
import { Text } from '@coinbase/cds-web/typography/Text';

export const ModalExample = memo(() => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)} variant="secondary">
        Open Modal
      </Button>
      <Modal onRequestClose={() => setVisible(false)} visible={visible}>
        <ModalHeader closeAccessibilityLabel="Close modal" title="Confirm transaction" />
        <ModalBody>
          <VStack style={{ gap: 8 }}>
            <Text font="body">Are you sure you want to send 0.5 ETH?</Text>
          </VStack>
        </ModalBody>
        <ModalFooter primaryAction={<Button onClick={() => setVisible(false)}>Confirm</Button>} />
      </Modal>
    </>
  );
});
