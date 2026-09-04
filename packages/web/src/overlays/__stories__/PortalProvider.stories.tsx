import { useState } from 'react';

import { Modal } from '../modal/Modal';
import { PortalNodes, PortalProvider } from '../PortalProvider';

export default {
  title: 'Components/PortalProvider',
  component: PortalProvider,
};

export const WithPortalNodes = () => {
  const [visible, setVisible] = useState(false);
  return (
    <PortalProvider renderPortals={false}>
      <div>Hello world</div>
      <button onClick={() => setVisible(true)} type="button">
        Show
      </button>
      <Modal onRequestClose={() => false} visible={visible}>
        Modal contents
        <button onClick={() => setVisible(false)} type="button">
          Hide
        </button>
      </Modal>
      <div>Test1</div>
      <div>Test2</div>
      <PortalNodes />
    </PortalProvider>
  );
};
