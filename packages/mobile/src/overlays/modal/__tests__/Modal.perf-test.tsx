/* eslint-disable jest/expect-expect */
import { useCallback, useState } from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { measurePerformance } from 'reassure';

import { Button } from '../../../buttons/Button';
import { Modal } from '../Modal';
import { ModalHeader } from '../ModalHeader';

const MockModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleOpenModal = useCallback(() => {
    setIsVisible(true);
  }, []);
  const handleOnRequestClose = useCallback(() => {
    console.log('Modal closed');
  }, []);
  return (
    <>
      <Modal onRequestClose={handleOnRequestClose} visible={isVisible}>
        <ModalHeader title="Title" />
      </Modal>
      <Button onPress={handleOpenModal}>Click me</Button>
    </>
  );
};

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('Modal performance tests', () => {
  it('renders a Modal when opened', async () => {
    const scenario = async () => {
      fireEvent.press(screen.getByRole('button'));
      await screen.findByRole('dialog');
    };
    await measurePerformance(<MockModal />, { scenario });
  });
});
