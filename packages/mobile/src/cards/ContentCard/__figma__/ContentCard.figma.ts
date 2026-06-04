// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=72941-16019
// source=packages/mobile/src/cards/ContentCard/ContentCard.tsx
// component=ContentCard
import figma from 'figma';

const instance = figma.selectedInstance;

// Section visibility toggles
const showHeader = instance.getBoolean('show header');
const showBody = instance.getBoolean('show body');
const showFooter = instance.getBoolean('show footer');

// Header text content (accessed via layer traversal through nested instances)
const headerTitleText = instance.findText('description', {
  traverseInstances: true,
  path: ['.cardHeader'],
});
const headerTitle = headerTitleText.type === 'TEXT' ? headerTitleText.textContent : '';

const headerSubtitleText = instance.findText('metaData', { traverseInstances: true });
const headerSubtitle =
  headerSubtitleText.type === 'TEXT' ? headerSubtitleText.textContent : undefined;

// Body text content (accessed via layer traversal through nested instances)
const bodyTitleText = instance.findText('title', { traverseInstances: true });
const bodyTitle = bodyTitleText.type === 'TEXT' ? bodyTitleText.textContent : undefined;

const bodyDescText = instance.findText('description', {
  traverseInstances: true,
  path: ['.CardBody'],
});
const bodyDescription = bodyDescText.type === 'TEXT' ? bodyDescText.textContent : undefined;

// Footer action button — resolved dynamically from the nested Button instance
const footerActionInstance = instance.findInstance('action', { traverseInstances: true });
let footerActionCode;
if (showFooter && footerActionInstance && footerActionInstance.type === 'INSTANCE') {
  footerActionCode = footerActionInstance.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<ContentCard>
  ${
    showHeader
      ? figma.code`<ContentCardHeader
    title="${headerTitle}"
    ${headerSubtitle ? figma.code`subtitle="${headerSubtitle}"` : ''}
  />`
      : ''
  }
  ${
    showBody
      ? figma.code`<ContentCardBody
    ${bodyTitle ? figma.code`title="${bodyTitle}"` : ''}
    ${bodyDescription ? figma.code`description="${bodyDescription}"` : ''}
  />`
      : ''
  }
  ${
    showFooter
      ? figma.code`<ContentCardFooter>
    ${footerActionCode}
  </ContentCardFooter>`
      : ''
  }
</ContentCard>`,
  imports: [
    'import { ContentCard, ContentCardHeader, ContentCardBody, ContentCardFooter } from "@coinbase/cds-mobile/cards/ContentCard"',
  ],
  id: 'content-card-mobile',
  metadata: { nestable: false },
};
