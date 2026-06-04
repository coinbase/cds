// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=68-996
// source=packages/mobile/src/tag/Tag.tsx
// component=Tag
import figma from 'figma';

const instance = figma.selectedInstance;

const intent = instance.getEnum('intent', {
  informational: 'informational',
  promotional: 'promotional',
});

const emphasis = instance.getEnum('emphasis', {
  high: 'high',
  low: 'low',
});

const colorScheme = instance.getEnum('colorScheme', {
  green: 'green',
  purple: 'purple',
  blue: 'blue',
  yellow: 'yellow',
  red: 'red',
  gray: 'gray',
});

// Label text lives inside the nested string.promo tags or string.info tags sub-component
const labelHandle = instance.findText('tag-label', { traverseInstances: true });
const label = labelHandle.type === 'TEXT' ? labelHandle.textContent : 'Tag';

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Tag intent="${intent}" emphasis="${emphasis}" colorScheme="${colorScheme}">${label}</Tag>`,
  imports: ['import { Tag } from "@coinbase/cds-mobile/tag"'],
  id: 'tag-mobile',
  metadata: { nestable: true },
};
