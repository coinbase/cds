// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=148-2954
// source=packages/web/src/accordion/AccordionItem.tsx
// component=AccordionItem
import figma from 'figma';

const instance = figma.selectedInstance;

// Title is a static text layer with no bound Figma property
const titleHandle = instance.findText('title');
const title = titleHandle.type === 'TEXT' ? titleHandle.textContent : 'Title';

// Subtitle is conditionally shown
const showSubtitle = instance.getBoolean('show subtitle');
const subtitle = showSubtitle ? instance.getString('↳ subtitle') : null;

// Media is conditionally shown
const showMedia = instance.getBoolean('show media');
const mediaInstance = showMedia ? instance.getInstanceSwap('↳ media') : null;
let mediaCode;
if (mediaInstance && mediaInstance.type === 'INSTANCE') {
  mediaCode = mediaInstance.executeTemplate().example;
}

// Panel content (the body of the accordion item)
const panelInstance = instance.getInstanceSwap('🔄 replace me');
let panelCode;
if (panelInstance && panelInstance.type === 'INSTANCE') {
  panelCode = panelInstance.executeTemplate().example;
}

// "show panel" controls whether the accordion item is expanded by default
const isPanelOpen = instance.getEnum('show panel', { true: true, false: false });

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Accordion${isPanelOpen ? figma.code` defaultActiveKey="item-1"` : ''}>
  <AccordionItem
    itemKey="item-1"
    title="${title}"
    ${subtitle ? figma.code`subtitle="${subtitle}"` : ''}
    ${mediaCode ? figma.code`media={${mediaCode}}` : ''}
  >
    ${panelCode}
  </AccordionItem>
</Accordion>`,
  imports: ['import { Accordion, AccordionItem } from "@coinbase/cds-web/accordion"'],
  id: 'accordion',
  metadata: { nestable: false },
};
