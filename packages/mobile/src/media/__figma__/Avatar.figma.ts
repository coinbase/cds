// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=60-643
// source=packages/mobile/src/media/Avatar.tsx
// component=Avatar
import figma from 'figma';

const instance = figma.selectedInstance;

const initial = instance.getString('initial');

const shape = instance.getEnum('shape', {
  circle: 'circle',
  square: 'square',
  polygon: 'hexagon',
});

const size = instance.getEnum('size', {
  xxxl: 'xxxl',
  xxl: 'xxl',
  xl: 'xl',
  l: 'l',
  m: 'm',
  s: 's',
});

// Figma variant controls what content is displayed; in code this is driven by the src/name props
const variant = instance.getEnum('variant', {
  image: 'image',
  initial: 'initial',
  NFT: 'NFT',
  fallback: 'fallback',
});

// color scheme is only visually applicable when the variant is 'initial' (name-based fallback)
const colorScheme = instance.getEnum('color scheme', {
  teal: 'teal',
  purple: 'purple',
  pink: 'pink',
  green: 'green',
  gray: 'gray',
  NA: 'blue',
  blue: 'blue',
});

const showName = variant === 'initial';
const showSrc = variant === 'image' || variant === 'NFT';

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Avatar
  shape="${shape}"
  size="${size}"
  ${showName ? figma.code`name="${initial}"` : ''}
  ${showSrc ? figma.code`src="https://example.com/avatar.jpg"` : ''}
  ${showName && colorScheme !== 'blue' ? figma.code`colorScheme="${colorScheme}"` : ''}
/>`,
  imports: ['import { Avatar } from "@coinbase/cds-mobile/media"'],
  id: 'avatar-mobile',
  metadata: { nestable: true },
};
