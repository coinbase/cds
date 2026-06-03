// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=49598-4224
// source=packages/mobile/src/navigation/BrowserBar.tsx
// component=BrowserBar
import figma from 'figma';

const instance = figma.selectedInstance;

// Left action — maps to the `start` prop
const showLeftAction = instance.getBoolean('show left action');
const leftActionInstance = showLeftAction ? instance.getInstanceSwap('↳ left action') : null;
let startCode;
if (leftActionInstance && leftActionInstance.type === 'INSTANCE') {
  startCode = leftActionInstance.executeTemplate().example;
}

// Right actions — 1st is rightmost (more), 2nd is middle (tabs), 3rd is leftmost (browser)
// All three collectively map to the `end` prop, wrapped in HStack when multiple are present.
const show1stRight = instance.getBoolean('show 1st right action');
const show2ndRight = instance.getBoolean('show 2nd right action');
const show3rdRight = instance.getBoolean('show 3rd right action');

const firstRightInstance = show1stRight ? instance.getInstanceSwap('↳ 1st right action') : null;
const secondRightInstance = show2ndRight ? instance.getInstanceSwap('↳ 2nd right action') : null;
const thirdRightInstance = show3rdRight ? instance.getInstanceSwap('↳ 3rd right action') : null;

let firstRightCode;
if (firstRightInstance && firstRightInstance.type === 'INSTANCE') {
  firstRightCode = firstRightInstance.executeTemplate().example;
}
let secondRightCode;
if (secondRightInstance && secondRightInstance.type === 'INSTANCE') {
  secondRightCode = secondRightInstance.executeTemplate().example;
}
let thirdRightCode;
if (thirdRightInstance && thirdRightInstance.type === 'INSTANCE') {
  thirdRightCode = thirdRightInstance.executeTemplate().example;
}

const rightActionsCount = [firstRightCode, secondRightCode, thirdRightCode].filter(Boolean).length;

// Build the end snippet: HStack wrapper when multiple actions are present
let endCode;
if (rightActionsCount > 1) {
  // Visual order left-to-right: 3rd, 2nd, 1st
  endCode = figma.code`<HStack alignItems="center" gap={0.25}>${thirdRightCode}${secondRightCode}${firstRightCode}</HStack>`;
} else if (firstRightCode) {
  endCode = firstRightCode;
} else if (secondRightCode) {
  endCode = secondRightCode;
} else if (thirdRightCode) {
  endCode = thirdRightCode;
}

// Middle content — the search/URL input rendered inside BrowserBar as children
const searchInputInstance = instance.findInstance('SearchInput (Mobile)');
let childrenCode;
if (searchInputInstance && searchInputInstance.type === 'INSTANCE') {
  childrenCode = searchInputInstance.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<BrowserBar
  ${startCode ? figma.code`start={${startCode}}` : ''}
  ${endCode ? figma.code`end={${endCode}}` : ''}
>
  ${childrenCode}
</BrowserBar>`,
  imports: [
    'import { BrowserBar } from "@coinbase/cds-mobile/navigation"',
    'import { HStack } from "@coinbase/cds-mobile/layout"',
  ],
  id: 'browser-bar',
  metadata: { nestable: false },
};
