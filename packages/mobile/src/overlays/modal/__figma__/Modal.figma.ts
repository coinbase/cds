// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=68-1065
// source=packages/mobile/src/overlays/modal/Modal.tsx
// component=Modal
import figma from 'figma';

const instance = figma.selectedInstance;

// Controls whether ModalHeader is rendered (Figma: "show header" variant)
const showHeader = instance.getEnum('show header', {
  true: true,
  false: false,
});

// Controls whether ModalFooter is rendered (Figma: "show footer" boolean)
const showFooter = instance.getBoolean('show footer');

// Header title text from the nested .Header descendant text layer
const titleHandle = instance.findText('title', { traverseInstances: true });
const title = titleHandle.type === 'TEXT' ? titleHandle.textContent : 'Modal Title';

// Content area from the swappable body placeholder
const contentInstance = instance.getInstanceSwap('🔄 replace me');
let contentCode;
if (contentInstance && contentInstance.type === 'INSTANCE') {
  contentCode = contentInstance.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Modal visible onRequestClose={() => {}}>
  ${
    showHeader
      ? figma.code`<ModalHeader
    closeAccessibilityLabel="Close"
    title="${title}"
  />`
      : ''
  }
  <ModalBody>
    ${contentCode}
  </ModalBody>
  ${
    showFooter
      ? figma.code`<ModalFooter
    primaryAction={<Button onPress={() => {}}>Confirm</Button>}
    secondaryAction={<Button onPress={() => {}} variant="secondary">Cancel</Button>}
  />`
      : ''
  }
</Modal>`,
  imports: [
    'import { Modal, ModalHeader, ModalBody, ModalFooter } from "@coinbase/cds-mobile/overlays"',
    'import { Button } from "@coinbase/cds-mobile/buttons"',
  ],
  id: 'modal-mobile',
  metadata: { nestable: false },
};
