// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=240-16872
// source=packages/web/src/navigation/NavLink.tsx
// component=NavLink
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('navLink string');

// state=active maps to the active prop; other values (default, focused, hover, pressed) are
// CSS/interaction states with no direct code equivalent
const active = instance.getEnum('state', {
  active: true,
  default: false,
  focused: false,
  hover: false,
  pressed: false,
});

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<NavLink${active ? ' active' : ''}>${label}</NavLink>`,
  imports: ['import { NavLink } from "@coinbase/cds-web/navigation"'],
  id: 'nav-link',
  metadata: { nestable: true },
};
