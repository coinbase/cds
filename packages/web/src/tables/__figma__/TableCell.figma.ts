// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=8298-12299
// source=packages/web/src/tables/TableCell.tsx
// component=TableCell
import figma from 'figma';

const instance = figma.selectedInstance;

// --- property extractions ---
const title = instance.getString('↳ title');
const subtitle = instance.getString('↳subtitle');
const showSubtitle = instance.getBoolean('show subtitle');
const showStart = instance.getBoolean('show start');
const showEnd = instance.getBoolean('show end');

// alignment: left → default (flex-start), right → flex-end
const alignment = instance.getEnum('alignment', {
  left: 'flex-start',
  right: 'flex-end',
});

// Start element (icon, avatar, etc.)
const startInstance = showStart ? instance.getInstanceSwap('↳ start') : null;
let startCode;
if (startInstance && startInstance.type === 'INSTANCE') {
  startCode = startInstance.executeTemplate().example;
}

// End element (icon, accessory, etc.)
const endInstance = showEnd ? instance.getInstanceSwap('↳ end') : null;
let endCode;
if (endInstance && endInstance.type === 'INSTANCE') {
  endCode = endInstance.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<TableCell
  title="${title}"
  ${showSubtitle ? figma.code`subtitle="${subtitle}"` : ''}
  ${alignment === 'flex-end' ? figma.code`justifyContent="flex-end"` : ''}
  ${startCode ? figma.code`start={${startCode}}` : ''}
  ${endCode ? figma.code`end={${endCode}}` : ''}
/>`,
  imports: ['import { TableCell } from "@coinbase/cds-web/tables"'],
  id: 'table-cell',
  metadata: { nestable: true },
};
