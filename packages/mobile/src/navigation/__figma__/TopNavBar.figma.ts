// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=49598-4137
// source=packages/mobile/src/navigation/TopNavBar.tsx
// component=TopNavBar
import figma from 'figma';

const instance = figma.selectedInstance;

// Type variant — determines what children are rendered inside TopNavBar
const type = instance.getEnum('type', {
  'title + subtitle': 'title-subtitle',
  dropdown: 'dropdown',
  'with search': 'with-search',
  empty: 'empty',
  stepper: 'stepper',
  'Market Selector': 'market-selector',
});

// Title and subtitle text (available for title+subtitle and dropdown types)
const title = instance.getString('↳ title');
const subtitle = instance.getString('↳ subtitle');
const showSubtitle = instance.getBoolean('↳ show subtitle');

// Bottom tab bar
const showTab = instance.getBoolean('show tab');

// Left action → start prop
const showLeftAction = instance.getBoolean('show left action');
const leftActionInstance = showLeftAction ? instance.getInstanceSwap('↳ left action') : null;
let startCode;
if (leftActionInstance && leftActionInstance.type === 'INSTANCE') {
  startCode = leftActionInstance.executeTemplate().example;
}

// Right actions (up to 3) → end prop, wrapped in HStack when multiple are present
const showRightAction = instance.getBoolean('show right action');
const show2ndRightAction = instance.getBoolean('show 2nd right action');
const show3rdRightAction = instance.getBoolean('show 3rd right action');

const rightActionInstance = showRightAction ? instance.getInstanceSwap('↳ right action') : null;
const secondRightActionInstance = show2ndRightAction
  ? instance.getInstanceSwap('↳ 2nd right action')
  : null;
const thirdRightActionInstance = show3rdRightAction
  ? instance.getInstanceSwap('↳ 3rd right action')
  : null;

let rightActionCode;
if (rightActionInstance && rightActionInstance.type === 'INSTANCE') {
  rightActionCode = rightActionInstance.executeTemplate().example;
}
let secondRightCode;
if (secondRightActionInstance && secondRightActionInstance.type === 'INSTANCE') {
  secondRightCode = secondRightActionInstance.executeTemplate().example;
}
let thirdRightCode;
if (thirdRightActionInstance && thirdRightActionInstance.type === 'INSTANCE') {
  thirdRightCode = thirdRightActionInstance.executeTemplate().example;
}

const rightActionsCount = [rightActionCode, secondRightCode, thirdRightCode].filter(Boolean).length;

let endCode;
if (rightActionsCount > 1) {
  endCode = figma.code`<HStack alignItems="center" gap={1}>${thirdRightCode}${secondRightCode}${rightActionCode}</HStack>`;
} else if (rightActionCode) {
  endCode = rightActionCode;
} else if (secondRightCode) {
  endCode = secondRightCode;
} else if (thirdRightCode) {
  endCode = thirdRightCode;
}

// Children content varies by type
let childrenCode;
if (type === 'title-subtitle') {
  if (showSubtitle) {
    childrenCode = figma.code`<VStack alignItems="center">
  <NavigationTitle>${title}</NavigationTitle>
  <NavigationSubtitle>${subtitle}</NavigationSubtitle>
</VStack>`;
  } else {
    childrenCode = figma.code`<NavigationTitle>${title}</NavigationTitle>`;
  }
} else if (type === 'dropdown') {
  childrenCode = figma.code`<NavigationTitleSelect options={[]} value="" onChange={() => {}} />`;
} else if (type === 'with-search') {
  const searchInputInstance = instance.findInstance('SearchInput (Mobile)');
  if (searchInputInstance && searchInputInstance.type === 'INSTANCE') {
    childrenCode = searchInputInstance.executeTemplate().example;
  }
} else if (type === 'market-selector') {
  const selectChipInstance = instance.findInstance('SelectChip');
  if (selectChipInstance && selectChipInstance.type === 'INSTANCE') {
    childrenCode = selectChipInstance.executeTemplate().example;
  }
}
// 'empty' and 'stepper' types → no children rendered

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<TopNavBar
  ${startCode ? figma.code`start={${startCode}}` : ''}
  ${endCode ? figma.code`end={${endCode}}` : ''}
  ${showTab ? figma.code`bottom={<TabNavigation tabs={[]} value="" onChange={() => {}} />}` : ''}
>
  ${childrenCode ?? ''}
</TopNavBar>`,
  imports: [
    'import { TopNavBar, NavigationTitle, NavigationSubtitle, NavigationTitleSelect } from "@coinbase/cds-mobile/navigation"',
    'import { HStack, VStack } from "@coinbase/cds-mobile/layout"',
    'import { TabNavigation } from "@coinbase/cds-mobile/tabs"',
    'import { SelectChip } from "@coinbase/cds-mobile/chips"',
  ],
  id: 'top-nav-bar',
  metadata: { nestable: false },
};
