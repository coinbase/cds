// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=17685-3171
// source=packages/web/src/page/PageHeader.tsx
// component=PageHeader
import figma from 'figma';

const instance = figma.selectedInstance;

// type (VARIANT): L1 | L2
// L1: Logo Mark in start; L2: back/nav IconButton in start
const type = instance.getEnum('type', {
  L1: 'L1',
  L2: 'L2',
});

// stepper (VARIANT): 'false' | 'true'
// When true, the horizontal stepper fills the title slot instead of the title text
const showStepper = instance.getEnum('stepper', {
  false: false,
  true: true,
});

// Overall slot visibility
const showStart = instance.getBoolean('show start');
const showEnd = instance.getBoolean('show end');

// Title sub-toggle
const showPageTitle = instance.getBoolean('show page title');

// End slot sub-toggles
const showLink = instance.getBoolean('↳ show link');
const showClose = instance.getBoolean('↳ show close');
const showIconButtons = instance.getBoolean('↳ show icon buttons');

// ---- Resolve `start` slot ----
// L1 type uses a Logo Mark; L2 type uses a back navigation IconButton
let startCode;
if (showStart) {
  if (type === 'L1') {
    const logoMark = instance.findInstance('Logo Mark ');
    if (logoMark && logoMark.type === 'INSTANCE') {
      startCode = logoMark.executeTemplate().example;
    }
  } else {
    // L2 — the left back/navigation button is the first IconButton in document order
    const iconButton = instance.findInstance('IconButton');
    if (iconButton && iconButton.type === 'INSTANCE') {
      startCode = iconButton.executeTemplate().example;
    }
  }
}

// ---- Resolve `title` slot ----
// When stepper=true, the horizontal stepper component fills the title slot.
// Otherwise, a text title is shown when show page title=true.
let stepperCode;
let titleText;
if (showStepper) {
  const stepperInst = instance.findInstance('horizontal stepper');
  if (stepperInst && stepperInst.type === 'INSTANCE') {
    stepperCode = stepperInst.executeTemplate().example;
  }
} else if (showPageTitle) {
  const pageTitleHandle = instance.findText('Page title');
  titleText = pageTitleHandle.type === 'TEXT' ? pageTitleHandle.textContent : 'Page title';
}

// ---- Resolve `end` slot ----
// The end slot can contain a link Button (show link), a close IconButton (show close),
// or additional icon action buttons (show icon buttons).
let buttonCode;
if (showLink) {
  const buttonInst = instance.findInstance('Button');
  if (buttonInst && buttonInst.type === 'INSTANCE') {
    buttonCode = buttonInst.executeTemplate().example;
  }
}

let closeCode;
if (showClose || showIconButtons) {
  // Collect all connected icon-buttons; for L2 with a visible start, the first
  // connected icon-button is the left back button — slice it off to get end icons only
  const iconButtons = instance.findConnectedInstances((n) => n.codeConnectId() === 'icon-button');
  const endIconButtons = type === 'L2' && showStart ? iconButtons.slice(1) : iconButtons;
  const endIconButton = endIconButtons[endIconButtons.length - 1];
  if (endIconButton && endIconButton.type === 'INSTANCE') {
    closeCode = endIconButton.executeTemplate().example;
  }
}

let endCode;
if (showEnd) {
  if (buttonCode && closeCode) {
    endCode = figma.code`<HStack gap={1} alignItems="center">
  ${buttonCode}
  ${closeCode}
</HStack>`;
  } else {
    endCode = buttonCode ?? closeCode;
  }
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<PageHeader
  ${startCode ? figma.code`start={${startCode}}` : ''}
  ${stepperCode ? figma.code`title={${stepperCode}}` : titleText ? figma.code`title="${titleText}"` : ''}
  ${endCode ? figma.code`end={${endCode}}` : ''}
/>`,
  imports: [
    'import { PageHeader } from "@coinbase/cds-web/page"',
    'import { HStack } from "@coinbase/cds-web/layout"',
  ],
  id: 'page-header',
  metadata: { nestable: false },
};
