// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=355-14414
// source=packages/web/src/controls/ControlGroup.tsx
// component=ControlGroup
import figma from 'figma';

// The Figma RadioGroup component maps to ControlGroup with ControlComponent={Radio} and role="radiogroup".
// The 'quantity' Figma variant (1–5) controls how many radio items are displayed in the
// design preview — in code, the count is determined by the length of the options array.

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<ControlGroup
  ControlComponent={Radio}
  label="Group label"
  name="radio-group"
  onChange={(e) => {}}
  options={[
    { value: 'option-1', label: 'Option 1' },
    { value: 'option-2', label: 'Option 2' },
    { value: 'option-3', label: 'Option 3' },
  ]}
  role="radiogroup"
  value={selectedValue}
/>`,
  imports: ['import { ControlGroup, Radio } from "@coinbase/cds-web/controls"'],
  id: 'radio-group',
  metadata: { nestable: false },
};
