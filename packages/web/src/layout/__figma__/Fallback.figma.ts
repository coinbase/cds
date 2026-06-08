// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=731-14951
// source=packages/web/src/layout/Fallback.tsx
// component=Fallback
import figma from 'figma';

const instance = figma.selectedInstance;

const shape = instance.getEnum('shape', {
  circle: 'circle',
  rectangle: 'rectangle',
});

const isCircle = shape === 'circle';
const width = isCircle ? 40 : 100;
const height = isCircle ? 40 : 20;

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Fallback shape="${shape}" width={${width}} height={${height}} />`,
  imports: ['import { Fallback } from "@coinbase/cds-web/layout"'],
  id: 'fallback',
  metadata: { nestable: true },
};
