// Routes whose stories open an overlay (modal, alert, tray, drawer, etc.) via an
// "Open" button. These use a separate sub-flow that taps Open before the
// screenshot and dismisses the overlay after.
//
// The value is the exact visible text of the control that dismisses the overlay.
// It is declared per route rather than guessed at runtime: Maestro's optional
// element lookup is a hardcoded 7s that cannot be tuned per command, so the
// previous "try Cancel, then try Close" pair burned 7s on every route whichever
// way it resolved. An explicit label also makes a renamed button fail loudly
// instead of silently leaving the overlay open over the next route's screenshot.
export const overlayRoutes = new Map([
  ['AlertBasic', 'Cancel'],
  ['DrawerLeft', 'Cancel'],
  ['DrawerTop', 'Cancel'],
  ['ModalBasic', 'Cancel'],
  // The Open button itself toggles to Cancel — StickyFooter is not a modal.
  ['StickyFooter', 'Cancel'],
  ['TrayBasic', 'Close'],
]);

export const enabledRoutes = [
  'Accordion',
  'AlertBasic',
  'AlphaSelect',
  'AlphaSelectChip',
  'AlphaTabbedChips',
  'AreaChart',
  'Avatar',
  'AvatarButton',
  'Axis',
  'Banner',
  'BarChart',
  'Box',
  'BrowserBar',
  'Button',
  'ButtonGroup',
  'Card',
  'Carousel',
  'CartesianChart',
  'Checkbox',
  'CheckboxCell',
  'Chip',
  'Coachmark',
  'Combobox',
  'ControlGroup',
  'Divider',
  'Dot',
  'DrawerLeft',
  'DrawerTop',
  'Group',
  'InputChip',
  'InputStack',
  'Legend',
  'Link',
  'ListCell',
  'ModalBasic',
  'Pressable',
  'RadioCell',
  'SelectChip',
  'SlideButton',
  'StepperHorizontal',
  'StepperVertical',
  'StickyFooter',
  'TrayBasic',
  'Switch',
  'Tabs',
  'Tag',
  'Text',
];
