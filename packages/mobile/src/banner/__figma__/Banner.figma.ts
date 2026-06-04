// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=17671-3736
// source=packages/mobile/src/banner/Banner.tsx
// component=Banner
import figma from 'figma';

const instance = figma.selectedInstance;

// Figma 'type' → code 'variant' (with value remapping)
const variant = instance.getEnum('type', {
  info: 'informational',
  promo: 'promotional',
  warning: 'warning',
  error: 'error',
});

// Figma 'placement' → code 'styleVariant' (with value remapping)
const styleVariant = instance.getEnum('placement', {
  global: 'global',
  'in-line': 'inline',
  contextual: 'contextual',
});

// Derive a sensible startIcon from the variant — no direct Figma property maps to the icon name string
let startIcon;
if (variant === 'warning') {
  startIcon = 'warning';
} else if (variant === 'error') {
  startIcon = 'error';
} else {
  startIcon = 'info';
}

const showDismiss = instance.getBoolean('show close');
const showTimestamp = instance.getBoolean('show timestamp');
const showPrimaryAction = instance.getBoolean('↳ show primary action');
const showSecondaryAction = instance.getBoolean('↳ show secondary action');

// Title text lives inside the nested 'string.banner(alpha)' sub-component
const titleHandle = instance.findText('title', { traverseInstances: true });
const title = titleHandle.type === 'TEXT' ? titleHandle.textContent : 'Banner title';

// Description text lives inside the nested 'string.banner(alpha)' sub-component
const descriptionHandle = instance.findText('description', { traverseInstances: true });
const description =
  descriptionHandle.type === 'TEXT' ? descriptionHandle.textContent : 'Banner description';

// Timestamp text is a direct descendant of Banner; maps to the 'label' prop
const timestampHandle = instance.findText('timestamp');
const timestamp =
  timestampHandle.type === 'TEXT' ? timestampHandle.textContent : 'Last updated today at 3:33pm';

// Primary and secondary actions — resolve dynamically via Code Connect to capture Link text/variant
const linkInstances = instance.findConnectedInstances((n) => n.codeConnectId() === 'link');

let primaryActionCode;
if (showPrimaryAction) {
  const primary = linkInstances[0];
  if (primary && primary.type === 'INSTANCE') {
    primaryActionCode = primary.executeTemplate().example;
  }
}

let secondaryActionCode;
if (showSecondaryAction) {
  const secondaryIdx = showPrimaryAction ? 1 : 0;
  const secondary = linkInstances[secondaryIdx];
  if (secondary && secondary.type === 'INSTANCE') {
    secondaryActionCode = secondary.executeTemplate().example;
  }
}

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Banner
  variant="${variant}"
  startIcon="${startIcon}"
  ${styleVariant !== 'contextual' ? figma.code`styleVariant="${styleVariant}"` : ''}
  ${showDismiss ? 'showDismiss' : ''}
  title="${title}"
  ${showTimestamp ? figma.code`label="${timestamp}"` : ''}
  ${primaryActionCode ? figma.code`primaryAction={${primaryActionCode}}` : ''}
  ${secondaryActionCode ? figma.code`secondaryAction={${secondaryActionCode}}` : ''}
>
  ${description}
</Banner>`,
  imports: ['import { Banner } from "@coinbase/cds-mobile/banner"'],
  id: 'banner-mobile',
  metadata: { nestable: false },
};
