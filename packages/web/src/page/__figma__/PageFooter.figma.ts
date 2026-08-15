// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=17685-3266
// source=packages/web/src/page/PageFooter.tsx
// component=PageFooter
import figma from 'figma';

const instance = figma.selectedInstance;

// show legal text (BOOLEAN) — maps to the optional legalText prop
const showLegalText = instance.getBoolean('show legal text');

// # of actions (VARIANT): "1" = single Button, "2" = ButtonGroup
// Resolve the action slot dynamically from the descendant instances
const buttonGroupInstance = instance.findInstance('ButtonGroup');
const buttonInstance = instance.findInstance('Button');

let actionCode;
if (buttonGroupInstance && buttonGroupInstance.type === 'INSTANCE') {
  actionCode = buttonGroupInstance.executeTemplate().example;
} else if (buttonInstance && buttonInstance.type === 'INSTANCE') {
  actionCode = buttonInstance.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<PageFooter
  action={${actionCode}}
  ${showLegalText ? figma.code`legalText="Your legal text here"` : ''}
/>`,
  imports: ['import { PageFooter } from "@coinbase/cds-web/page"'],
  id: 'page-footer',
  metadata: { nestable: false },
};
