// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=283-19617
// source=packages/mobile/src/buttons/ButtonGroup.tsx
// component=ButtonGroup
import figma from 'figma';

const instance = figma.selectedInstance;

// orientation maps to direction (vertical) and block (full-width)
const orientation = instance.getEnum('orientation', {
  stacked: 'stacked',
  'side-by-side: hug': 'hug',
  'side-by-side:full-width': 'full-width',
});

const direction = orientation === 'stacked' ? 'vertical' : undefined;
const block = orientation === 'full-width';

// Resolve child Button instances — layer names vary by orientation and # of actions variant:
// # of actions=1: single "Button" layer
// # of actions=2 stacked: "top", "bottom"
// # of actions=2 side-by-side: "left", "right"
// # of actions=3 stacked: "top", "middle", "bottom"
// # of actions=3 side-by-side: "left", "middle", "right"
const buttonSingle = instance.findInstance('Button');
const buttonTop = instance.findInstance('top');
const buttonMiddle = instance.findInstance('middle');
const buttonBottom = instance.findInstance('bottom');
const buttonLeft = instance.findInstance('left');
const buttonRight = instance.findInstance('right');

let singleCode, topCode, middleCode, bottomCode, leftCode, rightCode;

if (buttonSingle && buttonSingle.type === 'INSTANCE') {
  singleCode = buttonSingle.executeTemplate().example;
}
if (buttonTop && buttonTop.type === 'INSTANCE') {
  topCode = buttonTop.executeTemplate().example;
}
if (buttonMiddle && buttonMiddle.type === 'INSTANCE') {
  middleCode = buttonMiddle.executeTemplate().example;
}
if (buttonBottom && buttonBottom.type === 'INSTANCE') {
  bottomCode = buttonBottom.executeTemplate().example;
}
if (buttonLeft && buttonLeft.type === 'INSTANCE') {
  leftCode = buttonLeft.executeTemplate().example;
}
if (buttonRight && buttonRight.type === 'INSTANCE') {
  rightCode = buttonRight.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<ButtonGroup${direction ? figma.code` direction="${direction}"` : ''}${block ? ' block' : ''}>
  ${singleCode}${topCode}${leftCode}${middleCode}${rightCode}${bottomCode}
</ButtonGroup>`,
  imports: ['import { ButtonGroup } from "@coinbase/cds-mobile/buttons"'],
  id: 'button-group-mobile',
  metadata: { nestable: false },
};
