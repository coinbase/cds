// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=276-23400
// source=packages/web/src/buttons/AvatarButton.tsx
// component=AvatarButton
import figma from 'figma';

const instance = figma.selectedInstance;

// compact is a VARIANT with string "true"/"false" values
const isCompact = instance.getEnum('compact', { true: true, false: false });

// disabled is a VARIANT with string "true"/"false" values
const isDisabled = instance.getEnum('disabled', { true: true, false: false });

// state: "selected" maps to the selected prop; active/focus/hover/pressed are interaction-only states
const state = instance.getEnum('state', {
  active: 'active',
  focus: 'focus',
  hover: 'hover',
  pressed: 'pressed',
  selected: 'selected',
});
const isSelected = state === 'selected';

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<AvatarButton
  ${isCompact ? 'compact' : ''}
  ${isSelected ? 'selected' : ''}
  ${isDisabled ? 'disabled' : ''}
/>`,
  imports: ['import { AvatarButton } from "@coinbase/cds-web/buttons"'],
  id: 'avatar-button',
  metadata: { nestable: true },
};
