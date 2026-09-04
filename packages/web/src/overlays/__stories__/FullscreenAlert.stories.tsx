import React, { useCallback, useState } from 'react';

import { Button } from '../../buttons';
import { FullscreenAlert } from '../FullscreenAlert';

export default {
  title: 'Components/FullscreenAlert',
  component: FullscreenAlert,
};

export const Basic = () => {
  const [visible, setVisible] = useState(true);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);

  return (
    <>
      <Button onClick={setVisibleToTrue}>Open Alert</Button>
      <FullscreenAlert
        body="We're unable to connect to our card partner. Apologies for the inconvenience. Please try again later today or tomorrow."
        closeAccessibilityLabel="Close alert"
        dismissActionLabel="Cancel"
        heroSquare="errorApp500"
        onDismissActionPress={setVisibleToFalse}
        onPreferredActionPress={setVisibleToFalse}
        onRequestClose={setVisibleToFalse}
        preferredActionLabel="Try again"
        title="Connection trouble"
        visible={visible}
      />
    </>
  );
};

export const SingleAction = () => {
  const [visible, setVisible] = useState(true);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  return (
    <>
      <Button onClick={setVisibleToTrue}>Open Alert</Button>
      <FullscreenAlert
        body="We're unable to connect to our card partner. Apologies for the inconvenience. Please try again later today or tomorrow."
        closeAccessibilityLabel="Close alert"
        heroSquare="errorApp500"
        onPreferredActionPress={setVisibleToFalse}
        onRequestClose={setVisibleToFalse}
        preferredActionLabel="Try again"
        title="Connection trouble"
        visible={visible}
      />
    </>
  );
};
