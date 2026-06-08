// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=715-14162
// source=packages/web/src/overlays/tooltip/Tooltip.tsx
// component=Tooltip
import figma from 'figma';

const instance = figma.selectedInstance;

// 'type' controls whether the tooltip shows body-only or title + body
const type = instance.getEnum('type', {
  body: 'body',
  'title + body': 'title + body',
});

// Title text lives inside the nested 'string.tooltip' sub-component
const titleHandle = instance.findText('title-option', { traverseInstances: true });
const title = titleHandle.type === 'TEXT' ? titleHandle.textContent : 'Title';

// Body/description text lives inside the nested 'string.tooltip' sub-component
const descriptionHandle = instance.findText('body-option', { traverseInstances: true });
const description =
  descriptionHandle.type === 'TEXT' ? descriptionHandle.textContent : 'Tooltip description';

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<Tooltip
  ${
    type === 'title + body'
      ? figma.code`content={
    <VStack gap={1}>
      <Text font="label2">${title}</Text>
      <Text color="fgMuted" font="label2">${description}</Text>
    </VStack>
  }`
      : figma.code`content="${description}"`
  }
>
  {/* trigger element */}
</Tooltip>`,
  imports: [
    'import { Tooltip } from "@coinbase/cds-web/overlays"',
    'import { VStack } from "@coinbase/cds-web/layout"',
    'import { Text } from "@coinbase/cds-web/typography"',
  ],
  id: 'tooltip',
  metadata: { nestable: false },
};
