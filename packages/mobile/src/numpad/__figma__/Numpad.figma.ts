// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=14012-4589
// source=packages/mobile/src/numpad/Numpad.tsx
// component=Numpad
import figma from 'figma';

const instance = figma.selectedInstance;

// disabled is a VARIANT with string "false"/"true" values
const disabled = instance.getEnum('disabled', {
  false: false,
  true: true,
});

// show action button: dynamically find and render the Button descendant when visible
const showActionButton = instance.getBoolean('show action button');
const actionButton = showActionButton ? instance.findInstance('Button') : null;
let actionCode;
if (actionButton && actionButton.type === 'INSTANCE') {
  actionCode = actionButton.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Numpad
  onPress={(value) => {}}
  ${disabled ? 'disabled' : ''}
  ${actionCode ? figma.code`action={${actionCode}}` : ''}
/>`,
  imports: ['import { Numpad } from "@coinbase/cds-mobile"'],
  id: 'numpad',
  metadata: { nestable: false },
};
