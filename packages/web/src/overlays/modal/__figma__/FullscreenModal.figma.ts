// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=49476-6084
// source=packages/web/src/overlays/modal/FullscreenModal.tsx
// component=FullscreenModal
import figma from 'figma';

const instance = figma.selectedInstance;

// Primary content (required prop)
const primaryContentHandle = instance.getInstanceSwap('🔄 primary content');
let primaryContentCode;
if (primaryContentHandle && primaryContentHandle.type === 'INSTANCE') {
  primaryContentCode = primaryContentHandle.executeTemplate().example;
}

// Secondary content (optional prop)
const secondaryContentHandle = instance.getInstanceSwap('🔄 secondary content');
let secondaryContentCode;
if (secondaryContentHandle && secondaryContentHandle.type === 'INSTANCE') {
  secondaryContentCode = secondaryContentHandle.executeTemplate().example;
}

// Vertical divider between primary and secondary content areas
const showSecondaryContentDivider = instance.getBoolean('show verticalDivider');

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<FullscreenModal
  visible
  onRequestClose={() => {}}
  primaryContent={${primaryContentCode}}
  ${secondaryContentCode ? figma.code`secondaryContent={${secondaryContentCode}}` : ''}
  ${showSecondaryContentDivider ? 'showSecondaryContentDivider' : ''}
/>`,
  imports: ['import { FullscreenModal } from "@coinbase/cds-web/overlays"'],
  id: 'fullscreen-modal',
  metadata: { nestable: false },
};
