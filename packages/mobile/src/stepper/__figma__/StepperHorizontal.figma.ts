// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=54927-8503
// source=packages/mobile/src/stepper/Stepper.tsx
// component=Stepper
import figma from 'figma';

// The Figma component uses boolean visibility toggles (show 3rd step … show 10th step)
// to preview different step counts. In code, the number of steps is controlled by the
// length of the `steps` array. The `platform` and `type` Figma variant properties
// have no direct code equivalents.

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Stepper
  direction="horizontal"
  steps={[
    { id: 'step-1', label: 'Step 1' },
    { id: 'step-2', label: 'Step 2' },
    { id: 'step-3', label: 'Step 3' },
  ]}
  activeStepId="step-1"
/>`,
  imports: ['import { Stepper } from "@coinbase/cds-mobile/stepper"'],
  id: 'stepper-horizontal',
  metadata: { nestable: false },
};
