// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=10340-69579
// source=packages/mobile/src/sticky-footer/StickyFooter.tsx
// component=StickyFooter
import figma from 'figma';

const instance = figma.selectedInstance;

// compact: Figma uses string 'true'/'false' variant values → code boolean prop
const isCompact = instance.getEnum('compact', { true: true, false: false });

// Resolve child content dynamically via Code Connect IDs:
// buttons=1 → single Button instance; buttons=2 → ButtonGroup instance; buttons=none → no children
const buttonInstance = instance.findConnectedInstance('button-mobile');
const buttonGroupInstance = instance.findConnectedInstance('button-group-mobile');

let buttonCode;
if (buttonInstance && buttonInstance.type === 'INSTANCE') {
  buttonCode = buttonInstance.executeTemplate().example;
}

let buttonGroupCode;
if (buttonGroupInstance && buttonGroupInstance.type === 'INSTANCE') {
  buttonGroupCode = buttonGroupInstance.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<StickyFooter${isCompact ? ' compact' : ''}>
  ${buttonCode}${buttonGroupCode}
</StickyFooter>`,
  imports: ['import { StickyFooter } from "@coinbase/cds-mobile"'],
  id: 'sticky-footer-mobile',
  metadata: { nestable: false },
};
