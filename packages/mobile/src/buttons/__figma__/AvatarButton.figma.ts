// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=276-23400
// source=packages/mobile/src/buttons/AvatarButton.tsx
// component=AvatarButton
import figma from 'figma';

const instance = figma.selectedInstance;

// compact is a VARIANT with string "true"/"false" values
const isCompact = instance.getEnum('compact', { true: true, false: false });

// disabled is a VARIANT with string "true"/"false" values
const isDisabled = instance.getEnum('disabled', { true: true, false: false });

// state: active/focus/hover/pressed/selected are interaction-only states with no mobile code equivalent
// (the mobile AvatarButton does not expose a selected prop)

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<AvatarButton
  ${isCompact ? 'compact' : ''}
  ${isDisabled ? 'disabled' : ''}
/>`,
  imports: ['import { AvatarButton } from "@coinbase/cds-mobile/buttons"'],
  id: 'avatar-button-mobile',
  metadata: { nestable: true },
};
