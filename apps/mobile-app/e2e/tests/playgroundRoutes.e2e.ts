import { keyToRouteName } from '@cbhq/ui-mobile-playground/components/keyToRouteName';
import {
  getPlaygroundRoutes,
  navigateToRoute,
  routes,
  uploadScreenshotsToPercyForRoute,
} from '@cbhq/ui-mobile-visreg';

const affectedRouteKeys = process.env.DETOX_AFFECTED_ROUTE_KEYS?.split(',');

const filteredRoutes = !affectedRouteKeys
  ? routes
  : routes.filter((route) => affectedRouteKeys.includes(route.key));

const disabledRoutes = {
  disabledRoutes: [
    'AnimatedCaret', // Animations not relevant for Visreg
    'DotMisc', // Contains a11y, animations, flows, or other stories not relevant for Visreg
    'DrawerMisc', // Contains a11y, animations, flows, or other stories not relevant for Visreg
    'HintMotion', // Animations not relevant for Visreg
    'LottieStatusAnimation', // Animations not relevant for Visreg
    'TooltipV2', // Stories need to be adjusted to make them useful for Visreg
    'Toast', // Stories need to be adjusted to make them useful for Visreg
    'TrayMisc', // Contains a11y, animations, flows, or other stories not relevant for Visreg
  ],
  iosDisabledRoutes: [],
  androidDisabledRoutes: [
    'AlertBasic', // Modal displays status bar, resulting in false positive
    'AlertLongTitle', // Modal displays status bar, resulting in false positive
    'AlertOverModal', // Modal displays status bar, resulting in false positive
    'AlertPortal', // Modal displays status bar, resulting in false positive
    'AlertSingleAction', // Modal displays status bar, resulting in false positive
    'DrawerBottom', // Modal displays status bar, resulting in false positive
    'DrawerFallback', // Modal displays status bar, resulting in false positive
    'DrawerLeft', // Modal displays status bar, resulting in false positive
    'DrawerRight', // Modal displays status bar, resulting in false positive
    'DrawerScrollable', // Modal displays status bar, resulting in false positive
    'DrawerTop', // Modal displays status bar, resulting in false positive
    'ModalBackButton', // Modal displays status bar, resulting in false positive
    'ModalBasic', // Modal displays status bar, resulting in false positive
    'ModalLong', // Modal displays status bar, resulting in false positive
    'ModalPortal', // Modal displays status bar, resulting in false positive
    'Overlay', // Modal displays status bar, resulting in false positive
    'PatternDisclosureHighFrictionBenefit', // Modal displays status bar, resulting in false positive
    'PatternDisclosureHighFrictionRisk', // Modal displays status bar, resulting in false positive
    'PatternDisclosureLowFriction', // Modal displays status bar, resulting in false positive
    'PatternDisclosureMedFriction', // Modal displays status bar, resulting in false positive
    'PatternError', // Modal displays status bar, resulting in false positive
    'StickyFooterWithTray', // Modal displays status bar, resulting in false positive
    'TrayBasic', // Modal displays status bar, resulting in false positive
    'TrayFallback', // Modal displays status bar, resulting in false positive
    'TrayFeedCard', // Modal displays status bar, resulting in false positive
    'TrayNavigation', // Modal displays status bar, resulting in false positive
    'TrayScrollable', // Modal displays status bar, resulting in false positive
    'TrayTall', // Modal displays status bar, resulting in false positive
    'TrayWithTitle', // Modal displays status bar, resulting in false positive
  ],
};

const testRoutes = getPlaygroundRoutes({ routes: filteredRoutes, ...disabledRoutes });

if (!testRoutes.length) process.exit(0);

describe('All Playground Routes', () => {
  it.each(testRoutes)('%p Visual Diff Test.', async (routeName) => {
    await navigateToRoute(`cds://${keyToRouteName(routeName)}`);
    await uploadScreenshotsToPercyForRoute(routeName);
  });
});
