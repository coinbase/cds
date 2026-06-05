// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=155-10032
// source=packages/mobile/src/controls/ControlGroup.tsx
// component=ControlGroup
import figma from 'figma';

// The Figma CheckboxGroup component maps to ControlGroup with ControlComponent={Checkbox}.
// The 'quantity' Figma variant (1–5) controls how many checkbox items are displayed in the
// design preview — in code, the count is determined by the length of the options array.
// Note: mobile onChange receives (value, checked) instead of a React ChangeEvent.

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<ControlGroup
  ControlComponent={Checkbox}
  label="Group label"
  onChange={(value, checked) => {}}
  options={[
    { value: 'option-1', label: 'Option 1' },
    { value: 'option-2', label: 'Option 2' },
    { value: 'option-3', label: 'Option 3' },
  ]}
  role="group"
  value={selectedValues}
/>`,
  imports: ['import { Checkbox, ControlGroup } from "@coinbase/cds-mobile/controls"'],
  id: 'checkbox-group-mobile',
  metadata: { nestable: false },
};
