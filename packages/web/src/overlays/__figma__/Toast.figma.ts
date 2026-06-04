// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=8500-674
// source=packages/web/src/overlays/Toast.tsx
// component=Toast
import figma from 'figma';

const instance = figma.selectedInstance;

// The toast message text
const text = instance.getString('label');

// Whether an action button is shown (Figma VARIANT "true"/"false")
const hasAction = instance.getEnum('action', { true: true, false: false });

// Action button label from nested Button > string.button sub-component
let actionLabel = 'Action';
const actionLabelHandle = instance.findText('button-label', {
  traverseInstances: true,
  path: ['Button', 'string.button'],
});
if (actionLabelHandle && actionLabelHandle.type === 'TEXT') {
  actionLabel = actionLabelHandle.textContent;
}

// Figma close=false → code hideCloseButton=true (inverted mapping)
const hideCloseButton = instance.getEnum('close', { true: false, false: true });

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Toast
  text="${text}"
  ${hasAction ? figma.code`action={{ label: "${actionLabel}", onPress: () => {} }}` : ''}
  ${hideCloseButton ? 'hideCloseButton' : ''}
/>`,
  imports: ['import { Toast } from "@coinbase/cds-web/overlays"'],
  id: 'toast',
  metadata: { nestable: false },
};
