// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=14743-53206
// source=packages/web/src/dates/DatePicker.tsx
// component=DatePicker
import figma from 'figma';

const instance = figma.selectedInstance;

// label maps directly to the label prop
const label = instance.getString('label');

// required is a BOOLEAN property
const required = instance.getBoolean('↳ required');

// show calendar maps to the defaultOpen prop
const defaultOpen = instance.getEnum('show calendar', { false: false, true: true });

// disabled and compact are VARIANT types with string "true"/"false" values
const disabled = instance.getEnum('disabled', { false: false, true: true });
const compact = instance.getEnum('compact', { false: false, true: true });

// state (default, focused, typing, filled, error) are interaction-only states with no direct code equivalent
// date (TEXT) is a visual display of the typed input value and does not map to the date: Date | null prop

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<DatePicker
  date={null}
  onChangeDate={() => {}}
  error={null}
  onErrorDate={() => {}}
  ${label ? figma.code`label="${label}"` : ''}
  ${required ? 'required' : ''}
  ${defaultOpen ? 'defaultOpen' : ''}
  ${disabled ? 'disabled' : ''}
  ${compact ? 'compact' : ''}
/>`,
  imports: ['import { DatePicker } from "@coinbase/cds-web/dates"'],
  id: 'date-picker',
  metadata: { nestable: false },
};
