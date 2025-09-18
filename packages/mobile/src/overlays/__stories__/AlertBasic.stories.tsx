import { useCallback, useState } from 'react';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Alert } from '../Alert';

const BasicAlert = () => {
  const [visible, setVisible] = useState(true);

  const handleShow = useCallback(() => setVisible(true), []);
  const handleClose = useCallback(() => setVisible(false), []);
  const handleAction = useCallback(() => console.log('pressed'), []);

  return (
    <>
      <Button onPress={handleShow}>Show Alert</Button>
      <Alert
        body="Alert body type that can run over multiple lines, but should be kept short."
        dismissActionLabel="Cancel"
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

const AlertBasicScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Basic Alert">
        <BasicAlert />
      </Example>
    </ExampleScreen>
  );
};

export default AlertBasicScreen;
