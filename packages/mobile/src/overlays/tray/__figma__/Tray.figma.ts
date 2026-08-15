// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=74148-11495
// source=packages/mobile/src/overlays/tray/Tray.tsx
// component=Tray
import figma from 'figma';

const instance = figma.selectedInstance;

// The Figma "device" variant (mobile/desktop) has no direct code equivalent
// The Figma "type" variant (standard/illustration/full-bleed image) represents content
// type in the design file with no code equivalent

// Extract title from the nested SectionHeader's text layer
const titleHandle = instance.findText('section-title-label', { traverseInstances: true });
const title = titleHandle.type === 'TEXT' ? titleHandle.textContent : '';

// Extract content from the swappable placeholder inside the active variant
const contentInstance = instance.findInstance('🔄 Swap', { traverseInstances: true });
let contentCode;
if (contentInstance && contentInstance.type === 'INSTANCE') {
  contentCode = contentInstance.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Tray
  onCloseComplete={() => {}}
  ${title ? figma.code`title="${title}"` : ''}
>
  ${contentCode}
</Tray>`,
  imports: ['import { Tray } from "@coinbase/cds-mobile/overlays"'],
  id: 'tray-mobile',
  metadata: { nestable: false },
};
