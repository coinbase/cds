// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=19270-19118
// source=packages/mobile/src/section-header/SectionHeader.tsx
// component=SectionHeader
import figma from 'figma';

const instance = figma.selectedInstance;

// Title text lives inside the nested "string.section title" instance
const titleNode = instance.findText('section-title-label', { traverseInstances: true });
const title = titleNode && titleNode.type === 'TEXT' ? titleNode.textContent : 'Section Header';

// "type" variant determines whether/how balance is shown
const type = instance.getEnum('type', {
  default: 'default',
  'with balance (right)': 'right',
  'with balance (bottom)': 'bottom',
});

// For "with balance (right)", the balance is a plain text value
const balanceValue = instance.getString('value');

// For "with balance (bottom)", the Balance Header sub-component is used
const balanceHeader = instance.findInstance('Balance Header');
let balanceHeaderCode;
if (type === 'bottom' && balanceHeader && balanceHeader.type === 'INSTANCE') {
  balanceHeaderCode = balanceHeader.executeTemplate().example;
}

// Description text (controlled by show description boolean)
const showDescription = instance.getBoolean('show description');
const description = instance.getString('↳ string');

// Start slot (swappable instance shown when "show start" is true)
const showStart = instance.getBoolean('show start');
let startCode;
if (showStart) {
  const startInstance = instance.getInstanceSwap('↳ start');
  if (startInstance && startInstance.type === 'INSTANCE') {
    startCode = startInstance.executeTemplate().example;
  }
}

// End slot (swappable instance shown when "show end" is true)
const showEnd = instance.getBoolean('show end');
let endCode;
if (showEnd) {
  const endInstance = instance.getInstanceSwap('↳ end');
  if (endInstance && endInstance.type === 'INSTANCE') {
    endCode = endInstance.executeTemplate().example;
  }
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<SectionHeader
  title="${title}"
  ${startCode ? figma.code`start={${startCode}}` : ''}
  ${type === 'right' ? figma.code`balance="${balanceValue}"` : ''}
  ${type === 'bottom' && balanceHeaderCode ? figma.code`balance={${balanceHeaderCode}}` : ''}
  ${showDescription ? figma.code`description="${description}"` : ''}
  ${endCode ? figma.code`end={${endCode}}` : ''}
/>`,
  imports: ['import { SectionHeader } from "@coinbase/cds-mobile/section-header"'],
  id: 'section-header-mobile',
  metadata: { nestable: true },
};
