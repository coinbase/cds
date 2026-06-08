// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=355-14414
// source=packages/mobile/src/controls/ControlGroup.tsx
// component=ControlGroup
import figma from 'figma';

// The Figma RadioGroup component maps to ControlGroup with ControlComponent={Radio} and role="radiogroup".
// The 'quantity' Figma variant (1–5) controls how many radio items are displayed in the
// design preview — in code, the count is determined by the length of the options array.
// Note: mobile onChange receives (value) instead of a React ChangeEvent.

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<ControlGroup
  ControlComponent={Radio}
  label="Group label"
  onChange={(value) => {}}
  options={[
    { value: 'option-1', label: 'Option 1' },
    { value: 'option-2', label: 'Option 2' },
    { value: 'option-3', label: 'Option 3' },
  ]}
  role="radiogroup"
  value={selectedValue}
/>`,
  imports: ['import { ControlGroup, Radio } from "@coinbase/cds-mobile/controls"'],
  id: 'radio-group-mobile',
  metadata: { nestable: false },
};
