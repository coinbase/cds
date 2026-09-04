// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=54927-8607
// source=packages/web/src/stepper/Stepper.tsx
// component=Stepper
import figma from 'figma';

const instance = figma.selectedInstance;

// The Figma component exposes boolean toggles (step 4–15) that control
// how many steps are rendered in the design canvas. In code the step count
// is determined by the `steps` array. We read a few of these toggles to
// influence the static example, but the primary output is always a
// data-driven Stepper with direction="vertical".
const showStep4 = instance.getBoolean('step 4');
const showStep5 = instance.getBoolean('step 5');

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Stepper
  direction="vertical"
  steps={[
    { id: 'step-1', label: 'Step 1' },
    { id: 'step-2', label: 'Step 2' },
    { id: 'step-3', label: 'Step 3' },
    ${showStep4 ? figma.code`{ id: 'step-4', label: 'Step 4' },` : ''}
    ${showStep5 ? figma.code`{ id: 'step-5', label: 'Step 5' },` : ''}
  ]}
  activeStepId="step-1"
/>`,
  imports: ['import { Stepper } from "@coinbase/cds-web/stepper"'],
  id: 'stepper-vertical',
  metadata: { nestable: true },
};
