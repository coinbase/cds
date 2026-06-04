// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=89-3096
// source=packages/web/src/buttons/Button.tsx
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

// compact and transparent are VARIANT types with string "true"/"false" values
const isCompact = instance.getEnum('compact', { true: true, false: false });
const isTransparent = instance.getEnum('transparent', { true: true, false: false });

// icon position: none, leading (start), trailing (end)
const iconPosition = instance.getEnum('icon', {
  none: 'none',
  leading: 'leading',
  trailing: 'trailing',
});

// Use the compact icon instance swap when compact, regular otherwise
const iconInstance = isCompact
  ? instance.getInstanceSwap('↳ iconCompact')
  : instance.getInstanceSwap('↳ icon');

let iconCode;
if (iconInstance && iconInstance.type === 'INSTANCE') {
  iconCode = iconInstance.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Button
  ${variant !== 'primary' ? figma.code`variant="${variant}"` : ''}
  ${isBlock ? 'block' : ''}
  ${isCompact ? 'compact' : ''}
  ${isTransparent ? 'transparent' : ''}
  ${isLoading ? 'loading' : ''}
  ${isDisabled ? 'disabled' : ''}
  ${isFlush ? figma.code`flush="start"` : ''}
  ${iconPosition === 'leading' && iconCode ? figma.code`start={${iconCode}}` : ''}
  ${iconPosition === 'trailing' && iconCode ? figma.code`end={${iconCode}}` : ''}
>
  ${label}
</Button>`,
  imports: ['import { Button } from "@coinbase/cds-web/buttons"'],
  id: 'button',
  metadata: { nestable: true },
};
