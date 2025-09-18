import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-native';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Overlay } from '../overlay/Overlay';
import { useOverlayAnimation } from '../overlay/useOverlayAnimation';

const OverlayScreen = () => {
  const [visible, setVisible] = useState(false);
  const setVisibleToOn = useCallback(() => setVisible(true), []);
  const setVisibleToOff = useCallback(() => setVisible(false), []);
  const [opacity, animateOverlayIn, animateOverlayOut] = useOverlayAnimation();

  const openModal = useCallback(() => {
    setVisibleToOn();
    animateOverlayIn.start();
  }, [animateOverlayIn, setVisibleToOn]);

  const closeModal = useCallback(() => {
    animateOverlayOut.start(({ finished }) => {
      if (finished) setVisibleToOff();
    });
  }, [animateOverlayOut, setVisibleToOff]);

  useEffect(() => {
    openModal();

    return () => closeModal();
  }, [closeModal, openModal]);

  return (
    <ExampleScreen>
      <Example>
        <Button onPress={openModal}>Open Overlay</Button>
        <Modal
          hardwareAccelerated
          statusBarTranslucent
          transparent
          animationType="none"
          visible={visible}
        >
          <Overlay onTouchStart={closeModal} opacity={opacity} />
        </Modal>
      </Example>
    </ExampleScreen>
  );
};

export default OverlayScreen;
