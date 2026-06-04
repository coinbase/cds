// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=35-698
// source=packages/web/src/overlays/Alert.tsx
// component=Alert
import figma from 'figma';

const instance = figma.selectedInstance;

const title = instance.getString('title');
const body = instance.getString('body');
const showIllustration = instance.getBoolean('illustration');

const preferredActionVariant = instance.getEnum('type', {
  default: 'primary',
  destructive: 'negative',
});

const footerVariant = instance.getEnum('footer', {
  stacked: 'stacked',
  'single action': 'single-action',
  'side-by-side': 'side-by-side',
});

const hasDismissAction = footerVariant !== 'single-action';
const isVerticalLayout = footerVariant === 'stacked';

let preferredActionLabel = 'Confirm';
const preferredLabelHandle = instance.findText('button-label', {
  traverseInstances: true,
  path: ['preferredAction', 'string.button'],
});
if (preferredLabelHandle && preferredLabelHandle.type === 'TEXT') {
  preferredActionLabel = preferredLabelHandle.textContent;
}

let dismissActionLabel = 'Cancel';
const dismissLabelHandle = instance.findText('button-label', {
  traverseInstances: true,
  path: ['dismissAction', 'string.button'],
});
if (dismissLabelHandle && dismissLabelHandle.type === 'TEXT') {
  dismissActionLabel = dismissLabelHandle.textContent;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Alert
  visible
  title="${title}"
  body="${body}"
  preferredActionLabel="${preferredActionLabel}"
  ${preferredActionVariant !== 'primary' ? figma.code`preferredActionVariant="${preferredActionVariant}"` : ''}
  ${hasDismissAction ? figma.code`dismissActionLabel="${dismissActionLabel}"` : ''}
  ${isVerticalLayout ? figma.code`actionLayout="vertical"` : ''}
  ${showIllustration ? figma.code`pictogram="warning"` : ''}
  onRequestClose={() => {}}
/>`,
  imports: ['import { Alert } from "@coinbase/cds-web/overlays"'],
  id: 'alert',
  metadata: { nestable: false },
};
