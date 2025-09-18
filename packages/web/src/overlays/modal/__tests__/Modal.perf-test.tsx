/* eslint-disable jest/expect-expect */
import { useCallback, useState } from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { measurePerformance } from 'reassure';

import { Button } from '../../../buttons/Button';
import type { ModalProps } from '../Modal';
import { Modal } from '../Modal';
import { ModalHeader } from '../ModalHeader';

const MockModal = (props: Pick<ModalProps, 'disableFocusTrap' | 'disablePortal'>) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleOpenModal = useCallback(() => {
    setIsVisible(true);
  }, []);
  const handleOnRequestClose = useCallback(() => {
    console.log('Modal closed');
  }, []);
  return (
    <>
      <Modal {...props} onRequestClose={handleOnRequestClose} visible={isVisible}>
        <ModalHeader title="Title" />
      </Modal>
      <Button onClick={handleOpenModal}>Click me</Button>
    </>
  );
};

describe('Modal performance tests', () => {
  it('renders a Modal when opened', async () => {
    const scenario = async () => {
      fireEvent.click(screen.getByRole('button'));
      await screen.findByRole('dialog');
    };
    await measurePerformance(<MockModal />, { scenario });
  });
  it('renders a Modal when opened without a FocusTrap', async () => {
    const scenario = async () => {
      fireEvent.click(screen.getByRole('button'));
      await screen.findByRole('dialog');
    };
    await measurePerformance(<MockModal disableFocusTrap />, { scenario });
  });
  it('renders a Modal when opened with portal disabled', async () => {
    const scenario = async () => {
      fireEvent.click(screen.getByRole('button'));
      await screen.findByRole('dialog');
    };
    await measurePerformance(<MockModal disablePortal />, { scenario });
  });
});
