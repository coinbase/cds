// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=14727-26365
// source=packages/web/src/multi-content-module/MultiContentModule.tsx
// component=MultiContentModule
import figma from 'figma';

const instance = figma.selectedInstance;

// Text properties
const headline = instance.getString('headline');
const description = instance.getString('description');
const showDescription = instance.getBoolean('show description');
const showIllustration = instance.getBoolean('show illustration');

// Variant properties — bordered is a string VARIANT ("true"/"false") in Figma
const bordered = instance.getEnum('bordered', { true: true, false: false });
const actionType = instance.getEnum('action type', {
  button: 'button',
  'button group': 'button group',
  'button + secondary content': 'button + secondary content',
  none: 'none',
});

// Illustration (pictogram prop) — only included when show illustration is true
const illustrationInstance = instance.getInstanceSwap('↳ illustration type');
let illustrationCode;
if (showIllustration && illustrationInstance && illustrationInstance.type === 'INSTANCE') {
  illustrationCode = illustrationInstance.executeTemplate().example;
}

// Primary content slot (children prop)
const contentInstance = instance.getInstanceSwap('↳ content type');
let childrenCode;
if (contentInstance && contentInstance.type === 'INSTANCE') {
  childrenCode = contentInstance.executeTemplate().example;
}

// Action area — resolved dynamically based on action type variant
let actionCode;
if (actionType === 'button') {
  const buttonInstance = instance.findInstance('Button');
  if (buttonInstance && buttonInstance.type === 'INSTANCE') {
    actionCode = buttonInstance.executeTemplate().example;
  }
} else if (actionType === 'button group') {
  const buttonGroupInstance = instance.findInstance('ButtonGroup');
  if (buttonGroupInstance && buttonGroupInstance.type === 'INSTANCE') {
    actionCode = buttonGroupInstance.executeTemplate().example;
  }
} else if (actionType === 'button + secondary content') {
  const secondaryInstance = instance.findInstance('mcm/secondary content + action');
  if (secondaryInstance && secondaryInstance.type === 'INSTANCE') {
    actionCode = secondaryInstance.executeTemplate().example;
  }
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<MultiContentModule
  title="${headline}"
  ${showDescription ? figma.code`description="${description}"` : ''}
  ${illustrationCode ? figma.code`pictogram={${illustrationCode}}` : ''}
  ${bordered ? 'bordered' : ''}
  ${actionCode ? figma.code`action={${actionCode}}` : ''}
>
  ${childrenCode}
</MultiContentModule>`,
  imports: ['import { MultiContentModule } from "@coinbase/cds-web/multi-content-module"'],
  id: 'multi-content-module',
  metadata: { nestable: false },
};
