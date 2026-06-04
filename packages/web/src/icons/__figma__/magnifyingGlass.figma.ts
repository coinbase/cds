// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=29452-16669
// source=packages/web/src/icons/Icon.tsx
// component=Icon
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  xs: 'xs',
  s: 's',
  m: 'm',
  l: 'l',
});

const active = instance.getBoolean('active');

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Icon name="magnifyingGlass" size="${size}"${active ? ' active' : ''} />`,
  imports: ['import { Icon } from "@coinbase/cds-web/icons"'],
  id: 'icon-magnifyingGlass',
  metadata: { nestable: true },
};
