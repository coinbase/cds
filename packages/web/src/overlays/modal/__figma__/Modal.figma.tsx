import { useCallback, useRef, useState } from 'react';
import { figma } from '@figma/code-connect';

import { Button } from '../../../buttons';
import { Modal } from '../Modal';
import { ModalBody } from '../ModalBody';
import { ModalFooter } from '../ModalFooter';
import { ModalHeader } from '../ModalHeader';

figma.connect(
  Modal,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=68-1065&m=dev',
  {
    imports: [
      "import { Modal } from '@coinbase/cds-web/overlays/Modal/Modal'",
      "import { ModalHeader } from '@coinbase/cds-web/overlays/Modal/ModalHeader'",
      "import { ModalFooter } from '@coinbase/cds-web/overlays/Modal/ModalFooter'",
      "import { ModalBody } from '@coinbase/cds-web/overlays/Modal/ModalBody'",
    ],
    props: {
      modalHeader: figma.nestedProps('.Modal Header', {
        // onBackButtonPress: figma.boolean('show back button', {
        //   true: () => {},
        //   false: undefined,
        // }),
        title: figma.boolean('show title', {
          true: figma.string('title'),
          false: undefined,
        }),
      }),
      modalFooter: figma.nestedProps('.Modal Footer', {
        secondaryAction: figma.boolean('show secondary', {
          true: <Button variant="secondary">Button</Button>,
          false: undefined,
        }),
      }),
      children: figma.instance('🔄 replace me'),
      hideDividers: figma.enum('height defined by', {
        content: true,
        container: undefined,
      }),
    },
    example: function Example({ modalHeader, modalFooter, children, ...props }) {
      const [visible, setVisible] = useState(true);
      const triggerRef = useRef<HTMLButtonElement>(null);
      const focusTrigger = useCallback(() => {
        triggerRef.current?.focus();
      }, []);
      return (
        <>
          <Button ref={triggerRef} onClick={() => setVisible(true)}>
            Open Modal
          </Button>
          <Modal
            onDidClose={focusTrigger}
            onRequestClose={() => setVisible(false)}
            visible={visible}
            {...props}
          >
            <ModalHeader title={modalHeader.title} />
            <ModalBody>{children}</ModalBody>
            <ModalFooter
              primaryAction={<Button>Button</Button>}
              secondaryAction={modalFooter.secondaryAction}
            />
          </Modal>
        </>
      );
    },
  },
);
