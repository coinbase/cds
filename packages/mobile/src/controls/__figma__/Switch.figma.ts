// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=155-9924
// source=packages/mobile/src/controls/Switch.tsx
// component=Switch
import figma from 'figma';

const instance = figma.selectedInstance;

// show label controls whether children (label text) are rendered
const showLabel = instance.getBoolean('show label');
const label = instance.getString('↳ label');

// checked and disabled are VARIANT types with string "true"/"false" values
const checked = instance.getEnum('checked', { true: true, false: false });
const disabled = instance.getEnum('disabled', { true: true, false: false });

// state (active, hover, pressed, focus) are interaction-only states with no code equivalent

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Switch
  checked={${checked}}
  ${disabled ? 'disabled' : ''}
>
  ${showLabel ? label : ''}
</Switch>`,
  imports: ['import { Switch } from "@coinbase/cds-mobile/controls"'],
  id: 'switch',
  metadata: { nestable: true },
};
