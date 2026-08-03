// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=10177-5222
// source=packages/web/src/alpha/select-chip/SelectChip.tsx
// component=SelectChip
import figma from 'figma';

const instance = figma.selectedInstance;

// Placeholder text shown in the chip when no value is selected
const placeholder = instance.getString('↳ value');

// size maps directly — Figma uses the same t-shirt values as ChipSize
const size = instance.getEnum('size', {
  s: 's',
  xs: 'xs',
});

// state: disabled maps to disabled prop; other states are interaction-only
const disabled = instance.getEnum('state', {
  default: false,
  focused: false,
  hovered: false,
  pressed: false,
  open: false,
  disabled: true,
});

// show start: whether the startNode slot is populated
const showStart = instance.getEnum('show start', { true: true, false: false });

// The start element uses different instance swaps for the xs vs s size
const startCompact = instance.getInstanceSwap('↳ startCompact');
const startRegular = instance.getInstanceSwap('↳ start');
const startHandle = size === 'xs' ? startCompact : startRegular;
let startCode;
if (showStart && startHandle && startHandle.type === 'INSTANCE') {
  startCode = startHandle.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<SelectChip
  ${size !== 's' ? figma.code`size="${size}"` : ''}
  ${disabled ? 'disabled' : ''}
  ${startCode ? figma.code`startNode={${startCode}}` : ''}
  onChange={() => {}}
  options={[]}
  placeholder="${placeholder}"
  value={null}
/>`,
  imports: ['import { SelectChip } from "@coinbase/cds-web/alpha/select-chip"'],
  id: 'select-chip',
  metadata: { nestable: true },
};
