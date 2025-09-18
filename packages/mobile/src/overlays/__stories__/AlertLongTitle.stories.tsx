import React, { useCallback, useState } from 'react';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Alert } from '../Alert';

const LongTitleAlert = () => {
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
        title="Multiline title should be centered"
        visible={visible}
      />
    </>
  );
};

const AlertLongTitleScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Long Title Alert">
        <LongTitleAlert />
      </Example>
    </ExampleScreen>
  );
};

export default AlertLongTitleScreen;
