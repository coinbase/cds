// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=10188-4476
// source=packages/web/src/alpha/tabbed-chips/TabbedChips.tsx
// component=TabbedChips
import figma from 'figma';

const instance = figma.selectedInstance;

// compact: VARIANT "true"/"false" → compact boolean prop
const compact = instance.getEnum('compact', { true: true, false: false });

// platform: VARIANT "mobile"/"desktop" → no code equivalent (Figma design-only distinction)
// overflowing: BOOLEAN → no code equivalent (internal scroll overflow state managed by the component)

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<TabbedChips
  activeTab={activeTab}
  ${compact ? 'compact' : ''}
  onChange={setActiveTab}
  tabs={[
    { id: 'tab-1', label: 'Tab 1' },
    { id: 'tab-2', label: 'Tab 2' },
    { id: 'tab-3', label: 'Tab 3' },
  ]}
/>`,
  imports: ['import { TabbedChips } from "@coinbase/cds-web/alpha"'],
  id: 'tabbed-chips',
  metadata: { nestable: false },
};
