// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=10177-5161
// source=packages/mobile/src/chips/InputChip.tsx
// component=InputChip
import figma from 'figma';

const instance = figma.selectedInstance;

// Label text
const label = instance.getString('↳ value');

// compact: VARIANT "true"/"false" → compact boolean prop
const compact = instance.getEnum('compact', { true: true, false: false });

// state: disabled maps to disabled prop; focused/hovered/pressed are interaction-only states
const disabled = instance.getEnum('state', {
  default: false,
  focused: false,
  hovered: false,
  pressed: false,
  disabled: true,
});

// show start: whether the start slot is populated
const showStart = instance.getEnum('show start', { true: true, false: false });

// show label: whether the label text is visible (false = icon-only chip)
const showLabel = instance.getEnum('show label', { true: true, false: false });

// The start element uses different instance swaps for compact vs regular mode
const startCompact = instance.getInstanceSwap('↳ startCompact');
const startRegular = instance.getInstanceSwap('↳ start');
const startHandle = compact ? startCompact : startRegular;
let startCode;
if (showStart && startHandle && startHandle.type === 'INSTANCE') {
  startCode = startHandle.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<InputChip
  ${compact ? 'compact' : ''}
  ${disabled ? 'disabled' : ''}
  ${startCode ? figma.code`start={${startCode}}` : ''}
>${showLabel ? label : ''}</InputChip>`,
  imports: ['import { InputChip } from "@coinbase/cds-mobile/chips"'],
  id: 'input-chip-mobile',
  metadata: { nestable: true },
};
