// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=8298-12088
// source=packages/web/src/tables/TableHeader.tsx
// component=TableHeader
import figma from 'figma';

const instance = figma.selectedInstance;

// --- property extractions ---
const title = instance.getString('title');
const showSubtitle = instance.getBoolean('show subtitle');
const subtitle = instance.getString('↳ subtitle');

const alignment = instance.getEnum('alignment', {
  left: 'flex-start',
  right: 'flex-end',
});

const showStart = instance.getBoolean('show start');
const startIcon = showStart ? instance.getInstanceSwap('↳ start') : null;
let startCode;
if (startIcon && startIcon.type === 'INSTANCE') {
  startCode = startIcon.executeTemplate().example;
}

const showEnd = instance.getBoolean('show end');
const endIcon = showEnd ? instance.getInstanceSwap('↳ end') : null;
let endCode;
if (endIcon && endIcon.type === 'INSTANCE') {
  endCode = endIcon.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<TableHeader>
  <TableRow>
    <TableCell
      title="${title}"
      ${showSubtitle ? figma.code`subtitle="${subtitle}"` : ''}
      ${startCode ? figma.code`start={${startCode}}` : ''}
      ${endCode ? figma.code`end={${endCode}}` : ''}
      justifyContent="${alignment}"
    />
  </TableRow>
</TableHeader>`,
  imports: ['import { TableHeader, TableRow, TableCell } from "@coinbase/cds-web/tables"'],
  id: 'table-header',
  metadata: { nestable: true },
};
