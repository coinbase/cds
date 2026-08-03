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

// size: VARIANT "s"/"m"/"l" → size prop (defaults to 'l')
const size = instance.getEnum('size', { s: 's', m: 'm', l: 'l' });

// state: positive/negative map to the variant prop, read-only to readOnly, disabled to disabled.
// default, active-mobile, active-desktop, filled, and hover are interaction/display states with
// no code equivalent.
const state = instance.getEnum('state', {
  default: 'default',
  'active-mobile': 'default',
  'active-desktop': 'default',
  filled: 'default',
  hover: 'default',
  positive: 'positive',
  negative: 'negative',
  'read-only': 'read-only',
  disabled: 'disabled',
});
const variant = state === 'positive' || state === 'negative' ? state : undefined;
const readOnly = state === 'read-only';

// disabled: VARIANT "true"/"false" → disabled boolean prop
const disabledVariant = instance.getEnum('disabled', { true: true, false: false });
const disabled = disabledVariant || state === 'disabled';

// label string: TEXT → label prop (shown when show label is true)
const showLabel = instance.getBoolean('show label');
const labelString = instance.getString('label string');
const label = showLabel ? labelString : undefined;

// label inside: VARIANT "true"/"false" → labelVariant prop ('outside' is the default)
const labelInside = instance.getEnum('label inside', { true: true, false: false });
const labelVariant = label && labelInside ? 'inside' : undefined;

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

// required, show chip, search, show info icon, and the Select Input slot have no equivalent
// code props on Select.

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Select
  type="${type}"
  ${label ? figma.code`label="${label}"` : ''}
  placeholder="${placeholder}"
  ${labelVariant ? figma.code`labelVariant="${labelVariant}"` : ''}
  ${helperText ? figma.code`helperText="${helperText}"` : ''}
  ${variant ? figma.code`variant="${variant}"` : ''}
  ${size !== 'l' ? figma.code`size="${size}"` : ''}
  ${disabled ? 'disabled' : ''}
  ${readOnly ? 'readOnly' : ''}
  ${startNodeCode ? figma.code`startNode={${startNodeCode}}` : ''}
  options={[]}
  value={null}
  onChange={() => {}}
/>`,
  imports: ['import { Select } from "@coinbase/cds-mobile/alpha/select"'],
  id: 'select-mobile',
  metadata: { nestable: false },
};
