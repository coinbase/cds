import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useModal } from '@coinbase/cds-common/overlays/useModal';

import { Button } from '../../buttons/Button';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Modal, type ModalProps } from '../modal/Modal';
import { ModalBody } from '../modal/ModalBody';
import { ModalFooter } from '../modal/ModalFooter';
import { ModalHeader } from '../modal/ModalHeader';

export default {
  title: 'Components/Modal',
  component: Modal,
};

type ModalA11yProps = {
  triggerRef?: React.RefObject<HTMLButtonElement>;
  enableBackButton?: boolean;
  visible?: boolean;
};

const useTriggerFocus = () => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  return {
    triggerRef,
  };
};

const BasicModalExample: React.FC<
  React.PropsWithChildren<Omit<ModalProps, 'onRequestClose' | 'visible'> & ModalA11yProps>
> = ({
  children,
  disablePortal,
  visible: defaultVisible,
  hideDividers,
  triggerRef,
  enableBackButton,
  width,
  maxWidth,
  focusTabIndexElements,
}) => {
  const [visible, setVisible] = useState(defaultVisible ?? true);

  return (
    <>
      <Button ref={triggerRef} onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <Modal
        disablePortal={disablePortal}
        focusTabIndexElements={focusTabIndexElements}
        hideDividers={hideDividers}
        maxWidth={maxWidth}
        onRequestClose={() => setVisible(false)}
        visible={visible}
        width={width}
      >
        <ModalHeader
          backAccessibilityLabel="Back"
          closeAccessibilityLabel="Close"
          onBackButtonClick={enableBackButton ? () => setVisible(false) : undefined}
          testID="Basic Modal Test ID"
          title="Basic Modal"
        />
        <ModalBody tabIndex={0} testID="modal-body">
          {children}
        </ModalBody>
        <ModalFooter
          primaryAction={<Button onClick={() => setVisible(false)}>Save</Button>}
          secondaryAction={
            <Button onClick={() => setVisible(false)} variant="secondary">
              Cancel
            </Button>
          }
        />
      </Modal>
    </>
  );
};

const PortalModalExample: React.FC<React.PropsWithChildren<ModalA11yProps>> = ({
  children,
  triggerRef,
}) => {
  const { openModal, closeModal } = useModal();

  const handlePress = useCallback(
    () =>
      openModal(
        <Modal visible onRequestClose={closeModal}>
          <ModalHeader closeAccessibilityLabel="Close" title="Default Modal" />
          <ModalBody>{children}</ModalBody>
          <ModalFooter
            primaryAction={<Button onClick={closeModal}>Save</Button>}
            secondaryAction={
              <Button onClick={closeModal} variant="secondary">
                Cancel
              </Button>
            }
          />
        </Modal>,
      ),
    [openModal, closeModal, children],
  );

  useEffect(() => {
    handlePress();

    return () => closeModal();
  }, [closeModal, handlePress]);

  return (
    <Button ref={triggerRef} onClick={handlePress}>
      Open Modal
    </Button>
  );
};

export const BasicModal = () => {
  const { triggerRef } = useTriggerFocus();
  return (
    <BasicModalExample triggerRef={triggerRef}>
      <LoremIpsum />
    </BasicModalExample>
  );
};

export const CustomWidthModal = () => {
  const { triggerRef } = useTriggerFocus();
  return (
    <BasicModalExample triggerRef={triggerRef} width={300}>
      <LoremIpsum />
    </BasicModalExample>
  );
};

export const BackButtonModal = () => {
  const { triggerRef } = useTriggerFocus();
  return (
    <BasicModalExample enableBackButton triggerRef={triggerRef}>
      <LoremIpsum />
    </BasicModalExample>
  );
};

export const ModalWithoutPortal = () => {
  const { triggerRef } = useTriggerFocus();
  return (
    <BasicModalExample disablePortal triggerRef={triggerRef}>
      <LoremIpsum />
    </BasicModalExample>
  );
};

export const LongModal = () => {
  const { triggerRef } = useTriggerFocus();
  return (
    <BasicModalExample focusTabIndexElements triggerRef={triggerRef}>
      <LoremIpsum repeat={30} />
    </BasicModalExample>
  );
};

export const PortalModal = () => {
  const { triggerRef } = useTriggerFocus();
  return (
    <PortalModalExample triggerRef={triggerRef}>
      <LoremIpsum />
    </PortalModalExample>
  );
};

export const ChainedModals = () => {
  const { triggerRef } = useTriggerFocus();
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(true);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const closeFirstModal = () => {
    setIsFirstModalOpen(false);
    triggerRef?.current?.focus();
  };
  const openSecondModal = () => {
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(true);
  };

  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
    triggerRef?.current?.focus();
  };

  const goBackToFirstModal = () => {
    setIsSecondModalOpen(false);
    setIsFirstModalOpen(true);
  };

  return (
    <>
      <Button ref={triggerRef} onClick={() => setIsFirstModalOpen(true)}>
        Open Modal
      </Button>
      <Modal
        onRequestClose={closeFirstModal}
        restoreFocusOnUnmount={false}
        visible={isFirstModalOpen}
      >
        <ModalHeader
          backAccessibilityLabel="Back"
          closeAccessibilityLabel="Close"
          onBackButtonClick={closeFirstModal}
          testID="First Modal Test ID"
          title="First Modal"
        />
        <ModalBody tabIndex={0} testID="first-modal-body">
          <LoremIpsum />
        </ModalBody>
        <ModalFooter
          primaryAction={<Button onClick={openSecondModal}>Next</Button>}
          secondaryAction={
            <Button onClick={closeFirstModal} variant="secondary">
              Cancel
            </Button>
          }
        />
      </Modal>
      <Modal
        onRequestClose={closeSecondModal}
        restoreFocusOnUnmount={false}
        visible={isSecondModalOpen}
      >
        <ModalHeader
          backAccessibilityLabel="Back"
          closeAccessibilityLabel="Close"
          onBackButtonClick={goBackToFirstModal}
          testID="Second Modal Test ID"
          title="Second Modal"
        />
        <ModalBody tabIndex={0} testID="second-modal-body">
          <LoremIpsum />
        </ModalBody>
        <ModalFooter
          primaryAction={<Button onClick={closeSecondModal}>Close</Button>}
          secondaryAction={
            <Button onClick={closeSecondModal} variant="secondary">
              Cancel
            </Button>
          }
        />
      </Modal>
    </>
  );
};
