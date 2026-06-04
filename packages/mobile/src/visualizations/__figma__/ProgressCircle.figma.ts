// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=64-917
// source=packages/mobile/src/visualizations/ProgressCircle.tsx
// component=ProgressCircle
import figma from 'figma';

const instance = figma.selectedInstance;

// Figma "type" maps to the indeterminate boolean prop
const indeterminate = instance.getEnum('type', {
  determinate: false,
  indeterminate: true,
});

const weight = instance.getEnum('weight', {
  normal: 'normal',
  heavy: 'heavy',
  thin: 'thin',
});

// Figma progress is a percentage string; code takes a decimal 0–1.
// "custom" is a placeholder – replace with the actual value at runtime.
const progress = instance.getEnum('progress', {
  '25%': 0.25,
  '50%': 0.5,
  '75%': 0.75,
  '100%': 1,
  custom: 0.5,
});

// "progress label" controls visibility of the percentage text inside the circle.
// When false, pass hideContent to suppress inner content rendering.
const progressLabel = instance.getBoolean('progress label');

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<ProgressCircle
  weight="${weight}"
  ${indeterminate ? 'indeterminate' : figma.code`progress={${progress}}`}
  ${!progressLabel ? 'hideContent' : ''}
/>`,
  imports: ['import { ProgressCircle } from "@coinbase/cds-mobile/visualizations"'],
  id: 'progress-circle-mobile',
  metadata: { nestable: true },
};
