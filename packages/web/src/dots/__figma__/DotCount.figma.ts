// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=155-11976
// source=packages/web/src/dots/DotCount.tsx
// component=DotCount
import figma from 'figma';

const instance = figma.selectedInstance;

// "type" maps to digit count — use representative numeric count values
const count = instance.getEnum('type', {
  'single digit': 8,
  '2 digits': 88,
  '3+ digits': 888,
});

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<DotCount count={${count}} />`,
  imports: ['import { DotCount } from "@coinbase/cds-web/dots"'],
  id: 'dot-count',
  metadata: { nestable: true },
};
