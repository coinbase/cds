// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=155-9979
// source=packages/mobile/src/controls/Radio.tsx
// component=Radio
import figma from 'figma';

const instance = figma.selectedInstance;

// Label text from the TEXT component property
const label = instance.getString('label');

// show label controls whether children (label text) are rendered
const showLabel = instance.getBoolean('show label');

// checked is a VARIANT type with string "true"/"false" values
const checked = instance.getEnum('checked', { true: true, false: false });

// state maps "disabled" to the disabled prop; other states (active, focus, hover, pressed) are interaction-only
const disabled = instance.getEnum('state', {
  active: false,
  focus: false,
  hover: false,
  pressed: false,
  disabled: true,
});

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Radio
  checked={${checked}}
  ${disabled ? 'disabled' : ''}
>
  ${showLabel ? label : ''}
</Radio>`,
  imports: ['import { Radio } from "@coinbase/cds-mobile/controls"'],
  id: 'radio-button',
  metadata: { nestable: true },
};
