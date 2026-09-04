// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=49598-10283
// source=packages/mobile/src/buttons/SlideButton.tsx
// component=SlideButton
import figma from 'figma';

const instance = figma.selectedInstance;

// Position represents the visual animation state of the slide handle.
// Start = unchecked, End = checked; Middle is a mid-slide animation state with no code equivalent.
const checked = instance.getEnum('Position', {
  Start: false,
  Middle: false,
  End: true,
});

// size maps directly — Figma uses the same t-shirt values as code
const size = instance.getEnum('size', {
  s: 's',
  m: 'm',
  l: 'l',
});

// Retrieve the unchecked and checked label text from the nested string.slide button instance
const uncheckedLabelHandle = instance.findText('default', { traverseInstances: true });
const uncheckedLabel =
  uncheckedLabelHandle.type === 'TEXT' ? uncheckedLabelHandle.textContent : undefined;

const checkedLabelHandle = instance.findText('loading', { traverseInstances: true });
const checkedLabel =
  checkedLabelHandle.type === 'TEXT' ? checkedLabelHandle.textContent : undefined;

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<SlideButton
  checked={${checked}}
  onChange={setChecked}
  ${uncheckedLabel ? figma.code`uncheckedLabel="${uncheckedLabel}"` : ''}
  ${checkedLabel ? figma.code`checkedLabel="${checkedLabel}"` : ''}
  ${size !== 'l' ? figma.code`size="${size}"` : ''}
/>`,
  imports: ['import { SlideButton } from "@coinbase/cds-mobile/buttons"'],
  id: 'slide-button-mobile',
  metadata: { nestable: false },
};
