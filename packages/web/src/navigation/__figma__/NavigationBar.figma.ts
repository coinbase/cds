// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=10414-896
// source=packages/web/src/navigation/NavigationBar.tsx
// component=NavigationBar
import figma from 'figma';

const instance = figma.selectedInstance;

// Visibility toggles
const showBackArrow = instance.getBoolean('show back arrow');
const showPageTitle = instance.getBoolean('show page title');
const showTabs = instance.getBoolean('show tabs');
const showSearch = instance.getBoolean('show search');
const showNotification = instance.getBoolean('show notification');
const showPrimaryCta = instance.getBoolean('show primary cta');
const showHelpCenter = instance.getBoolean('show help center');

// Start slot: back arrow (IconButton)
const backArrowInstance = instance.findInstance('back arrow');
let startCode;
if (showBackArrow && backArrowInstance && backArrowInstance.type === 'INSTANCE') {
  startCode = backArrowInstance.executeTemplate().example;
}

// Children slot: page title
const navTitleInstance = instance.findInstance('.NavigationTitle');
let childrenCode;
if (showPageTitle && navTitleInstance && navTitleInstance.type === 'INSTANCE') {
  childrenCode = navTitleInstance.executeTemplate().example;
}

// End slot: search input (conditional)
const searchInstance = instance.findInstance('SearchInput (Desktop)');
let searchCode;
if (showSearch && searchInstance && searchInstance.type === 'INSTANCE') {
  searchCode = searchInstance.executeTemplate().example;
}

// End slot: help center IconButton (conditional)
const helpInstance = instance.findInstance('Help');
let helpCode;
if (showHelpCenter && helpInstance && helpInstance.type === 'INSTANCE') {
  helpCode = helpInstance.executeTemplate().example;
}

// End slot: notification IconButton (conditional)
const notificationInstance = instance.findInstance('Notification');
let notificationCode;
if (showNotification && notificationInstance && notificationInstance.type === 'INSTANCE') {
  notificationCode = notificationInstance.executeTemplate().example;
}

// End slot: primary CTA Button (conditional)
const primaryBtnInstance = instance.findInstance('Button');
let primaryBtnCode;
if (showPrimaryCta && primaryBtnInstance && primaryBtnInstance.type === 'INSTANCE') {
  primaryBtnCode = primaryBtnInstance.executeTemplate().example;
}

// End slot: app switcher IconButton (always present in desktop variant)
const appSwitcherInstance = instance.findInstance('App Switcher');
let appSwitcherCode;
if (appSwitcherInstance && appSwitcherInstance.type === 'INSTANCE') {
  appSwitcherCode = appSwitcherInstance.executeTemplate().example;
}

// End slot: avatar (always present in desktop variant)
const avatarInstance = instance.findInstance('Avatar');
let avatarCode;
if (avatarInstance && avatarInstance.type === 'INSTANCE') {
  avatarCode = avatarInstance.executeTemplate().example;
}

const hasEndContent =
  searchCode || helpCode || notificationCode || primaryBtnCode || appSwitcherCode || avatarCode;

// eslint-disable-next-line no-restricted-exports
export default {
  example: figma.code`<NavigationBar
  ${startCode ? figma.code`start={${startCode}}` : ''}
  ${
    hasEndContent
      ? figma.code`end={
    <HStack gap={1} alignItems="center">
      ${searchCode ?? ''}
      ${helpCode ?? ''}
      ${notificationCode ?? ''}
      ${primaryBtnCode ?? ''}
      ${appSwitcherCode ?? ''}
      ${avatarCode ?? ''}
    </HStack>
  }`
      : ''
  }
  ${showTabs ? figma.code`bottom={<TabNavigation tabs={[]} value="" onChange={() => {}} />}` : ''}
>
  ${childrenCode ?? ''}
</NavigationBar>`,
  imports: [
    'import { NavigationBar } from "@coinbase/cds-web/navigation"',
    'import { HStack } from "@coinbase/cds-web/layout"',
  ],
  id: 'navigation-bar',
  metadata: { nestable: false },
};
