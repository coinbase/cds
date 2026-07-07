import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('size', {
  xs: 'xs',
  s: 's',
  m: 'm',
  l: 'l',
});

const active = instance.getBoolean('active');

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Icon name="${figma.batch.name}" size="${size}"${active ? ' active' : ''} />`,
  imports: ['import { Icon } from "@coinbase/cds-mobile/icons"'],
  id: `icon-${figma.batch.name}-mobile`,
  metadata: { nestable: true },
};
