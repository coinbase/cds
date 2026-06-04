// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=155-11983
// source=packages/mobile/src/dots/DotStatusColor.tsx
// component=DotStatusColor
import figma from 'figma';

const instance = figma.selectedInstance;

const variant = instance.getEnum('variant', {
  positive: 'positive',
  warning: 'warning',
  negative: 'negative',
  primary: 'primary',
  foregroundMuted: 'foregroundMuted',
});

const size = instance.getEnum('size', {
  xs: 'xs',
  s: 's',
  m: 'm',
  l: 'l',
});

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<DotStatusColor variant="${variant}" size="${size}" />`,
  imports: ['import { DotStatusColor } from "@coinbase/cds-mobile/dots"'],
  id: 'dot-status-color-mobile',
  metadata: { nestable: true },
};
