// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=14089-46502
// source=packages/web/src/controls/NativeTextArea.tsx
// component=NativeTextArea
import figma from 'figma';

const instance = figma.selectedInstance;

// disabled is a VARIANT with string 'true'/'false' values
const disabled = instance.getEnum('disabled', { true: true, false: false });

// required is a BOOLEAN property
const required = instance.getBoolean('required');

// state (default, filled, active, active typing, positive, negative) is an interaction/validation state
// managed externally by a wrapping form component — no direct prop on NativeTextArea

// show label, ↳ label string — label is rendered by the wrapping TextInput component, not NativeTextArea
// show helper text, ↳ helper text — helper text is rendered by the wrapping TextInput component, not NativeTextArea
// show cursor — Figma animation cursor with no code equivalent

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<NativeTextArea
  placeholder="Enter text"
  ${disabled ? 'disabled' : ''}
  ${required ? 'required' : ''}
/>`,
  imports: ['import { NativeTextArea } from "@coinbase/cds-web/controls"'],
  id: 'native-text-area',
  metadata: { nestable: true },
};
