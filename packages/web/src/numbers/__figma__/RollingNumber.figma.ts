// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=70552-507
// source=packages/web/src/numbers/RollingNumber/RollingNumber.tsx
// component=RollingNumber
import figma from 'figma';

// The Figma "Rolling Numbers" component has no exposed variant properties.
// It is a static representation of an animated number ticker.
// This template shows the most common usage: a currency-formatted balance.

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<RollingNumber
  value={12345.67}
  format={{ style: 'currency', currency: 'USD' }}
/>`,
  imports: ['import { RollingNumber } from "@coinbase/cds-web/numbers/RollingNumber"'],
  id: 'rolling-number',
  metadata: { nestable: false },
};
