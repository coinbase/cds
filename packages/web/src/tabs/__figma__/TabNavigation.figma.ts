// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=240-8930
// source=packages/web/src/tabs/Tabs.tsx
// component=Tabs
import figma from 'figma';

const instance = figma.selectedInstance;

// 'overflow' BOOLEAN — whether tabs overflow with scroll+paddles; handled automatically by Tabs, no direct prop
// 'platform' VARIANT (web/mobile) — distinguishes platform; represented by the package imported, not a code prop

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Tabs
  tabs={[
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' },
  ]}
  activeTab={{ id: 'tab1', label: 'Tab 1' }}
  onChange={handleChange}
/>`,
  imports: ['import { Tabs } from "@coinbase/cds-web/tabs"'],
  id: 'tab-navigation',
  metadata: { nestable: false },
};
