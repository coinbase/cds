// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=696-13841
// source=packages/web/src/overlays/popover/PopoverPanel.tsx
// component=PopoverPanel
import figma from 'figma';

const instance = figma.selectedInstance;

// --- Section header ---
const showSectionTitle = instance.getBoolean('show section title');
const sectionTitleHandle = instance.findText('section-title-label', { traverseInstances: true });
const sectionTitleText =
  sectionTitleHandle.type === 'TEXT' ? sectionTitleHandle.textContent : 'Section Title';

// --- List cells ---
// Resolve connected ListCell instances for a representative example (first two shown).
// The `cells` Figma variant (2–10) controls the number of cells shown in Figma; in code
// you simply pass as many <ListCell> items as needed to the content prop.
const allCells = instance.findConnectedInstances((node) => node.codeConnectId() === 'list-cell');
const cell0 = allCells[0]?.type === 'INSTANCE' ? allCells[0].executeTemplate().example : undefined;
const cell1 = allCells[1]?.type === 'INSTANCE' ? allCells[1].executeTemplate().example : undefined;

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<PopoverPanel
  accessibilityLabel="Dropdown"
  content={
    <>
      ${showSectionTitle ? figma.code`<SectionHeader title="${sectionTitleText}" />` : ''}
      ${cell0}
      ${cell1}
    </>
  }
>
  <Button>Open</Button>
</PopoverPanel>`,
  imports: [
    'import { PopoverPanel } from "@coinbase/cds-web/overlays"',
    'import { SectionHeader } from "@coinbase/cds-web/section-header"',
    'import { ListCell } from "@coinbase/cds-web/cells"',
    'import { Button } from "@coinbase/cds-web/buttons"',
  ],
  id: 'dropdown-list-cell',
  metadata: { nestable: false },
};
