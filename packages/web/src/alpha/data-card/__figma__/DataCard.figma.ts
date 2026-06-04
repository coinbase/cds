// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=72941-17832
// source=packages/web/src/alpha/data-card/DataCard.tsx
// component=DataCard
import figma from 'figma';

const instance = figma.selectedInstance;

// title: TEXT descendant → title prop (required)
const titleHandle = instance.findText('title');
const title = titleHandle.type === 'TEXT' ? titleHandle.textContent : 'Title';

// show subtitle: BOOLEAN → conditionally include subtitle prop
const showSubtitle = instance.getBoolean('show subtitle');
const subtitleHandle = instance.findText('subtitle');
const subtitle =
  showSubtitle && subtitleHandle.type === 'TEXT' ? subtitleHandle.textContent : undefined;

// show media + ↳ media: BOOLEAN + INSTANCE_SWAP → thumbnail prop
const showMedia = instance.getBoolean('show media');
const mediaSwap = showMedia ? instance.getInstanceSwap('↳ media') : null;
let thumbnailCode;
if (mediaSwap && mediaSwap.type === 'INSTANCE') {
  thumbnailCode = mediaSwap.executeTemplate().example;
}

// show trend: BOOLEAN → titleAccessory prop (info tag / trend indicator)
const showTrend = instance.getBoolean('show trend');
let titleAccessoryCode;
if (showTrend) {
  const trendInstance = instance.findInstance('string.info tags');
  if (trendInstance && trendInstance.type === 'INSTANCE') {
    titleAccessoryCode = trendInstance.executeTemplate().example;
  }
}

// type: VARIANT → layout prop (chart/progress bar → vertical, progress circle → horizontal)
// also determines which visualization is rendered as children
const type = instance.getEnum('type', {
  chart: 'chart',
  'progress bar': 'progress-bar',
  'progress circle': 'progress-circle',
});
const layout = type === 'progress-circle' ? 'horizontal' : 'vertical';

// children: resolve visualization instance based on type variant
let childCode;
if (type === 'progress-bar') {
  const pb = instance.findInstance('ProgressBar');
  if (pb && pb.type === 'INSTANCE') {
    childCode = pb.executeTemplate().example;
  }
} else if (type === 'progress-circle') {
  const pc = instance.findInstance('ProgressCircle');
  if (pc && pc.type === 'INSTANCE') {
    childCode = pc.executeTemplate().example;
  }
} else if (type === 'chart') {
  const lc = instance.findInstance('line charts');
  if (lc && lc.type === 'INSTANCE') {
    childCode = lc.executeTemplate().example;
  }
}

// state: VARIANT (default, hovered, selected, focus, disabled) → no code equivalent (design-only interaction state)

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<DataCard
  layout="${layout}"
  title="${title}"
  ${subtitle ? figma.code`subtitle="${subtitle}"` : ''}
  ${thumbnailCode ? figma.code`thumbnail={${thumbnailCode}}` : ''}
  ${titleAccessoryCode ? figma.code`titleAccessory={${titleAccessoryCode}}` : ''}
>
  ${childCode}
</DataCard>`,
  imports: ['import { DataCard } from "@coinbase/cds-web/alpha/data-card"'],
  id: 'data-card',
  metadata: { nestable: false },
};
