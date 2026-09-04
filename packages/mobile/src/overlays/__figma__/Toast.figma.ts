// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=8500-674
// source=packages/mobile/src/overlays/Toast.tsx
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

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Toast
  text="${text}"
  ${hasAction ? figma.code`action={{ label: "${actionLabel}", onPress: () => {} }}` : ''}
/>`,
  imports: ['import { Toast } from "@coinbase/cds-mobile/overlays"'],
  id: 'toast-mobile',
  metadata: { nestable: false },
};
