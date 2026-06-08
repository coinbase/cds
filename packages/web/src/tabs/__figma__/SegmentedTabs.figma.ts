// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=20859-2979
// source=packages/web/src/tabs/SegmentedTabs.tsx
// component=SegmentedTabs
import figma from 'figma';

const instance = figma.selectedInstance;

// 'tabs' VARIANT controls number of visible tabs — no direct code prop, determined by tabs array length
const tabCount = instance.getEnum('tabs', {
  '2 tabs': 2,
  '3 tabs': 3,
});

// 'active state' VARIANT indicates which tab is currently selected — maps to the activeTab prop
// left=first tab, center=second tab (3-tab only), right=last tab
const activeStateId = instance.getEnum('active state', {
  left: 'tab1',
  center: 'tab2',
  right: tabCount === 2 ? 'tab2' : 'tab3',
});
const activeTabLabel =
  activeStateId === 'tab3' ? 'Tab 3' : activeStateId === 'tab2' ? 'Tab 2' : 'Tab 1';

// 'disabled' is a string VARIANT (not a boolean) — maps to the disabled prop
const isDisabled = instance.getEnum('disabled', {
  true: true,
  false: false,
});

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<SegmentedTabs
  tabs={[${
    tabCount === 2
      ? figma.code`{ id: 'tab1', label: 'Tab 1' }, { id: 'tab2', label: 'Tab 2' }`
      : figma.code`{ id: 'tab1', label: 'Tab 1' }, { id: 'tab2', label: 'Tab 2' }, { id: 'tab3', label: 'Tab 3' }`
  }]}
  activeTab={{ id: "${activeStateId}", label: "${activeTabLabel}" }}
  onChange={handleChange}
  ${isDisabled ? 'disabled' : ''}
/>`,
  imports: ['import { SegmentedTabs } from "@coinbase/cds-web/tabs"'],
  id: 'segmented-tabs',
  metadata: { nestable: false },
};
