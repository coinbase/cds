// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=89-3096
// source=packages/mobile/src/buttons/Button.tsx
// component=Button
import figma from 'figma';

const instance = figma.selectedInstance;

// Button label lives inside the nested string.button child instance
const labelHandle = instance.findText('button-label', { traverseInstances: true });
const label = labelHandle.type === 'TEXT' ? labelHandle.textContent : 'Button';

// variant maps directly — Figma uses the same lowercase values as code
const variant = instance.getEnum('variant', {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  negative: 'negative',
  positive: 'positive',
});

// state: loading and disabled map to props; hover/pressed are interaction-only states with no code equivalent
const state = instance.getEnum('state', {
  default: 'default',
  hover: 'hover',
  pressed: 'pressed',
  loading: 'loading',
  disabled: 'disabled',
});
const isLoading = state === 'loading';
const isDisabled = state === 'disabled';

// width: full → block, flush → flush="start" (direction is not tracked in Figma), hug → default
const width = instance.getEnum('width', {
  hug: 'hug',
  full: 'full',
  flush: 'flush',
});
const isBlock = width === 'full';
const isFlush = width === 'flush';

// size maps directly — Figma uses the same t-shirt values as code
const size = instance.getEnum('size', {
  l: 'l',
  m: 'm',
  s: 's',
  xs: 'xs',
});

// transparent is a VARIANT type with string "true"/"false" values
const isTransparent = instance.getEnum('transparent', { true: true, false: false });

// icon position: none, leading (start), trailing (end)
const iconPosition = instance.getEnum('icon', {
  none: 'none',
  leading: 'leading',
  trailing: 'trailing',
});

// Figma binds two icon swap slots to specific sizes: '↳ icon' to size=l and '↳ iconCompact' to
// size=s. Sizes m and xs have no icon layers yet, so they fall through to the '↳ icon' slot.
const iconInstance =
  size === 's' ? instance.getInstanceSwap('↳ iconCompact') : instance.getInstanceSwap('↳ icon');

let iconCode;
if (iconInstance && iconInstance.type === 'INSTANCE') {
  iconCode = iconInstance.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Button
  ${variant !== 'primary' ? figma.code`variant="${variant}"` : ''}
  ${isBlock ? 'block' : ''}
  ${size !== 'l' ? figma.code`size="${size}"` : ''}
  ${isTransparent ? 'transparent' : ''}
  ${isLoading ? 'loading' : ''}
  ${isDisabled ? 'disabled' : ''}
  ${isFlush ? figma.code`flush="start"` : ''}
  ${iconPosition === 'leading' && iconCode ? figma.code`start={${iconCode}}` : ''}
  ${iconPosition === 'trailing' && iconCode ? figma.code`end={${iconCode}}` : ''}
>
  ${label}
</Button>`,
  imports: ['import { Button } from "@coinbase/cds-mobile/buttons"'],
  id: 'button-mobile',
  metadata: { nestable: true },
};
