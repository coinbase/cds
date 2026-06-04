// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=24997-8568
// source=packages/web/src/coachmark/Coachmark.tsx
// component=Coachmark
import figma from 'figma';

const instance = figma.selectedInstance;

const title = instance.getString('title');
const content = instance.getString('content');
const dismissable = instance.getBoolean('dismissable');
const showMedia = instance.getEnum('show media', {
  true: true,
  false: false,
});

const ctaInstance = instance.getInstanceSwap('↳ CTA');
let actionCode;
if (ctaInstance && ctaInstance.type === 'INSTANCE') {
  actionCode = ctaInstance.executeTemplate().example;
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Coachmark
  title="${title}"
  content="${content}"
  action={${actionCode}}
  ${showMedia ? figma.code`media={<>{/* media content */}</>}` : ''}
  ${dismissable ? 'onClose={() => {}}' : ''}
/>`,
  imports: ['import { Coachmark } from "@coinbase/cds-web/coachmark"'],
  id: 'coachmark',
  metadata: { nestable: false },
};
