// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=72941-20711
// source=packages/web/src/cards/MessagingCard/MessagingCard.tsx
// component=MessagingCard
import figma from 'figma';

const instance = figma.selectedInstance;

// type variant maps directly to code
const type = instance.getEnum('type', {
  nudge: 'nudge',
  upsell: 'upsell',
});

// title is conditionally shown
const showTitle = instance.getBoolean('show title');
const title = instance.getString('↳ title');

// description (Figma: "subtitle") is conditionally shown
const showSubtitle = instance.getBoolean('show subtitle');
const subtitle = instance.getString('↳ subtitle');

// tag child is visible when show tag is true
const showTag = instance.getBoolean('show tag');
const tagChild = showTag ? instance.findInstance('Tag') : null;
let tagCode;
if (tagChild && tagChild.type === 'INSTANCE') {
  tagCode = tagChild.executeTemplate().example;
}

// media placement: Figma uses right/left, code uses end/start
const mediaPlacement = instance.getEnum('media placement', {
  right: 'end',
  left: 'start',
});

// show dismiss: VARIANT with string "true"/"false" values
const showDismiss = instance.getEnum('show dismiss', {
  true: true,
  false: false,
});

// media is an INSTANCE_SWAP property
const media = instance.getInstanceSwap('media');
let mediaCode;
if (media && media.type === 'INSTANCE') {
  mediaCode = media.executeTemplate().example;
}

// action button: not exposed as a Figma property, resolved from child Button instance
const actionButton = instance.findInstance('Button');
let actionCode;
if (actionButton && actionButton.type === 'INSTANCE') {
  actionCode = actionButton.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<MessagingCard
  type="${type}"
  mediaPlacement="${mediaPlacement}"
  ${showTitle ? figma.code`title="${title}"` : ''}
  ${showSubtitle ? figma.code`description="${subtitle}"` : ''}
  ${tagCode ? figma.code`tag={${tagCode}}` : ''}
  ${mediaCode ? figma.code`media={${mediaCode}}` : ''}
  ${actionCode ? figma.code`action={${actionCode}}` : ''}
  ${showDismiss ? 'onDismissButtonClick={() => {}}' : ''}
/>`,
  imports: ['import { MessagingCard } from "@coinbase/cds-web/cards/MessagingCard"'],
  id: 'messaging-card',
  metadata: { nestable: false },
};
