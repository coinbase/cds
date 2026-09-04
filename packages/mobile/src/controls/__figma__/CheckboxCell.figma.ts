// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=54927-2772
// source=packages/mobile/src/controls/CheckboxCell.tsx
// component=CheckboxCell
import figma from 'figma';

const instance = figma.selectedInstance;

// --- property extractions ---
const title = instance.getString('title text');
const hasDescription = instance.getBoolean('description');
const descriptionText = instance.getString('description text');
const disabled = instance.getEnum('state', {
  active: false,
  hover: false,
  pressed: false,
  selected: false,
  focus: false,
  disabled: true,
});
const checked = instance.getEnum('selected', {
  true: true,
  false: false,
});

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<CheckboxCell
  title="${title}"
  ${hasDescription ? figma.code`description="${descriptionText}"` : ''}
  checked={${checked}}
  ${disabled ? 'disabled' : ''}
  value="option"
  onChange={(value, isChecked) => {}}
/>`,
  imports: ['import { CheckboxCell } from "@coinbase/cds-mobile/cells"'],
  id: 'checkbox-cell',
  metadata: { nestable: true },
};
