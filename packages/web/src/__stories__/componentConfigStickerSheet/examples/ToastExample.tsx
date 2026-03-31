import { memo, useState } from 'react';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { Toast } from '@cbhq/cds-web/overlays/Toast';

export const ToastExample = memo(() => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)} variant="secondary">
        Show Toast
      </Button>
      {visible && (
        <Toast
          action={{ label: 'Undo', onPress: () => setVisible(false) }}
          onDidHide={() => setVisible(false)}
          text="Transaction submitted successfully"
        />
      )}
    </>
  );
});
