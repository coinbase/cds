// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=71762-14938
// source=packages/mobile/src/alpha/select/Select.tsx
// component=Select
import figma from 'figma';

const instance = figma.selectedInstance;

// type: VARIANT "single select"/"multi-select" → type prop 'single'|'multi'
const type = instance.getEnum('type', {
  'single select': 'single',
  'multi-select': 'multi',
});

// disabled: VARIANT "true"/"false" → disabled boolean prop
const disabled = instance.getEnum('disabled', { true: true, false: false });

// compact: VARIANT "true"/"false" → compact boolean prop
const compact = instance.getEnum('compact', { true: true, false: false });

// state: only 'positive' and 'negative' map to the variant prop
// default, active-mobile, active-desktop, filled, hover, read-only are interaction/display states with no code equivalent
const state = instance.getEnum('state', {
  default: 'default',
  'active-mobile': 'default',
  'active-desktop': 'default',
  filled: 'default',
  hover: 'default',
  positive: 'positive',
  negative: 'negative',
  'read-only': 'default',
});
const variant = state !== 'default' ? state : undefined;

// label string: TEXT → label prop (shown when show label is true)
const showLabel = instance.getBoolean('show label');
const labelString = instance.getString('label string');
const label = showLabel ? labelString : undefined;

// helper text: TEXT → helperText prop (shown when show helper text is true)
const showHelperText = instance.getBoolean('show helper text');
const helperTextString = instance.getString('helper text');
const helperText = showHelperText ? helperTextString : undefined;

// placeholderText: TEXT → placeholder prop
const placeholder = instance.getString('placeholderText');

// start node: INSTANCE_SWAP → startNode prop (shown when show start is true)
const showStart = instance.getBoolean('show start');
const startSwap = showStart ? instance.getInstanceSwap('🔄 start') : null;
let startNodeCode;
if (startSwap && startSwap.type === 'INSTANCE') {
  startNodeCode = startSwap.executeTemplate().example;
}

// required, show chip, search, show info icon, before cursor text, after cursor text,
// and wireframe have no equivalent code props on Select.

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Select
  type="${type}"
  label="${label}"
  placeholder="${placeholder}"
  ${helperText ? figma.code`helperText="${helperText}"` : ''}
  ${variant ? figma.code`variant="${variant}"` : ''}
  ${compact ? 'compact' : ''}
  ${disabled ? 'disabled' : ''}
  ${startNodeCode ? figma.code`startNode={${startNodeCode}}` : ''}
  options={[]}
  value={null}
  onChange={() => {}}
/>`,
  imports: ['import { Select } from "@coinbase/cds-mobile/alpha/select"'],
  id: 'select-mobile',
  metadata: { nestable: false },
};
