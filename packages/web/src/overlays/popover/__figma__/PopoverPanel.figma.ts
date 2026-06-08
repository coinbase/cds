// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=47410-8499
// source=packages/web/src/overlays/popover/PopoverPanel.tsx
// component=PopoverPanel
import figma from 'figma';

const instance = figma.selectedInstance;

// 'replace me' INSTANCE_SWAP → content prop (arbitrary custom panel body content)
const replaceMe = instance.getInstanceSwap('replace me');
let contentCode;
if (replaceMe && replaceMe.type === 'INSTANCE') {
  contentCode = replaceMe.executeTemplate().example;
}

// Skipped Figma properties (no code equivalent on PopoverPanel):
// - 'show section title' (BOOLEAN): controls a SectionHeader wireframe element visible only in Figma;
//   PopoverPanel.content accepts arbitrary ReactNode so there is no matching prop.
// - 'body padding' (VARIANT: "true"/"false"): padding inside the Figma wireframe body;
//   PopoverPanel has no bodyPadding prop — padding is applied inside the content node itself.
// - 'body content' (VARIANT: only "Default"): single-option variant with no code counterpart.

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<PopoverPanel
  accessibilityLabel="Panel label"
  content={${contentCode}}
>
  <Button>Open panel</Button>
</PopoverPanel>`,
  imports: ['import { PopoverPanel } from "@coinbase/cds-web/overlays"'],
  id: 'dropdown-custom',
  metadata: { nestable: false },
};
