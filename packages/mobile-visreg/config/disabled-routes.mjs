/**
 * Routes excluded from visual regression testing.
 *
 * Always include a comment when disabling a route — this preserves context for
 * future engineers and tracks tech debt so routes can be re-enabled later.
 *
 * Ported from: apps/mobile-app/e2e/tests/playgroundRoutes.e2e.ts
 */

/**
 * Disabled on all platforms.
 */
export const disabledRoutes = [
  // --- Animations ---
  // Screenshots capture a single frame, so animated routes produce
  // non-deterministic results depending on where the animation is paused.
  // Tech debt: consider freezing animation state (e.g. via a test-mode flag
  // or `reduceMotion`) before re-enabling.
  'AnimatedCaret',
  'ChartTransitions',
  'HintMotion',
  'LottieStatusAnimation',

  // --- Mixed-content "Misc" routes ---
  // These screens bundle accessibility demos, animations, and interaction
  // flows that are not meaningful for static screenshot comparison. They
  // should be broken into focused individual stories before being enabled.
  'DotMisc',
  'DrawerMisc',
  'TrayMisc',

  // --- Stories that need rework ---
  // The stories for these components don't yet show stable, visually
  // meaningful states. Re-enable once the stories are updated.
  // Tech debt tracked in component story files.
  'TooltipV2',
  'Toast',
];

/**
 * Disabled on iOS only.
 */
export const iosDisabledRoutes = [];

/**
 * Disabled on Android only.
 *
 * Tech debt: On Android, modal surfaces (Alert, Drawer, Modal, Overlay, Tray,
 * and patterns built on them) render the system status bar inside the
 * screenshot region. Because the status bar shows live data (time, battery,
 * signal strength), it changes between runs and produces false-positive diffs
 * in Percy.
 *
 * Fix: enable Android "Demo Mode" on the emulator/device to freeze the status
 * bar to static content, then re-enable these routes.
 * See: https://developer.android.com/studio/debug/dev-options#demo-mode
 */
export const androidDisabledRoutes = [
  // Alert routes — modal, renders status bar
  'AlertBasic',
  'AlertLongTitle',
  'AlertOverModal',
  'AlertPortal',
  'AlertSingleAction',
  // Drawer routes — modal, renders status bar
  'DrawerBottom',
  'DrawerFallback',
  'DrawerLeft',
  'DrawerRight',
  'DrawerScrollable',
  'DrawerTop',
  // Modal routes — modal, renders status bar
  'ModalBackButton',
  'ModalBasic',
  'ModalLong',
  'ModalPortal',
  // Overlay — modal, renders status bar
  'Overlay',
  // Pattern routes built on modal surfaces — renders status bar
  'PatternDisclosureHighFrictionBenefit',
  'PatternDisclosureHighFrictionRisk',
  'PatternDisclosureLowFriction',
  'PatternDisclosureMedFriction',
  'PatternError',
  // Tray routes — modal, renders status bar
  'StickyFooterWithTray',
  'TrayBasic',
  'TrayFallback',
  'TrayFeedCard',
  'TrayNavigation',
  'TrayScrollable',
  'TrayTall',
  'TrayWithTitle',
];
