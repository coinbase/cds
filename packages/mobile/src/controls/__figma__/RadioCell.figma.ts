// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=54927-2624
// source=packages/mobile/src/controls/RadioCell.tsx
// component=RadioCell
import figma from 'figma';

const instance = figma.selectedInstance;

// --- property extractions ---
const title = instance.getString('title text');
const hasDescription = instance.getBoolean('description');
const descriptionText = instance.getString('description text');
const disabled = instance.getEnum('state', {
  default: false,
  focused: false,
  hovered: false,
  pressed: false,
  disabled: true,
});
const checked = instance.getEnum('selected', {
  true: true,
  false: false,
});

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<RadioCell
  title="${title}"
  ${hasDescription ? figma.code`description="${descriptionText}"` : ''}
  checked={${checked}}
  ${disabled ? 'disabled' : ''}
  value="option"
  onChange={(value, checked) => {}}
/>`,
  imports: ['import { RadioCell } from "@coinbase/cds-mobile/cells"'],
  id: 'radio-cell',
  metadata: { nestable: true },
};
