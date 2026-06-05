// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=72941-18302
// source=packages/mobile/src/cards/MediaCard/index.tsx
// component=MediaCard
import figma from 'figma';

const instance = figma.selectedInstance;

// Text properties
const title = instance.getString('title');
const showSubtitle = instance.getBoolean('show subtitle');
const subtitle = showSubtitle ? instance.getString('↳ subtitle') : undefined;

// Description comes from the subdetail child instance's text node
const showSubdetail = instance.getBoolean('show subdetail');
const descriptionTextNode = showSubdetail
  ? instance.findText('Foreground Muted', { traverseInstances: true })
  : null;
const description =
  descriptionTextNode && descriptionTextNode.type === 'TEXT'
    ? descriptionTextNode.textContent
    : undefined;

// Media placement and visibility
// 'image placement' maps: none → no media, right → 'end' (default), left → 'start'
const imagePlacement = instance.getEnum('image placement', {
  none: 'none',
  right: 'end',
  left: 'start',
});
const showMedia = instance.getBoolean('show media');
const hasMedia = showMedia && imagePlacement !== 'none';

// Media instance — only resolved when a media image is visible in Figma
const mediaInstance = hasMedia ? instance.getInstanceSwap('↳ media') : null;
let mediaCode;
if (mediaInstance && mediaInstance.type === 'INSTANCE') {
  mediaCode = mediaInstance.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<MediaCard
  title="${title}"
  ${subtitle !== undefined ? figma.code`subtitle="${subtitle}"` : ''}
  ${description !== undefined ? figma.code`description="${description}"` : ''}
  thumbnail={/* provide thumbnail node */}
  ${mediaCode ? figma.code`media={${mediaCode}}` : ''}
  ${hasMedia && imagePlacement === 'start' ? 'mediaPlacement="start"' : ''}
/>`,
  imports: ['import { MediaCard } from "@coinbase/cds-mobile/cards"'],
  id: 'media-card-mobile',
  metadata: { nestable: false },
};
