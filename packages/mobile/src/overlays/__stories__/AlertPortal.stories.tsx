import React, { useCallback } from 'react';
import { useAlert } from '@coinbase/cds-common/overlays/useAlert';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Alert } from '../Alert';
import { PortalProvider } from '../PortalProvider';

const PortalAlert = () => {
  return (
    <PortalProvider>
      <AlertExample />
    </PortalProvider>
  );
};

const AlertExample = () => {
  const { open, close } = useAlert();
  const handleAction = useCallback(() => console.log('pressed'), []);

  const showAlert = useCallback(
    () =>
      open(
        <Alert
          visible
          body="Alert body type that can run over multiple lines, but should be kept short."
          dismissActionLabel="Cancel"
          onPreferredActionPress={handleAction}
          onRequestClose={close}
          pictogram="warning"
          preferredActionLabel="Save"
          preferredActionVariant="negative"
          title="Alert title"
        />,
      ),
    [open, close, handleAction],
  );

  return <Button onPress={showAlert}>Open</Button>;
};

const AlertPortalScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Portal Alert">
        <PortalAlert />
      </Example>
    </ExampleScreen>
  );
};

export default AlertPortalScreen;
