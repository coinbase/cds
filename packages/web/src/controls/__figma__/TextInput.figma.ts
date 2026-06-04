// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=252-16679
// source=packages/web/src/controls/TextInput.tsx
// component=TextInput
import figma from 'figma';

const instance = figma.selectedInstance;

// Label text from the ↳ label string TEXT property
const label = instance.getString('↳ label string');

// state maps to variant for semantic states (positive/negative) or readOnly;
// default, filled, active, active typing are interaction-only states with no direct code equivalent
const state = instance.getEnum('state', {
  default: 'default',
  filled: 'filled',
  active: 'active',
  'active typing': 'active typing',
  positive: 'positive',
  negative: 'negative',
  'read-only': 'read-only',
});
const variant = state === 'positive' ? 'positive' : state === 'negative' ? 'negative' : undefined;
const readOnly = state === 'read-only';

// disabled and compact are VARIANT types with string "true"/"false" values
const disabled = instance.getEnum('disabled', { true: true, false: false });
const compact = instance.getEnum('compact', { true: true, false: false });

// label inside controls labelVariant prop
const labelInside = instance.getEnum('label inside', { true: true, false: false });
const labelVariant = labelInside ? 'inside' : undefined;

// right align text maps to the align prop
const rightAlignText = instance.getEnum('right align text', { true: true, false: false });
const align = rightAlignText ? 'end' : undefined;

// start icon shown when show start is true (INSTANCE_SWAP)
const showStart = instance.getBoolean('show start');
const startIconHandle = showStart ? instance.getInstanceSwap('↳ start icon') : null;
let startCode;
if (startIconHandle && startIconHandle.type === 'INSTANCE') {
  startCode = startIconHandle.executeTemplate().example;
}

// end icon shown when show end is true (INSTANCE_SWAP)
const showEnd = instance.getBoolean('show end');
const endIconHandle = showEnd ? instance.getInstanceSwap('↳ end icon') : null;
let endCode;
if (endIconHandle && endIconHandle.type === 'INSTANCE') {
  endCode = endIconHandle.executeTemplate().example;
}

// Figma-only properties with no direct code equivalent:
// - show helper text: helperText visibility is controlled by providing a helperText value
// - show label: label visibility controlled by providing a label value
// - ↳ required: no TextInput prop to show a required asterisk indicator
// - show cursor: Figma-only cursor animation indicator
// - ↳ show suffix: suffix visibility driven by whether the suffix prop has a value
// - ↳ show end icon: redundant sub-visibility prop for the end icon
// - ↳ show helper icon: Figma-only helper text icon indicator
// - ↳ show info icon: Figma-only info icon indicator
// - wireframe: Figma-only wireframe rendering mode

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<TextInput
  label="${label}"
  placeholder="Enter value"
  ${variant ? figma.code`variant="${variant}"` : ''}
  ${disabled ? 'disabled' : ''}
  ${compact ? 'compact' : ''}
  ${labelVariant ? figma.code`labelVariant="${labelVariant}"` : ''}
  ${align ? figma.code`align="${align}"` : ''}
  ${readOnly ? 'readOnly' : ''}
  ${startCode ? figma.code`start={${startCode}}` : ''}
  ${endCode ? figma.code`end={${endCode}}` : ''}
/>`,
  imports: ['import { TextInput } from "@coinbase/cds-web/controls"'],
  id: 'text-input',
  metadata: { nestable: false },
};
