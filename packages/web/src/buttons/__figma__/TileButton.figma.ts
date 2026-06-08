// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=286-18370
// source=packages/web/src/buttons/TileButton.tsx
// component=TileButton
import figma from 'figma';

const instance = figma.selectedInstance;

// title maps to the "product text" TEXT property in Figma
const title = instance.getString('product text');

// disabled is a VARIANT with string "true"/"false" values in Figma
const isDisabled = instance.getEnum('disabled', { true: true, false: false });

// state (default/hover/focus) has no code equivalent — these are interaction states only
// product logo (INSTANCE_SWAP) has no code equivalent — the pictogram prop expects a string
// name (e.g. "coinbaseLogoNavigation") that cannot be derived from the Figma instance swap handle

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<TileButton
  title="${title}"
  ${isDisabled ? 'disabled' : ''}
/>`,
  imports: ['import { TileButton } from "@coinbase/cds-web/buttons"'],
  id: 'tile-button',
  metadata: { nestable: true },
};
