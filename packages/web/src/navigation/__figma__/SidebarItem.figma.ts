// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=252-12892
// source=packages/web/src/navigation/SidebarItem.tsx
// component=SidebarItem
import figma from 'figma';

const instance = figma.selectedInstance;

// label text is a TEXT property in Figma; maps to the required title prop
const title = instance.getString('label text');

// active is a VARIANT with string "true"/"false" values; maps to the active boolean prop
const active = instance.getEnum('active', { true: true, false: false });

// show label BOOLEAN: when the label is hidden the sidebar item is in collapsed state
// collapsed = !showLabel
const collapsed = instance.getBoolean('show label', { true: false, false: true });

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<SidebarItem
  icon="home"
  title="${title}"
  ${active ? 'active' : ''}
  ${collapsed ? 'collapsed' : ''}
/>`,
  imports: ['import { SidebarItem } from "@coinbase/cds-web/navigation"'],
  id: 'sidebar-item',
  metadata: { nestable: true },
};
