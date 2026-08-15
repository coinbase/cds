// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=155-9873
// source=packages/web/src/controls/Checkbox.tsx
// component=Checkbox
import figma from 'figma';

const instance = figma.selectedInstance;

// Label text lives inside the nested string.checkbox child instance
const labelHandle = instance.findText('label-option', { traverseInstances: true });
const label = labelHandle.type === 'TEXT' ? labelHandle.textContent : 'Label';

// show label controls whether children (label text) are rendered
const showLabel = instance.getBoolean('show label');

// checked, disabled, and indeterminate are VARIANT types with string "true"/"false" values
const checked = instance.getEnum('checked', { true: true, false: false });
const disabled = instance.getEnum('disabled', { true: true, false: false });
const indeterminate = instance.getEnum('indeterminate', { true: true, false: false });

// state (active, hover, pressed, focus) are interaction-only states with no code equivalent

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Checkbox
  checked={${checked}}
  ${indeterminate ? 'indeterminate' : ''}
  ${disabled ? 'disabled' : ''}
>
  ${showLabel ? label : ''}
</Checkbox>`,
  imports: ['import { Checkbox } from "@coinbase/cds-web/controls"'],
  id: 'checkbox',
  metadata: { nestable: true },
};
