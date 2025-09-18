import React, { useCallback, useState } from 'react';

import { Button } from '../../buttons/Button';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Modal } from '../modal/Modal';
import { ModalBody } from '../modal/ModalBody';
import { ModalFooter } from '../modal/ModalFooter';
import { ModalHeader } from '../modal/ModalHeader';

type ModalA11yProps = {
  triggerRef?: React.RefObject<HTMLButtonElement>;
  focusTrigger?: () => void;
  accessibilityLabelledBy?: string;
  accessibilityLabel?: string;
};

type ModalOptions = {
  disablePortal?: boolean;
  visible?: boolean;
  hideDividers?: boolean;
  enableBackButton?: boolean;
  width?: number;
  focusTabIndexElements?: boolean;
};

const BasicModal: React.FC<React.PropsWithChildren<ModalA11yProps & ModalOptions>> = ({
  children,
  disablePortal,
  visible: defaultVisible,
  hideDividers,
  triggerRef,
  focusTrigger,
  enableBackButton,
  width,
  focusTabIndexElements,
}) => {
  const [visible, setVisible] = useState(defaultVisible ?? true);
  const setVisibleOn = useCallback(() => setVisible(true), [setVisible]);
  const setVisibleOff = useCallback(() => setVisible(false), [setVisible]);

  const handleBackButtonClick = enableBackButton ? setVisibleOff : undefined;

  return (
    <>
      <Button ref={triggerRef} onClick={setVisibleOn}>
        Open Modal
      </Button>
      <Modal
        disablePortal={disablePortal}
        focusTabIndexElements={focusTabIndexElements}
        hideDividers={hideDividers}
        onDidClose={focusTrigger}
        onRequestClose={setVisibleOff}
        visible={visible}
        width={width}
      >
        <ModalHeader
          backAccessibilityLabel="Back"
          closeAccessibilityLabel="Close"
          onBackButtonClick={handleBackButtonClick}
          testID="Basic Modal Test ID"
          title="Basic Modal"
        />
        <ModalBody testID="modal-body">{children || <LoremIpsum />}</ModalBody>
        <ModalFooter
          primaryAction={<Button onClick={setVisibleOff}>Save</Button>}
          secondaryAction={
            <Button onClick={setVisibleOff} variant="secondary">
              Cancel
            </Button>
          }
        />
      </Modal>
    </>
  );
};

export default {
  title: 'Interactive/Modal',
  component: BasicModal,
};
