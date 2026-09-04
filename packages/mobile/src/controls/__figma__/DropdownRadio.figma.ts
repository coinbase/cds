// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=71452-1267
// source=packages/mobile/src/controls/ControlGroup.tsx
// component=ControlGroup
import figma from 'figma';

const instance = figma.selectedInstance;

// 'show section title' controls whether a group label is displayed.
// 'cells' (2–10) controls how many radio cells appear in the design preview —
// in code, the count is determined by the length of the options array.
// Note: mobile onChange receives (value) instead of a React ChangeEvent.
const showSectionTitle = instance.getBoolean('show section title');

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<ControlGroup
  ControlComponent={RadioCell}
  ${showSectionTitle ? figma.code`label="Section Title"` : ''}
  onChange={(value) => {}}
  options={[
    { value: 'option-1', title: 'Option 1' },
    { value: 'option-2', title: 'Option 2' },
    { value: 'option-3', title: 'Option 3' },
  ]}
  role="radiogroup"
  value={selectedValue}
/>`,
  imports: ['import { ControlGroup, RadioCell } from "@coinbase/cds-mobile/controls"'],
  id: 'dropdown-radio-mobile',
  metadata: { nestable: false },
};
