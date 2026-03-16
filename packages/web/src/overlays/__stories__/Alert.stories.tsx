import React, { useCallback, useEffect, useState } from 'react';
import { useAlert } from '@coinbase/cds-common/overlays/useAlert';

import { Button } from '../../buttons/Button';
import { Alert } from '../Alert';
import { PortalProvider } from '../PortalProvider';

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    a11y: {
      options: {
        rules: {
          'color-contrast': { enabled: false },
        },
      },
    },
  },
};

const onPressConsole = () => console.log('pressed');

export const BasicAlert = () => {
  const [visible, setVisible] = useState(true);

  const toggleOn = useCallback(() => setVisible(true), []);
  const toggleOff = useCallback(() => setVisible(false), []);

  return (
    <>
      <Button onClick={toggleOn}>Show Alert</Button>
      <Alert
        body="Alert body type that can run over multiple lines, but should be kept short."
        dismissActionLabel="Cancel"
        onPreferredActionPress={onPressConsole}
        onRequestClose={toggleOff}
        pictogram="warning"
        preferredActionLabel="Primary"
        title="Alert title"
        visible={visible}
      />
    </>
  );
};

export const LongTitleAlert = () => {
  const [visible, setVisible] = useState(true);

  const toggleOn = useCallback(() => setVisible(true), []);
  const toggleOff = useCallback(() => setVisible(false), []);

  return (
    <>
      <Button onClick={toggleOn}>Show Alert</Button>
      <Alert
        body="Alert body type that can run over multiple lines, but should be kept short."
        dismissActionLabel="Cancel"
        onPreferredActionPress={onPressConsole}
        onRequestClose={toggleOff}
        pictogram="warning"
        preferredActionLabel="Primary"
        title="Multiline title should be centered"
        visible={visible}
      />
    </>
  );
};

const AlertExample = () => {
  const { open, close } = useAlert();

  const showAlert = useCallback(
    () =>
      open(
        <Alert
          visible
          body="Alert body type that can run over multiple lines, but should be kept short."
          dismissActionLabel="Cancel"
          onPreferredActionPress={onPressConsole}
          onRequestClose={close}
          pictogram="warning"
          preferredActionLabel="Save"
          preferredActionVariant="negative"
          title="Alert title"
        />,
      ),
    [open, close],
  );

  useEffect(() => {
    showAlert();
    return () => close();
  }, [close, showAlert]);

  return <Button onClick={showAlert}>Show Alert</Button>;
};

export const PortalAlert = () => {
  return (
    <PortalProvider>
      <AlertExample />
    </PortalProvider>
  );
};

export const SingleActionAlert = () => {
  const [visible, setVisible] = useState(true);

  const toggleOn = useCallback(() => setVisible(true), []);
  const toggleOff = useCallback(() => setVisible(false), []);

  return (
    <>
      <Button onClick={toggleOn}>Show Alert</Button>
      <Alert
        body="Alert body type that can run over multiple lines, but should be kept short."
        onPreferredActionPress={onPressConsole}
        onRequestClose={toggleOff}
        pictogram="warning"
        preferredActionLabel="Primary"
        title="Alert title"
        visible={visible}
      />
    </>
  );
};

export const AlertWithVerticalActions = () => {
  const [visible, setVisible] = useState(true);

  const toggleOn = useCallback(() => setVisible(true), []);
  const toggleOff = useCallback(() => setVisible(false), []);

  return (
    <>
      <Button onClick={toggleOn}>Show Alert</Button>
      <Alert
        actionLayout={'vertical'}
        body="Alert body type that can run over multiple lines, but should be kept short."
        dismissActionLabel="Cancel"
        onPreferredActionPress={onPressConsole}
        onRequestClose={toggleOff}
        pictogram="warning"
        preferredActionLabel="Primary"
        title="Alert title"
        visible={visible}
      />
    </>
  );
};
