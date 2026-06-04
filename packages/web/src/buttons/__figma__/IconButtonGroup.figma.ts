// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=283-19688
// source=packages/web/src/buttons/ButtonGroup.tsx
// component=ButtonGroup
import figma from 'figma';

const instance = figma.selectedInstance;

// "# of actions" is a Figma-only variant controlling how many buttons appear.
// In code the number of children passed to ButtonGroup determines this.
// The IconButtonGroup variant (#of actions=2) always contains exactly 2 IconButton
// instances, both named "IconButton" in the layer — use findLayers to resolve them.
const iconButtonLayers = instance.findLayers((node) => node.name === 'IconButton');

const iconBtn1 = iconButtonLayers[0];
const iconBtn2 = iconButtonLayers[1];

let iconBtn1Code, iconBtn2Code;
if (iconBtn1 && iconBtn1.type === 'INSTANCE') {
  iconBtn1Code = iconBtn1.executeTemplate().example;
}
if (iconBtn2 && iconBtn2.type === 'INSTANCE') {
  iconBtn2Code = iconBtn2.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<ButtonGroup>
  ${iconBtn1Code}${iconBtn2Code}
</ButtonGroup>`,
  imports: ['import { ButtonGroup } from "@coinbase/cds-web/buttons"'],
  id: 'icon-button-group',
  metadata: { nestable: false },
};
