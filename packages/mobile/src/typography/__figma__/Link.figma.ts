// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=324-14982
// source=packages/mobile/src/typography/Link.tsx
// component=Link
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('string');

// variant maps to the color prop — primary is the default (fgPrimary), omitted when default
const color = instance.getEnum('variant', {
  primary: 'fgPrimary',
  foreground: 'fg',
  negativeForeground: 'fgNegative',
});

// textstyle maps directly to the font prop
const font = instance.getEnum('textstyle', {
  title1: 'title1',
  title2: 'title2',
  title3: 'title3',
  headline: 'headline',
  body: 'body',
  label1: 'label1',
  label2: 'label2',
  caption: 'caption',
  legal: 'legal',
});

// underline is a VARIANT with string "true"/"false" values
const underline = instance.getEnum('underline', { true: true, false: false });

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Link
  ${color !== 'fgPrimary' ? figma.code`color="${color}"` : ''}
  font="${font}"
  ${underline ? 'underline' : ''}
>
  ${label}
</Link>`,
  imports: ['import { Link } from "@coinbase/cds-mobile/typography"'],
  id: 'link-mobile',
  metadata: { nestable: true },
};
