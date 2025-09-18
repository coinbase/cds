import React, { useCallback, useState } from 'react';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Alert } from '../Alert';

const SingleActionAlert = () => {
  const [visible, setVisible] = useState(true);

  const handleShow = useCallback(() => setVisible(true), []);
  const handleClose = useCallback(() => setVisible(false), []);
  const handleAction = useCallback(() => console.log('pressed'), []);

  return (
    <>
      <Button onPress={handleShow}>Show Alert</Button>
      <Alert
        body="Alert body type that can run over multiple lines, but should be kept short."
        onPreferredActionPress={handleAction}
        onRequestClose={handleClose}
        pictogram="warning"
        preferredActionLabel="Primary"
        title="Alert title"
        visible={visible}
      />
    </>
  );
};

const AlertSingleActionScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Single Action Alert">
        <SingleActionAlert />
      </Example>
    </ExampleScreen>
  );
};

export default AlertSingleActionScreen;
