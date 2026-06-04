// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=252-13321
// source=packages/web/src/navigation/Sidebar.tsx
// component=Sidebar
import figma from 'figma';

const instance = figma.selectedInstance;

// 'type' VARIANT in Figma maps to the 'variant' prop in code.
// The Figma 'custom' option has no direct code equivalent and falls back to 'default'.
const variant = instance.getEnum('type', {
  default: 'default',
  condensed: 'condensed',
  custom: 'default',
});

// 'collapsed' is a VARIANT with string "true"/"false" values in Figma
const collapsed = instance.getEnum('collapsed', {
  true: true,
  false: false,
});

// Find all SidebarItem instances linked via Code Connect within the sidebar.
// These are nested inside Figma "Sidebar Label" wrapper instances, so traverseInstances is required.
const sidebarItems = instance.findConnectedInstances(
  (node) => node.codeConnectId() === 'sidebar-item',
  { traverseInstances: true },
);
const [si0, si1, si2, si3, si4, si5, si6, si7, si8] = sidebarItems;
let c0, c1, c2, c3, c4, c5, c6, c7, c8;
if (si0 && si0.type === 'INSTANCE') c0 = si0.executeTemplate().example;
if (si1 && si1.type === 'INSTANCE') c1 = si1.executeTemplate().example;
if (si2 && si2.type === 'INSTANCE') c2 = si2.executeTemplate().example;
if (si3 && si3.type === 'INSTANCE') c3 = si3.executeTemplate().example;
if (si4 && si4.type === 'INSTANCE') c4 = si4.executeTemplate().example;
if (si5 && si5.type === 'INSTANCE') c5 = si5.executeTemplate().example;
if (si6 && si6.type === 'INSTANCE') c6 = si6.executeTemplate().example;
if (si7 && si7.type === 'INSTANCE') c7 = si7.executeTemplate().example;
if (si8 && si8.type === 'INSTANCE') c8 = si8.executeTemplate().example;

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Sidebar
  variant="${variant}"
  ${collapsed ? 'collapsed' : ''}
  logo={<LogoMark />}
>
  ${c0}${c1}${c2}${c3}${c4}${c5}${c6}${c7}${c8}
</Sidebar>`,
  imports: [
    'import { Sidebar } from "@coinbase/cds-web/navigation"',
    'import { LogoMark } from "@coinbase/cds-web/icons"',
  ],
  id: 'sidebar',
  metadata: { nestable: false },
};
