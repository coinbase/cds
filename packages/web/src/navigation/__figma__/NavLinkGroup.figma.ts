// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=283-19790
// source=packages/web/src/navigation/NavLink.tsx
// component=NavLink
import figma from 'figma';

const instance = figma.selectedInstance;

// NavLinkGroup is a Figma-only grouping of NavLink instances (variant "#=6" means 6 links).
// In code, compose multiple NavLink components inside an HStack.
const navLinkLayers = instance.findLayers((node) => node.name === 'NavLink');

const [nl1, nl2, nl3, nl4, nl5, nl6] = navLinkLayers;

let c1, c2, c3, c4, c5, c6;
if (nl1 && nl1.type === 'INSTANCE') c1 = nl1.executeTemplate().example;
if (nl2 && nl2.type === 'INSTANCE') c2 = nl2.executeTemplate().example;
if (nl3 && nl3.type === 'INSTANCE') c3 = nl3.executeTemplate().example;
if (nl4 && nl4.type === 'INSTANCE') c4 = nl4.executeTemplate().example;
if (nl5 && nl5.type === 'INSTANCE') c5 = nl5.executeTemplate().example;
if (nl6 && nl6.type === 'INSTANCE') c6 = nl6.executeTemplate().example;

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<HStack gap={3}>
  ${c1}${c2}${c3}${c4}${c5}${c6}
</HStack>`,
  imports: [
    'import { HStack } from "@coinbase/cds-web/layout"',
    'import { NavLink } from "@coinbase/cds-web/navigation"',
  ],
  id: 'nav-link-group',
  metadata: { nestable: false },
};
