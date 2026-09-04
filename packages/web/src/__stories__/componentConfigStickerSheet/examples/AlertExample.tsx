import { memo, useState } from 'react';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { Alert } from '@coinbase/cds-web/overlays/Alert';

export const AlertExample = memo(() => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)} variant="secondary">
        Show Alert
      </Button>
      <Alert
        body="This will remove the asset from your portfolio. You can always add it back later."
        dismissActionLabel="Cancel"
        onDismissActionPress={() => setVisible(false)}
        onPreferredActionPress={() => setVisible(false)}
        onRequestClose={() => setVisible(false)}
        preferredActionLabel="Remove"
        preferredActionVariant="negative"
        title="Remove asset?"
        visible={visible}
      />
    </>
  );
});
