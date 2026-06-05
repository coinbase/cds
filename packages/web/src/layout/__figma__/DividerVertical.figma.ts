// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=60-654
// source=packages/web/src/layout/Divider.tsx
// component=Divider
import figma from 'figma';

const instance = figma.selectedInstance;

// Figma "type" variant maps to the color token for the separator line
const color = instance.getEnum('type', {
  line: 'bgLine',
  lineHeavy: 'bgLineHeavy',
});

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Divider direction="vertical" color="${color}" />`,
  imports: ['import { Divider } from "@coinbase/cds-web/layout"'],
  id: 'divider-vertical',
  metadata: { nestable: true },
};
