// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=64-746
// source=packages/web/src/visualizations/ProgressBar.tsx
// component=ProgressBar
import figma from 'figma';

const instance = figma.selectedInstance;

// Figma "weight=medium" maps to code "semiheavy" (design/code naming mismatch)
const weight = instance.getEnum('weight', {
  thin: 'thin',
  normal: 'normal',
  medium: 'semiheavy',
  heavy: 'heavy',
});

// Figma progress is a percentage string; code takes a decimal 0–1
const progress = instance.getEnum('progress', {
  '100%': 1,
  '75%': 0.75,
  '50%': 0.5,
  '25%': 0.25,
  '0%': 0,
});

// Figma "disabled" is a VARIANT with string values "true"/"false"
const disabled = instance.getEnum('disabled', {
  true: true,
  false: false,
});

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<ProgressBar
  accessibilityLabel="Progress"
  weight="${weight}"
  progress={${progress}}
  ${disabled ? 'disabled' : ''}
/>`,
  imports: ['import { ProgressBar } from "@coinbase/cds-web/visualizations"'],
  id: 'progress-bar',
  metadata: { nestable: true },
};
