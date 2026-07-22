// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=47-358
// source=packages/web/src/buttons/IconButton.tsx
// component=IconButton
import figma from 'figma';

const instance = figma.selectedInstance;

// variant maps directly — Figma uses the same lowercase values as code; default is 'secondary'
const variant = instance.getEnum('variant', {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
});

// state: loading and disabled map to props; default/hover/pressed are interaction states with no code equivalent
const state = instance.getEnum('state', {
  default: 'default',
  hover: 'hover',
  pressed: 'pressed',
  loading: 'loading',
  disabled: 'disabled',
});
const isLoading = state === 'loading';
const isDisabled = state === 'disabled';

// compact and transparent are VARIANT types with string "true"/"false" values; code default for compact is true
const isCompact = instance.getEnum('compact', { true: true, false: false });
const isTransparent = instance.getEnum('transparent', { true: true, false: false });

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<IconButton
  name="add"
  ${variant !== 'secondary' ? figma.code`variant="${variant}"` : ''}
  ${!isCompact ? 'compact={false}' : ''}
  ${isTransparent ? 'transparent' : ''}
  ${isLoading ? 'loading' : ''}
  ${isDisabled ? 'disabled' : ''}
/>`,
  imports: ['import { IconButton } from "@coinbase/cds-web/buttons"'],
  id: 'icon-button',
  metadata: { nestable: true },
};
